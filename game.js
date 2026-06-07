const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const menu = document.getElementById("menu");
const pauseMenu = document.getElementById("pauseMenu");
const startBtn = document.getElementById("startBtn");
const resumeBtn = document.getElementById("resumeBtn");
const waveText = document.getElementById("wave");
const healthText = document.getElementById("health");
const hud = document.getElementById("hud");

let gameStarted = false;
let paused = false;

const keys = {};

const player = {
    x: 400,
    y: 300,
    size: 40,
    speed: 4,
    hp: 100
};

let wave = 1;
let enemies = [];

class Zombie{
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = 35;
        this.speed = 1 + Math.random();
        this.hp = 3;
    }

    update(){
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx,dy);

        this.x += dx/dist*this.speed;
        this.y += dy/dist*this.speed;

        if(dist < 30){
            player.hp -= 0.05;
        }
    }

    draw(){
        ctx.fillStyle="green";
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}

function spawnWave(){

    enemies = [];

    for(let i=0;i<wave*3;i++){
        enemies.push(new Zombie());
    }

    waveText.textContent="Ronda "+wave;
}

function update(){

    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    enemies.forEach(z=>z.update());

    healthText.textContent =
    "Vida: "+Math.floor(player.hp);

    if(player.hp <= 0){
        alert("Game Over");
        location.reload();
    }

    if(enemies.length===0){
        wave++;
        spawnWave();
    }
}

function draw(){

    ctx.fillStyle="#222";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="cyan";
    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );

    enemies.forEach(z=>z.draw());
}

function loop(){

    if(!paused && gameStarted){
        update();
        draw();
    }

    requestAnimationFrame(loop);
}

startBtn.onclick=()=>{

    menu.style.display="none";
    hud.style.display="block";

    gameStarted=true;

    spawnWave();
};

resumeBtn.onclick=()=>{

    paused=false;
    pauseMenu.style.display="none";
};

window.addEventListener("keydown",e=>{

    keys[e.key.toLowerCase()] = true;

    if(e.key==="Escape" && gameStarted){

        paused=!paused;

        pauseMenu.style.display =
        paused ? "flex" : "none";
    }
});

window.addEventListener("keyup",e=>{

    keys[e.key.toLowerCase()] = false;
});

window.addEventListener("click",()=>{

    enemies.forEach((z,index)=>{

        const dx = z.x-player.x;
        const dy = z.y-player.y;

        if(Math.hypot(dx,dy)<120){

            z.hp--;

            if(z.hp<=0){
                enemies.splice(index,1);
            }
        }
    });
});

loop();
