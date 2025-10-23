//Wait for DOM to load before executing code 
document.addEventListener('DOMContentLoaded', function() {
    //*//Task List Helpers 

    //Get Task List

    function getTaskList(){
        let listJSON = localStorage.getItem('taskList');
        let taskList = JSON.parse(listJSON);
        if(!taskList){
            taskList = [];
        }
        return taskList
    }

    //Add Item to List
    function addTask(task){
        let taskList = getTaskList();
        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList))
        renderList();
    }

    //Remove Item from List 
    function removeTask(index){
        let taskList = getTaskList();
        taskList.splice(index, 1);
        localStorage.setItem('taskList', JSON.stringify(taskList))
        renderList();
    }
    function validEntry(input){
        if(!input || input.length<1 || input.replace(/\s/g, '') == ''){
            return false
        }else{
            return true
        }
    }
    //Render Task List
    function renderList(){
        let renderList = document.getElementById('toDoList');
        let taskList = getTaskList();
        renderList.innerHTML = '';
        for (let i=0; i<taskList.length; i++){
            let task = taskList[i];
            let newTask = document.createElement('li');
            newTask.classList.add("taskContainer")
            let taskText = newTaskText(task);
            let xButton = newXButton();
            xButton.id = i;
            xButton.addEventListener('click', function() {
                removeTask(this.id);
            })
            newTask.appendChild(taskText);
            newTask.appendChild(xButton);
            renderList.appendChild(newTask);
        }
    }

    //Task Helpers 

    //Create Task Text 
    function newTaskText(task){
        let output = document.createElement('span');
        output.classList.add("taskText")
        output.textContent = task;
        return output;
    }
    //Create new X Button 
    function newXButton(){
        let output = document.createElement('button');
        output.classList.add('xButton')
        output.textContent = 'X'
        return output;
    }
    
    renderList()
    //Submit entered text to list when button is pressed or form is submitted
    document.getElementById('submitButton').addEventListener('click', function(){
        let input = document.getElementById('newTaskEntry').value
        if(validEntry(input)){
        addTask(input)
        document.getElementById('newTaskEntry').value = '';
        }

    })
    document.getElementById('entryForm').addEventListener('submit', function() {
        let input = document.getElementById('newTaskEntry').value
        if(validEntry(input)){
        addTask(input)
        document.getElementById('newTaskEntry').value = '';
        }
    })
})
