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


export const ExternosRecepcion = () => {

  const [oficina, setOficina] = useState("");
  const user = useTracker(() => Meteor.user());
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

            user.profile.oficina == "SECRETARIA INGENIERIA DE SISTEMAS" ? (
                <Fragment>
                <Home/>
                </Fragment>    
                ) : (          
          
                <div className="Body">
                <div className="hero">
                        <Nav/>  
                        <nav className="menu">
                            <ol>
                                <li>
                                    <Link to="/Home">Home</Link>
                                    <Link to="/ExternosEnvio">Envío documentos</Link>
                                </li>
                            </ol>
                        </nav>
                </div>
                <div className="user" onClick={logout}>
                    {user.username} 🚪 <br/>
                </div>
      


                <div className="contenido">

                Ver documentos enviados a:<select 
                    required
                    className="dropdown"
                    value={oficina}
                    onChange={(e) =>{setOficina(e.currentTarget.value)
                    console.log(e.currentTarget.value);}}>
                      <option value="Undefined" defaultValue> Seleccionar su unidad</option>
                         
                      <option
                        
                        value={user.profile.oficina}
                      >
                        {user.profile.oficina}
                      </option>
                        
                      </select> <br/> <br/>

                      
                    <div className="lista-doc">
                        <div className="lista-doc-item">
                                {docs.map(doc => (
                                    <ol key={doc._id}>
                                        <li> <b> {doc.universidad}/{doc.facultad}/{doc.carrera}/{doc.categoria}/{doc.numero}</b></li>
                                        <li> <b>Fecha entrega:</b> {moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</li>
                                        <li> <b>Unidad: origen</b> {doc.useroficina}</li>
                                        <li> <b>Usuario origen: </b>{doc.usernombre}</li>
                                        <li> <b>Referencia:</b> {doc.categoria}</li>
                                        <li> <b>Unidad destino</b> {doc.destino}</li>
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
        )

          
        ) : (
          <App />
        )}
        
    </div>
  );
};