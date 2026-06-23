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

        #findIndex(todo) {
            for (let i = 0; i < this.todos.length; i++) {
                if (Array[i] == todo) {
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

        //create buttons
        const addBTN = document.createElement("button");
        const editBTN = document.createElement("button");
        const deleteBTN = document.createElement("button");

        //add style and functionality to buttons
        addBTN.textContent = "Add new todo";
        addBTN.addEventListener("click", () => {
            const submitBTN = document.getElementById("submit");
            //sets the onclick effect of the submit button so that it will add the todo
            //to the project that addBTN button was clicked on
            submitBTN.onclick = () => {createTodo(project.title)};

            const todoModal = document.getElementById("todoModal");
            todoModal.showModal();
        })

        //add buttons to project card
        projectCard.appendChild(addBTN);
        projectCard.appendChild(editBTN);
        projectCard.appendChild(deleteBTN);

        //add project to document
        projects.appendChild(projectCard);
    };

    const createTodoCard = (todo) => {
        const todoCard = document.createElement("div");

        //create elements of card
        const title = document.createElement("p");
        const editBTN = document.createElement("button");
        const markDoneBTN = document.createElement("button");
        const deleteBTN = document.createElement("button");
        const description = document.createElement("p");
        const date = document.createElement("p");
        const priority = document.createElement("p");

        //edit elements
        title.textContent = todo.title;
        description.textContent = todo.description;
        date.textContent = todo.dueDate;
        priority.textContent = todo.priority;

        //add elements to the todo
        todoCard.appendChild(title);
        todoCard.appendChild(editBTN);
        todoCard.appendChild(markDoneBTN);
        todoCard.appendChild(deleteBTN);
        todoCard.appendChild(description);
        todoCard.appendChild(date);
        todoCard.appendChild(priority);

        //add todo to project
        const project = document.getElementById(todo.projectTitle);
        project.appendChild(todoCard);
        
    }

    const createTodo = (projectTitle) => {
        //load values from form
        const title = document.getElementById("title").value
        const description = document.getElementById("description").value
        const date = document.getElementById("date").value
        const priority = document.getElementById("priority").value

        const todo = internalLogic.createTodo(title, description, date, priority, projectTitle);
        createTodoCard(todo);

        const todoModal = document.getElementById("todoModal");
        todoModal.close();
    }

    //testing projects and todos
    createProjectCard(internalLogic.createProject("todo list"))
    createTodoCard(internalLogic.createTodo("Mow Lawn", "Mow the lawn", "6/28/26", "medium", "todo list"));

    createProjectCard(internalLogic.createProject("other todo list"))
    createTodoCard(internalLogic.createTodo("Wash Dishes", "Wash the dishes", "6/27/26", "high", "other todo list"));


})();