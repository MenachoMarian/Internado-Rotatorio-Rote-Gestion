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


export const NewUnidad = () => {

 const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();

    const[oficinanombre, setOficinanombre] = useState("");
    const[oficinacode, setOficinacode] = useState("");
    const[oficinadescri, setOficinadescri] = useState("");
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
        UploadService.uploadunidad(oficinanombre,oficinacode,oficinadescri)
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
              <h1>&bull; Agregar UNIDAD &bull;</h1>
                    <div className="underline"></div>
                    <form className="formulario-enviar-doc">
                      <div>
                        <input
                          placeholder="NOMBRE DE UNIDAD" 
                          required
                          type="text"
                          value={oficinanombre}
                          onChange={(e) => setOficinanombre(e.currentTarget.value)}
                        />
                      </div>   

                      <div>
                        <input 
                          placeholder="CODIGO DE UNIDAD EJ: DECANATURA -> DCN"
                          required
                          type="text"
                          value={oficinacode}
                          onChange={(e) => setOficinacode(e.currentTarget.value)}
                        /> 
                      </div>

                      <div>
                      <input 
                        placeholder="DESCRIPCION DE LA UNIDAD"
                        required
                        type="text"
                        value={oficinadescri}
                        onChange={(e) => setOficinadescri(e.currentTarget.value)}
                       /> 
                      </div> 
                      <div>
                          <button
                                //className="btn btn-dark"
                                className="boton-formulario"
                                type="submit"
                                disabled={!oficinanombre, !oficinacode, !oficinadescri}
                                onClick={upload}
                            >
                                Cargar
                            </button>
                      </div>

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