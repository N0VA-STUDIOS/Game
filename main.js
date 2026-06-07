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
