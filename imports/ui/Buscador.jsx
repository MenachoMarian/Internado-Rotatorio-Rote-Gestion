import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker, useEffect } from 'meteor/react-meteor-data';
import  { Home } from './Home';
import { LoginForm } from './LoginForm';
import { Nav } from './Navbar';

import { useHistory } from "react-router-dom";

import UploadService from "../services/FileUploadService";

import '../styles/main.css'
import '../styles/Styles.css'

export const Buscador = () => {

  const [documento, setDocumento] = useState([]);
  const [documentoBackup, setDocumentoBackup] = useState([]);
  const [textBuscar, setTextBuscar] = useState("");

  React.useEffect(() => {

    UploadService.getFiles().then((response) => {
      setDocumento(response.data);
      setDocumentoBackup(response.data);
      //console.log(response.data); 

    });
  }, []);

  const filter =(event)=>{
    console.log(event.target.value);
    //OBTENER DATOS DE INPUT
    var text = event.target.value
    //OBTENER DATOS DE ARRAY BACKUP
    const data = documentoBackup

    const newData = data.filter(function(item){
      //VARIABLE nombre DEL DOCUMENTO
      const itemNombre = item.nombre.toUpperCase()
      //VARIABLE DEL DOCUMENTO MISMO
      const itemPicture = item.picture.toUpperCase()
      //VARIABLE DESTINO DEL DOCUMENTO
      const itemDestino = item.destino.toUpperCase()
      //  Juntamos los campos anteriores, para buscar todo
      const itemData = itemNombre+" "+itemPicture+" "+itemDestino
      //VARIABLE DEL INPUT BUSCAR
      const textData = text.toUpperCase()
      //FILTRAR SI ES VERDADERO O FALSO Y LO DEVUELVE
      return itemData.indexOf(textData) > -1
    })

    setDocumento(newData)
    setTextBuscar(text)


  }
 
  //console.log(documento);
  //console.log(documentoBackup);
  
  return (
    <div >
      
      <h1>Holi</h1>
      <input 
        placeholder="Buscar" 
        className="form-control"
        value={textBuscar}
        onChange={(e) =>{setTextBuscar(e.currentTarget.value)
          filter(e);}}
        />


      <table className="table table-bordered order-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Archivo</th>
            <th>Destinatario</th>
          </tr>
        </thead>
        
        
          <tbody>

            {documento.map(doc => (
            <tr key={doc._id}>
              <th>{doc.nombre}</th>
              <th><a href={doc.link}>{doc.picture}</a></th>
              <th>{doc.destino}</th>
            </tr>
             ))}

          </tbody>
       
        
      </table>


    </div>
  )
};