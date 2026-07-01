export const internalLogic = (() => {
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

        #deleteIndex(index) {
            this.todos.slice(index, 1);
        }

        findTodo(todoTitle) {
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].title == todoTitle) {
                    return i;
                }
            }
            return -1;
        }

        addTodo(todo) {
            this.todos.push(todo);
        }

        getTodos() {
            return this.todos;
        }

        deleteTodo(todo) {
            let index = this.findTodo(todo);
            if (index != -1) {
                this.#deleteIndex(index);
                return true;
            }
            return false;
        }

        markTodoComplete(title) {
            const index = this.findTodo(title);
            this.todos[index].completeTodo();
        }

        setTitle(newTitle) {
            this.title = newTitle;
        }

        sortTodos(method) {
            if (method == "title") {
                this.todos.sort((a, b) => {
                    if (a.title < b.title) {
                        return 1;
                    } else if (b.title < a.title) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            } else if (method == "dueDate") {
                this.todos.sort((a, b) => {
                    if (a.dueDate < b.dueDate) {
                        return -1;
                    } else if (b.dueDate < a.dueDate) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            } else if (method == "priority") {
                this.todos.sort((a, b) => {
                    if (a.priority == "high") {
                        return -1;
                    } else if (b.priority == "high") {
                        return 1;
                    } else if (a.priority == "medium") {
                        return -1;
                    } else if (b.priority == "medium") {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            }
        }

        reverseTodos() {
            this.todos.reverse();
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
    };

    //public functions
    const createTodo = ((title, description, dueDate, priority, projectTitle) => {
        const project = findProject(projectTitle);
        if (project.findTodo(title) == -1) {
            const todo = new Todo(title, description, dueDate, priority, projectTitle);

            project.addTodo(todo);
            return todo;
        } else {
            return null;
        }


    });

    const markTodoComplete = (todo) => {
        const project = findProject(todo.getProjectTitle());
        project.markTodoComplete(todo.getTitle());
    }

    const updateTodo = (todo, title, description, dueDate, priority, completed) => {
        todo.updateTodo(title, description, dueDate, priority, completed);
    }

    const deleteTodo = (todo) => {
        const project = findProject(todo.getProjectTitle());
        return project.deleteTodo(todo.getTitle());
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

    const getProjectTodos = (projectTitle) => {
        const project = findProject(projectTitle);
        return project.getTodos();
    }

    const sortProjectTodos = (projectTitle, sortingMethod) => {
        const project = findProject(projectTitle);
        project.sortTodos(sortingMethod);
    }

    const reverseProjectTodos = (projectTitle) => {
        const project = findProject(projectTitle);
        project.reverseTodos();
    }

    const updateProject = (oldTitle, newTitle) => {
        const project = findProject(oldTitle);
        project.setTitle(newTitle);
    }

    const deleteProject = (projectTitle) => {
        const index = findProjectIndexByTitle(projectTitle);
        projects.splice(index, 1);
    };

    return { createTodo, markTodoComplete, updateTodo, deleteTodo, createProject, getProjectTodos, sortProjectTodos, reverseProjectTodos, updateProject, deleteProject }
})();