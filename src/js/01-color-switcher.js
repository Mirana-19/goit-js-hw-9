const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', startColorSwitch);
refs.stopBtn.addEventListener('click', stopColorSwitch);

let colorSwitchTimer = null;

refs.stopBtn.disabled = true;

function startColorSwitch() {
  colorSwitchTimer = setInterval(() => {
    updateColor(getRandomHexColor());
  }, 1000);

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function stopColorSwitch() {
  clearInterval(colorSwitchTimer);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function updateColor(color) {
  document.body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
