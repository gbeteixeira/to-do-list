const form = document.getElementById('form'); //form
const input = document.getElementById('input'); //input
const list = document.getElementById('list'); //lista tasks

const listTask = JSON.parse(localStorage.getItem('list')); //guarda dados no localStorage do pc

//verifica se existe algo na listTask
if(listTask != null && listTask.length > 0) {
    listTask.forEach(todo => addTask(todo));
}

//quando o form for enviado add task
form.addEventListener('submit', (e) => {

    e.preventDefault();

    //Chama funcao de add task
    addTask();
})

//funcao que add tasks
function addTask(todo) {
    
    let todoTask = input.value;

    if(todo != null) {
        todoTask = todo.text;
    }

    if(todoTask) {

        // Create icon element to append to DOM
        let icon = document.createElement("i");
        icon.classList.add('fas', 'fa-trash');

        let todoEl = document.createElement("li");


        if(todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoTask;

        //ao clicar com botao esquerdo task foi concluida
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateList();
        })

        //ao clicar icon fas fa-tash exclui
        todoEl.addEventListener('click', (e) => {

            e.preventDefault();

            if (!e.target.matches('.fa-trash')) {
              return;
            }

            todoEl.remove(); //remove de exibicao
            updateList(); //Update na lista removendo o dado selecionado
        });

        //cria elementos 'filhos' no elementos pai (ul)
        todoEl.appendChild(icon);
        list.appendChild(todoEl);

        //limpa valor do input
        input.value = '';

        //update na lista
        updateList();
      
    }

    function updateList() {

        todosEl = document.querySelectorAll('li'); //seleciona tudo dentro de uma LI

        const todos = [];

        todosEl.forEach(todoEl => {
            todos.push({
                text: todoEl.innerText,
                completed: todoEl.classList.contains('completed')
            })
        })

        //salva a nova lista no storange
        localStorage.setItem('list', JSON.stringify(todos));
    }

}

//trocar tema
const colorH1 = document.getElementById('h1'); //h1

colorH1.addEventListener('click', (e) => {

    if(localStorage.getItem('Switch') == "light") {

        document.body.removeAttribute("data-theme","light");
        localStorage.removeItem("Switch");

    } else {

        document.body.setAttribute("data-theme","light");
        localStorage.setItem("Switch","light");

    }
    
})

window.onload = function() {
    let colorStorange = localStorage.getItem('Switch');
    document.body.setAttribute("data-theme", colorStorange); 
}


