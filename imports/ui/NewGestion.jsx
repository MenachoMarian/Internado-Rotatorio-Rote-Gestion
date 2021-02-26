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
  import { useHistory } from "react-router-dom";

import '../styles/Styles.css';
import imagenes from '../images/imagenes'
import { Button, Popover, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';

import { Nav } from "./Navbar";
import { App } from './App';
import { Home } from './Home';
import {UIADMIN} from './UIADMIN'
import { ExternosPaginacion } from './ExternosPaginacion';


export const NewGestion= () => {

 const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();

    const[gestionnombre, setGestionnombre] = useState("");
    const[gestiondescri, setGestiondescri] = useState("");
    const history = useHistory();

 //CONTROL ADMINISTRADOR INICIO
 const [rol,setRol] = useState(false);

 React.useEffect(() => {
   if(Roles.userIsInRole(Meteor.userId(),"admin")){
     console.log("Entro aqui");
     setRol(true);
   }
 });
//CONTROL ADMINISTRADOR FIN

    const upload = () => {
        UploadService.uploadgestion(gestionnombre,gestiondescri)
        .then(response => {
            console.log(response.data);
            history.push("/Home");
        })
    }

  return (
    <div>
        {user ? (
            rol ?(
            <div className="Body">
                <div className="hero">
                    <Nav/>
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
                </div>

                
          <div className="container-formulario">
              <h1>&bull; Agregar Gestion &bull;</h1>
                    <div className="underline"></div>
                    <form className="formulario-enviar-doc">
                      <div>
                          <input 
                          placeholder="EJ: 01/2020"
                            required
                            type="text"
                            value={gestionnombre}
                            onChange={(e) => setGestionnombre(e.currentTarget.value)}
                          />
                      </div>   

                      <div>
                          <input 
                            placeholder="DESCRIPCIÓN"
                            required
                            type="text"
                            value={gestiondescri}
                            onChange={(e) => setGestiondescri(e.currentTarget.value)}
                          />
                      </div>

                      <div>
                          <button
                                //className="btn btn-dark"
                                className="boton-formulario"
                                type="submit"
                                disabled={!gestionnombre, !gestiondescri}
                                onClick={upload}
                            >
                                Enviar
                            </button> 
                      </div> <br/>

                      <h4>La ultima gestion registrada será la que figure en los documentos</h4>

                    </form>
              </div>
            </div>
            ):(
            <Fragment>
                <Home/>
            </Fragment>    
            )
        ) : (
          <App /> 
        )}
        
    </div>
  );
};