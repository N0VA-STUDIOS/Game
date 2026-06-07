//gamepad
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
