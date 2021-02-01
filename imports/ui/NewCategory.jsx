import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import {Nav} from '../ui/Navbar';
import {App} from './App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { useHistory } from "react-router-dom";

import UploadService from "../services/FileUploadService";

import '../styles/Styles.css';


export const NewCategory = () => {

    const [nombre, setNombre] = useState("");
    const [code, setCode] = useState("");
    const history = useHistory();

  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  console.log(user);
 // const lists = useTracker(() => ListsCollection.find({},{ fields: { _id: 1 }}, { sort: { createdAt: 1 } }).fetch());

  
 const handleSubmit = () => {


    if( !nombre ) return;
    if( !code ) return;

    UploadService.insertcategoria(nombre,code)
    .then(response => {
        
    }).catch(() => {
      
        setName("");
        setCode("");
    });
    

    setName("");
    setCode("");
    history.push("/UploadFile");
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
                    <Link to="/UploadFile">Insertar Doc</Link>
                  </li>
                </ol>
              </nav>
        </div>
      <div className="user" onClick={logout}>
            {user.username} 🚪
      </div>
      <div  className="contenido">   
      <form className="doc-form" onSubmit={handleSubmit}>
              Nombre categoria:
                <input 
                 type="text"
                 value={nombre}
                 onChange={(e) => setNombre(e.target.value)}
                /><br/><br/>
              Código categoria:
                <input 
                 type="text"
                 value={code}
                 onChange={(e) => setCode(e.target.value)}
                /><br/><br/>

                <div align="right">
                    <button className="btn btn-dark">
                        Enviar
                    </button>  
                    <button className="btn btn-dark">
                        <Link to="/UploadFile">Cancelar</Link>
                    </button> <br/>   

                </div>
              
              </form>
      </div>
    </div>
        </Fragment>    
        ) : (
              <App /> 
        )}
  
  </div>
  );
};