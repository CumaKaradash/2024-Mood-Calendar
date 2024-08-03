// script.js
const currentYear = 2024;
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];
const colors = ['#2d6b5f', '#72e3a6', '#dff4c7', '#edbf98', '#ea3d36'];
const defaultColor = '#888';
let activeColor = defaultColor;

const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');
const randomizeButton = document.querySelector('#randomize');
const clearButton = document.querySelector('#clear');

function init() {
    renderCalendar();
    addEventListeners();
}

function addEventListeners() {
    moods.forEach(mood => {
        mood.addEventListener('click', () => updateMoodSelection(mood));
    });

    randomizeButton.addEventListener('click', randomizeColors);
    clearButton.addEventListener('click', clearCalendar);
}

function updateMoodSelection(selectedMood) {
    moods.forEach(mood => mood.classList.remove('selected'));
    if (selectedMood.classList.contains('selected')) {
        activeColor = defaultColor;
    } else {
        selectedMood.classList.add('selected');
        activeColor = getComputedStyle(selectedMood).getPropertyValue('color');
    }
}

function renderCalendar() {
    calendar.innerHTML = months.map((month, idx) => createMonthHTML(month, idx)).join('');
    populateCalendarDates();
}

function createMonthHTML(month, idx) {
    return `
        <div class="months month_${idx}">
            <h3>${month}</h3>
            <div class="week_days_container">
                ${weekDays.map(day => `<div class="week_days">${day}</div>`).join('')}
            </div>
            <div class="days_container"></div>
        </div>`;
}

function populateCalendarDates() {
    const dates = getAllDays(currentYear);
    dates.forEach(date => {
        const month = date.getMonth();
        const monthEl = document.querySelector(`.month_${month} .days_container`);

        if (date.getDate() === 1 && date.getDay() !== 0) {
            for (let i = 0; i < date.getDay(); i++) {
                monthEl.appendChild(createEmptyDayElement());
            }
        }

        monthEl.appendChild(createDateElement(date));
    });

    document.querySelectorAll('.circle').forEach(circle => {
        circle.addEventListener('click', () => circle.style.backgroundColor = activeColor);
    });
}

function getAllDays(year) {
    const firstDay = new Date(`January 1 ${year}`);
    const lastDay = new Date(`December 31 ${year}`);
    const days = [firstDay];
    let lastDayInArray = firstDay;

    while (lastDayInArray.getTime() !== lastDay.getTime()) {
        days.push(addDays(lastDayInArray, 1));
        lastDayInArray = days[days.length - 1];
    }

    return days;
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function createDateElement(date) {
    const day = date.getDate();
    const dateEl = document.createElement('div');
    dateEl.classList.add('days');
    dateEl.innerHTML = `<span class="circle" aria-label="Day ${day}">${day}</span>`;
    return dateEl;
}

function createEmptyDayElement() {
    const emptyEl = document.createElement('div');
    emptyEl.classList.add('days');
    return emptyEl;
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomizeColors() {
    document.querySelectorAll('.circle').forEach(circle => {
        circle.style.backgroundColor = getRandomColor();
    });
}

function clearCalendar() {
    document.querySelectorAll('.circle').forEach(circle => {
        circle.style.backgroundColor = defaultColor;
    });
}

// Initialize the app
init();
