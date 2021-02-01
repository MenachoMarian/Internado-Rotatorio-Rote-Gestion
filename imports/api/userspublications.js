import { Meteor } from 'meteor/meteor';
import { CategoriasCollection } from '../db/ListsCollection';
import { DocumentsCollection } from '../db/ListsCollection';


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

Meteor.publish('categorias', function publishCategorias() {
  return CategoriasCollection.find();
});

Meteor.publish('documents', function publishDocuments() {
  return DocumentsCollection.find();
});