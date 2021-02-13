import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import {Nav} from '../ui/Navbar';
import {App} from './App';
import {UIADMIN} from './UIADMIN'

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
  const userId = useTracker(() => Meteor.userId());
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
    history.push("/Home");
};
 

return (
  <div>

      {user ? (

        <Fragment>
      <div className="Body">
        <div className="hero">
          <Nav/>
          {userId == "q3w3ELFTmkPApjQez" ?(
            <nav className="menu">
            <ul>
              <li><Link to="/Home">Home</Link></li>
              <li><a>{user.username} 🚪</a><br/>
                <ul>
                   <li onClick={logout}><a>Salir</a></li>
                </ul>
              </li>
            </ul>
          </nav>
          ):(
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
          )}
        </div>
      
      <div  className="contenido">  
       <div className="insert-doc">
        <form className="doc-form" onSubmit={handleSubmit}>

         <h2> REGISTRO: NUEVA CATEGORIA </h2> 

          <fieldset>
            <p><label>Nombre categoria:</label></p>
            <p>
              <input 
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </p>


            <p><label>Código categoria:</label></p>
            <p>
              <input 
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </p>

            <p>
              <button
                type="submit" >
                  Enviar
              </button>  
            </p>

            <p>
              <button 
              type="submit">
                  <Link to="/UploadFile">Cancelar</Link>
              </button> 
            </p> 
          </fieldset>

                </form>
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