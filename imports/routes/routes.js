import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { App } from '../ui/App';
import { Home } from '../ui/Home';
import { RegisterUserForm } from '../ui/RegisterUserForm';
import { DocumentoForm } from '../ui/DocForm';
import { LoginForm } from "../ui/LoginForm";
import {UploadFiles} from "../ui/FileUpload";
import { List } from '../ui/List';
import {EditorTexto} from '../ui/EditorTexto';
import {NewCategory} from '../ui/NewCategory';
import {Uploadotherfiles} from '../ui/Uploadotherfiles';
import {ExternosRecepcion} from '../ui/ExternosRecepcion';
import {ExternosEnvio} from '../ui/ExternosEnvio';
import {Buscador} from '../ui/Buscador';
import {Categoriafiltrar} from '../ui/filtrarCategoria';
import {Origenfiltrar} from '../ui/filtrarOrigen';
import {NewUnidad} from '../ui/NewUnidad';
import {NewGestion} from '../ui/NewGestion';
import {Camera} from '../ui/Camera';
import {FilesSend} from '../ui/FilesSend';
import {UploadFilesRecibidos} from '../ui/FilesRecibidos';
import {FilesRecibidosLista} from '../ui/FileRecibidosLista';
import {BuscadorRecibidos} from '../ui/BuscadorRecibidos';
import {Pagination} from '../ui/Pagination';

import {Scanner} from '../ui/Scanner';

import {Editornuevo} from '../ui/nuevoeditor';


/*function Aqui() {
    return (
        <Router>
            <Route path='/'>
                <App/>
            </Route>
        </Router>
        
    );
}

export default Aqui;*/

export const Rutas = () => {
  
  return (
    <div>
        <Router>
            <Route exact path="/">
                <App/>
            </Route>
            <Route exact path="/Home">
                <Home/>
            </Route>
            <Route exact path="/RegisterUserForm">
                <RegisterUserForm/>
            </Route>
            
            <Route exact path="/UploadFile">
                <UploadFiles/>
            </Route>
            <Route exact path="/LoginForm">
                <LoginForm/>
            </Route>
            <Route exact path="/TextEditor">
                <EditorTexto/>
            </Route>
            <Route exact path="/NuevaCategoria">
                <NewCategory/>
            </Route>
            <Route exact path="/OtrosDocumentos">
                <Uploadotherfiles/>
            </Route>
            <Route exact path="/ExternosRecepcion">
                <ExternosRecepcion/>
            </Route>
            <Route exact path="/ExternosEnvio">
                <ExternosEnvio/>
            </Route>
            <Route exact path="/Buscador">
                <Buscador/>
            </Route>
            <Route exact path="/filtrarCategoria">
                <Categoriafiltrar/>
            </Route>
            <Route exact path="/filtrarOrigen">
                <Origenfiltrar/>
            </Route>
            <Route exact path="/NewUnidad">
                <NewUnidad/>
            </Route>
            <Route exact path="/NewGestion">
                <NewGestion/>
            </Route>
            <Route exact path="/Camera">
                <Camera/>
            </Route>
            <Route exact path="/FilesSend">
                <FilesSend/>
            </Route>
            <Route exact path="/FilesRecibidos">
                <UploadFilesRecibidos/>
            </Route>
            <Route exact path="/FilesRecibidosLista">
                <FilesRecibidosLista/>
            </Route>
            <Route exact path="/BuscadorRecibidos">
                <BuscadorRecibidos/>
            </Route>
            
            
        </Router>
     
      
    </div>
    );
  };
  