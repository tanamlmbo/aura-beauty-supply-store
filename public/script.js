//DOM element targets
const themeToggle = document.getElementById('theme-toggle');
const timerBubble = document.getElementById('timer-bubble');
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const completeBtn = document.getElementById('complete-btn');

let countdown;
let timeLeft = 15 * 60; // 15 minutes in seconds
let isRunning = false;

// Day & Night Mode Toggle Switch
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    if (document.body.classList.contains('night-mode')) {
        themeToggle.textContent = '🌞 Day Mode';
    } else {
        themeToggle.textContent = '🌙 Night Mode';
    }
});

// Countdown Engine
function startSprint() {
    if (isRunning) return;
    isRunning = true;
    startBtn.classList.add('hidden');
    completeBtn.classList.remove('hidden');

    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(countdown);
            handleSprintTimeout();
        }
    }, 1000);
}

// Time Blindness Temperature Scale
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Temperature shifts based on remaining minutes
    if (minutes < 2) {
        timerBubble.className = 'bubble timer-volcanic'; // red
    } else if (minutes < 7) {
        timerBubble.className = 'bubble timer-solar';    //yellow
    } else {
        timerBubble.className = 'bubble timer-glacial';  //blue
    }
}

function handleSprintTimeout() {
    isRunning = false;
    alert("This sprint is over! Time for a break!"); 
    // Will be replaced with more vibrancy and energy soon
    resetTimer();
}

function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    timeLeft = 15 * 60;
    updateTimerDisplay();
    startBtn.classList.remove('hidden');
    completeBtn.classList.add('hidden');
}

// Event listeners for the buttons
startBtn.addEventListener('click', startSprint);
completeBtn.addEventListener('click', () => {
    alert("Boom! Task Complete!");
    resetTimer();
});

const popoutBtn = document.getElementById('popout-btn');

popoutBtn.addEventListener('click', async () => {
    //Check if the browser supports the Document Picture-in-Picture API
    if ('documentPictureInPicture' in window) {
        try {
            //Open a floating PiP window frame
            const pipWindow = await window.documentPictureInPicture.requestWindow({
                width: 250,
                height: 250,
            });

            //Copy the CSS styles into the new floating window so it keeps its look
            [...document.styleSheets].forEach((styleSheet) => {
                try {
                    const cssMimeType = styleSheet.type || 'text/css';
                    const cssSource = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
                    const styleElement = pipWindow.document.createElement('style');
                    styleElement.textContent = cssSource;
                    pipWindow.document.head.appendChild(styleElement);
                } catch (e) {
                    //Cross-origin stylesheet guardrail
                    const linkElement = pipWindow.document.createElement('link');
                    linkElement.rel = 'stylesheet';
                    linkElement.href = styleSheet.href;
                    pipWindow.document.head.appendChild(linkElement);
                }
            });

            //Move the timer bubble element from the main page into the floating frame
            pipWindow.document.body.appendChild(timerBubble);
            pipWindow.document.body.style.backgroundColor = 'var(--bg-color)';
            pipWindow.document.body.style.display = 'flex';
            pipWindow.document.body.style.justifyContent = 'center';
            pipWindow.document.body.style.alignItems = 'center';
            pipWindow.document.body.style.height = '100vh';
            pipWindow.document.body.style.margin = '0';

            //When the user closes the floating window, return the timer back to the main layout
            pipWindow.addEventListener('unload', (event) => {
                const mainContainer = document.querySelector('.focus-container');
                mainContainer.insertBefore(timerBubble, mainContainer.firstChild);
            });

        } catch (error) {
            console.error("Failed to initialize floating window:", error);
        }
    } else {
        alert("Your browser doesn't support floating PIP windows yet! Try updating your broswer.");
    }
});