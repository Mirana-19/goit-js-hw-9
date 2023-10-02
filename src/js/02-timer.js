import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  secondsCount: document.querySelector('[data-seconds]'),
  minutesCount: document.querySelector('[data-minutes]'),
  hoursCount: document.querySelector('[data-hours]'),
  daysCount: document.querySelector('[data-days]'),
};

refs.startBtn.disabled = true;

class Timer {
  constructor() {
    this.selectedDate = null;
    this.intervalId = null;
  }

  startTimer(startBtn, dateInput) {
    if (this.selectedDate - Date.now() < 0) {
      return Notify.failure('Please choose date in future');
    }

    this.intervalId = setInterval(() => {
      const time = this.countRemainingTimeInMs(this.selectedDate);
      const formattedTime = this.formatTime(this.convertMs(time));

      if (time < 0) {
        return this.stopTimer(this.intervalId);
      }

      return this.renderUI(formattedTime, renderTimer);
    }, 1000);

    startBtn.disabled = true;
    dateInput.disabled = true;
  }

  stopTimer(interval) {
    clearInterval(interval);
  }

  countRemainingTimeInMs(date) {
    return date - Date.now();
  }

  renderUI(time, renderFunction) {
    renderFunction(time);
  }

  formatTime({ days, hours, minutes, seconds }) {
    days = this.addLeadingZero(days);
    hours = this.addLeadingZero(hours);
    minutes = this.addLeadingZero(minutes);
    seconds = this.addLeadingZero(seconds);

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return value.toString().padStart('2', '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    // console.log({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
  }
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.daysCount.innerHTML = days;
  refs.hoursCount.innerHTML = hours;
  refs.minutesCount.innerHTML = minutes;
  refs.secondsCount.innerHTML = seconds;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.selectedDate = selectedDates[0].getTime();

    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.dateInput, options);

const timer = new Timer();

refs.startBtn.addEventListener('click', () => {
  timer.startTimer.bind(timer)(refs.startBtn, refs.dateInput);
});
