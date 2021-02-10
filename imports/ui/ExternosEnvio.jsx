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


export const ExternosEnvio = () => {

  
  const [nombre, setNombre] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [oficina, setOficina] = useState("");
  const [destino, setDestino] = useState("SECRETARIA INGENIERIA DE SISTEMAS");


  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);



  const user = useTracker(() => Meteor.user());
  const idddd=  useTracker(() => Meteor.userId());

  const [documento,setDocumento]=useState([]);
  
  const logout = () => Meteor.logout();
  
  const { cats, docs, ofis } = useTracker(() => {
        const handler = Meteor.subscribe('categorias');
        if(!handler.ready()) {
          console.log("no hay");
        }
        const cats = CategoriasCollection.find().fetch();

        const handlerdocs = Meteor.subscribe('otrosdocumentos');
        if(!handlerdocs.ready()) {
          console.log("no hay");
        }
        const docs = OtrosDocumentos.find().fetch();

        const handlerofis = Meteor.subscribe('oficinas');
        if(!handlerofis.ready()) {
          console.log("no hay");
        }
        const ofis = OficinasCollection.find().fetch();


        return {cats, docs, ofis};
    });
 
  
    const docuserr=OtrosDocumentos.find({userId: idddd},{sort: {_id:-1}}).fetch();
  
  useEffect(() => {
    
    
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    console.log(selectedFiles);
  };


  console.log(Meteor.userId())

  
  //setDocumento( OtrosDocumentos.find({userId: idddd},{sort: {_id:-1}}).fetch())


  const upload = () => {

    iden = Random.id([7])
    let currentFile = selectedFiles[0];


    UploadService.externosuploadfile(iden,nombre,type,currentFile,user._id, user.username ,oficina,destino)
    .then(response => {
      console.log(response);
      const identificador = response.data[0].identi;
      return identificador;
    }).catch(() => {
      
      setCurrentFile(undefined);
    });

  };

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
                                    <Link to="/ExternosRecepcion">Recepción doc</Link>
                                </li>
                            </ol>
                        </nav>
                </div>
                <div className="user" onClick={logout}>
                    {user.username} 🚪
                </div>


            <div className="contenido">
                <div className="botones-insert">
                <label> <b>ENVIO DOCUMENTOS UNIDADES EXTERNAS</b></label>
                    <label > <b>Oficina: </b> {user.profile.oficina}</label>
                <form className="doc-form" >

                Unidad: <select 
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
                Nombre del documento:
                            <input 
                               required
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.currentTarget.value)}
                            /><br/><br/>
        
                Tipo de documento: <select 
                                    required
                                    className="dropdown"
                                    value={type}
                                    onChange={(e) =>setType(e.currentTarget.value)}>
                                        <option value="Undefined" defaultValue> Seleccionar categoría</option>
                                    {cats.map(cat => (
                                        <option
                                        key={cat.code} 
                                        value={cat.code}
                                        >
                                            {cat.categoria}    ({cat.code})
                                        </option>
                                    ))}
                                    </select>
                <button 
                    className="btn btn-dark" >
                    <Link to="/nuevacategoria">Agregar categoria</Link>
                </button><br/><br/>          

                Documento: <label className="btn btn-default">
                        <input type="file" onChange={(e)=>selectFile(e)} />
                    </label>

                    <button
                        className="btn btn-dark"
                        disabled={!selectedFiles}
                        onClick={upload}
                    >
                        Cargar
                    </button> <br/>   </form>

                </div>


                <div className="lista-doc">
                    <div className="lista-doc-item">
                            {docuserr.map(doc => (
                                <ol key={doc._id}>

                                    <li> <b> {doc.universidad}/{doc.facultad}/{doc.carrera}/{doc.categoria}</b></li>
                                    
                                    <li> <b>Fecha entrega:</b> {moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</li>
                                    <li> <b>Unidad origen:</b> {doc.useroficina}</li>
                                    <li> <b>Usuario origen: </b>{doc.usernombre}</li>
                                    <li> <b>Referencia:</b> {doc.categoria}</li>
                                    <li><b>Unidad destino: </b> {doc.destino}</li>
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
          <App/>
        )}
        
    </div>
  );
};