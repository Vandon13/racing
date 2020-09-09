'use strict';

const score = document.querySelector('.score'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.gameArea'),
	car = document.createElement('div');

car.classList.add('car');

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false
};

const settings = {
	start: false,
	score: 0,
	speed: 3,
	traffic: 3
};

function getAmountElements(heightElement) {
	return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
	start.classList.add('hide');

	for (let i = 0; i < getAmountElements(100); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * 100) + 'px';
		line.y = i * 100;
		gameArea.append(line);
	}

	settings.start = true;
	gameArea.append(car);
	settings.x = car.offsetLeft;
	settings.y = car.offsetTop;
	requestAnimationFrame(playGame);
}

function startMove(event) {
	if (event.key !== 'F5' && event.key !== 'F12') {
		event.preventDefault();
		keys[event.key] = true;
	}
}

function stopMove(event) {
	if (event.key !== 'F5' && event.key !== 'F12') {
		event.preventDefault();
		keys[event.key] = false;
	}
}

function moveRoad() {
	let lines = document.querySelectorAll('.line');
	lines.forEach((line) => {
		line.y += settings.speed;
		line.style.top = line.y + 'px';

		if (line.y > document.documentElement.clientHeight) {
			line.y = -100;
		}
	});
}

function playGame() {
	if (settings.start === true) {
		moveRoad();
		if (keys.ArrowLeft === true && settings.x > 0) {
			settings.x -= settings.speed;
		}

		if (keys.ArrowRight === true && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
			settings.x += settings.speed;
		}

		if (keys.ArrowUp === true && settings.y > 0) {
			settings.y -= settings.speed;
		}

		if (keys.ArrowDown === true && settings.y < (gameArea.offsetHeight - car.offsetHeight - 1)) {
			settings.y += settings.speed;
		}

		car.style.left = settings.x + 'px';
		car.style.top = settings.y + 'px';
		requestAnimationFrame(playGame);
	}
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startMove);
document.addEventListener('keyup', stopMove);