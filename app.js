var canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
const c = canvas.getContext("2d");
document.body.insertBefore(canvas, document.body.firstChild);
var width = canvas.width
var height =canvas.height

const speed = 1;
const cell = 25;
var isGameOver = false;
var timer;
c.font = "20px Times New Roman"
var message = "Game Over, Bitch!"
let lungime_mesaj = c.measureText(message).width

function rand_cell()
{
    return Math.floor(Math.random() * (width-cell)/cell);
}

function Tile(x, y)
{
    this.x = x;
    this.y = y;
}

function draw_line(x1, y1, x2, y2)
{
    /// up
    c.beginPath()
    c.strokeStyle = "white";
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke()
}

function draw_border()
{
    for(let i =0; i<= width; i+=cell)
    {
        draw_line(0, i, width, i);
        draw_line(i, 0, i, width)
    }
}
// #########################


var food = new Tile(rand_cell(), rand_cell());
function draw_food()
{
    c.strokeStyle = "white"
    c.beginPath();
    c.fillStyle = "cornflowerblue";
    c.rect(food.x * cell, food.y * cell, cell, cell)
    c.fill()
    c.stroke()
}

var snake = {
    x: 10,
    y: 10,
    velocityX: 0,
    velocityY: 0,
    body: [],
    draw: function()
    {
        
        /// the head
        c.strokeStyle = "red"
        c.beginPath();
        c.fillStyle = "green";
        c.rect(this.x * cell, this.y * cell, cell , cell)
        c.fill();
        c.stroke()

        /// the body
        c.strokeStyle = "lime"
        for(var bodyPart of this.body)
        {
            c.beginPath();
            c.rect(bodyPart.x * cell, bodyPart.y * cell, cell, cell);
            c.fill()
            c.stroke()
        }
    },
    move: function()
    {
        /// the body
        for(let i = this.body.length - 1; i>=0; i--)
            {
                var bodyPart = this.body[i];
                if(i == 0)
                {
                    bodyPart.x = this.x
                    bodyPart.y = this.y;
                }
                else
                {
                    var prevBodyPart = this.body[i-1];
                    bodyPart.x = prevBodyPart.x;
                    bodyPart.y = prevBodyPart.y
                }
            }

        // the head
        this.x += snake.velocityX;
        this.y += snake.velocityY;
    }
}

function GameOver()
{
    
    c.fillStyle = "red"
    c.fillText("Game Over, Bitch!", width/2 - lungime_mesaj/2, height/2 - 20)
}

function check_for_collision()
{
    // check for hitting the boarder
    if(snake.x *cell < 0 || (snake.x + 1) *cell > width ||
        snake.y *cell < 0 || (snake.y + 1) * cell > height)
            {clearInterval(timer)
            GameOver()
            }

    // hitting itself
    for(var bodyPart of snake.body)
    {
        if(bodyPart.x == snake.x && bodyPart.y == snake.y)
           {clearInterval(timer)
            GameOver();
           }
    }

    /// food
    if(snake.x == food.x && snake.y == food.y)
        {
            snake.body.push(new Tile(food.x, food.y));
            food = new Tile(rand_cell(), rand_cell());
        }
}

 timer = setInterval(function()
 {
     c.clearRect(0, 0, width, height);
     //draw_border();

     draw_food();
     check_for_collision()
     c.fillStyle = "white"
     c.fillText("Score: " + snake.body.length, cell-16, cell + 5)
     snake.move();
     snake.draw();
 }, 100)


window.addEventListener("keypress", function(e)
{
    if(e.key == 'w' && snake.velocityY != speed)
    {
        snake.velocityY = -speed;
        snake.velocityX = 0;
    }
    else if(e.key == 's' && snake.velocityY != -speed)
        {
            snake.velocityY = speed;
            snake.velocityX = 0;
        }
    else if(e.key == 'a' && snake.velocityX != speed)
        {
            snake.velocityY = 0
            snake.velocityX = -speed
        }
    else if(e.key == 'd' && snake.velocityX != -speed)
        {
            snake.velocityY = 0
            snake.velocityX = speed
        }

    if(e.key == 'r')
        location.reload()
    console.log(e.key)
})


/// This part of code is for the phone users. Hope this shit works or i'm gonna pull my eyeballs out

function detectTapSide(x, y) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const topThreshold = screenHeight * 0.25;    // Top region: 25% of screen height
    const bottomThreshold = screenHeight * 0.75; // Bottom region: 75% of screen height
    const leftThreshold = screenWidth * 0.25;    // Left region: 25% of screen width
    const rightThreshold = screenWidth * 0.75;   // Right region: 75% of screen width

    if (y < topThreshold && snake.velocityY != speed) {
        // top 
        snake.velocityY = -speed;
        snake.velocityX = 0;
    }
     else if (y > bottomThreshold && snake.velocityY != -speed) {
            //bottom
            snake.velocityY = speed;
            snake.velocityX = 0;
    } 
    else if (x < leftThreshold && snake.velocityX != speed) {
        //console.log("Tapped on the left");
            snake.velocityY = 0
            snake.velocityX = -speed
    } 
    else if (x > rightThreshold && snake.velocityX != -speed) {
            snake.velocityY = 0
            snake.velocityX = speed
        //console.log("Tapped on the right");
    } else {
        console.log("Tapped in the center");
    }
}

// Handle touch events for mobile devices
window.addEventListener('touchstart', function(event) {
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    detectTapSide(x, y);
});

// Handle click events for desktop (mouse click)
window.addEventListener('click', function(event) {
    const x = event.clientX;
    const y = event.clientY;

    detectTapSide(x, y);
});
window.addEventListener("resize", function(){
    location.reload();
})
