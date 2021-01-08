import React, { useState} from 'react';
import { UsersCollection } from '../db/UsersCollection';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";
  
  
  
  import '../styles/Styles.css';
  import imagenes from '../images/imagenes'

export const RegisterUserForm = () => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    //const [email, setEmail]=useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if(!user) return;
        if(!password) return;
       // if(!email) return;

        if(!UsersCollection.find(user)){

            UsersCollection.insert({
                usuario: user,
                contraseña: password,
                //correo: email,
                createAt: new Date()
            });
        }
        else {
            console.log("Usuario ya existe");
            //prompt('Usuario ya existe');
            
        }

        
        setUser("");
        setPassword("");
        //setEmail("");  
    };


return (
    <div className="Body">
        <div className="hero">
            <img className="hero-logo" src={imagenes[0].img} alt="UATF"/>
            <h1 className ="hero-text">Universidad Autónoma Tomás Frías</h1>
            <nav className="menu">
                <ol>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ol>
            </nav>
        </div>
        <div className="contenido">

            <form className="form-register" onSubmit={handleSubmit}>
                Nombre de usuario:<input 
                type="text"
                placeholder="Nombre de usuario"
                value={user} 
                onChange={(e) => setUser(e.target.value)} 
                /> <br/>
                Contraseña:<input 
                type="password"
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                />
                
                <button
                    type="submit"
                    className="btn btn-dark" 
                    >
                        Registrarse
                    </button>
            </form>
        </div>
    </div>
        
    );
};