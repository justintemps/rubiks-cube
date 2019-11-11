export function enableRotation(state) {
  const rotateButton = document.getElementById('rotate-button');

  const setEnabled = enabled => {
    state.isEnabled = enabled;
  };

  const toggleButton = () => {
    if (state.isEnabled) {
      return rotateButton.classList.add('pressed');
    }
    return rotateButton.classList.remove('pressed');
  };

  const handleKeyDown = e => {
    if (e.keyCode === 32 && !state.isEnabled) {
      setEnabled(true);
      toggleButton();
    }
  };

  const handleKeyUP = e => {
    if (e.keyCode === 32 && state.isEnabled) {
      setEnabled(false);
      toggleButton();
    }
  };

  document.addEventListener('keydown', handleKeyDown, false);
  document.addEventListener('keyup', handleKeyUP, false);
}
