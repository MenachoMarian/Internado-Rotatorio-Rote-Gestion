
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ListsCollection } from '../db/ListsCollection';
import { List } from './List';
import { DocForm } from './DocForm';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";



import '../styles/Styles.css';
import imagenes from '../images/imagenes'


const deleteTask = ({_id}) => ListsCollection.remove(_id);


export const App = () => {

  

  const lists = useTracker(() => ListsCollection.find({}, { sort: { createdAt: -1 } }).fetch());

return (
  <div>
    

    <div className="Body">
      <div className="hero">
        
          <img className="hero-logo" src={imagenes[0].img} alt="UATF"/>
          <h1 className ="hero-text">Universidad Autónoma Tomás Frías</h1>
            <nav className="menu">
              <ol>
                <li>
                  <Link to="/RegisterUserForm">Registrarse</Link>
                </li>
                <li>
                  <Link to="/DocumentoForm">Insertar Doc</Link>
                </li>
              </ol>
            </nav>
      </div>


      <div  className="contenido">
          
     
        
      
          <div className="lista-doc">
                {lists.map(list => <List  
                key={list._id} 
                list={list}
                onDeleteClick={deleteTask}/> )}
          </div>

      </div>

    </div>
    
  </div>
  );
};
