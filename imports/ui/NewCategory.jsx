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

 //CONTROL ADMINISTRADOR INICIO
 const [rol,setRol] = useState(false);

  React.useEffect(() => {
    if(Roles.userIsInRole(Meteor.userId(),"admin")){
      console.log("Entro aqui");
      setRol(true);
    }
  });
 //CONTROL ADMINISTRADOR FIN

  
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
          {rol ?(
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
          )}
        </div>

      <div className="container-formulario">
              <h1>&bull; Agregar referencia &bull;</h1>
                    <div className="underline"></div>
                    <form className="formulario-enviar-doc" onSubmit={handleSubmit}>
                      <div>
                      <input 
                        placeholder="NOMBRE REFERENCIA"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                      </div>   

                      <div>
                        <input 
                          placeholder="CODIGO DE REFERENCIA"
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>

                      <div>
                          <button
                            className="boton-formulario"
                            type="submit" >
                              Enviar
                          </button> 
              
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