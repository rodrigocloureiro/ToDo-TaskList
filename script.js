const inputNewTask = document.getElementById("inputNewTask");
const btnAddNewTask = document.getElementById("btnAddNewTask");
const ulTaskList = document.getElementById("ulTaskList");
const erroAddTask = document.getElementById("erro-add-task");
let i = 0;
let add = false;
let errorSound = document.getElementById("errorSound"); 

btnAddNewTask.addEventListener('click', addTask);

function addTaskFocus() {
  inputNewTask.value = null;
  inputNewTask.focus();
}

function treme() {
  if(add == false) {
    errorSound.currentTime = 0;
    errorSound.play();
    erroAddTask.classList.add("show");
    erroAddTask.classList.add("treme");
    setTimeout(function() {
      erroAddTask.classList.remove("treme")
    }, 1000);
    setTimeout(function() {
      errorSound.pause();
    }, 1700);
  }
  else {
    erroAddTask.classList.remove("show");
    errorSound.pause();
    add = false;
  }
}

function addTask() {
  if(inputNewTask.value && ulTaskList.childElementCount < 60) {
    let date = new Date();
    let data = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    if(date.getMinutes() < 10) {
      var minutos = "0" + date.getMinutes();
    }
    else {
      var minutos = date.getMinutes();
    }
    inputNewTask.focus();
    ulTaskList.innerHTML += `<li id="liTask${i}"> <span class="spanTask" id="spanTaskList${i}"></span> <div class="inputEditTask"><input type="text" class="inputEdit d-none"></div> <div class="divBtns"><button class="checkTask" onclick="checkTask(this)"><i class="bi bi-check2-square"></i></button> <button class="editTask" onclick="editTask(this)"><i class="bi bi-pencil-square"></i><button class="editTaskInput d-none" onclick="confirmEdit(this)"><i class="bi bi-pencil-square"></i></button> <button class="removeTask" onclick="removeTask(this)"><i class="bi bi-x-square"></i></button></div> <span class="time">Adicionado em ${data} às ${date.getHours()}:${minutos}</span> <span class="d-none time-check"></span> </li>`;
    let liTask = ulTaskList.lastElementChild;
    let spanTaskList = liTask.firstElementChild;
    spanTaskList.innerText += inputNewTask.value[0].toUpperCase() + inputNewTask.value.substring(1);
    inputNewTask.value = null;
    add = true;
    treme();
    i++;
  }
  else if(ulTaskList.childElementCount == 60) {
    erroAddTask.innerText = "Limite máximo de tarefas atingido!";
    treme();
    addTaskFocus();
  }
  else {
    erroAddTask.innerText = "Você precisa escrever alguma coisa...";
    treme();
    addTaskFocus();
  }
}

function removeTask(element) {
  let liTask = element.parentNode.parentNode;
  liTask.remove();
}

function dNone(element) {
  let liTask = element.parentNode.parentNode;
  liTask.classList.toggle("padding-0");
  let spanTaskList = liTask.children;
  spanTaskList[0].classList.toggle("d-none");
  const inputEdit = spanTaskList[1].children[0];
  inputEdit.classList.toggle("d-none");
  const btnCheckTask = spanTaskList[2].children[0];
  btnCheckTask.classList.toggle("d-none");
  const btnEditTask = spanTaskList[2].children[1];
  btnEditTask.classList.toggle("d-none");
  const btnRemoveTask = spanTaskList[2].children[3];
  btnRemoveTask.classList.toggle("d-none");
  const btnEditTaskInput = spanTaskList[2].children[2];
  btnEditTaskInput.classList.toggle("d-none");
}

function confirmEdit(element) {
  let date = new Date();
  let data = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  let liTask = element.parentNode.parentNode;
  let spanTaskList = liTask.children;
  const inputEdit = spanTaskList[1].children[0];
  spanTaskList[0].innerText = inputEdit.value[0].toUpperCase() + inputEdit.value.substring(1);
  if(date.getMinutes() < 10) {
    var minutos = "0" + date.getMinutes();
  }
  else {
    var minutos = date.getMinutes();
  }
  spanTaskList[3].innerText = `Editada em ${data} às ${date.getHours()}:${minutos}`;
  dNone(element);
  addTaskFocus();
}

function editTask(element) {
  let liTask = element.parentNode.parentNode;
  let spanTaskList = liTask.children;
  const inputEdit = spanTaskList[1].children[0];
  inputEdit.value = spanTaskList[0].innerText;
  dNone(element);
  inputEdit.focus();
}

function checkTask(element) { 
  let date = new Date();
  let data = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  let liTask = element.parentNode.parentNode;
  liTask.classList.toggle("check-bg");
  let spanTaskList = liTask.children;
  spanTaskList[0].classList.toggle("check");
  spanTaskList[3].classList.toggle("d-none");
  if(date.getMinutes() < 10) {
    var minutos = "0" + date.getMinutes();
  }
  else {
    var minutos = date.getMinutes();
  }
  spanTaskList[4].innerText = `Concluída em ${data} às ${date.getHours()}:${minutos}`;
  spanTaskList[4].classList.toggle("d-none");
}