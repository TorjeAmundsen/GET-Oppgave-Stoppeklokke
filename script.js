let minutes        = 0,
    seconds        = 0,
    tenths         = -1,
    lapMinutes     = 0,
    lapSeconds     = 0,
    lapTenths      = -1,
    laps           = 0,
    minutesElement = document.getElementById("minutes"),
    secondsElement = document.getElementById("seconds"),
    tenthsElement  = document.getElementById("tenths"),
    lapMinutesElement = document.getElementById("lap-minutes"),
    lapSecondsElement = document.getElementById("lap-seconds"),
    lapTenthsElement  = document.getElementById("lap-tenths"),
    startButton    = document.getElementById("start-button"),
    lapsContainer  = document.getElementById("laps-container"),
    paused         = false,
    started        = false;

let interval = null;
let lapInterval = null;

function startTimer() {
    if (started) {
        startButton.innerText = "Pause";
        if (!paused) {
            startButton.innerText = "Resume";
            paused = true;
            clearInterval(interval);
            clearInterval(lapInterval);
        } else {
            paused = false;
            interval = setInterval(addTenth, 100);
            lapInterval = setInterval(addLapTenth, 100);
        };
    } else {
        started = true;
        interval = setInterval(addTenth, 100);
        lapInterval = setInterval(addLapTenth, 100);
        startButton.innerText = "Pause";
    };
};

function saveLap() {
    if (!started) {
        return;
    };
    laps++;

    lapsContainer.appendChild(Object.assign(
        document.createElement("div"), {id : `lap${laps}`, className : "laps"}
    ));
    let currentLap = document.getElementById(`lap${laps}`);
    currentLap.appendChild(Object.assign(
        document.createElement("div"), {id : `lap${laps}Label`, className : "lapLabels"}
    ));
    currentLap.appendChild(Object.assign(
        document.createElement("div"), {id : `lap${laps}Time`, className : "lapTimes"}
    ));
    currentLap.appendChild(Object.assign(
        document.createElement("div"), {id : `lap${laps}Duration`, className : "lapDurations"}
    ));

    document.getElementById(`lap${laps}Label`).innerText = `Lap ${laps}`;
    document.getElementById(`lap${laps}Time`).innerText = document.getElementById("timer-container").innerText;
    document.getElementById(`lap${laps}Duration`).innerText = document.getElementById("lap-timer-container").innerText;
    lapMinutes = 0;
    lapSeconds = 0;
    lapTenths = 0;
};

function resetTimer() {
    clearInterval(interval);
    clearInterval(lapInterval);
    minutes = 0;
    seconds = 0;
    tenths = 0;
    lapMinutes = 0;
    lapSeconds = 0;
    lapTenths = 0;
    laps = 0;
    paused = false;
    started = false;
    minutesElement.innerText = `0${minutes}`;
    secondsElement.innerText = `0${seconds}`;
    tenthsElement.innerText = tenths;
    lapMinutesElement.innerText = `0${minutes}`;
    lapSecondsElement.innerText = `0${seconds}`;
    lapTenthsElement.innerText = tenths;
    startButton.innerText = "Start";
    lapsContainer.innerHTML = `
        <div class="laps-label">Laps</div>
        <hr class="solid">`;
};

async function addLapTenth() {
    lapTenths++;
    if (lapTenths == 10) {
        lapTenths = 0;
        addLapSecond();
    };
    if (lapMinutes < 10) {
        lapMinutesElement.innerText = `0${lapMinutes}`;
    } else {
        lapMinutesElement.innerText = lapMinutes;
    };
    if (lapSeconds  < 10) {
        lapSecondsElement.innerText = `0${lapSeconds}`;
    } else {
        lapSecondsElement.innerText = lapSeconds;
    };
    lapTenthsElement.innerText = lapTenths;
};

function addLapSecond() {
    lapSeconds++;
    if (lapSeconds == 60) {
        lapSeconds = 0;
        lapMinutes++;
    };
};

async function addTenth() {
    tenths++;
    if (tenths == 10) {
        tenths = 0;
        addSecond();
    }
    if (minutes < 10) {
        minutesElement.innerText = `0${minutes}`;
    } else {
        minutesElement.innerText = minutes;
    };
    if (seconds  < 10) {
        secondsElement.innerText = `0${seconds}`;
    } else {
        secondsElement.innerText = seconds;
    };
    tenthsElement.innerText = tenths;
};

function addSecond() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    };
};

