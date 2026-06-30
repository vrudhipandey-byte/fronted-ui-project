 const form       = document.getElementById('applicationForm');
const fullname   = document.getElementById('fullname');
const email      = document.getElementById('email');
const phone      = document.getElementById('phone');
const position   = document.getElementById('position');
const resume     = document.getElementById('resume');
const fileNote   = document.getElementById('fileNote');
const submitBtn  = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMsg');
     const validity = {
             fullname: false,
              email: false,
                phone: false,
                position: true,    
                   resume: false
};

function setError(inputEl, errorId, message) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    inputEl.classList.toggle('invalid', Boolean(message));
}
function refreshSubmitButton() {
    const allValid = Object.values(validity).every(v => v === true);
    submitBtn.disabled = !allValid;
}

fullname.addEventListener('input', () => {
    const value = fullname.value.trim();

    if (value === '') {
        setError(fullname, 'err-fullname', 'Name is required.');
        validity.fullname = false;
    } else if (value.length < 3) {
        setError(fullname, 'err-fullname', 'Name seems too short.');
        validity.fullname = false;
    } else {
        setError(fullname, 'err-fullname', '');
        validity.fullname = true;
    }

    refreshSubmitButton();
});


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener('input', () => {
    const value = email.value.trim();

    if (value === '') {
        setError(email, 'err-email', 'Email is required.');
        validity.email = false;
    } else if (!emailPattern.test(value)) {
        setError(email, 'err-email', 'Enter a valid email address.');
        validity.email = false;
    } else {
        setError(email, 'err-email', '');
        validity.email = true;
    }

    refreshSubmitButton();
});
 
phone.addEventListener('input', () => {

    phone.value = phone.value.replace(/[^0-9]/g, '');

    const value = phone.value;

    if (value === '') {
        setError(phone, 'err-phone', 'Phone number is required.');
        validity.phone = false;
    } else if (value.length !== 10) {
        setError(phone, 'err-phone', 'Must be exactly 10 digits.');
        validity.phone = false;
    } else {
        setError(phone, 'err-phone', '');
        validity.phone = true;
    }

    refreshSubmitButton();
});
position.addEventListener('change', () => {
    if (position.value === '') {
        setError(position, 'err-position', 'Please select a position.');
        validity.position = false;
    } else {
        setError(position, 'err-position', '');
        validity.position = true;
    }

    refreshSubmitButton();
});

resume.addEventListener('change', () => {
    const file = resume.files[0];
    const allowed = ['.pdf', '.doc', '.docx'];
    const isValidType = file && allowed.some(ext => file.name.toLowerCase().endsWith(ext));
    const isValidSize = file && file.size <= 2 * 1024 * 1024;

    if (!file) {
        setError(resume, 'err-resume', 'Resume is required.');
        fileNote.textContent = 'No file selected';
        validity.resume = false;
    } else if (!isValidType) {
        setError(resume, 'err-resume', 'Only PDF or DOC files allowed.');
        fileNote.textContent = 'No file selected';
        validity.resume = false;
    } else if (!isValidSize) {
        setError(resume, 'err-resume', 'File must be under 2MB.');
        fileNote.textContent = 'No file selected';
        validity.resume = false;
    } else {
        setError(resume, 'err-resume', '');
        fileNote.textContent = 'Selected: ' + file.name;
        validity.resume = true;
    }

    refreshSubmitButton();
});
form.addEventListener('submit', (e) => {
    e.preventDefault();

    successMsg.style.display = 'block';
    form.reset();

    Object.assign(validity, {
        fullname: false, email: false, phone: false, position: true, resume: false
    });
    fileNote.textContent = 'No file selected';
    submitBtn.disabled = true;

    setTimeout(() => successMsg.style.display = 'none', 4000);
});