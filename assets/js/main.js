const tbodyId = "tbody";
const firebaseGame = new FirebaseGameUser(tbodyId);
const formUser = document.getElementById('formUser');
const btnSubmit = document.getElementById('btnSubmit');
const preload = document.getElementById('preload');
const myModal = new bootstrap.Modal(document.getElementById("modalApp"), {});
const textConfirm = "Press a button to Delete!\nAccept or Cancel.";

var getIdUser = "";
var validate = true;

/**Function get user data*/
function getDataUser() {
  showPreload();
  firebaseGame.getDataUsers().then((result)=>{
    hidePreload();
  });
}

/**Function hidden modal*/
function createUser() {
  validate = true;
  cleanForm();
  enableForm();
  btnSubmit.disabled = false;
  showModal();
}

/**Function show user*/

function showUser(id) {
  cleanForm();
  disableForm();
  showPreload();
  const dataUser = firebaseGame.getDataUser(id);
  dataUser.then((data) => {
    setDataForm(data);
    hidePreload();
  });
  btnSubmit.disabled = true;
  showModal();
}

/**Function edit user*/

function editUser(id) {
  validate = false;
  cleanForm();
  enableForm();
  showPreload();
  getIdUser = id;
  const dataUser = firebaseGame.getDataUser(id);
  dataUser.then((data) => {
    setDataForm(data);
    hidePreload();
  });
  btnSubmit.disabled = false;
  showModal();
}

/**Function delete user*/

function deleteUser(id) {
  showPreload();
  if (confirm(textConfirm) == true) {
    firebaseGame.setDeleteUser(id).then((data) => {
      getDataUser();
    });
  }
  hidePreload();
}

/**Function get data form modal*/

formUser.addEventListener('submit', (e) => {
  e.preventDefault();
  let inputId = document.getElementById('id');
  if (inputId.value.length === 0) {
    inputId.value = uuid.v1();
  }
  let elements = formUser.querySelectorAll('input');
  var jsonArray = {};
  for (const elem of elements) {
    jsonArray[elem.id] = elem.value;
  }
  if (validate) {
    firebaseGame.setCreateUser(jsonArray).then(hideModal());
  } else {
    firebaseGame.setUpdateUser(getIdUser, jsonArray).then(hideModal());
  }
});

function showModal() {
  myModal.show();
};

function hideModal() {
  myModal.hide();
}

function cleanForm() {
  formUser.reset();
};

function enableForm() {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
};


function disableForm() {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

function setDataForm(data) {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    document.getElementById(elements[i].id).value = data[elements[i].id];
  }
};

function showPreload() {
  preload.style.display = "block";
};

function hidePreload() {
  preload.style.display = "none";
}
window.addEventListener('load', (e) => {
  getDataUser();
});



































// const objT_body=document.getElementById("t_body");

// function getDataJson (){
// const URI="https://api-rest-a46f2-default-rtdb.firebaseio.com/api/users.json";
// fetch(URI).
// then( (response)=>response.json()).
// then( (data)=>createTable(data)).
// catch( (error)=>console.error(error)).
// finally( console.log("FINALIZACION FETCH"));
// }

// function createTable(json){
//     objT_body.innerHTML="";
//     var row="";
//     var actionButton="";
//     var actionForm="";

//     for(let i=0; i<json.length; i++){
//         actionButton=

        

//     row+=
//     '<tr>'+
//     '<th >'+(i+1)+'</th>'+
//     '<td>'+json[i].img+'</td>'+
//     '<td>'+json[i].nickname+'</td>'+
//     '<td>'+json[i].nombre+'</td>'+
//     '<td>'+json[i].valor+'</td>'+
//     '<td>'+actionButton+'</td>'+
//     '</tr>';
    



//     }
//     objT_body.innerHTML=row;
// }
// window.addEventListener("load", ()=>{
//     getDataJson ();
// })

// function edit(id){
//     const urlFirebase= "";
//     alert(id);
// }





















// funcion Modal view//
// function viewUser(id, idUser) {
//     clearData(id);
//     formDisabled(id);
//     showModal();
//     alert("ID USER" + idUser);
// }

// funcion Modal edit//
// function editUser(id, idUser) {
//     clearData(id);
//     formEnable(id);
//     formEnableEdit(id);
//     showModal();
//     alert("ID USER" + idUser);
// }




// funcion Modal delete//

// function deleteUser(id) {
//     let getConfirm = window.confirm("Seguro desea Eliminar?");
//     if (getConfirm) {
//         alert("OK DELETE");
//     } else {
//         alert("ERROR DELETE");
//     }
// }