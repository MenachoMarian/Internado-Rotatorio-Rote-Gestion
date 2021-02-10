import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { useHistory } from "react-router-dom";
import React from 'react';
import { Roles } from 'meteor/alanning:roles'




Meteor.methods({
    'users.insert'(username,password,oficina) {
      check(username, String);

      var id

      id = Accounts.createUser({
        username: username,
        password: password,
        profile: {
            oficina: oficina
        }
    });

    Roles.addUsersToRoles(id,'admin');
    //Roles.setUserRoles(id, 'admin')

  }
  
  });