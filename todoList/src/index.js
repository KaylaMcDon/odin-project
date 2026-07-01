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

const screenLogic = (() => {
    const createProjectCard = (project) => {
        const projectCard = document.createElement("div");
        projectCard.setAttribute("class", "project");
        projectCard.id = project.title;

        //create elements
        const title = document.createElement("p")
        const addBTN = document.createElement("button");
        const sortBTN = document.createElement("button");
        const editBTN = document.createElement("button");
        const deleteBTN = document.createElement("button");

        //add style and functionality to elements
        title.textContent = project.title;

        addBTN.textContent = "+";
        addBTN.addEventListener("click", () => {
            const submitBTN = document.getElementById("submitTodo");
            submitBTN.textContent = "Add Todo";
            //sets the onclick effect of the submit button so that it will add the todo
            //to the project that addBTN button was clicked on
            //
            //onClick is used because we want to replace the old project with this one
            //instead of adding multiple events
            submitBTN.onclick = () => { createTodo(project.title) };

            const todoMenu = document.getElementById("todoMenu");
            todoMenu.showModal();
        });

        sortBTN.textContent = "⇅";
        sortBTN.addEventListener("click", () => {
            //sets button onclick effects
            const reverseBTN = document.getElementById("reverseSort");
            const titleBTN = document.getElementById("titleSort");
            const dueDateBTN = document.getElementById("dueDateSort");
            const priorityBTN = document.getElementById("prioritySort");

            reverseBTN.onclick = () => {
                internalLogic.reverseProjectTodos(project.title);
                updateProjectTodos(project.title);
            };

            titleBTN.onclick = () => {
                internalLogic.sortProjectTodos(project.title, "title");
                updateProjectTodos(project.title);
            };

            dueDateBTN.onclick = () => {
                internalLogic.sortProjectTodos(project.title, "dueDate");
                updateProjectTodos(project.title);
            };

            priorityBTN.onclick = () => {
                internalLogic.sortProjectTodos(project.title, "priority");
                updateProjectTodos(project.title);
            };


            //loads dialog box
            const sortMenu = document.getElementById("sortMenu");
            sortMenu.showModal();
        })


        editBTN.textContent = "✎";
        editBTN.addEventListener("click", () => {
            const submitBTN = document.getElementById("submitProject");
            submitBTN.textContent = "Update Project ";
            submitBTN.onclick = () => { updateProject(project.title) };

            const projectMenu = document.getElementById("projectMenu");
            projectMenu.showModal();
        });

        deleteBTN.textContent = "🗑";
        deleteBTN.addEventListener("click", () => {
            const confirmDeleteBTN = document.getElementById("confirmDelete");
            confirmDeleteBTN.onclick = () => { deleteProject(project.title) };

            const deleteMenu = document.getElementById("deleteMenu");
            deleteMenu.showModal();
        })

        //add elements to project card, divs are for stylization
        const header = document.createElement("div");
        const buttons = document.createElement("div");
        header.setAttribute("class", "projectHeader");
        buttons.setAttribute("class", "buttons");

        buttons.appendChild(addBTN);
        buttons.appendChild(sortBTN);
        buttons.appendChild(editBTN);
        buttons.appendChild(deleteBTN);

        header.appendChild(title);
        header.appendChild(buttons);

        projectCard.appendChild(header);

        //add project to document
        const nextCol = getSmallestColumn()
        nextCol.appendChild(projectCard);
    };

    const createTodoCard = (todo) => {
        const todoCard = document.createElement("div");
        todoCard.setAttribute("class", "todo")
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

        date.textContent = "Due: " + todo.dueDate;
        date.id = cardId + "date";

        priority.textContent = "Priority: " + todo.priority;
        priority.id = cardId + "priority";

        markDoneBTN.textContent = "✓";
        markDoneBTN.addEventListener("click", () => {
            completeTodo(todo);
        });

        editBTN.textContent = "✎";
        editBTN.addEventListener("click", () => {
            const submitTodoBTN = document.getElementById("submitTodo");
            submitTodoBTN.textContent = "Update Todo "
            submitTodoBTN.onclick = () => { updateTodo(todo) };

            const todoMenu = document.getElementById("todoMenu");
            todoMenu.showModal();
        })

        deleteBTN.textContent = "🗑"
        deleteBTN.addEventListener("click", () => {
            const confirmDeleteBTN = document.getElementById("confirmDelete");
            confirmDeleteBTN.onclick = () => { deleteTodo(todo) };

            const deleteMenu = document.getElementById("deleteMenu");
            deleteMenu.showModal();

        })

        //add elements to the card, divs are for stylization
        const header = document.createElement("div");
        const buttons = document.createElement("div");
        const body = document.createElement("div");
        const footer = document.createElement("div");

        header.setAttribute("class", "todoHeader");
        buttons.setAttribute("class", "buttons");
        body.setAttribute("class", "todoBody");
        footer.setAttribute("class", "todoFooter");

        buttons.appendChild(markDoneBTN);
        buttons.appendChild(editBTN);
        buttons.appendChild(deleteBTN);

        header.appendChild(title);
        header.appendChild(buttons);

        body.appendChild(description);

        footer.appendChild(date);
        footer.appendChild(priority);

        todoCard.appendChild(header);
        todoCard.appendChild(body);
        todoCard.appendChild(footer);

        //add todo to project
        const project = document.getElementById(todo.projectTitle);
        project.appendChild(todoCard);

    };

    const updateProjectTodos = (projectTitle) => {
        const projectCard = document.getElementById(projectTitle);
        const todos = internalLogic.getProjectTodos(projectTitle);

        //clears old todo order
        while (projectCard.childElementCount > 1) {
            projectCard.removeChild(projectCard.lastChild);
        }

        //redisplays with new order
        for (let i = 0; i < todos.length; i++) {
            createTodoCard(todos[i]);
        }
    }


    const balanceProjectColumns = () => {
        const smallestCol = getSmallestColumn()
        const largestCol = getLargestColumn()

        const minChildCount = smallestCol.childElementCount;
        const maxChildCount = largestCol.childElementCount;

        const smallestIsBeforeLargest = smallestCol.dataset.columnnum < largestCol.dataset.columnnum
        const hasEmptyGap = minChildCount == 0 && smallestIsBeforeLargest;

        const isUneven = minChildCount < maxChildCount - 1;
        if (isUneven || hasEmptyGap) {
            const project = largestCol.lastChild;
            largestCol.removeChild(project);
            smallestCol.appendChild(project);
        }
    }

    const getSmallestColumn = () => {
        const col1 = document.getElementById("col1");
        const col2 = document.getElementById("col2");
        const col3 = document.getElementById("col3");
        const col4 = document.getElementById("col4");

        const col1ChildCount = col1.childElementCount;
        const col2ChildCount = col2.childElementCount;
        const col3ChildCount = col3.childElementCount;
        const col4ChildCount = col4.childElementCount;

        // finds the column with the least children
        // from left to right if tied
        const minChildCount = Math.min(col1ChildCount, col2ChildCount, col3ChildCount, col4ChildCount)
        switch (minChildCount) {
            case col1ChildCount:
                return (col1);
            case col2ChildCount:
                return (col2);
            case col3ChildCount:
                return (col3);
            case col4ChildCount:
                return (col4);
        }
    }

    const getLargestColumn = () => {
        const col1 = document.getElementById("col1");
        const col2 = document.getElementById("col2");
        const col3 = document.getElementById("col3");
        const col4 = document.getElementById("col4");

        const col1ChildCount = col1.childElementCount;
        const col2ChildCount = col2.childElementCount;
        const col3ChildCount = col3.childElementCount;
        const col4ChildCount = col4.childElementCount;

        // finds the column with the least children
        // from left to right if tied
        const minChildCount = Math.max(col1ChildCount, col2ChildCount, col3ChildCount, col4ChildCount)
        switch (minChildCount) {
            case col4ChildCount:
                return (col4);
            case col3ChildCount:
                return (col3);
            case col2ChildCount:
                return (col2);
            case col1ChildCount:
                return (col1);
        }
    }


    const createTodo = (projectTitle) => {
        //load values from form
        const title = document.getElementById("todoTitle").value
        const description = document.getElementById("description").value
        const date = document.getElementById("date").value
        const priority = document.getElementById("priority").value

        const todo = internalLogic.createTodo(title, description, date, priority, projectTitle);


        const errorText = document.getElementById("todoErrorMessage");

        if (todo != null) {
            createTodoCard(todo);

            errorText.textContent = "";
            const todoMenu = document.getElementById("todoMenu");
            todoMenu.close();
        } else {
            errorText.textContent = "Error: todo already exists"
        }
    };

    const completeTodo = (todo) => {
        internalLogic.markTodoComplete(todo);


        const todoId = `${todo.projectTitle} ${todo.title} `;

        const title = document.getElementById(todoId + "title");
        const description = document.getElementById(todoId + "description");
        const date = document.getElementById(todoId + "date");
        const priority = document.getElementById(todoId + "priority");


        title.setAttribute("class", "complete");
        description.setAttribute("class", "complete");
        date.setAttribute("class", "complete");
        priority.setAttribute("class", "complete");
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
        const title = document.getElementById(oldTodoId + "title");
        const description = document.getElementById(oldTodoId + "description");
        const date = document.getElementById(oldTodoId + "date");
        const priority = document.getElementById(oldTodoId + "priority");

        //update screen elements
        const newTodoId = `${todo.projectTitle} ${todo.title} `;

        todoCard.id = newTodoId;

        title.textContent = todo.title;
        title.setAttribute("id", newTodoId + "title");

        description.textContent = todo.description;
        description.id = newTodoId + "description";

        date.textContent = "Due: " + todo.dueDate;
        date.id = newTodoId + "date";

        priority.textContent = "Priority: " + todo.priority;
        priority.id = newTodoId + "priority";

        //close menu
        const todoMenu = document.getElementById("todoMenu");
        todoMenu.close();
    };

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
    };


    const createProject = () => {
        const projectTitle = document.getElementById("projectTitle").value;
        const project = internalLogic.createProject(projectTitle);

        const errorText = document.getElementById("projectErrorMessage");

        if (project != null) {
            createProjectCard(project);

            errorText.textContent = "";
            const projectMenu = document.getElementById("projectMenu");
            projectMenu.close();
        } else {
            errorText.textContent = "Error: project already exists"
        }
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
        projectCard.parentNode.removeChild(projectCard);

        const deleteMenu = document.getElementById("deleteMenu");
        deleteMenu.close();

        balanceProjectColumns();
    }


    const initialization = (() => {
        const createProjectBTN = document.getElementById("createProject");
        createProjectBTN.addEventListener("click", () => {
            const submitProjectBTN = document.getElementById("submitProject");
            submitProjectBTN.textContent = "Create Project ";
            submitProjectBTN.onclick = () => createProject();

            const projectMenu = document.getElementById("projectMenu");
            projectMenu.showModal();
        });

        const cancelDeleteBTN = document.getElementById("cancelDelete");
        cancelDeleteBTN.addEventListener("click", () => {
            const deleteMenu = document.getElementById("deleteMenu");
            deleteMenu.close();
        });

        const cancelTodoBTN = document.getElementById("cancelTodo");
        cancelTodoBTN.addEventListener("click", () => {
            const errorText = document.getElementById("todoErrorMessage");
            errorText.textContent = "";

            const todoMenu = document.getElementById("todoMenu");
            todoMenu.close();
        });

        const cancelProjectBTN = document.getElementById("cancelProject");
        cancelProjectBTN.addEventListener("click", () => {
            const errorText = document.getElementById("projectErrorMessage");
            errorText.textContent = "";

            const projectMenu = document.getElementById("projectMenu");
            projectMenu.close();
        });

        const cancelSortBTN = document.getElementById("cancelSort");
        cancelSortBTN.addEventListener("click", () => {
            const sortMenu = document.getElementById("sortMenu");
            sortMenu.close();
        })
    })();


    //projects and todos added for testing purposes
    createProjectCard(internalLogic.createProject("todo list"))
    createTodoCard(internalLogic.createTodo("Mow Lawn", "Mow the lawn", "2026-06-28", "Medium", "todo list"));

    createProjectCard(internalLogic.createProject("other todo list"))
    createTodoCard(internalLogic.createTodo("Wash Dishes", "Wash the dishes", "2026-06-27", "High", "other todo list"));
})();