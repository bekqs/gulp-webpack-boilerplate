const editForm = document.getElementById('edit-form');
const [headerName, headerLocation, headerPhone] = document.querySelectorAll('#header-name, #header-location, #header-phone');
const [inputName, inputUrl, inputPhone, inputLocation] = document.querySelectorAll('#input-name, #input-url, #input-phone, #input-location');
const [detailName, detailUrl, detailPhone, detailLocation] = document.querySelectorAll('#detail-name, #detail-url, #detail-phone, #detail-location');


export default function saveMobile(e) {
    e.preventDefault();
    const inputs = [inputName, inputUrl, inputPhone, inputLocation];
    const details = [detailName, detailUrl, detailPhone, detailLocation];

    if (inputName.value !== '') {
        detailName.innerHTML = inputName.value;
        headerName.innerHTML = inputName.value;
    }

    if (inputUrl.value !== '') {
        detailUrl.innerHTML = inputUrl.value;
    }

    if (inputPhone.value !== '') {
        detailPhone.innerHTML = inputPhone.value;
        headerPhone.innerHTML = inputPhone.value;
    }

    if (inputLocation.value !== '') {
        detailLocation.innerHTML = inputLocation.value;
        headerLocation.innerHTML = inputLocation.value;
    }

    editForm.classList.toggle('active');
    this.reset();
}