import { Mongo } from 'meteor/mongo';

export const ListsCollection = new Mongo.Collection('lists');
export const UsersCollection = new Mongo.Collection('usuarios');
export const DocumentsCollection = new Mongo.Collection('documents');