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

  startTimer() {
    if (timer.selectedDate - Date.now() < 0) {
      return Notify.failure('Please choose date in future');
    }

    this.intervalId = setInterval(() => {
      const time = this.countRemainingTimeInMs(this.selectedDate);

      if (time < 0) {
        return this.stopTimer(this.intervalId);
      }

      return this.renderTimer(this.convertMs(time));
    }, 1000);

    refs.startBtn.disabled = true;
    refs.dateInput.disabled = true;
  }

  stopTimer(interval) {
    clearInterval(interval);
  }

  countRemainingTimeInMs(date) {
    return date - Date.now();
  }

  renderTimer({ days, hours, minutes, seconds }) {
    refs.daysCount.innerHTML = this.addLeadingZero(days);
    refs.hoursCount.innerHTML = this.addLeadingZero(hours);
    refs.minutesCount.innerHTML = this.addLeadingZero(minutes);
    refs.secondsCount.innerHTML = this.addLeadingZero(seconds);
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
    console.log({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
  }
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

refs.startBtn.addEventListener('click', timer.startTimer.bind(timer));
