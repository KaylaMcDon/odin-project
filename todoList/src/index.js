const internalLogic = (() => {
    class Todo {
        constructor(title, description, dueDate, priority, projectTitle) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.projectTitle = projectTitle;
            this.completed = false;
        }

        completeTodo() {
            this.completed = true;
        }

        updateTodo(title, description, dueDate, priority, completed) {
            //if an updated value is provided, set the variable to that updated value, otherwise keep it the same
            this.title = title == "" ? this.title : title
            this.description = description == "" ? this.description : description
            this.dueDate = dueDate == "" ? this.dueDate : dueDate
            this.priority = priority == "" ? this.priority : priority
            this.completed = completed == "" ? this.completed : completed
        }

        getProjectTitle() {
            return this.projectTitle;
        }

        getTitle() {
            return this.title;
        }
    }

    class Project {
        constructor(title) {
            this.title = title;
            this.todos = Array();
        }

        #findIndex(todoTitle) {
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].title == todoTitle) {
                    return i;
                }
            }
            return -1;
        }

        #deleteIndex(index) {
            this.todos.slice(index, 1);
        }

        addTodo(todo) {
            this.todos.push(todo);
        }

        deleteTodo(todo) {
            let index = this.#findIndex(todo);
            if (index != -1) {
                this.#deleteIndex(index);
                return true;
            }
            return false;
        }

        markTodoComplete(title) {
            const index = this.#findIndex(title);
            this.todos[index].completeTodo();
        }

        setTitle(newTitle) {
            this.title = newTitle;
        }
    }

    const projects = new Array();

    //helper functions
    const findProjectIndexByTitle = (projectTitle) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].title == projectTitle) {
                return i;
            }
        }
        return -1;
    };

    const findProject = (projectTitle) => {
        const project = projects[findProjectIndexByTitle(projectTitle)];
        return project
    }

    //public functions
    const createTodo = ((title, description, dueDate, priority, projectTitle) => {
        const todo = new Todo(title, description, dueDate, priority, projectTitle);
        const projectIndex = findProjectIndexByTitle(projectTitle);
        projects[projectIndex].addTodo(todo);
        return todo;
    });

    const deleteTodo = (todo) => {
        const project = findProject(todo.getProjectTitle());
        return project.deleteTodo(todo.getTitle());
    }

    const markTodoComplete = (todo) => {
        const project = findProject(todo.getProjectTitle());
        project.markTodoComplete(todo.getTitle());
    }

    const updateTodo = (todo, title, description, dueDate, priority, completed) => {
        todo.updateTodo(title, description, dueDate, priority, completed);
    }

    const createProject = (projectTitle) => {
        //checks to make sure project doesn't already exist
        if (findProjectIndexByTitle(projectTitle) == -1) {
            const project = new Project(projectTitle);
            projects.push(project);
            return project;
        }
        return null;
    };

    const deleteProject = (projectTitle) => {
        const index = findProjectIndexByTitle(projectTitle);
        projects.splice(index, 1);
    };

    const updateProject = (oldTitle, newTitle) => {
        const project = findProject(oldTitle);
        project.setTitle(newTitle);
    }

    return { createTodo, deleteTodo, markTodoComplete, updateTodo, createProject, deleteProject, updateProject }
})();

