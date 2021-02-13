import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker, useEffect } from 'meteor/react-meteor-data';


import  { Home } from './Home';
import { LoginForm } from './LoginForm';
import { Nav } from './Navbar';
import {App} from './App';
import {UIADMIN} from './UIADMIN'


import moment from 'moment';
import { Button, Popover, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';

import { useHistory } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import UploadService from "../services/FileUploadService";

import '../styles/main.css'
import '../styles/Styles.css'

export const Buscador = () => {

  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();
  console.log(Meteor.users.find(user).fetch());

  const [documento, setDocumento] = useState([]);
  const [documentoBackup, setDocumentoBackup] = useState([]);
  const [textBuscar, setTextBuscar] = useState("");

  React.useEffect(() => {

    UploadService.getFiles().then((response) => {
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
 
  //console.log(documento);
  //console.log(documentoBackup);
  
  return (
    <div >
      {user ? (

        userId == "q3w3ELFTmkPApjQez" ?(
          <UIADMIN/>
        ):(

        <Fragment>
          <div className="Body">

          <div className="hero">
                          <Nav/>
                          <nav className="menu">
                              <ul>
                              <li><Link to="/Home">Home</Link></li>
                              <li><Link to="/UploadFile">Enviar</Link></li>
                              <li><Link to="/OtrosDocumentos">Recibidos</Link></li>
                              <li><Link to="/TextEditor">Editor</Link></li>
                              <li><a>{user.username} 🚪</a><br/>
                                  <ul>
                                    <li onClick={logout}><a>Salir</a></li>
                                  </ul>
                                </li>
                              </ul>
                          </nav>
          </div>
          <div className="contenido">

           <div className="lista-doc">
                      <div className="lista-doc-item">
                      <input 
                        placeholder="Buscar documentos enviados..." 
                        className="form-control"
                        value={textBuscar}
                        onChange={(e) =>{setTextBuscar(e.currentTarget.value)
                        filter(e);}}
                      />
                      
                      {documento.map(doc => (
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
                          
                      </div>
                  </div> 
          </div>
          </div>
        </Fragment>    )
        ) : (
          <App /> 
        )}
    </div>
  )
};