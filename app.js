const frame = document.querySelector('#gameFrame');
const themeButton = document.querySelector('#themeButton');
const helpButton = document.querySelector('#helpButton');
const helpDialog = document.querySelector('#helpDialog');
const closeHelp = document.querySelector('#closeHelp');
const toast = document.querySelector('#toast');

const themes = ['green', 'amber'];
let currentTheme = localStorage.getItem('dungeon-theme') || 'green';
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 1600);
}

function getGameInput() {
  const doc = frame.contentDocument;
  if (!doc) return null;
  return doc.querySelector('input.Input:not([disabled]), input[type="text"]:not([disabled])');
}

function submitCommand(command) {
  const input = getGameInput();
  if (!input) {
    showToast('The game is still loading…');
    return;
  }

  input.focus();
  input.value = command;
  input.dispatchEvent(new Event('input', { bubbles: true }));

  if (command.endsWith(' ')) {
    input.setSelectionRange(input.value.length, input.value.length);
    return;
  }

  const event = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true,
  });
  input.dispatchEvent(event);
}

function applyTheme(theme) {
  currentTheme = themes.includes(theme) ? theme : 'green';
  document.body.dataset.theme = currentTheme;
  localStorage.setItem('dungeon-theme', currentTheme);

  const doc = frame.contentDocument;
  if (!doc) return;

  let style = doc.querySelector('#dungeon-theme');
  if (!style) {
    style = doc.createElement('style');
    style.id = 'dungeon-theme';
    doc.head.append(style);
  }

  const palette = currentTheme === 'amber'
    ? { bg: '#080502', fg: '#ffbf54', bright: '#ffe2a3', input: '#ffe2a3' }
    : { bg: '#020503', fg: '#9cffad', bright: '#d7ffdd', input: '#d7ffdd' };

  style.textContent = `
    :root {
      --glkote-page-bg: ${palette.bg} !important;
      --glkote-buffer-bg: ${palette.bg} !important;
      --glkote-grid-bg: ${palette.bg} !important;
      --glkote-buffer-fg: ${palette.fg} !important;
      --glkote-grid-fg: ${palette.fg} !important;
      --glkote-input-fg: ${palette.input} !important;
      --asyncglk-ui-bg: ${palette.bg} !important;
      --asyncglk-ui-fg: ${palette.fg} !important;
      --asyncglk-ui-textbox: ${palette.bg} !important;
      color-scheme: dark;
    }
    html, body, #gameport { background: ${palette.bg} !important; }
    body { color: ${palette.fg} !important; }
    .BufferWindow, .GridWindow { text-shadow: 0 0 7px ${palette.fg}55; }
    .Input { caret-color: ${palette.bright} !important; font-size: 16px !important; }
    @media (max-width: 600px) {
      :root { --glkote-buffer-size: 16px; --glkote-buffer-line-height: 1.5; }
      .WindowFrame { padding-inline: 12px !important; }
    }
  `;
}

document.querySelectorAll('[data-command]').forEach((button) => {
  button.addEventListener('click', () => submitCommand(button.dataset.command));
});

themeButton.addEventListener('click', () => {
  const nextTheme = currentTheme === 'green' ? 'amber' : 'green';
  applyTheme(nextTheme);
  showToast(`${nextTheme.toUpperCase()} terminal`);
});

helpButton.addEventListener('click', () => helpDialog.showModal());
closeHelp.addEventListener('click', () => helpDialog.close());
helpDialog.addEventListener('click', (event) => {
  if (event.target === helpDialog) helpDialog.close();
});

frame.addEventListener('load', () => {
  applyTheme(currentTheme);
  setTimeout(() => getGameInput()?.focus(), 450);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}
