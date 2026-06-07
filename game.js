//player
export class Player{

    constructor(){

        this.x=500;
        this.y=350;

        this.width=64;
        this.height=96;

        this.speed=4;

        this.color="cyan";
    }

    update(input){

        this.x+=input.x*this.speed;
        this.y+=input.y*this.speed;

        this.x=Math.max(0,Math.min(1200,this.x));
        this.y=Math.max(200,Math.min(650,this.y));
    }

    draw(ctx){

        const scale =
        0.8 + ((this.y-200)/450)*0.4;

        ctx.save();

        ctx.translate(this.x,this.y);
        ctx.scale(scale,scale);

        ctx.fillStyle=this.color;

        ctx.fillRect(
            -this.width/2,
            -this.height,
            this.width,
            this.height
        );

        ctx.restore();
    }
}
js/enemy.js
export class Zombie{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.width=60;
        this.height=90;

        this.speed=1;
    }

    update(player){

        const dx=player.x-this.x;
        const dy=player.y-this.y;

        const dist=Math.hypot(dx,dy);

        if(dist>5){

            this.x+=(dx/dist)*this.speed;
            this.y+=(dy/dist)*this.speed;
        }
    }

    draw(ctx){

        const scale =
        0.8 + ((this.y-200)/450)*0.4;

        ctx.save();

        ctx.translate(this.x,this.y);
        ctx.scale(scale,scale);

        ctx.fillStyle="green";

        ctx.fillRect(
            -30,
            -90,
            60,
            90
        );

        ctx.restore();
    }
}
js/gamepad.js
export function getGamepadInput(){

    const pad = navigator.getGamepads()[0];

    if(!pad){

        return {
            x:0,
            y:0,
            attack:false
        };
    }

    return {

        x:Math.abs(pad.axes[0])>0.15
        ? pad.axes[0] : 0,

        y:Math.abs(pad.axes[1])>0.15
        ? pad.axes[1] : 0,

        attack:pad.buttons[0].pressed
    };
}
js/game.js
import {Player} from "./player.js";
import {Zombie} from "./enemy.js";
import {getGamepadInput} from "./gamepad.js";

export class Game{

    constructor(canvas){

        this.canvas=canvas;
        this.ctx=canvas.getContext("2d");

        this.player=new Player();

        this.enemies=[];

        for(let i=0;i<10;i++){

            this.enemies.push(

                new Zombie(
                    Math.random()*1200,
                    250+Math.random()*350
                )
            );
        }

        this.keys={};

        addEventListener("keydown",e=>{

            this.keys[e.key.toLowerCase()]=true;
        });

        addEventListener("keyup",e=>{

            this.keys[e.key.toLowerCase()]=false;
        });
    }

    update(){

        let input={
            x:0,
            y:0
        };

        if(this.keys["a"]) input.x=-1;
        if(this.keys["d"]) input.x=1;
        if(this.keys["w"]) input.y=-1;
        if(this.keys["s"]) input.y=1;

        const gamepad=getGamepadInput();

        if(gamepad.x!==0)
            input.x=gamepad.x;

        if(gamepad.y!==0)
            input.y=gamepad.y;

        this.player.update(input);

        this.enemies.forEach(e=>
            e.update(this.player)
        );
    }

    draw(){

        const ctx=this.ctx;

        ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        ctx.fillStyle="#222";

        ctx.fillRect(
            0,
            200,
            this.canvas.width,
            500
        );

        this.player.draw(ctx);

        this.enemies.forEach(e=>e.draw(ctx));
    }
}
js/main.js
import {Game} from "./game.js";

const canvas=
document.getElementById("game");

canvas.width=1280;
canvas.height=720;

const game=
new Game(canvas);

document
.getElementById("playBtn")
.onclick=()=>{

    document
    .getElementById("menu")
    .style.display="none";

    document
    .getElementById("hud")
    .style.display="block";
};

function loop(){

    game.update();
    game.draw();

    requestAnimationFrame(loop);
}

loop();
