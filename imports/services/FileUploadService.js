import http from "../http-common";


const uploadfile =(id,nombre,type,file) => {
  
  var axios = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
    'nombre': nombre,
    'categoria': type,
    'identi':id,
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
  return http.get("/documento");
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

export default {
  upload,
  getFiles,
  uploadfile,
  getlastfile,
  uploadimg,
};