const output = document.getElementById('output');
const keys = document.querySelectorAll('.key');
let isCaps = false;

keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.getAttribute('data-key');
        handleInput(keyValue, key);
    });
});

function handleInput(key, element) {
    // Visual feedback for click
    element.classList.add('pressed');
    setTimeout(() => element.classList.remove('pressed'), 100);

    switch (key) {
        case 'backspace':
            output.value = output.value.slice(0, -1);
            break;
        case 'enter':
            output.value += '\n';
            break;
        case 'caps':
            isCaps = !isCaps;
            element.classList.toggle('caps-active');
            updateKeyCasing();
            break;
        case ' ':
            output.value += ' ';
            break;
        default:
            // Handle standard characters, emojis, and numbers
            let char = key;
            if (isCaps && char.length === 1 && char.match(/[a-z]/i)) {
                char = char.toUpperCase();
            }
            output.value += char;
            break;
    }

    // Auto-scroll textarea
    output.scrollTop = output.scrollHeight;
}

function updateKeyCasing() {
    keys.forEach(key => {
        const val = key.getAttribute('data-key');
        if (val.length === 1 && val.match(/[a-z]/i)) {
            key.style.textTransform = isCaps ? 'uppercase' : 'lowercase';
        }
    });
}

// Optional: Physical Keyboard Support
window.addEventListener('keydown', (e) => {
    const keyBtn = document.querySelector(`.key[data-key="${e.key.toLowerCase()}"]`);
    if (keyBtn) {
        handleInput(e.key.toLowerCase(), keyBtn);
    }
});