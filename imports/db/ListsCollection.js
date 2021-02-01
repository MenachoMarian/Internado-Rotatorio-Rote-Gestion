import { Mongo } from 'meteor/mongo';

export const ListsCollection = new Mongo.Collection('lists');
//export const UsersCollection = new Mongo.Collection('users');
export const DocumentsCollection = new Mongo.Collection('documents');
//export const TextosCollection = new Mongo.Collection('textos');
export const CategoriasCollection = new Mongo.Collection('categorias');