'use strict';

const MAX_ENEMY = 5;
const MAX_AUDIO = 3;
const randomAudio = Math.floor(Math.random() * MAX_AUDIO) + 1;

const score = document.querySelector('.score'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.gameArea'),
	car = document.createElement('div');

const audio = document.createElement('embed');
audio.src = `audio/audio${randomAudio}.mp3`;
audio.type = 'audio/mp3';
audio.style.cssText = 'position: absolute; top: -1000px;';

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
	gameArea.innerHTML = '';
	car.style.left = 125;
	car.style.top = 'auto';
	car.style.bottom = '10px';
	for (let i = 0; i < getAmountElements(100); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * 100) + 'px';
		line.y = i * 100;
		gameArea.append(line);
	}

	for (let i = 0; i < getAmountElements(100 * settings.traffic); i++) {
		const enemy = document.createElement('div');
		const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
		enemy.classList.add('enemy');
		enemy.y = -100 * settings.traffic * (i + 1);
		enemy.style.top = enemy.y + 'px';
		enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		enemy.style.background = `transparent url(./image/enemy${randomEnemy}.png) center / cover no-repeat`;
		gameArea.append(enemy);
	}
	settings.score = 0;
	settings.start = true;
	gameArea.append(car);
	document.body.append(audio);
	settings.x = car.offsetLeft;
	settings.y = car.offsetTop;
	requestAnimationFrame(playGame);
}

function startMove(event) {
	if (keys.hasOwnProperty(event.key)) {
		event.preventDefault();
		keys[event.key] = true;
	}
	console.log(keys);
}

function stopMove(event) {
	if (keys.hasOwnProperty(event.key)) {
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

function moveEnemy() {
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach((item) => {
		let carRect = car.getBoundingClientRect();
		let enemyRect = item.getBoundingClientRect();

		if (carRect.top <= enemyRect.bottom &&
			carRect.right >= enemyRect.left &&
			carRect.left <= enemyRect.right &&
			carRect.bottom >= enemyRect.top) {
			settings.start = false;
			console.warn('ДТП');
			audio.remove();
			start.classList.remove('hide');
			start.style.top = score.offsetHeight;
		}

		item.y += settings.speed / 2;
		item.style.top = item.y + 'px';
		if (item.y >= document.documentElement.clientHeight) {
			item.y = -100 * settings.traffic;
			item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		}
	});
}

function playGame() {
	if (settings.start === true) {
		settings.score += settings.speed;
		score.innerHTML = 'SCORE: <br>' + settings.score;
		moveRoad();
		moveEnemy();
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