const screenLogic = (() => {
    const projects = document.getElementById("projects");

    const createProjectCard = (project) => {
        const projectCard = document.createElement("div");
        projectCard.class = "project";
        projectCard.id = project.title;

        //create elements
        const title = document.createElement("p")
        const addBTN = document.createElement("button");
        const editBTN = document.createElement("button");
        const deleteBTN = document.createElement("button");

        //add style and functionality to elements
        title.textContent = project.title;

        addBTN.textContent = "Add New Todo";
        addBTN.addEventListener("click", () => {
            const submitBTN = document.getElementById("submitTodo");
            submitBTN.textContent = "Add Todo!";
            //sets the onclick effect of the submit button so that it will add the todo
            //to the project that addBTN button was clicked on
            //
            //onClick is used because we want to replace the old project with this one
            //instead of adding multiple events
            submitBTN.onclick = () => { createTodo(project.title) };

            const todoMenu = document.getElementById("todoMenu");
            todoMenu.showModal();
        });

        editBTN.textContent = "Edit Project";
        editBTN.addEventListener("click", () => {
            const submitBTN = document.getElementById("submitProject");
            submitBTN.textContent = "Update Project!";
            submitBTN.onclick = () => { updateProject(project.title) };

            const projectMenu = document.getElementById("projectMenu");
            projectMenu.showModal();
        });

        deleteBTN.textContent = "Delete Project";
        deleteBTN.addEventListener("click", () => {
            const confirmDeleteBTN = document.getElementById("confirmDelete");
            confirmDeleteBTN.onclick = () => { deleteProject(project.title) };

            const deleteMenu = document.getElementById("deleteMenu");
            deleteMenu.showModal();
        })

        //add elements to project card
        projectCard.appendChild(title);
        projectCard.appendChild(addBTN);
        projectCard.appendChild(editBTN);
        projectCard.appendChild(deleteBTN);

        //add project to document
        projects.appendChild(projectCard);
    };

    const createTodoCard = (todo) => {
        const todoCard = document.createElement("div");
        cardId = `${todo.projectTitle} ${todo.title} `;
        todoCard.id = cardId;

        //create elements of card
        const title = document.createElement("p");
        const markDoneBTN = document.createElement("button");
        const editBTN = document.createElement("button");
        const deleteBTN = document.createElement("button");
        const description = document.createElement("p");
        const date = document.createElement("p");
        const priority = document.createElement("p");

        //edit elements
        title.textContent = todo.title;
        title.id = cardId + "title";

        description.textContent = todo.description;
        description.id = cardId + "description";

        date.textContent = todo.dueDate;
        date.id = cardId + "date";

        priority.textContent = todo.priority;
        priority.id = cardId + "priority";

        markDoneBTN.textContent = "Mark Todo as Done";
        markDoneBTN.addEventListener("click", () => {
            internalLogic.markTodoComplete(todo);
            title.setAttribute("class", "complete")
            description.setAttribute("class", "complete")
        });

        editBTN.textContent = "Edit Todo";
        editBTN.addEventListener("click", () => {
            const submitTodoBTN = document.getElementById("submitTodo");
            submitTodoBTN.textContent = "Update todo!"
            submitTodoBTN.onclick = () => {updateTodo(todo)};
            
            const todoMenu = document.getElementById("todoMenu");
            todoMenu.showModal();
        })

        deleteBTN.textContent = "Delete Todo"
        deleteBTN.addEventListener("click", () => {
            const confirmDeleteBTN = document.getElementById("confirmDelete");
            confirmDeleteBTN.onclick = () => {deleteTodo(todo)};

            const deleteMenu = document.getElementById("deleteMenu");
            deleteMenu.showModal();
            
        })

        //add elements to the todo
        todoCard.appendChild(title);
        todoCard.appendChild(markDoneBTN);
        todoCard.appendChild(editBTN);
        todoCard.appendChild(deleteBTN);
        todoCard.appendChild(description);
        todoCard.appendChild(date);
        todoCard.appendChild(priority);

        //add todo to project
        const project = document.getElementById(todo.projectTitle);
        project.appendChild(todoCard);

    };

    const createTodo = (projectTitle) => {
        //load values from form
        const title = document.getElementById("todoTitle").value
        const description = document.getElementById("description").value
        const date = document.getElementById("date").value
        const priority = document.getElementById("priority").value

        const todo = internalLogic.createTodo(title, description, date, priority, projectTitle);
        createTodoCard(todo);

        const todoMenu = document.getElementById("todoMenu");
        todoMenu.close();
    };

    const updateTodo = (todo) => {
        //load values from form
        const newTitle = document.getElementById("todoTitle").value;
        const newDescription = document.getElementById("description").value;
        const newDate = document.getElementById("date").value;
        const newPriority = document.getElementById("priority").value;

        //updateTodo
        const oldTodoId = `${todo.projectTitle} ${todo.title} `;
        internalLogic.updateTodo(todo, newTitle, newDescription, newDate, newPriority, todo.completed);

        //load screen elements
        const todoCard = document.getElementById(oldTodoId);
        const title = document.getElementById(oldTodoId+"title");
        const description = document.getElementById(oldTodoId+"description");
        const date = document.getElementById(oldTodoId+"date");
        const priority = document.getElementById(oldTodoId+"priority");

        //update screen elements
        const newTodoId = `${todo.projectTitle} ${todo.title} `;

        todoCard.id = newTodoId;

        title.textContent = todo.title;
        title.setAttribute("id", newTodoId + "title");

        description.textContent = todo.description;
        description.id = newTodoId + "description";

        date.textContent = todo.dueDate;
        date.id = newTodoId + "date";

        priority.textContent = todo.priority;
        priority.id = newTodoId + "priority";

        //close menu
        const todoMenu = document.getElementById("todoMenu");
        todoMenu.close();
    }

    const deleteTodo = (todo) => {
        //delete todo on screen
        const cardId = `${todo.projectTitle} ${todo.title} `;
        const todoCard = document.getElementById(cardId);
        const todoLocation = document.getElementById(todo.projectTitle);
        todoLocation.removeChild(todoCard);

        //delete todo internally
        internalLogic.deleteTodo(todo);

        //close menu
        const deleteMenu = document.getElementById("deleteMenu");
        deleteMenu.close();
    }

    const createProject = () => {
        const projectTitle = document.getElementById("projectTitle").value;
        const project = internalLogic.createProject(projectTitle);
        createProjectCard(project);

        const projectMenu = document.getElementById("projectMenu");
        projectMenu.close();
    }

    const updateProject = (projectTitle) => {
        const newTitle = document.getElementById("projectTitle").value;
        internalLogic.updateProject(projectTitle, newTitle);

        //update projectCard
        const projectCard = document.getElementById(projectTitle);
        projectCard.id = newTitle;
        const titleElement = projectCard.querySelector("p");
        titleElement.textContent = newTitle;

        //close menu
        const projectMenu = document.getElementById("projectMenu");
        projectMenu.close();
    }

    const deleteProject = (projectTitle) => {
        internalLogic.deleteProject(projectTitle);

        const projectCard = document.getElementById(projectTitle);
        projects.removeChild(projectCard);

        const deleteMenu = document.getElementById("deleteMenu");
        deleteMenu.close();
    }


    const initialization = (() => {
        const cancelDeleteBTN = document.getElementById("cancelDelete");
        cancelDeleteBTN.addEventListener("click", () => {
            const deleteMenu = document.getElementById("deleteMenu");
            deleteMenu.close();
        });

        const createProjectBTN = document.getElementById("createProject");
        createProjectBTN.addEventListener("click", () => {
            const submitProjectBTN = document.getElementById("submitProject");
            submitProjectBTN.textContent = "Create Project!";
            submitProjectBTN.onclick = () => createProject();

            const projectMenu = document.getElementById("projectMenu");
            projectMenu.showModal();
        });
    })();


    //projects and todos added for testing purposes
    createProjectCard(internalLogic.createProject("todo list"))
    createTodoCard(internalLogic.createTodo("Mow Lawn", "Mow the lawn", "6/28/26", "medium", "todo list"));

    createProjectCard(internalLogic.createProject("other todo list"))
    createTodoCard(internalLogic.createTodo("Wash Dishes", "Wash the dishes", "6/27/26", "high", "other todo list"));
})();