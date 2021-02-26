import { Mongo } from 'meteor/mongo';

export const ListsCollection = new Mongo.Collection('lists');
//export const UsersCollection = new Mongo.Collection('users');
export const DocumentsCollection = new Mongo.Collection('documents');
//export const TextosCollection = new Mongo.Collection('textos');
export const CategoriasCollection = new Mongo.Collection('categorias');
export const OficinasCollection = new Mongo.Collection('oficinas');
export const OtrosDocumentos = new Mongo.Collection('documentothers');
export const GestionCollection = new Mongo.Collection('gestions');
export const DocumentRecibidosCollection = new Mongo.Collection('documentrecibidos');