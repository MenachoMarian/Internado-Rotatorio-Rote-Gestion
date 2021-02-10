import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ListsCollection } from '../imports/db/ListsCollection';
import { DocumentsCollection } from '../imports/db/ListsCollection';
import { UsersCollection } from '../imports/db/ListsCollection';


import '../imports/api/userspublications';
import '../imports/api/usermetodos'

//const insertList = listText => ListsCollection.insert({ text: listText });

/*Meteor.startup(() => {
  if (ListsCollection.find().count() === 0) {
    [
      'Primera prueba',
      'Segunda prueba',
      'Ok, sonríe'
    ].forEach(insertList)
  }
});*/

Meteor.startup(function() {

  // user roles
  var roles = ['admin', 'normal-user','none']

  // this will fail if the roles package isn't installed
  if(Meteor.roles.find().count() === 0) {
    roles.map(function(role) {
      Roles.createRole(role)
    })
  }

})





