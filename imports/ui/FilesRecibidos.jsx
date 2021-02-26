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
import { DocumentRecibidosCollection } from '../db/ListsCollection';

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


export const UploadFilesRecibidos = () => {

  
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

  //CONTROL ADMIN INCIO
  const [rol,setRol] = useState(false);

  React.useEffect(() => {
    if(Roles.userIsInRole(Meteor.userId(),"admin")){
      console.log("Entro aqui");
      setRol(true);
    }
  });
  //CONTROL ADMIN FIN
  
  const { cats, docs, ofis, gests } = useTracker(() => {
        const handler = Meteor.subscribe('categorias');
        if(!handler.ready()) {
          console.log("no hay categorias");
        }
        const cats = CategoriasCollection.find().fetch();

        const handlerdocs = Meteor.subscribe('documentsrecibidos');
        if(!handlerdocs.ready()){
          console.log("No documents");
        }
        const docs = DocumentRecibidosCollection.find().count();


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


    UploadService.uploadfilerecibido(iden,nombre,type,currentFile,user._id, user.username , oficina ,docs+1, destino, gestion)
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

          rol ?(
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
                                <li><Link to="/FilesSend">Enviados</Link></li>
                                <li><Link to="/FilesRecibidosLista">Recibidos</Link></li>
                                <li><Link to="/OtrosDocumentos">Externos</Link></li>
                                <li><Link to="/TextEditor">Editor</Link></li>
                              <li><a>{user.username} 🚪</a><br/>
                                  <ul>
                                    <li onClick={logout}><a>Salir</a></li>
                                  </ul>
                                </li>
                              </ul>
                          </nav>
                  </div> 

<div className="menu_simple">
<ul>
  <li><Link to="/nuevacategoria">Referencia</Link></li>
</ul>
</div>

         <div className="container-formulario">
              <h1>&bull; Documentos recibidos &bull;</h1>

                    <div className="underline"></div>
                    <form className="formulario-enviar-doc">
                      <div>
                        <input
                          placeholder="Nombre del documento" 
                          type="text"
                          value={nombre}
                          onChange={(e) => setNombre(e.currentTarget.value)}
                        />
                      </div>
                      
                      <div>
                        <input type="file" onChange={(e) => selectFile(e)} />
                      </div> 

                      <div>
                        <select
                          required
                          className="subject"
                          value={oficina}
                          onChange={(e) =>{setOficina(e.currentTarget.value)
                          console.log(e.currentTarget.value);}}>
                          <option value="Undefined" defaultValue> SELECCIONAR SU UNIDAD</option>
                          <option
                            value={user.profile.oficina}
                          >
                            {user.profile.oficina}
                          </option>
                        </select> 
                      </div> <br/>

                      <div>
                      <select 
                          required
                          className="subject"
                          value={type}
                          onChange={(e) =>setType(e.currentTarget.value)}>
                          <option value="Undefined" defaultValue> SELECCIONAR REFERENCIA</option>
                            {cats.map(cat => (
                          <option
                            key={cat.code} 
                            value={cat.code}
                          >
                            {cat.categoria}    ({cat.code})
                          </option>
                            ))}
                        </select> 
                      </div> <br/>

                      <div>
                      <select 
                          required
                          className="dropdown"
                          value={destino}
                          onChange={(e) =>{setDestino(e.currentTarget.value)
                          console.log(e.currentTarget.value);}}>
                          <option value="Undefined" defaultValue> SELECCIONAR UNIDAD DE ORIGEN</option>
                              {ofis.map(ofi => (
                          <option
                              key={ofi.oficinanombre} 
                              value={ofi.oficinanombre}
                          >
                              {ofi.oficinanombre}///{ofi.oficinacode}
                          </option>
                              ))}
                          </select>
                      </div> <br/>

                      <div>
                          <select 
                            required
                            className="subject"
                            value={gestion}
                            onChange={(e) =>{setGestion(e.currentTarget.value)
                            console.log(e.currentTarget.value);}}>
                            <option value="Undefined" defaultValue> SELECCIONAR GESTIÓN </option>
                              {gests.map(gest => (
                            <option
                              key={gest.nombre} 
                              value={gest.nombre}
                            >
                              {gest.nombre}
                            </option>
                              ))}
                          </select>
                      </div> <br/>

                      <div>
                        <button
                          //className="btn btn-dark"
                          className="boton-formulario"
                          type="submit"
                          disabled={!selectedFiles}
                          onClick={upload}
                        >
                            Cargar
                        </button>
                      </div>

                    </form> 
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

