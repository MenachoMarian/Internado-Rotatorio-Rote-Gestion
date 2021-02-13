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


export const UploadFiles = () => {

  
  const [nombre, setNombre] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [oficina, setOficina] = useState("");
  const [destino, setDestino] = useState("");
  const [gestion, setGestion] = useState("");

  const [useroficina, setUseroficina] = useState();

  //const [iden, setIden] = useState("");

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  const [documento, setDocumento] = useState([]);
  const [documentoBackup, setDocumentoBackup] = useState([]);
  const [textBuscar, setTextBuscar] = useState("");


  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const idddd=  useTracker(() => Meteor.userId());
  
  const logout = () => Meteor.logout();
  
  const { cats, docs, ofis, gests } = useTracker(() => {
        const handler = Meteor.subscribe('categorias');
        if(!handler.ready()) {
          console.log("no hay categorias");
        }
        const cats = CategoriasCollection.find().fetch();

        const handlerdocs = Meteor.subscribe('documents');
        if(!handlerdocs.ready()){
          console.log("No documents");
        }
        const docs = DocumentsCollection.find().count();


        const handlerofis = Meteor.subscribe('oficinas');
        if(!handlerofis.ready()) {
          console.log("no hay oficinas");
        }
        const ofis = OficinasCollection.find().fetch();

        const handlergests = Meteor.subscribe('gestiones');
        if(!handlergests.ready()) {
          console.log("no hay gestiones");
        }
        const gests = GestionCollection.find({},{sort: {_id:-1}}, {limit: 1}).fetch();

        
        
        return {cats, docs, ofis,gests};
    });
 
  

useEffect(() => {

  UploadService.getFiles().then((response) => {
  setDocumento(response.data);
  setDocumentoBackup(response.data);
        //console.log(response.data); 
  });
}, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    console.log(selectedFiles);
  };

  //console.log(Meteor.userId())
  //console.log(gests);
  //const docsuserrr = DocumentsCollection.find({},{sort: {_id:-1}}).fetch();
 

  const upload = () => {

    iden = Random.id([7])
    let currentFile = selectedFiles[0];


    UploadService.uploadfile(iden,nombre,type,currentFile,user._id, user.username , oficina ,docs+1, destino, gestion)
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
        <Link to="/Buscador"><input 
                        placeholder="Buscar documentos enviados..." 
                        className="form-control"
        /></Link> <br/>
        <h2> SECRETARIA INGENIERIA DE SISTEMAS: ENVIO DOCUMENTOS <br/>
                Número documento:  {docs+1} </h2>
       
          <div className="insert-doc">     
                    

          <form className="doc-form" >

             
           <fieldset>

            <p><label>Documento:</label></p>
             <p><input type="file" onChange={(e) => selectFile(e)} /></p>
            
            <p><label>Unidad:  </label></p>
             <p>
                <select
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
                </select> 
             </p>

            <p><label>Nombre del documento:</label></p>
             <p>
              <input 
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.currentTarget.value)}
              />
             </p>

            <p><label>Tipo de documento:</label></p>
             <p>
                <select 
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
                </select> {"        "}
                <button 
                      className="btn btn-dark" >
                      <Link to="/nuevacategoria">Agregar categoria</Link>
                  </button>  
             </p>
            
            <p><label>Destino:</label></p>
             <p>
              <select 
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
               </select>
             </p>
            
            <p><label>Gestion: </label></p>
             <p>
              <select 
                required
                className="dropdown"
                value={gestion}
                onChange={(e) =>{setGestion(e.currentTarget.value)
                console.log(e.currentTarget.value);}}>
                <option value="Undefined" defaultValue> Seleccionar gestion </option>
                  {gests.map(gest => (
                <option
                   key={gest.nombre} 
                   value={gest.nombre}
                >
                  {gest.nombre}
                </option>
                  ))}
              </select>
             </p>
            

            <p>
              <button
                //className="btn btn-dark"
                type="submit"
                disabled={!selectedFiles}
                onClick={upload}
              >
                  Cargar
              </button>
            </p>
                        
           </fieldset>
         </form>
         </div>

         <Pagination peticion={documento}/>

                  
   
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

