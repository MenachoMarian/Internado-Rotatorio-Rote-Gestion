
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState, Fragment} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { UsersCollection } from '../db/ListsCollection';
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
import { Nav } from './Navbar';
import {Home} from './Home';
import { App } from './App';

export const RegisterUserForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const user = useTracker(() => Meteor.user());
    //const [email, setEmail]=useState("");

    const handleSubmit = e => {
        e.preventDefault();

                Accounts.createUser({
                    username: username,
                    password: password,
                });

        setUsername("");
        setPassword("");    
        history.push("/Home");
    };

return (
    <div>
          {user ? (
          <Fragment>
            <App/>
          </Fragment>
        ) : (
        <div className="Body">
            <div className="hero">
                <Nav/>
            </div>
            <div className="contenido"> 

                <form className="form-register" onSubmit={handleSubmit}>
                <h4>Registro:</h4> <br/>
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
                        Registrarse   
                        </button>
                </form>
            </div>
        </div>
        )}

        
    </div> 
        
    );
};