import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { App } from '../ui/App';
import { Home } from '../ui/Home';
import { RegisterUserForm } from '../ui/RegisterUserForm';
import { DocumentoForm } from '../ui/DocForm';
import { LoginForm } from "../ui/LoginForm";
import {UploadFiles} from "../ui/FileUpload";
import { List } from '../ui/List';

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
            <Route exact path="/DocumentoForm">
                <DocumentoForm/>
            </Route>
            <Route exact path="/UploadFile">
                <UploadFiles/>
            </Route>
            <Route exact path="/LoginForm">
                <LoginForm/>
            </Route>
        </Router>
     
      
    </div>
    );
  };
  