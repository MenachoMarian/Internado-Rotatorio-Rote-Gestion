import React from 'react';
import { ListsCollection } from '../db/ListsCollection';




export const List = ({ list, onDeleteClick }) => {
    return (

   
        <div className="lista-doc-item">
            <ol>
                <div className="row">
                    <div className="col-4">
                        <button 
                            type="reset"
                            className="btn btn-dark"
                            onClick={ () => onDeleteClick(list)}>
                                Suprimir
                        </button>
                    </div>
                    <div className="col-8">
                        <li><b>Nombre: </b> {list.name}</li>
                        <li><b>Documento: </b>: {list.file}</li>
                        <li><b>Tipo: </b>: {list.tipodoc}</li>
                    </div>
                   
                </div>
            </ol>
        </div>
    
    )
};