
import React from 'react';
import { Fragment } from 'react';
import { useTracker, useState } from 'meteor/react-meteor-data';

import {Nav} from '../ui/Navbar';
import {App} from './App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import moment from 'moment';



import '../styles/Styles.css';
import imagenes from '../images/imagenes'
import { CategoriasCollection, DocumentsCollection, GestionCollection, OficinasCollection, OtrosDocumentos } from '../db/ListsCollection';
import { Home } from './Home';



export const UIADMIN = () => {

  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());
  const logout = () => Meteor.logout();
  const [rol,setRol] = React.useState(false);
  console.log(user);

  React.useEffect(() => {
    if(Roles.userIsInRole(Meteor.userId(),"admin")){
      console.log("Entro aqui");
      setRol(true);
    }
  });

  const { users, cats, ofis, gests, docs, docsEX} = useTracker(() => {

    //USERS
    const handlerusers = Meteor.subscribe('users');
    if(!handlerusers.ready()) {
      console.log("no hay usuarios");
    }
    const users = Meteor.users.find({},{sort: {_id:-1}}).fetch();

    //CATEGORIAS
    const handlercats = Meteor.subscribe('categorias');
    if(!handlercats.ready()) {
      console.log("no hay categorias");
    }
    const cats = CategoriasCollection.find({},{sort: {_id:-1}}).fetch();

    //OFICINAS
    const handlerofis = Meteor.subscribe('oficinas');
    if(!handlerofis.ready()) {
      console.log("no hay oficinas");
    }
    const ofis = OficinasCollection.find({},{sort: {_id:-1}}).fetch();

    //GESTIONES
    const handlergests = Meteor.subscribe('gestiones');
    if(!handlergests.ready()) {
      console.log("no hay gestiones");
    }
    const gests = GestionCollection.find({},{sort: {_id:-1}}).fetch();

    //DOCUEMNTOS ENVIADOS DESDE SECRETARIA
    const handlerdocs = Meteor.subscribe('documents');
    if(!handlerdocs.ready()){
      console.log("No documents");
    }
    const docs = DocumentsCollection.find({},{sort: {_id:-1}}).fetch();

    //DOCUMENTOS RECIBIDOS DESDE UNIDADES EXTERNAS
    const handlerdocsEX = Meteor.subscribe('otrosdocumentos');
        if(!handlerdocsEX.ready()){
          console.log("No documents");
        }
        const docsEX = OtrosDocumentos.find({},{sort: {_id:-1}}).fetch();

    return {users, cats, ofis, gests, docs, docsEX};
});
  


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
            <div className="menu">
                <ul>
                    <li><a href="#Usuarios">Usuarios</a></li>
                    <li><a href="#Categorias">Referencias</a></li>
                    <li><a href="#Unidades">Unidades</a></li>
                    <li><a href="#Gestiones">Gestiones</a></li>
                    <li><a href="#DocSecretaria">Enviados</a></li>
                    <li><a href="#DocExternos">Recibidos</a></li>        
                </ul>
            </div>
            <div className="contenido">
                <section id="Usuarios">
                    <h2>Usuarios</h2>
                    <table className="table" >
                        <thead >
                        <tr>
                            <th>Usuario</th>
                            <th>Oficina</th>
                            <th>Fecha de registro</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.map(doc => (
                            <tr key={doc._id}>
                                <th>{doc.username}</th>
                                <th>{doc.profile.oficina}</th>
                                <th>{moment(doc.createdAt).format('DD-MM-YYYY HH:mm:ss')}</th>
                                
                            </tr>
                            ))}
                        </tbody>
                        </table>
                
                </section>
            </div>
    
            <div className="contenido">
                <section id="Categorias">
                    <h2>Referencias</h2>
                    <table className="table" >
                        <thead >
                        <tr>
                            <th>Categoria</th>
                            <th>Código</th>
                            <th>Fecha de registro</th>
                        </tr>
                        </thead>
                        <tbody>
                            {cats.map(doc => (
                            <tr key={doc._id}>
                                <th>{doc.categoria}</th>
                                <th>{doc.code}</th>
                                <th>{moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</th>
                                
                            </tr>
                            ))}
                            
                                <button className="btn-primary">
                                    <Link to="/nuevacategoria">Agregar</Link>
                                </button>
                            
                        </tbody>
                        </table>
                
                </section>
            </div>
    
            <div className="contenido">
                <section id="Unidades">
                    <h2>Unidades</h2>
                    <table className="table" >
                        <thead >
                        <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Fecha de registro</th>
                        </tr>
                        </thead>
                        <tbody>
                            {ofis.map(doc => (
                            <tr key={doc._id}>
                                <th>{doc.oficinanombre}</th>
                                <th>{doc.oficinacode}</th>
                                <th>{moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</th>
                                
                            </tr>
                            ))}
                            
                            <button className="btn-primary">
                                    <Link to="/NewUnidad">Agregar</Link>
                            </button>
                            
                        </tbody>
                        </table>
                
                </section>
            </div>
    
            <div className="contenido">
                <section id="Gestiones">
                    <h2>Gestiones</h2>
                    <table className="table" >
                        <thead >
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha de registro</th>
                        </tr>
                        </thead>
                        <tbody>
                            {gests.map(doc => (
                            <tr key={doc._id}>
                                <th>{doc.nombre}</th>
                                <th>{doc.descripcion}</th>
                                <th>{moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</th>
                                
                            </tr>
                            ))}
                             <button className="btn-primary">
                                    <Link to="/NewGestion">Agregar</Link>
                             </button>
                        </tbody>
                        </table>
                
                </section>
            </div>
    
            <div className="contenido">
                <section id="DocSecretaria">
                    <h2>Documentos enviados desde secretaria</h2>
                    <table className="table" >
                        <thead >
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Destino</th>
                            <th>Gestión</th>
                            <th>Documento</th>
                            <th>Fecha de envio</th>
                        </tr>
                        </thead>
                        <tbody>
                            {docs.map(doc => (
                            <tr key={doc._id}>
                                <th>{doc.nombre}</th>
                                <th>{doc.categoria}</th>
                                <th>{doc.destino}</th>
                                <th>{doc.gestion}</th>
                                <th><a href={doc.link}>{doc.picture}</a></th>
                                <th>{moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</th>
                                
                            </tr>
                            ))}
                        </tbody>
                        </table>
                
                </section>
            </div>
    
            <div className="contenido">
                <section id="DocExternos">
                    <h2>Documentos recibidos de unidades externas</h2>
                    <table className="table" >
                        <thead >
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Oficina</th>
                            <th>Usuario</th>
                            <th>Documento</th>
                            <th>Fecha de envio</th>
                        </tr>
                        </thead>
                        <tbody>
                            {docsEX.map(doc => (
                            <tr key={doc._id}>
                                <th>{doc.nombre}</th>
                                <th>{doc.categoria}</th>
                                <th>{doc.useroficina}</th>
                                <th>{doc.usernombre}</th>
                                <th><a href={doc.link}>{doc.picture}</a></th>
                                <th>{moment(doc.register).format('DD-MM-YYYY HH:mm:ss')}</th>
                                
                            </tr>
                            ))}
                        </tbody>
                        </table>
                
                </section>
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