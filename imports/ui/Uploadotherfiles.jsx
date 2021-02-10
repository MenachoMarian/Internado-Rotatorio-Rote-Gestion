import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Fragment } from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import moment from 'moment';


import { DocumentsCollection, OtrosDocumentos } from '../db/ListsCollection';
import { CategoriasCollection } from '../db/ListsCollection';

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


export const Uploadotherfiles = () => {

  const user = useTracker(() => Meteor.user());
  const idddd=  useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();

  const [documento, setDocumento] = useState([]);
  const [documentoBackup, setDocumentoBackup] = useState([]);
  const [textBuscar, setTextBuscar] = useState("");

  const { docs } = useTracker(() => {

        const handlerdocs = Meteor.subscribe('otrosdocumentos');
        if(!handlerdocs.ready()){
          console.log("No documents");
        }
        const docs = OtrosDocumentos.find({},{sort: {_id:-1}}).fetch();
        
        return {docs};
    });
 
  
useEffect(() => {
      UploadService.getotherfiles().then((response) => {
        setDocumento(response.data);
        setDocumentoBackup(response.data);
        //console.log(response.data); 
  
  });
}, []);

  console.log(Meteor.userId())
  //console.log(documentoBackup);

const filter =(event)=>{
    console.log(event.target.value);
    //OBTENER DATOS DE INPUT
    var text = event.target.value
    //OBTENER DATOS DE ARRAY BACKUP
    const data = documentoBackup

    console.log(data);

    const newData = data.filter(function(item){
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
      const itemData = itemFecha+" "
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


  return (
    <div>
       {user ? (

          user.profile.oficina == "SECRETARIA INGENIERIA DE SISTEMAS" ? (
          <Fragment>
                <div className="Body">
                  <div className="hero">
                          <Nav/>  
                          <nav className="menu">
                              <ol>
                                  <li>
                                    <Link to="/Home">Home</Link>
                                    <Link to="/UploadFile">Envío documentos</Link>
                                    <Link to="/TextEditor">Editor</Link>
                                  </li>
                              </ol>
                          </nav>
                  </div>
                  <div className="user" onClick={logout}>
                      {user.username} 🚪
                </div>
              <div className="contenido">
              <label> <b>SECRETARIA INGENIERIA DE SISTEMAS: RECEPCION DOCUMENTOS</b></label>
              <div> Filtrar datos por:
                  <button className="btn btn-dark"><Link to="filtrarCategoria">Referencia</Link></button>
                        {"  "} 
                  <button className="btn btn-dark"><Link to="filtrarCategoria">Unidad origen</Link></button>
              </div>

                  <div className="lista-doc">
                      <div className="lista-doc-item">
                      
                    

                      <input 
                        placeholder="Buscar" 
                        className="form-control col-md-4"
                        value={textBuscar}
                        onChange={(e) =>{setTextBuscar(e.currentTarget.value)
                          filter(e);}}
                        /> <br/> <br/>

                      
                              {documento.map(doc => (
                                <ol key={doc._id}>

                                    <li> <b> {doc.universidad}/{doc.facultad}/{doc.categoria}</b></li>
                                    
                                    <li> <b>Fecha entrega:</b> {moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</li>
                                    <li> <b>Unidad origen:</b> {doc.useroficina}</li>
                                    <li> <b>Usuario origen: </b>{doc.usernombre}</li>
                                    <li> <b>Referencia:</b> {doc.categoria}</li>
                                    <li> <b>Unidad destino: </b> {doc.destino}</li>
                                    <li> <b>Nombre documento: </b> {doc.nombre}</li>
                                    <li> <b>Documento: </b> <a href={doc.link} >{doc.picture}</a><br/></li>
                                    

                                    <Button id={doc.identi} type="button">
                                        Vista previa
                                    </Button>
                                      
                                    <UncontrolledPopover trigger="legacy" placement="right" target={doc.identi} className="my-custom-popover">
                                        <PopoverHeader>{doc.nombre}</PopoverHeader>
                                        <PopoverBody>
                                            <img src={doc.link} alt="" height="350px" width="350px"/>
                                        </PopoverBody>
                                    </UncontrolledPopover>
                                </ol>
                              ))}
                      </div>
                  </div>
              </div>
            </div>
          </Fragment>    
          ) : (
              <Home /> 
          )
          
        ) : (
          <App />
        )}
        
    </div>
  );
};