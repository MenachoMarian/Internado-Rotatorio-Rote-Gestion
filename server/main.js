import { Meteor } from 'meteor/meteor';
import { ListsCollection } from '../imports/db/ListsCollection';
import { DocumentsCollection } from '../imports/db/ListsCollection';
import { UsersCollection } from '../imports/db/ListsCollection';


import '../imports/api/userspublications';

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


