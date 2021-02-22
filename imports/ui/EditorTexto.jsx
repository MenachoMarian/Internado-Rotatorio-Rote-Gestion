import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import React, { useState, Fragment, Children } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from "react-router-dom";

//para el Editor
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";


//para el editor

import parse from 'html-react-parser'
import ReactHtmlParser from 'react-html-parser';

import {Nav} from './Navbar';
import { App } from './App';
import {UIADMIN} from './UIADMIN'

import UploadService from "../services/FileUploadService";
import {TextosCollection} from "../db/ListsCollection"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";

import '../../client/main.css';
import '../styles/Styles.css';






export const EditorTexto = () => {

  

  
  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();

  const [nombre, setNombre] = useState("");
  const [type, setType] = useState("");
  //const [iden, setIden] = useState("");

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  
  const [text, setText]=useState("");

  //CONTROL PARA ADMIN
  const [rol,setRol] = useState(false);

  React.useEffect(() => {
    if(Roles.userIsInRole(Meteor.userId(),"admin")){
      console.log("Entro aqui");
      setRol(true);
    }
  });
//CONTROL PARA ADMIN
  

  const imprimir = (event,editor) => {
    
    console.log(text);

  }
 

  const handleSubmit = () => {
    //console.log(text);
   
    UploadService.uploadtext(nombre,text)
    .then(response => {
      console.log(response);
      
    }).catch(() => {
      
      setCurrentFile(undefined);
    });


    setNombre("");
    setType("");
    setText("");
    


  }
  
  return (
    <div>

    {user ? (

      rol ?(
        <UIADMIN/>
      ):(
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
          <form className="doc-form" onSubmit={handleSubmit}>
              Nombre del documento:
                <input 
                 type="text"
                 value={nombre}
                 onChange={(e) => setNombre(e.target.value)}
                /><br/><br/>
              Tipo de documento: 
                <select
                 value={type}
                 onChange={(e) => setType(e.target.value)}>
                    <option value="carta">Carta</option>
                    <option value="circular">Circular</option>
                    <option value="reporte">Reporte</option>
                </select >

                <CKEditor
                        editor={ClassicEditor}
                        
                        data={text}
                        onChange={(event,editor) => {
                          const data = editor.getData();
                          setText(data);
                          imprimir();
                      }}
                    />


                    <button className="btn btn-dark">
                        Cargar
                    </button> <br/>   
              </form>

            <div>
              <h2>Contenido:</h2>
              <p>{parse(text)}</p>
            </div>

            
        </div>
    </div>
   
      </Fragment>    )
      ) : (
            <App /> 
      )}

</div>
      
  )
};