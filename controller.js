var activeControllers = [];

class KeyHandler {
    constructor(keys, pressAction, releaseAction) {
        this.keys = keys;
        this.pressAction = pressAction;
        this.releaseAction = releaseAction;

        this.pressed = [];
        for(let i = 0; i < this.keys.length; i++) {
            this.pressed[i] = false;
        }
    }// constructor

    get isActive() {
        for(let p of this.pressed) {
            if(!this.pressed)
                return false;
        }

        return true;
    }
}// class KeyHandler

class Controller {
    constructor(handlers) {
        this.handlers = handlers;
        activeControllers.push(this);
    }// constructor
}// class KeyController

document.addEventListener("keydown", (event) => {
    for(let i = 0; i < activeControllers.length; i++) {
        for(let h of activeControllers[i].handlers) {
            for(let k in h.keys) {
                if(event.key == h.keys[k]) {
                    h.pressed[k] = true;
                    if(h.pressAction) h.pressAction();
                    return;
                }
            }
        }
    }
}); // keydown

document.addEventListener("keyup", (event) => {
    for(let i = 0; i < activeControllers.length; i++) {
        for(let h of activeControllers[i].handlers) {
            for(let k in h.keys) {
                if(event.key == h.keys[k]) {
                    h.pressed[k] = false;
                    if(h.releaseAction) h.releaseAction();
                    return;
                }
            }
        }
    }
}); // keyup

document.addEventListener("mousemove", () => {
    document.body.style.cursor = "unset";
});// mouse move
document.addEventListener("mousedown", () => {
    document.body.style.cursor = "unset";
});// mouse down
// document.addEventListener("mouseup", () => {
//     document.body.style.cursor = "unset";
// });// mouse up