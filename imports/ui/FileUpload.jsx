import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Fragment } from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import moment from 'moment';


import { DocumentsCollection } from '../db/ListsCollection';
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


export const UploadFiles = () => {

  
  const [nombre, setNombre] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [oficina, setOficina] = useState("");
  const [destino, setDestino] = useState("");

  const [useroficina, setUseroficina] = useState();

  //const [iden, setIden] = useState("");

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  
  



  const user = useTracker(() => Meteor.user());
  const idddd=  useTracker(() => Meteor.userId());
  
  const logout = () => Meteor.logout();
  
  const { cats, docs, ofis } = useTracker(() => {
        const handler = Meteor.subscribe('categorias');
        if(!handler.ready()) {
          console.log("no hay");
        }
        const cats = CategoriasCollection.find().fetch();

        const handlerdocs = Meteor.subscribe('documents');
        if(!handlerdocs.ready()){
          console.log("No documents");
        }
        const docs = DocumentsCollection.find().count();


        const handlerofis = Meteor.subscribe('oficinas');
        if(!handlerofis.ready()) {
          console.log("no hay");
        }
        const ofis = OficinasCollection.find().fetch();

        
        
        return {cats, docs, ofis};
    });
 
  

  useEffect(() => {

    /*UploadService.getFiles(idddd).then((response) => {
      setFileInfos(response.data);
      const num = response.data[0]._id;  */

    });
 // }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    console.log(selectedFiles);
  };


  console.log(Meteor.userId())

  
  const docsuserrr = DocumentsCollection.find({},{sort: {_id:-1}}).fetch();

  

  const upload = () => {

    iden = Random.id([7])
    let currentFile = selectedFiles[0];


    UploadService.uploadfile(iden,nombre,type,currentFile,user._id, user.username , oficina ,docs+1, destino)
    .then(response => {
      console.log(response);
      const identificador = response.data[0].identi;
      return identificador;
    }).catch(() => {
      
      setCurrentFile(undefined);
    });
  //console.log(iden);

 // const cursor = DocumentsCollection.find({id:iden}, { limit:1 ,fields: { id: 1}}).fetch();
  //console.log(cursor);

  

   /* let currentFile = selectedFiles[0];
    UploadService.uploadimg(currentFile,iden);*/
  
    
 
  
    /*let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    /*UploadService.uploadfile(nombre,type);
    console.log(nombre,type);
    const [last] = UploadService.getlastfile();
    console.log(last);*/

    /*UploadService.uploadfile(iden,nombre,type, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
         UploadService.uploadimg(currentFile,iden);
        return UploadService.getFiles();
        
      })
      .then((files) => {
        setFileInfos(files.data);
       
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles("");*/

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
                                    <Link to="/OtrosDocumentos">Recepción documentos</Link>
                                    <Link to="/TextEditor">Editor</Link>
                                  </li>
                              </ol>
                          </nav>
                  </div>
                  <div className="user" onClick={logout}>
                      {user.username} 🚪
                </div>
              <div className="contenido">
                  <div className="botones-insert">
                    
                    <label> <b>SECRETARIA INGENIERIA DE SISTEMAS: ENVIO DOCUMENTOS</b></label>
                    <label > <b>Número documento: </b>{docs+1}</label>
                    

                  <form className="doc-form" >


                  Documento:
                          <input type="file" onChange={selectFile} />
                       <br/><br/>

                  Unidad:  <select
                        required
                        className="dropdown"
                        value={oficina}
                        onChange={(e) =>{setOficina(e.currentTarget.value)
                        console.log(e.currentTarget.value);}}>
                          <option value="Undefined" defaultValue> Seleccione su unidad</option>
                          <option
                            value={user.profile.oficina}
                          >
                            {user.profile.oficina}
                          </option>
                            
                          </select> <br/> <br/>
                  
                  Nombre del documento:
                            <input 
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

                Destino: <select 
                    required
                    className="dropdown"
                    value={destino}
                    onChange={(e) =>{setDestino(e.currentTarget.value)
                    console.log(e.currentTarget.value);}}>
                      <option value="Undefined" defaultValue> Seleccionar unidad destino </option>
                         {ofis.map(ofi => (
                      <option
                        key={ofi.oficinanombre} 
                        value={ofi.oficinanombre}
                      >
                        {ofi.oficinanombre}///{ofi.oficinacode}
                      </option>
                        ))}
                      </select> <br/> <br/>

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

                      
                              {docsuserrr.map(doc => (
                                <ol key={doc._id}>

                                    <li> <b> {doc.universidad}/{doc.facultad}/{doc.carrera}/{doc.categoria}/{doc.numero}</b></li>
                                    
                                    <li> <b>Fecha entrega:</b> {moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</li>
                                    <li> <b>Usuario origen: </b>{doc.usernombre}</li>
                                    <li> <b>Unidad origen:</b> {doc.useroficina}</li>
                                    <li> <b>Referencia:</b> {doc.categoria}</li>
                                    <li> <b>Unidad destino:</b> {doc.destino}</li>
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
                      

                              {fileInfos &&
                                  fileInfos.map((file, index) => (
                                  <ol key={index}>

                                    <li>
                                      {file.universidad}/{file.facultad}/{file.carrera}/{file.categoria}/{file.numero}<br/>
                                      <label><b>{file.nombre}:  </b></label>
                                      <a href={file.link} >{file.picture}</a><br/>
                                      <label>Oficina: {file.useroficina}</label><br/>
                                      <label>Fecha: {file.register}</label><br/>
                                  

                                      <Button id={file.identi} type="button">
                                        Vista previa
                                      </Button>
                                      
                                        <UncontrolledPopover trigger="legacy" placement="right" target={file.identi} className="my-custom-popover">
                                          <PopoverHeader>Vista previa</PopoverHeader>
                                          <PopoverBody>
                                            <img src={file.link} alt="" height="350px" width="350px"/>
                                          </PopoverBody>
                                        </UncontrolledPopover>
                                      
                                    </li>
                                      

                                    
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

