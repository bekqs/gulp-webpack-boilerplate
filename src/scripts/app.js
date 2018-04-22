import saveMobile from './modules/editMobile';

const [headerName, headerLocation, headerPhone] = document.querySelectorAll('#header-name, #header-location, #header-phone');
const editButton = document.querySelectorAll('.button--edit:not(#edit-mobile)');
const editButtonMobile = document.getElementById('edit-mobile');
const mobileSave = document.getElementById('mobile-save');
const bubbleDiv = document.getElementById('bubble');
const bubbleInput = document.getElementById('bubble-input');
const bubbleLabel = document.getElementById('bubble-label');
const bubbleSave = document.getElementById('bubble-save');
const buttonCancel = document.querySelectorAll('.button--cancel');
const editForm = document.getElementById('edit-form');
const tabLink = document.querySelectorAll('.header__menu__item');
const tabDiv = document.getElementsByClassName('tab');
let current;

// Check if browser supports addEventListener
function bindEvent(el, eventName, eventHandler) {
    if (el.addEventListener){
        el.addEventListener(eventName, eventHandler, false); 
    } else if (el.attachEvent){
        el.attachEvent('on' + eventName, eventHandler);
    }
}

// Display div "bubble" next to the edit-button
function bubble() {
    // Calculate x/y position for edit-button element
    const pos = this.getBoundingClientRect();
    // Previous element sibling of clicked edit-button
    current = this.previousElementSibling;
    // Clear input each time the function is called
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

Array.from(editButton).forEach(element => {
    bindEvent(element, 'click', bubble);
});

// Function to change innerHTML of the element we're trying to edit
bindEvent(bubbleSave, 'click', () => {
    current.innerHTML = bubbleInput.value;

    if (current.id === 'detail-name') {
        headerName.innerHTML = bubbleInput.value;
    }

    if (current.id === 'detail-location') {
        headerLocation.innerHTML = bubbleInput.value;
    }

    if (current.id === 'detail-phone') {
        headerPhone.innerHTML = bubbleInput.value;
    }

    bubbleDiv.classList.toggle('active');
});

// Function to close "bubble" div
Array.from(buttonCancel).forEach(element => {
    bindEvent(element, 'click', (e) => {
        e.preventDefault();
        editForm.classList.remove('active');
        bubbleDiv.classList.remove('active');
    });
});

// Edit for mobile devices
bindEvent(editButtonMobile, 'click', (e) => {
    e.preventDefault();
    editForm.classList.toggle('active');
});

// Update and save data on mobile devices
bindEvent(editForm, 'submit', saveMobile);

// Tabs 
Array.from(tabLink).forEach(element => {
    element.addEventListener('click', () => {

        let num;

        document.querySelector('.active').classList.remove('active');
        element.classList.add('active');
        
        for (let i = 0; i < tabLink.length; i++) {
            if (tabLink[i].classList.contains('active')) {
                num = i;
            }
        }

        for (let i = 0; i < tabDiv.length; i++) {
            if (tabDiv[i].classList.contains('tab--current')) {
                tabDiv[i].classList.remove('tab--current');
            }
        }
        tabDiv[num].classList.add('tab--current');
    })
})