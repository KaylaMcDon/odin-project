const internalLogic = (() => {
    class Todo {
        constructor(title, description, dueDate, priority) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
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

        updateTodo(oldTodoTitle, newTitle, description, dueDate, priority, completed) {
            const index = this.#findIndex(todo);
            this.todos[index].updateTodo(newTitle, description, dueDate, priority, completed);
        }

        markTodoComplete(title){
            const index = this.#findIndex(title);
            this.todos[index].completeTodo();
        }

        setTitle(newTitle) {
            this.title = newTitle;
        }
    }

    const projects = new Array();
    const todoList = new Project("todo list");
    projects.push(todoList);
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
    const createTodo = ((title, description, dueDate, priority, project) => {
        const todo = new Todo(title, description, dueDate, priority);
        const projectIndex = findProjectIndexByTitle(project);
        projects[projectIndex].addTodo(todo);
    });

    const deleteTodo = (title, projectTitle) => {
        const project = findProject(projectTitle);
        return project.deleteTodo(title);
    }

    const markTodoComplete = (title, projectTitle) => {
        const project = findProject(projectTitle);
        project.markTodoComplete(title);
    }

    const updateTodo = (oldTodoTitle, projectTitle, newTitle, description, dueDate, priority, completed) => {
        const project = findProject(projectTitle);
        project.updateTodo(oldTodoTitle, newTitle, description, dueDate, priority, completed);
    }

    const createProject = (projectTitle) => {
        //check if project title already exists
        if (findProjectIndexByTitle(projectTitle) != -1) {
            return false;
        } else {
            const project = new Project(projectTitle);
            projects.push(projectTitle);
            return true;
        }
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

})();