import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { useHistory } from "react-router-dom";
import React from 'react';
import { Roles } from 'meteor/alanning:roles'
import { DocumentsCollection } from '../db/ListsCollection';
import { OtrosDocumentos } from '../db/ListsCollection';




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
  },

  'otrosdocumentos.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    OtrosDocumentos.remove(taskId);
  },
  
  });