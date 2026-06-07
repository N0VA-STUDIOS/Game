//game
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
