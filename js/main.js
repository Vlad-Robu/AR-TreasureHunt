document.addEventListener("DOMContentLoaded", function () {

    window.allow_clicks = false;
    window.loadMinigameStatus = [false, false, false, false, false, false, false, true];

    window.currentMarkerValue = null;
    window.buttonForwardPressed = false;
    window.buttonLeftPressed = false;
    window.buttonRightPressed = false;

const forwardButton = document.getElementById('button-forward');
const rightButton = document.getElementById('button-rotate-right');
const leftButton = document.getElementById('button-rotate-left');

document.querySelector("#scene").addEventListener('markerFound', (event) => {
    window.allow_clicks = true;
    window.currentMarkerValue = event.target.getAttribute('value');
    handleMarkerValue(currentMarkerValue);
});

document.querySelector("#scene").addEventListener('markerLost', () => {
    window.allow_clicks = false;
    unloadUnusedModels();
    forwardButton.style.display = 'none';
    rightButton.style.display = 'none';
    leftButton.style.display = 'none';
});

document.querySelector("#button-rotate-left").addEventListener('touchstart', () => {
    if (allow_clicks) {
        window.buttonLeftPressed = true;
        leftButton.style.backgroundColor = 'lightblue';
        rotate();
    }
});

document.querySelector("#button-rotate-right").addEventListener('touchstart', () => {
    if (allow_clicks) {
        window.buttonRightPressed = true;
        rightButton.style.backgroundColor = 'lightblue';
        rotate();
    }
});

document.querySelector("#button-forward").addEventListener('touchstart', () => {
    if (allow_clicks) {
        window.buttonForwardPressed = true;
        forwardButton.style.backgroundColor = 'lightblue';
        moveForward();
    }
});

window.addEventListener("touchend", function () {
    window.buttonForwardPressed = false;
    window.buttonRightPressed = false;
    window.buttonLeftPressed = false;
    forwardButton.style.backgroundColor = 'white';
    rightButton.style.backgroundColor = 'white';
    leftButton.style.backgroundColor = 'white';

    const modelEntity = document.querySelector('#model-player');
    if (modelEntity) {
        modelEntity.setAttribute('animation-mixer', 'clip: Idle_2' ); // change this to your player idle animation
    }
});


// document.addEventListener("DOMContentLoaded", function() {
//    document.querySelectorAll("a-entity").forEach(function(entity) {
//        entity.addEventListener("hitstart", function(event) {
//            console.log(
//                event.target.id,
//                "collided with",
//                event.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)
//            );
//        });
//    });
// });
});