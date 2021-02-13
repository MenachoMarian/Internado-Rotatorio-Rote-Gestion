import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';



import '../styles/main.css'
import '../styles/Styles.css'
import { Button, Popover, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';
import { Fragment } from 'react';

export const Pagination = (peticion) => {

    const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  const userId = useTracker(() => Meteor.userId());

    const[posts, setPosts] = useState([]);
    const[loading, setloading] = useState(false);
    const[currentPage, setCurrentPage] = useState(1);
    const[postsPerPage, setPostsPerPage] = useState(2);

    const [documentoBackup, setDocumentoBackup] = useState([]);
    const [textBuscar, setTextBuscar] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            setloading(true);
            const res = await axios.get('http://localhost:8080/documento');
            setPosts(res.data);
            setloading(false);
            setDocumentoBackup(res.data);
        }

        fetchPosts();
    }, []);

    //GET CURRENT POSTS

     const indexOfLastPost = currentPage * postsPerPage;
     const indexOfFirstPost = indexOfLastPost - postsPerPage;
     const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

     const pageNumbers =[];
     for (let i = 1; i <= Math.ceil(posts.length/postsPerPage); i++){
         pageNumbers.push(i);     
     }

     //CHANGE PAGE
     const paginate = (pageNumbers) => setCurrentPage(pageNumbers)


     const filter =(event)=>{
        console.log(event.target.value);
        //OBTENER DATOS DE INPUT
        var text = event.target.value
        //OBTENER DATOS DE ARRAY BACKUP
        const data = documentoBackup
    
        console.log(data);
    
        const newData = data.filter(function(item){
          //VARIABLE numero DEL DOCUMENTO
          const itemNumero = item.numero.toString()
          //VARIABLE fecha DEL DOCUMENTO
          const itemFecha = //item.register.toString()
          moment(item.register).format('DD-MM-YYYY HH:mm:ss')
          //VARIABLE unidad origen DEL DOCUMENTO
          const itemOrigen = item.useroficina.toUpperCase()
          //VARIABLE referencian DEL DOCUMENTO
          const itemReferencia = item.categoria.toUpperCase()
          //VARIABLE DESTINO DEL DOCUMENTO
          const itemDestino = item.destino.toUpperCase()
          //VARIABLE nombre DEL DOCUMENTO
          const itemNombre = item.nombre.toUpperCase()
          //VARIABLE DEL DOCUMENTO MISMO
          const itemPicture = item.picture.toUpperCase()
          //VARIABLE gestion DEL DOCUMENTO
          //const itemGestion = item.gestion.toUpperCase()
          //  Juntamos los campos anteriores, para buscar todo
          const itemData = itemNumero+" "
                          +itemFecha+" "
                          +itemOrigen+" "
                          +itemReferencia+" "
                          +itemDestino+" "
                          +itemNombre+" "
                          +itemPicture
                          //+itemGestion
                          
          //VARIABLE DEL INPUT BUSCAR
          const textData = text.toUpperCase()
          //FILTRAR SI ES VERDADERO O FALSO Y LO DEVUELVE
          return itemData.indexOf(textData) > -1

        })
    
        setPosts(newData)
        setTextBuscar(text)
      };

      const deleteDocumento = ({_id}) => Meteor.call('documentos.remove', _id);

    
  
  
  return (
    <div className="contenido">
      {loading ? (
        <h3>Loading...</h3>    
        ) : (

            <Fragment>
                <div className="titulo-tabla">

                    <h2>Documentos enviados</h2>
                </div>
            {currentPosts.map(doc => (
        <table className="table" key={doc._id}>
            <thead >
            <tr>
                <th>{doc.universidad}/{doc.facultad}/{doc.carrera}/{doc.categoria}/{doc.numero}</th>
                
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                        <ul >
                        <li> <b> {doc.universidad}/{doc.facultad}/{doc.carrera}/{doc.categoria}/{doc.numero}</b></li>                                    
                        <li> <b>Fecha entrega:</b> {moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</li>
                        <li> <b>Usuario origen: </b>{doc.usernombre}</li>
                        <li> <b>Unidad origen:</b> {doc.useroficina}</li>
                        <li> <b>Referencia:</b> {doc.categoria}</li>
                        <li> <b>Unidad destino:</b> {doc.destino}</li>
                        <li> <b>Nombre documento: </b> {doc.nombre}</li>
                        <li> <b>Documento: </b> <a href={doc.link} >{doc.picture}</a><br/></li>
                        <li> <b>Gestión: </b> {doc.gestion}</li>       
                        </ul>
                    </th>
                    <th>
                        <img src={doc.link} alt="No hay foto" height="250px" width="250px"/>
                    </th>
                </tr>
            </tbody>
            </table>
            ))}
        

        
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            </Fragment>
           
          
              
          
        )}
    </div>
  )
};