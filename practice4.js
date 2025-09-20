const form = document.getElementById('chessForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

const nameFeedback = document.getElementById('nameFeedback');
const emailFeedback = document.getElementById('emailFeedback');
const phoneFeedback = document.getElementById('phoneFeedback');

function setFeedback(inputEl, feedbackEl, isValid, message) {
    if (isValid) {
        feedbackEl.textContent = message;
        feedbackEl.className = 'feedback valid';
        inputEl.classList.remove('input-invalid');
        inputEl.classList.add('input-valid');
    } else {
        feedbackEl.textContent = message;
        feedbackEl.className = 'feedback invalid';
        inputEl.classList.remove('input-valid');
        inputEl.classList.add('input-invalid');
    }
}

function validateName() {
    const v = nameInput.value.trim();
    if (v === '') {
        setFeedback(nameInput, nameFeedback, false, 'El nombre es obligatorio');
        return false;
    }
    if (!nameRegex.test(v)) {
        setFeedback(nameInput, nameFeedback, false, 'Solo letras y espacios');
        return false;
    }
    setFeedback(nameInput, nameFeedback, true, 'Nombre valido ');
    return true;
}

function validateEmail() {
    const v = emailInput.value.trim();
    if (v === '') {
        setFeedback(emailInput, emailFeedback, false, 'El correo es obligatorio');
        return false;
    }
    if (!gmailRegex.test(v)) {
        setFeedback(emailInput, emailFeedback, false, 'Correo inválido — debe ser @gmail.com');
        return false;
    }
    setFeedback(emailInput, emailFeedback, true, 'Correo valido ');
    return true;
}

function validatePhone() {
    const raw = phoneInput.value;
    const digits = (raw.match(onlyDigits) || []).join(''); 
    if (digits.length === 0) {
        setFeedback(phoneInput, phoneFeedback, false, 'El telefono es obligatorio');
        return false;
    }
    if (digits.length !== 10) {
        setFeedback(phoneInput, phoneFeedback, false, 'El teléfono debe tener 10 dígitos');
        return false;
    }
    setFeedback(phoneInput, phoneFeedback, true, 'Telefono valido ');
    return true;
}


nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const okName = validateName();
    const okEmail = validateEmail();
    const okPhone = validatePhone();

    if (okName && okEmail && okPhone) {
        alert('Registro exitoso. ¡Buena suerte en el torneo! ');
        form.reset();
        [nameInput, emailInput, phoneInput].forEach(i => {
            i.classList.remove('input-valid', 'input-invalid');
        });
        [nameFeedback, emailFeedback, phoneFeedback].forEach(f => {
            f.textContent = '';
            f.className = 'feedback';
        });
    } else {
        if (!okName) nameInput.focus();
        else if (!okEmail) emailInput.focus();
        else phoneInput.focus();
    }
});


