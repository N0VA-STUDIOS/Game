//main
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
