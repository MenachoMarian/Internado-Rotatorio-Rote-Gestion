import { Meteor } from 'meteor/meteor';
import { CategoriasCollection } from '../db/ListsCollection';
import { DocumentsCollection } from '../db/ListsCollection';
import { OficinasCollection } from '../db/ListsCollection';
import { OtrosDocumentos } from '../db/ListsCollection';
import { GestionCollection } from '../db/ListsCollection';
import { DocumentRecibidosCollection } from '../db/ListsCollection';


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

Meteor.publish('users', function publishUsers(){
  return Meteor.users.find();
})

Meteor.publish('categorias', function publishCategorias() {
  return CategoriasCollection.find();
});

Meteor.publish('oficinas', function publishOficinas() {
  return OficinasCollection.find();
});

Meteor.publish('gestiones', function publishGestiones() {
  return GestionCollection.find();
});

Meteor.publish('documents', function publishDocuments() {
  return DocumentsCollection.find();
});

Meteor.publish('otrosdocumentos', function publishOtrosDocumentos() {
  return OtrosDocumentos.find();
});

Meteor.publish('usersroles', function publishUsersRoles() {
  return Meteor.roles.find({}); 
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  } else {
    this.ready()
  }
})

Meteor.publish('documentsrecibidos', function publishDocumentsRecibidos() {
  return DocumentRecibidosCollection.find();
});
