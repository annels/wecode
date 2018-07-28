//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
ctx.fillStyle = "gold"


//variables
var intervalo
var enemies = []
var frames = 0


//constructores
function Background(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.imagen = new Image()
    this.imagen.src = "https://bit.ly/2LA87TH"
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}


function Heroe(){
    this.x = canvas.width / 3
    this.y = canvas.height - 50
    this.width = 64
    this.height = 64
    this.imagen = new Image()
    this.imagen.src = "https://bit.ly/2v3FTX5"
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
    if(this.x < 0) this.x = 0
    if(this.x > canvas.width) this.x = canvas.width - 8
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }

    this.checkIfTouch = function(enemy){
        return (this.x < enemy.x + enemy.width) &&
                (this.x + this.width > enemy.x) &&
                (this.y < enemy.y + enemy.height) &&
                (this.y + this.height > enemy.y);
        }

}//fin de Heroe

function Enemy(x){
    this.x = x
    this.y = 0
    this.width = 50
    this.height = 50
    this.imagen = new Image()
    this.imagen.src = "https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_77b05ce5bdfb069e316ba875cb672888.png"
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
        this.y++
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}


//instancias
var board = new Background()
var mario = new Heroe()
var enemy1 = new Enemy(100)

//main functions

function update(){
    frames++
    ctx.clearRect(0,0,canvas.clientWidth, canvas.height)
    board.draw()
    mario.draw()
    enemy1.draw()
    generateEnemy()
    drawEnemies()
    checkCollition()
}

function start(){
intervalo = setInterval(update,1000/60)
}


function gameOver(){
    clearInterval(intervalo)
    ctx.font = "50px Avenir"
    ctx.fillStyle = "white"
    ctx.fillText('GAME OVER', 100,100)
}


//aux functions
function generateEnemy(){
    if(frames % 100 === 0)
    var x = Math.floor(Math.random() * 512)
    enemies.push(new Enemy(x))
}

function drawEnemies(){
    enemies.forEach(function(enemy){
     enemy.draw()
    })
}

function checkCollition(){
    enemies.forEach(enemy=>{
        if(mario.checkIfTouch(enemy)){
            gameOver()
        }
    })
}

//listeners
addEventListener('keydown', function(event){
    if(event.keyCode === 37 && mario.x > 0) mario.x -= 64
    if(event.keyCode === 39 && mario.x < canvas.width - 50) mario.x += 64
})

start()








//ctx.fillRect(0,0,512,512)

//variables
// var marioLink = "https://bit.ly/2v3FTX5"
// var imagen = new Image()
// imagen.src = marioLink
// imagen.onload=function(){
//     ctx.drawImage(imagen,0,0,50,50)
// }

// var x = 0
// setInterval(function(){
//     ctx.clearRect(0,0,canvas.width,canvas.height)
//     ctx.drawImage(imagen,x,0,50,50)
//     x++
//     if(x>canvas.clientWidth) x = 0
// },1000/60)

