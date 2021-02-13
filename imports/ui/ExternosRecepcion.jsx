import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Fragment } from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import moment from 'moment';


import { DocumentsCollection, OtrosDocumentos } from '../db/ListsCollection';
import { CategoriasCollection } from '../db/ListsCollection';
import { OficinasCollection } from '../db/ListsCollection';

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
import { Home } from './Home';
import {UIADMIN} from './UIADMIN'


export const ExternosRecepcion = () => {

  const [oficina, setOficina] = useState("");
  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const idddd=  useTracker(() => Meteor.userId());
  
  const logout = () => Meteor.logout();
  
  const { docss,ofis } = useTracker(() => {

        const handlerdocs = Meteor.subscribe('documents');
        if(!handlerdocs.ready()){
          console.log("No documents");
        }
        const docss = DocumentsCollection.find().fetch();

        
        const handlerofis = Meteor.subscribe('oficinas');
        if(!handlerofis.ready()) {
          console.log("no hay");
        }
        const ofis = OficinasCollection.find().fetch();
        
        return {docss, ofis};
    });
 
  

  useEffect(() => {

    /*UploadService.getFiles(idddd).then((response) => {
      setFileInfos(response.data);
      const num = response.data[0]._id;  */

    });
 // }, []);

  console.log(Meteor.userId())
  


  const docs = DocumentsCollection.find({destino: oficina},{sort: {_id:-1}}).fetch();


  return (
    <div>
       {user ? (
         userId == "q3w3ELFTmkPApjQez" ?(
          <UIADMIN/>
        ):(

            user.profile.oficina == "SECRETARIA INGENIERIA DE SISTEMAS" ? (
                <Fragment>
                <Home/>
                </Fragment>    
                ) : (          
          
                <div className="Body">
                <div className="hero">
                        <Nav/>  
                        <nav className="menu">
                            <ul>
                                <li> <Link to="/Home">Home</Link> </li>
                                <li><Link to="/ExternosEnvio">Enviar</Link></li>
                                <li><Link to="/ExternosRecepcion">Recibidos</Link></li>
                                <li><a>{user.username} 🚪</a><br/>
                                  <ul>
                                    <li onClick={logout}><a>Salir</a></li>
                                  </ul>
                                </li>
                            </ul>
                        </nav>
                </div>
      
                <div className="contenido">
                  <h2>
                    RECEPCION DOCUMENTOS: {user.profile.oficina}
                  </h2>
                  <div className="insert-doc">
                    <fieldset>
                      <p><label> Ver documentos enviados a:</label>

                          <select 
                        required
                        className="select-box"
                        value={oficina}
                        onChange={(e) =>{setOficina(e.currentTarget.value)
                        console.log(e.currentTarget.value);}}>
                          <option value="Undefined" defaultValue> Seleccionar su unidad</option>  
                          <option
                            value={user.profile.oficina}
                          >
                            {user.profile.oficina}
                          </option> 
                          </select>
                      </p>
                    </fieldset>
                  </div> <br/>

                      {docs.map(doc => (
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
        ))

          
        ) : (
          <App />
        )}
        
    </div>
  );
};