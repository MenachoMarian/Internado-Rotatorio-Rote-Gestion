import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Fragment } from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import axios from 'axios';
import moment from 'moment';


import { DocumentsCollection } from '../db/ListsCollection';
import { CategoriasCollection } from '../db/ListsCollection';
import { OficinasCollection } from '../db/ListsCollection';
import { GestionCollection } from '../db/ListsCollection';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";

import '../styles/Styles.css';
import imagenes from '../images/imagenes'
import { Button, Popover, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';

import { Nav } from "./Navbar";
import { App } from './App';
import { Pagination } from './Pagination';
import { Home } from './Home';
import {UIADMIN} from './UIADMIN'


export const BuscadorRecibidos = () => {


    const[posts, setPosts] = useState([]);
    const[loading, setloading] = useState(false);
    const[currentPage, setCurrentPage] = useState(1);
    const[postsPerPage, setPostsPerPage] = useState(4);

    const [documento, setDocumento] = useState([]);
  const [documentoBackup, setDocumentoBackup] = useState([]);
  const [textBuscar, setTextBuscar] = useState("");


  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const idddd=  useTracker(() => Meteor.userId());
  
  const logout = () => Meteor.logout();

  //CONTROL ADMIN INCIO
  const [rol,setRol] = useState(false);

  React.useEffect(() => {
    if(Roles.userIsInRole(Meteor.userId(),"admin")){
      console.log("Entro aqui");
      setRol(true);
    }
  });
  //CONTROL ADMIN FIN

  React.useEffect(() => {

    UploadService.getFilesrecibido().then((response) => {
      setDocumento(response.data);
      setDocumentoBackup(response.data);
      //console.log(response.data); 

    });
  }, []);

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

    setDocumento(newData)
    setTextBuscar(text)
  };
  //FIN PAGINATION

  return (
    <div>
       {user ? (

          rol ?(
            <UIADMIN/>
          ):(

          user.profile.oficina == "SECRETARIA INGENIERIA DE SISTEMAS" ? (
            <Fragment>
              
                <div className="Body">
                  <div className="hero">
                          <Nav/>
                          <nav className="menu">
                              <ul>
                              <li><Link to="/Home">Home</Link></li>
                            <li><Link to="/FilesSend">Enviados</Link></li>
                            <li><Link to="/FilesRecibidosLista">Recibidos</Link></li>
                            <li><Link to="/OtrosDocumentos">Externos</Link></li>
                            <li><Link to="/TextEditor">Editor</Link></li>
                              <li><a>{user.username} 🚪</a><br/>
                                  <ul>
                                    <li onClick={logout}><a>Salir</a></li>
                                  </ul>
                                </li>
                              </ul>
                          </nav>
                  </div> 

<div className="menu_simple">
    <ul>
    <li><Link to="/FilesRecibidos">Nuevo</Link></li>
    </ul>
</div>


        <div className="contenido">

        <div className="botones filtrado">
            <p>

                <input 
                    placeholder="Buscar documentos recibidos..." 
                    className="form-control"
                    value={textBuscar}
                    onChange={(e) =>{setTextBuscar(e.currentTarget.value)
                    filter(e);}}
                />
            </p>
        </div>
        

    {documento.map(doc => (
      <div className="card" key={doc._id}>

        <table className="table" >
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
      </div>
            ))}
          
        </div>
            </div>
            </Fragment>    
            ) : (
                <Home /> 
            )
          )
        ) : (
          <App />
        )}
        
    </div>
  );
};