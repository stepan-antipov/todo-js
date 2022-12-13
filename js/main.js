const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput')
const cartItems = document.querySelector('#cartItems')
const cartEmpty = document.querySelector('#cartEmpty')
const cartWrapper = document.querySelector('#cartWrapper')


let tasks = []


if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(task => {
        renderTask(task)
   })
   
}

count=tasks.length
document.getElementById('count').innerHTML = count





form.addEventListener('submit', addTask)
cartItems.addEventListener('click', deleteTask) 
cartItems.addEventListener('click', doneTask)


checkEmptyList()

function checkEmptyList() {
    if (tasks.length === 0) { 
        const emptyListHTML = `<div id="cartEmpty" class="cart__empty"><p>To-do list is empty</p></div>`;
        cartWrapper.insertAdjacentHTML('afterbegin', emptyListHTML)
    } 
    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#cartEmpty')
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function addTask(event) {
    event.preventDefault();
    
    
    const taskText = taskInput.value
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    tasks.push(newTask)
    
    renderTask(newTask)
    
    count=tasks.length
    document.getElementById('count').innerHTML = count
    
    taskInput.value =""
    taskInput.focus()

    checkEmptyList()
    saveToLocalStorage()
    // if (cartItems.children.length > 0) {
    //     cartEmpty.classList.add('none')
    // }
}

function deleteTask(event) {

    if (event.target.dataset.action !== 'delete') return;
    
    const parentNode = event.target.closest('.cart__item')
    console.log(parentNode)
    const id = parseInt(parentNode.id)

    tasks = tasks.filter(task => task.id !== id)
 
    parentNode.remove()

    count=tasks.length
    document.getElementById('count').innerHTML = count

    checkEmptyList()
    saveToLocalStorage()
    // if (cartItems.children.length === 0) {
    //     cartEmpty.classList.remove('none')
    // }
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return 
    
    const parentNode = event.target.closest('button')
    const greenArrow = parentNode.querySelector('.item__right-img')
    greenArrow.classList.toggle('no-opacity')


    const parentNode2 = event.target.closest('.item__right')
    const parentNode3 = parentNode2.closest('.cart__item')


    const id = Number(parentNode3.id)
    const task = tasks.find(task => task.id === id)
    console.log(task)
    task.done = !task.done


    const itemTitle = parentNode2.querySelector('.item__title')
    itemTitle.classList.toggle('done')
        // cartItems.classList.add('done');
    saveToLocalStorage()
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? "item__title done" : "item__title"
    const taskHTML = `<div id="${task.id}" class="cart__item cart--style">
                        <div class="item__right">
                            <button type="button" ><img src="./img/green-arrow.png" class="item__right-img" alt="Done" data-action="done"></button>
                            <p class="${cssClass}">${task.text}</p>
                        </div>
                        <div class="item__left">
                            <button type="button"><img src="./img/red-close.png" alt="Delete"  data-action="delete"></button>
                        </div>
                    </div>`;

    cartItems.insertAdjacentHTML('beforeend', taskHTML)  
}