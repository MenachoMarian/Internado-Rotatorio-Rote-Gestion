import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Fragment } from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";

import { DocumentsCollection } from '../db/ListsCollection';
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


export const UploadFiles = () => {

  
  const [nombre, setNombre] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  //const [iden, setIden] = useState("");

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  
  



  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  
  const { cats, docs} = useTracker(() => {
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
        return {cats, docs };
    });
 
  

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
      const num = response.data[0]._id;

    });
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };




  

  const upload = () => {

    iden = Random.id([7])
    let currentFile = selectedFiles[0];


    UploadService.uploadfile(iden,nombre,type,currentFile)
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
          <Fragment>
            <div className="Body">
              <div className="hero">
                      <Nav/>
                      <nav className="menu">
                          <ol>
                              <li>
                                <Link to="/Home">Home</Link>
                              </li>
                          </ol>
                      </nav>
              </div>
              <div className="user" onClick={logout}>
                  {user.username} 🚪
            </div>
          <div className="contenido">
              <div className="botones-insert">
                
                <label > <b>Número documento: </b>{docs + 1}</label>

              <form className="doc-form" >
              
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

             Documento: <label className="btn btn-default">
                      <input type="file" onChange={selectFile} />
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
                      
                        

                          {fileInfos &&
                              fileInfos.map((file, index) => (
                              <ol key={index}>

                                <li>
                                  {file.universidad}/{file.facultad}/{file.carrera}/{file.categoria}/{file.numero}<br/>
                                  <label><b>{file.nombre}:  </b></label>
                                  <a href={file.link} >{file.picture}</a><br/>

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
          <App />
        )}
        
    </div>
  );
};

