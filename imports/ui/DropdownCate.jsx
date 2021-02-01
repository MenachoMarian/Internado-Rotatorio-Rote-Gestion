import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useEffect } from 'meteor/react-meteor-data';
import UploadService from "../services/FileUploadService";

import { CategoriasCollection } from '../db/ListsCollection';


export const DropdownCate = () => {

    //const [cateinfos, setCateInfos] = useState([]);

   /*React.useEffect(() => {
        UploadService.getcategoria().then((response) => {
          setCateInfos(response.data);
        });
      }, []);*/
Meteor.subscribe('categorias');
const cateinfos = CategoriasCollection.find().fetch();
  
  
  return (
   <select>
       {cateinfos.map(cateinfo => (
           <option
           key={cateinfo.code} 
           value={cateinfo.code}
           >
               {cateinfo.categoria}
           </option>
       ))}
   </select>
  )
};