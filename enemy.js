//enemy
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

