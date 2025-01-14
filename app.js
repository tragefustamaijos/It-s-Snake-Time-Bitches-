var canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
const c = canvas.getContext("2d");
document.body.insertBefore(canvas, document.body.firstChild);
var width = canvas.width
var height =canvas.height

const speed = 1;
const cell = 25;

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

function check_for_collision()
{
    if(snake.x == food.x && snake.y == food.y)
    {
        snake.body.push(new Tile(food.x, food.y));
        food = new Tile(rand_cell(), rand_cell());
    }
}

window.setInterval(function()
{
    check_for_collision()
    c.clearRect(0, 0, width, height);
    //draw_border();
    snake.move();
    snake.draw();
    draw_food();
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
})


/// This part of code is for the phone users. Hope this shit works or i'm gonna pull my eyeballs out

let startX, startY, endX, endY;

        const swipeArea = document.getElementById('swipeArea');

        // Function to handle the start of the swipe
        window.addEventListener('touchstart', function(event) {
            const touch = event.touches[0];
            startX = touch.clientX; // Get the starting X coordinate
            startY = touch.clientY; // Get the starting Y coordinate
        });

        // Function to handle the end of the swipe
        window.addEventListener('touchend', function(event) {
            const touch = event.changedTouches[0];
            endX = touch.clientX; // Get the ending X coordinate
            endY = touch.clientY; // Get the ending Y coordinate

            // Calculate the differences
            const diffX = endX - startX;
            const diffY = endY - startY;

            // Determine the swipe direction
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontal swipe
                if (diffX > 0 && snake.velocityX != -speed)
                {
                    /// right
                    snake.velocityY = 0
                    snake.velocityX = speed

                } else {
                    //left
                    if(snake.velocityX != speed)
                    {
                        snake.velocityY = 0
                        snake.velocityX = -speed
                    }
                }
            } else {
                // Vertical swipe
                if (diffY > 0 && snake.velocityY != -speed) {
                    //down
                    snake.velocityY = speed;
                    snake.velocityX = 0;
                } else {

                    //up
                    if(snake.velocityY != speed)
                    {
                        snake.velocityY = -speed;
                        snake.velocityX = 0;
                    }
                }
            }
        });

window.addEventListener("resize", function(){
    location.reload();
})