const startButton = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const remainingTime = document.querySelector('#time');
const screens = document.querySelectorAll('.screen');
const board = document.querySelector('#board');

let gameTime = 0;
let score = 0;

const HEX_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

startButton.addEventListener('click', (evt) => {
	evt.preventDefault();

	screens[0].classList.add('up');
});

timeList.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('time-btn')) {
		gameTime = parseInt(evt.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('circle')) {
		 score++;
		 evt.target.remove();
		 createRandomCircle();
	}
})

function startGame() {
	setInterval(decreseTime, 1000);
	setTime(gameTime);
	createRandomCircle();
};

function decreseTime() {
	if (gameTime === 0) {
		finishGame();
	} else {
		let current = --gameTime;
	if (current < 10) {
		current = `0${current}`
	}
	setTime(current);
	}
}

function setTime(value) {
	remainingTime.innerHTML = `00:${value}`;
}

function finishGame() {
	remainingTime.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Cчет <span class="primary">${score}</span></h1>`;
};

function createRandomCircle() {
	const circle = document.createElement('div');

	const size = getRandomNumber(10, 60);
	const {width, height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.background = createRandomColor();

	board.append(circle);
};

function getRandomNumber(min, max) {
	return  Math.round(Math.random() * (max - min) + min);
};

function createRandomColor() {
	let hex = '#';
	for (let i = 0; i < 6; i++) {
		const index = Math.floor(Math.random() * HEX_VALUES.length);
		hex += HEX_VALUES[index];
	}
	return hex;
};
