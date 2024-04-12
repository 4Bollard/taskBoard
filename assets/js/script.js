const taskTitle = $('#name');
const dueDate = $('#dueDate');
const description = $('#description');

// const taskLanes = $('.swim-lanes');
// const taskForm = $('#formModal');

function readLocalStorage() { 
    let string = LocalStorage.getItem("tasks");
    let taskList = JSON.parse(string);
    return taskList;
}

function saveToStorage (taskList) { 
    let saveData = JSON.stringify(taskList);
    LocalStorage.setItem("tasks", saveData);
}

// Todo: create a function to generate a unique task id
function uniqueId () {
    let id = crypto.randomUUID()
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card project-card draggable my-3')
        .attr('data-project-id', project.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(project.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(project.type);
    const cardDueDate = $('<p>').addClass('card-text').text(project.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-project-id', project.id);
    cardDeleteBtn.on('click', handleDeleteProject);
}

// // Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// // Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// // Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// // Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
