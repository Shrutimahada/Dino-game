score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 4000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {// the arrow up keycode is 38
        dino = document.querySelector('.dino');// to get the class dino
        dino.classList.add('animateDino');// creating animation
        setTimeout(() => {
            dino.classList.remove('animateDino')// the time here removes the class after 700 milliseconds
        }, 700);// to remove class after certain period of time of click so that i can add it later
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));//this gives computed x value of dino
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";// this makes dino to jump back in the same way it moved forward 
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');// to select the dino class
    gameOver = document.querySelector('.gameOver');// to select the gameOver class
    obstacle = document.querySelector('.obstacle');// to select the obstacle class

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    // getComputedStyle method(class,selector element) and the left value gives the current left value
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);// this gives the absolute x axis difference between dino and the dragon
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over"//innerHtml method is used to type the message in html page
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();  
            audio.pause();  
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;// dummy variable to increase score correctly
        setTimeout(() => {
            cross = true;
        }, 1000);
        // the set code is kept into the timeout so tha the change in obstacle speed occurs after 500 seconds of crossing
        // the below timeout is written to increase the obstacle speed
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            //parseFloat is used to make the animation duration more accurate
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            //console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);
// function to update a score of the game
function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}