import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";



import '../styles/Styles.css';
import imagenes from '../images/imagenes'



export const Nav = () => {

return (
  <div>
    
      <div className="hero">

          <img className="hero-logo" src={imagenes[0].img} alt="UATF"/>
          <h1 className ="hero-text">Universidad Autónoma Tomás Frías</h1>
      </div>
    
  </div>
  );
};
