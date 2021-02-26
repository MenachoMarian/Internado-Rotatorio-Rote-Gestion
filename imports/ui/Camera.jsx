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
import { App } from './App';

export const Camera = () => {
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

  const upload = () => {
    console.log("Holi, entra a funcion");
    CameraPreview.takePicture({width:640, height:640, quality: 85}, function(base64PictureData) {
        
       
        // One simple example is if you are going to use it inside an HTML img src attribute then you would do the following:
        imageSrcData = 'data:image/jpeg;base64,' + base64PictureData;
        $('img#photo').attr('src', imageSrcData);
      });
}
  
  return (
    <div className="Body">
      
      {user ? (
         rol ?(
          <UIADMIN/>
        ):(
          <div className="Body">
              <div className="contenido">
                  <h1>Holi</h1>
                  <p> <img id="photo" src="" alt="Foto"/></p>
                 <p><button id="btn" 
                    
                    onClick={upload}
                    > Tomar fotografía</button></p>
                 <p id="msg"></p>
                  

              </div>
          </div>  
        )
        ) : (
          <App/> 
        )}
    </div>
  )
};