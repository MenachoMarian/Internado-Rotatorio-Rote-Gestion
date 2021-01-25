import { Meteor } from 'meteor/meteor';
import React, { useState, useTracker } from 'react';
import { Fragment } from 'react';
import {Nav} from './Navbar'
import {App } from './App';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";

import '../styles/Styles.css';
import '../styles/main.css';
import { Home } from './Home';

export const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ stateuser, setEstateuser] = useState(0);
 // const user = useTracker(() => Meteor.user());
 const submit = e => {
   e.preventDefault();

   Meteor.loginWithPassword(username, password);

   setPassword('');
   setUsername('');
 };
  

  return (
    <div className="Body">
            <div className="hero">
            <Nav/>
                <nav className="menu">
                  <ol>
                    <li>
                      <Link to="RegisterUserForm">Registro</Link>   
                    </li>
                  </ol>
                </nav>
          </div>
          <div className="contenido">
              <form onSubmit={submit} className="form-register">
              <h4> Iniciar sesión</h4>
              <label htmlFor="username">Username</label>
  
              <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                  onChange={e => setUsername(e.target.value)}
              />
  
              <label htmlFor="password">Password</label>
  
              <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={e => setPassword(e.target.value)}
              /> <br/>
  
              <button type="submit">Log In</button>
              </form>
          </div>
            
        </div>
  );         

};


/*import React, { useState} from 'react';

import { UsersCollection } from '../db/ListsCollection';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";
  

  
  import '../styles/Styles.css';
  import imagenes from '../images/imagenes'

export const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [email, setEmail]=useState("");
    //const array = [UsersCollection.find().fetch()];

    const handleSubmit = e => {
        e.preventDefault();

        const array = UsersCollection.findOne({ usuario: username });
        //console.log(array);

        if(!username) return;
        if(!password) return;

        if (!array)
        {
            window.alert("Credenciales inexistentes, por favor registre sus datos antes de iniciar sesión");
            setUsername("");
            setPassword("");    
            return;

        }

        if(array.usuario === username && array.contraseña === password) {
            console.log("Login exitoso");
            window.alert("Login exitoso ");
            return;
        }
        else{
            if(array.usuario === username){
                window.alert("Credenciales incorrectas");
                return;
            }
        }
        setUsername("");
        setPassword("");    
        //setEmail("");  
    };



return (
    <div className="Body">
        
        <div className="contenido">

            <form className="form-register" onSubmit={handleSubmit}>
                Nombre de usuario:<input 
                type="text"
                placeholder="Nombre de usuario"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                /> <br/>
                Contraseña:<input 
                type="password"
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                /> <br/>

                    <button
                    type="submit"
                    className="btn btn-dark" 
                    > 
                    Iniciar Sesión   
                    </button>
            </form>
        </div>
    </div>
        
    );
};*/