//enemy
export class Zombie{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.width=60;
        this.height=90;

        this.speed=1;
        
        this.hp = 50;

        this.damage = 10;

        this.attackCooldown = 0;
    
    }

    update(player){

        const dx=player.x-this.x;
        const dy=player.y-this.y;

        const dist=Math.hypot(dx,dy);
        
        if(this.attackCooldown > 0){

        this.attackCooldown--;

}
       if(dist > 60){

    this.x += (dx/dist) * this.speed;
    this.y += (dy/dist) * this.speed;

}else{

    if(this.attackCooldown <= 0){

        player.hp -= this.damage;

        this.attackCooldown = 60;

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
        ctx.fillStyle = "red";

        ctx.fillRect(
            -25,
            -105,
             50,
             5
);

ctx.fillStyle = "lime";

ctx.fillRect(
    -25,
    -105,
    (this.hp / 50) * 50,
    5
);
        
        );

        ctx.restore();
    }
}

