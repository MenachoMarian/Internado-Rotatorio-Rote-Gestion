import http from "../http-common";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const uploadfile =(id,nombre,type,file,userId,usernombre,unidad,num, destino,gestion) => {
  
  var axios = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
    'nombre': nombre,
    'categoria': type,
    'identi':id,
    'userId': userId,
    'usernombre': usernombre,
    'useroficina':unidad,
    'numero':num,
    'destino':destino,
    'gestion': gestion,
    'universidad':'UATF',
    'facultad':'DCN',
    'carrera':'CIS',
    
    //'numero':number,
  });


  var config = {
    method: 'post',
    url: 'http://localhost:8080/documento',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));


    let formData = new FormData();

    formData.append("file", file);
  
    return http.post("/documento/uploadImg?identi="+id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  })
  .catch(function (error) {
    console.log(error);
  });

}



const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/documento/uploadImg", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};




const uploadimg = (file,iden) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/documento/uploadImg?identi="+iden, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  /*var axios = require('axios');
  var FormData = require('form-data');
  var fs = require('fs');
  var data = new FormData();
  data.append('file', file);
  
  var config = {
    method: 'post',
    url: 'http://localhost:8080/documento/uploadImg?identi='+iden,
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });*/
}


const getFiles = () => {
  return http.get('/documento');
};

const getlastfile = () =>{
  var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:8080/lastdocumento',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}



const uploadtext = (nombre,text) => {
      var axios = require('axios');
      var qs = require('qs');
      var data = qs.stringify({
      'nombre': nombre,
      'text': text, 
      });
      var config = {
        method: 'post',
        url: 'http://localhost:8080/texto',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}



const getcategoria = () => {
  return http.get("/categoria");
}

const insertcategoria = (nombre,code) => {
          
          var axios = require('axios');
          var qs = require('qs');
          var data = qs.stringify({
          'categoria': nombre,
          'code': code, 
          });
          var config = {
            method: 'post',
            url: 'http://localhost:8080/categoria',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };

          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          
          })
          .catch(function (error) {
            console.log(error);
          });
}



const externosuploadfile =(id,nombre,type,file,userId,usernombre,useroficina,destino,gestion) => {
  
  var axios = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
    'nombre': nombre,
    'categoria': type,
    'identi':id,
    'userId': userId,
    'usernombre': usernombre,
    'useroficina':useroficina,
    'destino':destino,
    'gestion': gestion,
    'universidad':'UATF',
    'facultad':useroficina,
    'carrera':useroficina,
  });


  var config = {
    method: 'post',
    url: 'http://localhost:8080/documentother',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));


    let formData = new FormData();

    formData.append("file", file);
  
    return http.post("/documentother/uploadImg?identi="+id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  })
  .catch(function (error) {
    console.log(error);
  });

}

const getotherfiles = () => {
  return http.get("/documentother");
}

const uploadunidad = (nombre,code,descrip) => {
          var axios = require('axios');
          var qs = require('qs');
          var data = qs.stringify({
          'oficinanombre': nombre,
          'oficinacode': code,
          'oficinadescription': descrip,
          });
          var config = {
            method: 'post',
            url: 'http://localhost:8080/oficina',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };

          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          })
}

const uploadgestion = (nombre,descri) => {
          var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
        'nombre': nombre,
        'descripcion': descri, 
        });
        var config = {
          method: 'post',
          url: 'http://localhost:8080/gestion',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
}

export default {
  upload,
  getFiles,
  uploadfile,
  getlastfile,
  uploadimg,
  uploadtext,
  getcategoria,
  insertcategoria,
  externosuploadfile,
  getotherfiles,
  uploadunidad,
  uploadgestion,
};
