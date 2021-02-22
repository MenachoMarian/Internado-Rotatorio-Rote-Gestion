import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import  { Home } from '../ui/Home';
import { LoginForm } from '../ui/LoginForm';
import { Nav } from './Navbar';
import {UIADMIN} from './UIADMIN'

import { useHistory } from "react-router-dom";

import '../styles/main.css'
import '../styles/Styles.css'

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  const userId = useTracker(() => Meteor.userId());
  console.log(Meteor.users.find(user).fetch());

  const [rol,setRol] = useState(false);

  React.useEffect(() => {
    if(Roles.userIsInRole(Meteor.userId(),"admin")){
      console.log("Entro aqui");
      setRol(true);
    }
  });
  
  return (
    <div className="Body">
      
      {user ? (
         rol ?(
          <UIADMIN/>
        ):(
          <Fragment>
            <Home/>
          </Fragment>    
        )
        ) : (
          <LoginForm /> 
        )}
    </div>
  )
};


/*import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { UsersCollection } from '../db/ListsCollection';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";

//import {LoginForm} from '../ui/LoginForm';
import {Home} from '../ui/Home';
import {Nav} from '../ui/Navbar';
import { UploadFiles} from '../ui/FileUpload';



import '../styles/Styles.css';
import imagenes from '../images/imagenes'
import { useState } from 'react/cjs/react.development';


export const App = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

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
            setError(false); 
            return;

        }

        if(array.usuario === username && array.contraseña === password) {
            console.log("Login exitoso");
            window.alert("Login exitoso ");
            setError(true);
            return;
        }
        else{
            if(array.usuario === username){
                window.alert("Credenciales incorrectas");
                setError(false);
                return;
            }
        }
        setUsername("");
        setPassword("");    
        //setEmail("");  
    };

    let componente;
    if(error){
        componente= <Home />
    }
    else{
        componente= <div>
            <div className="hero">

            <Nav/>
            <nav className="menu">
              <ol>
                <li>
                  <Link to="/RegisterUserForm">Registrarse</Link>
                </li>
              </ol>
            </nav>
            </div>
            <div className="contenido">

            <form className="form-register" onSubmit={handleSubmit}>
                <h4>Iniciar sesión: </h4> <br/>
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
            
    }


return (
  <div>
    

    <div className="Body">
     

             {componente}   

    </div>
    
  </div>
  );
};*/

