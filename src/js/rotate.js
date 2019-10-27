export default function() {
  const button = document.getElementById('rotate-button');
  button.addEventListener('click', e => {
    e.preventDefault();
    console.log('Click!');
  });

  window.addEventListener('keypress', e => {
    e.preventDefault();
    if (e.keyCode === 32) {
      button.click();
    }
  });
}
