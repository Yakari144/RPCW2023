const { table } = require("console")

exports.index = function(tasks){
    pagHTML = header()
    pagHTML += forms()
    pagHTML += todo(tasks)
    pagHTML += done(tasks)
    pagHTML += footer()
    return pagHTML
}

function header(){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>My ToDo List</title>
        </head>
        <body>
    `
}

function todo(tasks){
    var pagHTML = `
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>ToDo</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Date Dued</th><th>Who</th><th>Description</th><th></th>
                        </tr>
                `
    for(let i=0; i < tasks.length ; i++){
        if(tasks[i].doneAt==""){
            var d = new Date().toISOString().substring(0, 16)
            pagHTML += `
                            <tr>
                                <td>${tasks[i].date}</td>
                                <td>${tasks[i].who}</td>
                                <td>${tasks[i].description}
                                <td>
                                    <form action="/delete" method="POST">
                                        <input class="w3-hide" type="text" name="id" value="${tasks[i].id}">
                                        <button class="w3-btn" type="submit">Delete</button>
                                    </form>
                                </td>
                                <td>
                                    <form action="/done" method="POST">
                                        <input class="w3-hide" type="text" name="id" value="${tasks[i].id}">
                                        <input class="w3-hide" type="text" name="date" value="${d}">
                                        <button class="w3-btn" type="submit">Do</button>
                                    </form>
                                </td>
                            </tr>
                            `
        }    
    }    
    pagHTML += `
                    </table>
                </div>
            </div>
    `
    return pagHTML
}

function done(tasks){
    var pagHTML = `
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Completed</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Date Dued</th><th>Who</th><th>Description</th><th>Completed At</th>
                        </tr>
                `
    for(let i=0; i < tasks.length ; i++){
        if(tasks[i].doneAt!=""){
            var d = new Date().toISOString().substring(0, 16)
            pagHTML += `
                            <tr>
                                <td>${tasks[i].date}</td>
                                <td>${tasks[i].who}</td>
                                <td>${tasks[i].description}</td>
                                <td>${tasks[i].doneAt}</td>
                                <td>
                                    <form action="/delete" method="POST">
                                        <input class="w3-hide" type="text" name="id" value="${tasks[i].id}">
                                        <button class="w3-btn" type="submit">Delete</button>
                                    </form>
                                </td>
                                <td>
                                    <form action="/undone" method="POST">
                                        <input class="w3-hide" type="text" name="id" value="${tasks[i].id}">
                                        <button class="w3-btn" type="submit">Undo</button>
                                    </form>
                                </td>
                            </tr>
                            `
        }
    }
    pagHTML += `
                    </table>
                </div>
            </div>
    `
    return pagHTML
}

function forms(){
    return `
    <div class="w3-card-4">
        <header class="w3-container w3-teal">
            <h2>Add Task</h2>
        </header>
    
        <form class="w3-container" method="POST">
            <br/>
            <label>Date Dued:</label>
            <input class="w3-input w3-round" type="date" name="date">
            <label>Who:</label>
            <input class="w3-input w3-round" type="text" name="who">
            <label>Description:</label>
            <input class="w3-input w3-round" type="text" name="description">
            <br/>
            <button class="w3-btn w3-teal w3-mb-2" type="submit">Add</button>
        </form>     
    </div>`
}

function footer(){
    var pagHTML = `
        </body>
    </html>
    `
    return pagHTML
}

