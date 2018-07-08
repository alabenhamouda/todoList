var input = document.querySelector("input");
var lis = Array.prototype.slice.call(document.querySelectorAll("ul>li"));
input.addEventListener("keypress", function(event){
    if(event.key === "Enter" && input.value){
        makeReq("POST", "/api/todos", JSON.stringify({"name": input.value}))
        .then(function(response){
            return JSON.parse(response);
        })
        .then(function(response){
            var li = document.createElement("li");
            li.data = {id: response._id};
            var span = document.createElement("span");
            span.innerHTML = "<i class=\"fas fa-times-circle\"></i>";
            span.classList.add("delete");
            li.innerText = response.name;
            li.appendChild(span);
            document.querySelector("ul").appendChild(li);
            lis.push(li);
            input.value = "";
        })
        .catch(function(err){
            console.log(err);
        })
    }
});

input.addEventListener("click", function(){
    var cd = 1;
    var td = 4;
    var pos = td;
    var timer = setInterval(function(){
        if(pos >= 100 + td){
            clearInterval(timer);
        }
        var transparent = "rgba(225,228,200,0) "
        var background = "linear-gradient(45deg, " + transparent + "0%, "+ transparent + (pos-td) + "%, rgba(230,203,30,1) " + (pos-cd) + "%, rgba(230,203,30,1) " + (pos+cd) + "%, " + transparent + (pos+td) + "%, " + transparent + "100%)";
        input.style.background = background;
        pos += pos*0.1;
    }, 10);
})

document.querySelector("ul").addEventListener("click", function(event){
    if(event.target.nodeName === 'LI'){
        grabTodo(event.target)
        .then(function(todo){
            event.target.classList.toggle("completed");
            makeReq("PUT", "/api/todos/" + todo._id, JSON.stringify({completed: !todo.completed}));
        })
    } else if(event.target.nodeName === "I") {
        var li = event.target.parentNode.parentNode;
        grabTodo(li)
        .then(function(todo){
            fade(li);
            lis.splice(lis.indexOf(li), 1);
            return makeReq("DELETE", "/api/todos/" + todo._id);
        })
        .catch(function(err){
            console.log(err);
        })
    }
})

function makeReq(method, url, body){    
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if(method === "POST" || method === "PUT") xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if(this.status >= 200 && this.status < 300){
                resolve(xhr.response);
            } else {
                reject(this.response);
            }
        };
        xhr.send(body);
    });

}

function grabTodo(li){
    return makeReq("GET", "/api/todos")
    .then(function(response){
    return JSON.parse(response);
    })
    .then(function(todos){
        return todos[lis.indexOf(li)];
    })
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.remove();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}