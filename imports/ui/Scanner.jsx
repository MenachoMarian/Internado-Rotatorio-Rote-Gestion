import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
//import Dynamsoft from 'dwt';
import { useTracker } from 'meteor/react-meteor-data';

import { LoginForm } from '../ui/LoginForm';
import { Nav } from './Navbar';

import { useHistory } from "react-router-dom";

import '../styles/main.css'
import '../styles/Styles.css'

export const Scanner = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  console.log(Meteor.users.find(user).fetch());

  
  return (
    <div className="Body">
      
      {user ? (
        <Fragment>
          <h1>Holi</h1>
        </Fragment>    
        ) : (
          <LoginForm /> 
        )}
    </div>
  )
};