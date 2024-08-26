const my_window = document.getElementById("window")
const width = 30
let x = 1
let y = 0
speed = 1
let grid = new_grid()
let body_length = 3
let body = []
let food = [13,15]
function new_grid(){
    let grid = []
    for(let i = 0;i<width;i++){
        let row = []
        for(let j = 0;j<width;j++){
            row.push(0)
        }
        grid.push(row)
    }
    return grid
}

function up_date(){
    let n_grid = new_grid()
    let indx = find_head(grid)
    body.push(indx)
    if(indx[0]>=width-1  && x >0){
        indx[0] = 0
    }else if(indx[0]== 0 && x <0){
        indx[0] = width-1
    }
    else if(x!=0){
        indx[0] += x
    }else if(indx[1]>=width-1 && y >0 ){
        indx[1] = 0
    }else if(indx[1]== 0 && y <0 && indx[0]!= 0){
        indx[1] = width-1
    }
    else{
        indx[1] += y
    }
    // console.log(x,y,indx)
    for(let i = 0;i<body.length;i++){
    }
    n_grid[indx[0]][indx[1]] = 2
    grid = n_grid.slice()
    if(body_length < body.length){
        body.shift()
    }
    for(let i = 0;i<body.length;i++){
        if(grid[body[i][0]][body[i][1]] == 0){
            grid[body[i][0]][body[i][1]] = 1
        }
    }
    if(find_head(grid)[0] == food[0] && find_head(grid)[1] == food[1]){
        // console.log("aaaaaaaa")
        body_length += 1
        food = [Math.floor(Math.random()*width),Math.floor(Math.random()*width)]
    }else{
        grid[food[0]][food[1]] = 3
    }
    draw(grid)

}
function find_head(grid){
    for(let i = 0;i<width;i++){
        for(let j = 0;j<width;j++){
            if(grid[i][j] == 2){
                return [i,j]
            }
        }
    }
}
function draw(grid){
    let child = my_window.lastElementChild;
    if(child!=null){
    for(let i = 0;i<width;i++){
        my_window.removeChild(child)
        child = my_window.lastElementChild
    }}
    for(let i = 0;i<width;i++){ 
        let p = document.createElement("p")
        for(let j = 0;j<width;j++){
            let s = document.createElement("span")
            s.innerText = "@"
            if(grid[i][j] == 0){
                s.style.color = "black"
            }else if (grid[i][j] == 2){
                s.style.color = "red"
            }else if (grid[i][j] == 1){
                s.style.color = "blue"
            }else if (grid[i][j] == 3){
                s.style.color = "green"
            }
            p.append(s)
        }
        my_window.append(p)
    }
}

grid[0][5] = 2
grid[0][6] = 1

draw(grid)
setInterval(up_date,150)
let last_pressed = ""
document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 38 && last_pressed != "down") {
        y = 0
        last_pressed = "up"
        x = -1 * speed
    } else if (e.keyCode === 40 && last_pressed != "up"){
        y = 0
        last_pressed = "down"
        x = speed
    } else if (e.keyCode === 37 && last_pressed != "left") {
        x = 0
        last_pressed = "right"
        y = -1 * speed
    } else if (e.keyCode === 39 && last_pressed != "right") {
        x = 0
        last_pressed = "left"
        y = speed
    }
    console.log(last_pressed)
  }