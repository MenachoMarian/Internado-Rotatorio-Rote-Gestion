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
import {UIADMIN} from './UIADMIN'


export const Categoriafiltrar = () => {

  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const idddd=  useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();

  const [categoria, setCategoria]=useState();

  const { docs, cats } = useTracker(() => {

        const handlerdocs = Meteor.subscribe('otrosdocumentos');
        if(!handlerdocs.ready()){
          console.log("No documents");
        }
        const docs = OtrosDocumentos.find({},{sort: {_id:-1}}).fetch();

        const handlercats = Meteor.subscribe('categorias');
        if(!handlercats.ready()) {
          console.log("no hay catgeorias");
        }
        const cats = CategoriasCollection.find().fetch();
        
        return {docs, cats};
    });
 
  
useEffect(() => {
       
  });
//}, []);

const documento=OtrosDocumentos.find({categoria: categoria},{sort: {_id:-1}}).fetch();

  console.log(Meteor.userId())
  //console.log(documentoBackup);

  return (
    <div>
       {user ? (

        userId == "q3w3ELFTmkPApjQez" ?(
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
              <h2>SECRETARIA INGENIERIA DE SISTEMAS: RECEPCION DE DOCUMENTOS</h2>
              <div>
                  <button className="btn btn-dark"><Link to="filtrarCategoria">Referencia</Link></button>
                        {"  "} 
                  <button className="btn btn-dark"><Link to="filtrarOrigen">Unidad origen</Link></button>
                  {"  "} 
                  <button className="btn btn-dark"><Link to="/OtrosDocumentos">Todos</Link></button>
              </div>

                  <div className="lista-doc">
                      <div className="lista-doc-item">

                      Referencia: <select 
                    required
                    className="select-box"
                    value={categoria}
                    onChange={(e) =>{setCategoria(e.currentTarget.value)
                    console.log(e.currentTarget.value);}}>
                      <option value="Undefined" defaultValue> Seleccionar referencia</option>
                         {cats.map(cat => (
                      <option
                        key={cat._id} 
                        value={cat.code}
                      >
                        {cat.categoria}{"    "}{cat.code}
                      </option>
                        ))}
                      </select>

                      
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