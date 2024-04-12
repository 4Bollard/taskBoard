const taskTitle = $('#name');
const dueDate = $('#dueDate');
const description = $('#description');

const taskLanes = $('.swim-lanes');
const taskForm = $('#formModal');

function readLocalStorage() {
    let string = localStorage.getItem("tasks");
    let taskList = JSON.parse(string) || [];
    return taskList;
}

function saveToStorage(taskList) {
    let saveData = JSON.stringify(taskList);
    localStorage.setItem("tasks", saveData);
}

// Todo: create a function to generate a unique task id
function uniqueId() {
    let id = crypto.randomUUID()

    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const taskTitle = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const description = $('<p>').addClass('card-text').text(task.description);
    const dueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(description, dueDate, cardDeleteBtn);
    taskCard.append(taskTitle, cardBody);
    return taskCard;
}

function renderTaskList() {
    const taskList = readLocalStorage();


    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();


    for (let task of taskList) {
        if (task.status === 'to-do') {
            createTaskCard(task).appendTo(todoList);
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}


// // Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    console.log("click")
    const taskTitle2 = taskTitle.val();
    const description2 = description.val();
    const dueDate2 = dueDate.val();
    const newTask = {

        id: uniqueId(),
        name: taskTitle2,
        description: description2,
        dueDate: dueDate2,
        status: 'to-do',
    };

    const tasks = readLocalStorage();
    tasks.push(newTask);

    saveToStorage(tasks);

    renderTaskList();

    taskTitle.val('');
    description.val('');
    dueDate.val('');
}

// // Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(this).attr('data-task-id');
    const tasks = readLocalStorage();

    tasks.forEach((task, i) => {
        if (task.id === taskId) {
            tasks.splice(i, 1);
        }
    });

    saveToStorage(tasks);

    renderTaskList();
}

// // Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readLocalStorage();

    const taskId = ui.draggable[0].dataset.taskId;

    const newStatus = event.target.id;

    for (let task of tasks) {

        if (task.id === taskId) {
            task.status = newStatus;
        }
    }

    saveToStorage(tasks)
    renderTaskList();
}

// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('#dueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});

taskForm.on('click', '.addButton', function (e) {
    //e.preventDefault();
    handleAddTask(e);
    taskForm.modal("hide")
})


taskLanes.on('click', '.delete', handleDeleteTask);