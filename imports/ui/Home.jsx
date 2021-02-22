
import React, { useState } from 'react';
import { Fragment } from 'react';
import { useTracker, useEffect } from 'meteor/react-meteor-data';
import { ListsCollection } from '../db/ListsCollection';
import { List } from './List';
import {Nav} from '../ui/Navbar';
import { DocForm } from './DocForm';
import { LoginForm } from './LoginForm';
import {App} from './App';
import {UIADMIN} from './UIADMIN'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import { UsersCollection } from '../db/ListsCollection';
import UploadService from "../services/FileUploadService";

import '../styles/Styles.css';
import imagenes from '../images/imagenes'



//const deleteTask = ({_id}) => ListsCollection.remove(_id);


export const Home = () => {

  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();
  const [rol,setRol] = useState(false);

  console.log(user);
  console.log(userId);

  /*const docs = useTracker(() => {
    return Meteor.subscribe('roles');
});*/
  

  React.useEffect(() => {
    if(Roles.userIsInRole(Meteor.userId(),"admin")){
      console.log("Entro aqui");
      setRol(true);
    }
  });
  

return (
  <div>

      {user ? (

rol?(
          <UIADMIN/>
        ):(

        <Fragment>
      <div className="Body">
        <div className="hero">
          <Nav/>
          {user.profile.oficina == "SECRETARIA INGENIERIA DE SISTEMAS" ? (
            <Fragment>
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
            </Fragment>   

          ) : (
              <Fragment>
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
            </Fragment>  
          )}
        </div>

      <div  className="contenido">   
          <div className="lista-doc">
                <h1>Holi</h1>
          </div>
      </div>
    </div>
        </Fragment>  )
        
        
        
        ) : (
              <App /> 
        )}
  
  </div>
  );
};
