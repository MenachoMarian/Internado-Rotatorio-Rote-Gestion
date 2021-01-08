import React, { useState } from 'react';
import { ListsCollection } from '../db/ListsCollection';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";

import '../styles/Styles.css';
import imagenes from '../images/imagenes'


export const DocumentoForm = () => {
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [type, setType] = useState("");

    
    const handleSubmit = e => {

        e.preventDefault();

        if( !selectedFile ) return;

        ListsCollection.insert({

            //file: file.trim(),
            name: name,
            file: selectedFile,
            tipodoc: type,
            createdAt: new Date()
        });

        setName("");
        setSelectedFile("");
        setType("");
    };

    return (
        <div className="Body">

            <div className="hero">
                <img className="hero-logo" src={imagenes[0].img} alt="UATF"/>
                <h1 className ="hero-text">Universidad Autónoma Tomás Frías</h1>
                <nav className="menu">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="contenido">
                <div className="botones-insert" >

                    <form className="doc-form" onSubmit={handleSubmit}>
                        Nombre del documento:
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /><br/><br/>
                        <input 
                            type="file"
                            value={selectedFile}
                            onChange={(e) => setSelectedFile(e.target.value)}
                        /> <br/> <br/>
                        Tipo de documento: 
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}>
                            <option 
                                value="carta">Carta</option>
                            <option value="circular">Circular</option>
                            <option value="reporte">Reporte</option>
                        </select > <br/> <br/>
                        <button 
                            type="submit" 
                            className="btn btn-dark">
                                Insertar
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
    )
};