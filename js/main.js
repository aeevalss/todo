const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach((task) => {
   // Формируем CSS класс
   const cssClass = task.done ? "task-title task-title--done" : "task-title";


   // Формируем разметку для новой задачи
   const taskHTML = `<li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
               <button type="button" data-action="done" class="btn-action">
                  <img src="./img/tick.svg" alt="Done" width="18" height="18">
               </button>
               <button type="button" data-action="delete" class="btn-action">
                  <img src="./img/cross.svg" alt="Done" width="18" height="18">
               </button>
            </div>
         </li>`;

   // Добавляем задачу на страницу
   tasksList.insertAdjacentHTML('beforeend', taskHTML);
});


checkEmptyList();
form.addEventListener('submit', addTask)

tasksList.addEventListener('click', deleteTask)

tasksList.addEventListener('click', doneTask)

// Функции
function addTask(event) {
   // Отменяем отправку формы
   event.preventDefault();

   // Достаем текст задачи из поля ввода
   const taskText = taskInput.value;

   // Описываем задачу в виде объекта
   const newTask = {
      id: Date.now(),
      text: taskText,
      done: false
   };

   // Добавляем задачу в массив с задачами
   tasks.push(newTask);

   // Сохраняем в хранилище браузера LocalStorage
   saveToLocalStorage();
   // Формируем CSS класс
   const cssClass = newTask.done ? "task-title task-title--done" : "task-title";


   // Формируем разметку для новой задачи
   const taskHTML = `<li id = "${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
               <button type="button" data-action="done" class="btn-action">
                  <img src="./img/tick.svg" alt="Done" width="18" height="18">
               </button>
               <button type="button" data-action="delete" class="btn-action">
                  <img src="./img/cross.svg" alt="Done" width="18" height="18">
               </button>
            </div>
         </li>`;

   // Добавляем задачу на страницу
   tasksList.insertAdjacentHTML('beforeend', taskHTML);

   // Очищаем поле ввода и возвращаем на него фокус
   taskInput.value = '';
   taskInput.focus();
   checkEmptyList();
}

function deleteTask(event) {

   // Если был клик НЕ по кнопке delete
   if (event.target.dataset.action !== 'delete') return;

   // Проверка что клик был по кнопке delete
   if (event.target.dataset.action === 'delete') {

      const parentNode = event.target.closest('.list-group-item');

      // Определяем ID задачи
      const id = Number(parentNode.id);

      // Удаляем задачу через фильтрацию массива
      tasks = tasks.filter((task) => task.id === id ? false : true)
      console.log(tasks)
      parentNode.remove()
   }
   // Сохраняем в хранилище браузера LocalStorage
   saveToLocalStorage();

   checkEmptyList()

}

function doneTask(event) {
   if (event.target.dataset.action !== 'done') return;
   const doneParentNode = event.target.closest('li');

   const id = Number(doneParentNode.id);
   const task = tasks.find(function (task) {
      if (task.id === id) {
         return true
      }
   })

   task.done = !task.done
   // Сохраняем в хранилище браузера LocalStorage
   saveToLocalStorage();
   console.log(task)
   const taskTitle = doneParentNode.querySelector('.task-title');
   taskTitle.classList.toggle('task-title--done');

}

function checkEmptyList() {
   if (tasks.length === 0) {
      const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`
      tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
   }

   if (tasks.length > 0) {
      const emptyListEl = document.querySelector('#emptyList');
      emptyListEl ? emptyListEl.remove() : null;
   }
}

function saveToLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(tasks))
}