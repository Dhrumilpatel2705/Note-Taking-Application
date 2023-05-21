// Theame color select

const savedColor = localStorage.getItem('color');
document.documentElement.style.setProperty('--color', savedColor || '#383838');

const colors = document.getElementsByClassName('color');

let i;
for (i = 0; i < colors.length; i++) {
  colors[i].addEventListener('click', changecolor);
}

function changecolor() {
  const color = this.getAttribute('data-color');
  document.documentElement.style.setProperty('--color', color);
  localStorage.setItem('color', color);
}
