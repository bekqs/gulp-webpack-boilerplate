import 'babel-polyfill';

const edit = document.querySelectorAll('.main__about__detail--edit');
const bubbleDiv = document.getElementById('bubble');
const bubbleInput = document.getElementById('bubble-input');
const bubbleLabel = document.getElementById('bubble-label');
const bubbleSave = document.getElementById('bubble-save');
const bubbleCancel = document.getElementById('bubble-cancel');
let current;

function bindEvent(el, eventName, eventHandler) {
    if (el.addEventListener){
        el.addEventListener(eventName, eventHandler, false); 
    } else if (el.attachEvent){
        el.attachEvent('on'+eventName, eventHandler);
    }
}

function bubble() {
    const pos = this.getBoundingClientRect();
    current = this.previousElementSibling;
    bubbleInput.value = '';

    bubbleDiv.classList.add('active');
    bubbleDiv.style.top = `${pos.top + window.pageYOffset}px`;
    bubbleDiv.style.left = `${pos.left + 60}px`;

    if (this.id === 'edit-name') {
        bubbleLabel.innerHTML = 'Full Name';
        bubbleInput.type = 'text';
    }

    if (this.id === 'edit-website') {
        bubbleLabel.innerHTML = 'Website';
        bubbleInput.type = 'url';
    }

    if (this.id === 'edit-phone') {
        bubbleLabel.innerHTML = 'Phone Number';
        bubbleInput.type = 'tel';
    }
        
    if (this.id === 'edit-location') {
        bubbleLabel.innerHTML = 'City, State & ZIP';
        bubbleInput.type = 'text';
    }
}

Array.from(edit).forEach(element => {
    bindEvent(element, 'click', bubble);
})

bubbleSave.addEventListener('click', () => {
    current.innerHTML = bubbleInput.value;
    bubbleDiv.classList.remove('active');
}, false)

bubbleCancel.addEventListener('click', () => {
    bubbleDiv.classList.remove('active');
})