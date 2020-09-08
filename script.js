'use strict';

const score = document.querySelector('.score'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.gameArea'),
	car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startMove);
document.addEventListener('keyup', stopMove);

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false
};

const settings = {
	start: false,
	score: 0,
	speed: 3
};

function startGame() {
	start.classList.add('hide');
	settings.start = true;
	gameArea.append(car);
	requestAnimationFrame(playGame);
}

function playGame() {
	console.log('Play Game');
	if (settings.start === true) {
		requestAnimationFrame(playGame);
	}
}

function startMove(event) {
	event.preventDefault();
	keys[event.key] = true;
}

function stopMove(event) {
	event.preventDefault();
	keys[event.key] = false;
}