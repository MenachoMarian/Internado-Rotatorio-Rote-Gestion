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
import { ExternosPaginacion } from './ExternosPaginacion';


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

  //CONTROL ADMIN
  const [rol,setRol] = useState(false);

  React.useEffect(() => {
    if(Roles.userIsInRole(Meteor.userId(),"admin")){
      console.log("Entro aqui");
      setRol(true);
    }
  });
  //CONTROL ADMIN
  
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

        rol?(
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
                    ENVIO DOCUMENTOS UNIDADES EXTERNAS <br/>
                        <b>Oficina: </b> {user.profile.oficina}
                  </h2>
              <div className="insert-doc">
                <form className="doc-form" >
                  
                <fieldset>
                  <p><label>Unidad: </label></p>
                  <p>
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

                  <p><label>Nombre del documento:</label></p>
                  <p>
                     <input 
                      required
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.currentTarget.value)}
                     />
                  </p>

                  <p><label> Tipo de documento: </label></p>
                  <p>
                     <select 
                       required
                       className="select-box"
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
                    </select><br/>
                    <button 
                      className="btn btn-dark" >
                      <Link to="/nuevacategoria">Agregar categoria</Link>
                  </button> 
                  </p>

                  <p><label>Documento: </label></p>
                  <p>
                    <input type="file" onChange={(e)=>selectFile(e)} />
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

          

                </div> <br/>

                <div className="titulo-tabla">

                    <h2>Documentos enviados</h2>
                </div>

                {docuserr.map(doc => (
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
            ) )
          
        ) : (
          <App/>
        )}
        
    </div>
  );
};