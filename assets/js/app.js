function validationTasksLS() {
    const localStorage = window.localStorage
    if (localStorage.getItem('list_tasks') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('list_tasks'))
        listaTarefas.forEach(tarefa => {
            const listaTarefas = document.getElementById('list_tasks')
            const novoItem = document.createElement('li')
            novoItem.innerText = tarefa.descricao
            novoItem.id = tarefa.id
            novoItem.appendChild(createMods(novoItem.id, tarefa.status))
            if (tarefa.status === 'fechada') {
               novoItem.style.textDecoration =  'line-through'    
            }
            listaTarefas.appendChild(novoItem)
        });
    }
}


//Adiciona o texto do input na lista
function addNewTask()  {
    //Busca valor no input
    const newTask = document.getElementById('addTask').value
    //Atribui newTask como parametro da função
    createNewTask(newTask)
    
}

function createNewTask(text_task) {
    //Busca lista ordenada
    const taskList = document.getElementById('list_tasks')
    //Atribui uma variavel tamanho atual dessa lista 
    let qtdTask = taskList.children.length

    //Cria novo elemento li
    const newitem = document.createElement('li')

    //Atribui ao elemento o texto de text_task
    newitem.innerHTML =  text_task

    //Atribui id ao elemento adicionado (numero de acord)
    newitem.id = `task_id_${qtdTask++}`

    //Atribui a check box da função seguinte
    newitem.appendChild(createMods(newitem.id))

    //Atribui botão para editar tarefa
    newitem.appendChild(createEdit(newitem.id))
    
    //adicionando elemento filho
    taskList.appendChild(newitem)
}

function createMods(id_task) {
    //Cria o elemento de input
    const inputTask = document.createElement('input')

    //Define o tipo do input
    inputTask.type =  'checkbox'

    //Define atributo onclick (toda vez que o onclick for executado, ativara afunção)
    inputTask.setAttribute('onclick', `action('${id_task}')`)
    return inputTask

}

function createModsLS(id_task) {
    const localStorage = window.localStorage
    if (localStorage.getItem('list_tasks') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('list_tasks'))
        let contador = 0
        listaTarefas.forEach(tarefa => {
            if (tarefa.id === idTarefa) {
                if (tarefa.status === 'aberta') {
                    tarefa.status = 'fechada'
                } else {
                    tarefa.status = 'aberta'
                }
                console.log(tarefa)
            }
            localStorage.setItem('list_tasks', JSON.stringify(listaTarefas))
            contador++
        });

    }
}

function adicionaTarefaAListaLocalStorage(tarefa) {
    const localStorage = window.localStorage
    let listaTarefas = []
    if (localStorage.getItem('list_tasks') != null) {
        listaTarefas = JSON.parse(localStorage.getItem('list_tasks'))
    }
    listaTarefas.push(tarefa)
    localStorage.setItem('list_tasks', JSON.stringify(listaTarefas))
}

function montaTarefa(idTarefa, textoTarefa, status) {
    return {
        id: idTarefa,
        descricao: textoTarefa,
        status: status
    }
}

// ao script ser carregado roda essa funcao
validaSeExisteTarefasNoLocalStorageEMostraNaTela()


function createEdit (id_task){

    //Cria o elemento de button
    const bttTask = document.createElement('button')

    //Define o tipo do submit
    bttTask.type =  'submit'

    //Adiciona texto ao botão
    bttTask.innerText = 'EDIT'

    //Define atributo onclick (toda vez que o onclick for executado, ativara afunção)
    bttTask.setAttribute('onclick', `actioned('${id_task}')`)
    return bttTask

}

function action(id_task){
    const taskselect = document.getElementById(id_task)
    if (taskselect.style.textDecoration == 'line-through' ) {
        taskselect.style = 'text-decoration: none'
    }
    else {
        taskselect.style = 'text-decoration: line-through'
    }

}


function actioned(id_task) {
    const newText = prompt("Editar tarefa:", document.getElementById(id_task).innerText);
    
    if (newText !== null && newText !== "") {
        document.getElementById(id_task).textContent = newText;
    }
               
}

function hideTasks(id_task) {
    const taskList = document.getElementById('list_tasks').children;

    // Loop através de todas as tarefas
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
            const checkbox = task.querySelector('input[type="checkbox"]');

        // Verifica se a checkbox está marcada
        if (checkbox.checked) {
            task.style.display = 'none';
        }
    }

}