import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Fragment } from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import moment from 'moment';


import { DocumentsCollection, OtrosDocumentos } from '../db/ListsCollection';
import { CategoriasCollection, OficinasCollection } from '../db/ListsCollection';

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


export const Origenfiltrar = () => {

  const user = useTracker(() => Meteor.user());
  const idddd=  useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();

  const [oficina, setOficina]=useState();

  const { docs, ofis } = useTracker(() => {

        const handlerdocs = Meteor.subscribe('otrosdocumentos');
        if(!handlerdocs.ready()){
          console.log("No documents");
        }
        const docs = OtrosDocumentos.find({},{sort: {_id:-1}}).fetch();

        const handlerofis = Meteor.subscribe('oficinas');
        if(!handlerofis.ready()) {
          console.log("no hay");
        }
        const ofis = OficinasCollection.find().fetch();
        
        return {docs, ofis};
    });
 
  
useEffect(() => {
       
  });
//}, []);

const documento=OtrosDocumentos.find({useroficina: oficina},{sort: {_id:-1}}).fetch();

  console.log(Meteor.userId())
  //console.log(documentoBackup);

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
                                    <Link to="/UploadFile">Documentos enviados</Link>
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
                  {"  "} 
                  <button className="btn btn-dark"><Link to="/OtrosDocumentos">Todos</Link></button>
              </div>

                  <div className="lista-doc">
                      <div className="lista-doc-item">

                      Oficina: <select 
                    required
                    className="dropdown"
                    value={oficina}
                    onChange={(e) =>{setOficina(e.currentTarget.value)
                    console.log(e.currentTarget.value);}}>
                      <option value="Undefined" defaultValue> Seleccionar oficina</option>
                         {ofis.map(ofi => (
                      <option
                        key={ofi._id} 
                        value={ofi.oficinanombre}
                      >
                        {ofi.oficinanombre} {"    "} {ofi.oficinacode}
                      </option>
                        ))}
                      </select>

                      
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