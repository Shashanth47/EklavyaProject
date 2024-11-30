let config;
let foundDifferences = [];
let startTime;
let timerInterval;
let gameComplete = false;

const clickSound = document.getElementById('clickSound');
const successSound = document.getElementById('successSound');
const completeSound = document.getElementById('completeSound');

const menuScreen = document.getElementById('menu-screen');
const gameContainer = document.getElementById('game-container');
const playButton = document.getElementById('play-button');
const portfolioButton = document.getElementById('portfolio-button');
const resumeButton = document.getElementById('resume-button');
const menuButton = document.getElementById('menuButton');

function loadConfig() {
    return fetch('game-config.json')
        .then(response => response.json())
        .then(data => {
            config = data;
            document.getElementById('gameTitle').textContent = config.gameTitle;
            document.getElementById('totalDifferences').textContent = config.differences.length;
            document.getElementById('image1').src = config.images.full;
            document.getElementById('image2').src = config.images.empty;
        });
}

function startGame() {
    menuScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    foundDifferences = [];
    gameComplete = false;
    startTime = Date.now();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    updateScore();
    document.getElementById('gameComplete').classList.add('hidden');
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateScore() {
    document.getElementById('score').textContent = foundDifferences.length;
}

function handleImageClick(event) {
    if (gameComplete) return;

    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedDifference = config.differences.find(diff => 
        !foundDifferences.includes(diff.id) &&
        x >= diff.x && x <= diff.x + diff.width &&
        y >= diff.y && y <= diff.y + diff.height
    );

    if (clickedDifference) {
        successSound.play();
        foundDifferences.push(clickedDifference.id);
        updateScore();
        markDifference(clickedDifference);
        checkGameComplete();
    } else {
        clickSound.play();
    }
}

function markDifference(difference) {
    const marker = document.createElement('div');
    marker.className = 'difference-marker';
    marker.style.left = `${difference.x}px`;
    marker.style.top = `${difference.y}px`;
    marker.style.width = `${difference.width}px`;
    marker.style.height = `${difference.height}px`;
    
    document.querySelectorAll('.image-wrapper').forEach(wrapper => {
        const markerClone = marker.cloneNode(true);
        wrapper.appendChild(markerClone);
    });
}

function checkGameComplete() {
    if (foundDifferences.length === config.differences.length) {
        gameComplete = true;
        clearInterval(timerInterval);
        completeSound.play();
        document.getElementById('gameComplete').classList.remove('hidden');
        document.getElementById('finalTime').textContent = document.getElementById('timer').textContent;
    }
}

function resetGame() {
    document.querySelectorAll('.difference-marker').forEach(marker => marker.remove());
    startGame();
}

function showMenu() {
    resetGame()
    gameContainer.classList.add('hidden');
    menuScreen.classList.remove('hidden');
    clearInterval(timerInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    loadConfig().then(() => {
        document.querySelectorAll('.game-image').forEach(img => {
            img.addEventListener('click', handleImageClick);
        });
        document.getElementById('resetButton').addEventListener('click', resetGame);
        playButton.addEventListener('click', startGame);
        portfolioButton.addEventListener('click', () => {
            window.open('https://shashanth47.itch.io/', '_blank');
        });
        // resumeButton.addEventListener('click', () => {
       
        //     const link = document.createElement('a');
        //     link.href = 'file:///C:/Users/shashanth/Downloads/K%20U%20SHASHANTH%20Resume%20_STANDARD.pdf';
        //     link.download = 'KUShashanth_Resume.pdf';
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        // });
        menuButton.addEventListener('click', showMenu);
    });
});