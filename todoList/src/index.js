class todo {
    constructor(title, description, dueDate, priority, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    changeCompletionStatus() {
        this.completed = !this.completed;
    }
}

class project {
    constructor(title, todos){
        this.title=title;
        this.todos=Array();
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    findIndex(todo) {
        for(let i=0; i<this.todos.length; i++){
            if(Array[i]==todo){
                return i;
            }
        }
        return -1;
    }

    deleteIndex(index) {
        todos=this.todos.slice(index, 1);
    }

    deleteTodo(todo){
        let index = this.findIndex(todo);
        if(index!=-1){
            this.deleteIndex(index);
            return true;
        }
        return false;
    }
}
