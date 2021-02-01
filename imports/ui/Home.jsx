
import React from 'react';
import { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ListsCollection } from '../db/ListsCollection';
import { List } from './List';
import {Nav} from '../ui/Navbar';
import { DocForm } from './DocForm';
import { LoginForm } from './LoginForm';
import {App} from './App';

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
  const logout = () => Meteor.logout();

  console.log(user);
 // const lists = useTracker(() => ListsCollection.find({},{ fields: { _id: 1 }}, { sort: { createdAt: 1 } }).fetch());
 

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
                    <Link to="/UploadFile">Insertar Doc</Link>
                    <Link to="/TextEditor">Redactar Doc</Link>
                  </li>
                </ol>
              </nav>
        </div>
      <div className="user" onClick={logout}>
            {user.username} 🚪
      </div>
      <div  className="contenido">   
          <div className="lista-doc">
                <h1>Holi</h1>
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
