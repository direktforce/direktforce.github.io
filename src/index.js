require('./header.scss');
require('./footer.scss');
require('./style.scss');
require('./index.scss');

const ENDPOINT_URL = 'https://wy2rngkmq2.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer';
const LOCALSTORAGE_KEY_ATTR = 'data-localstorage-key';

function getSavedState(key) {
  try {
    const state = JSON.parse(localStorage.getItem(key)) || {};
    if (state.submittedOn != null) {
      state.submittedOn = new Date(state.submittedOn);
    }
    return state;
  } catch (err) {
    localStorage.removeItem(key);
    return {};
  }
}

function setSavedState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setFormState(formEl, state) {
  const { submitted, submittedOn, value } = state;

  for (const el of formEl.querySelectorAll('input,textarea')) {
    const key = el.getAttribute('name');
    el.value = value[key] || '';
  }

  if (submitted) {
    const submitButtonEl = formEl.querySelector('button[type="submit"]');
    formEl.querySelector('.status-message').textContent = `Message sent on ${submittedOn.toLocaleDateString('en-us')} at ${submittedOn.toLocaleTimeString('en-us')}.`;
    submitButtonEl.textContent = 'Message Sent!';
    submitButtonEl.classList.add('success');

    formEl.querySelector('fieldset').setAttribute('disabled', '');
  }
}

function getFormState(formEl) {
  const fd = new FormData(formEl);
  const obj = {};
  for (const [key, value] of fd.entries()) {
    obj[key] = value;
  }
  return {value: obj};
}

function setFormLoading(formEl) {
  const submitButtonEl = formEl.querySelector('button[type="submit"]');
  submitButtonEl.textContent = 'Sending...';
  formEl.querySelector('fieldset').setAttribute('disabled', '');
}

function setFormErrored(formEl) {
  const submitButtonEl = formEl.querySelector('button[type="submit"]');
  submitButtonEl.textContent = 'Send';
  submitButtonEl.classList.remove('success');
  formEl.querySelector('fieldset').removeAttribute('disabled');
  formEl.querySelector('.status-message').textContent = `Message failed to send. Please try again or send us an email.`;
}

function setFormSuccess(formEl) {
  const submitButtonEl = formEl.querySelector('button[type="submit"]');
  submitButtonEl.textContent = 'Message Sent!';
  submitButtonEl.classList.add('success');
}

function setFormReset(formEl) {
  formEl.querySelector('fieldset').removeAttribute('disabled');
  for (const el of formEl.querySelectorAll('input,textarea')) {
    el.value = '';
  }
}

async function sendMessage(value) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value),
  };
  const res = await fetch(ENDPOINT_URL, options);
  if (res.status >= 400 || res.status < 200) {
    throw new Error(`request failed with code ${res.status}`);
  }
  return res.json();
}

function onSubmit(event) {
  const formEl = event.srcElement;
  (async () => {
    const {value} = getFormState(formEl);
    const localStorageKey = formEl.getAttribute(LOCALSTORAGE_KEY_ATTR);
    const submittedOn = new Date();
    setSavedState({value});
    setFormLoading(formEl);
    const result = await sendMessage(value);
    try {
      const state = {submitted: true, submittedOn, value};
      setSavedState(localStorageKey, state);
      setFormSuccess(formEl);
    } catch (err) {
      setFormErrored(formEl);
    }
  })();
  event.preventDefault();
  event.stopPropagation();
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  for (const formEl of document.querySelectorAll('form')) {
    const localStorageKey = formEl.getAttribute(LOCALSTORAGE_KEY_ATTR);
    if (localStorageKey == null) {
      continue;
    }
    try {
      const state = getSavedState(localStorageKey);
      setFormState(formEl, state);
    } catch (err) {
      console.log(err);
      localStorage.removeItem(localStorageKey);
    }
    formEl.oninput = ((key) => (e) => {
      const el = e.target;
      const state = getSavedState(key);
      const value = state.value || {};
      value[el.getAttribute('name')] = el.value;
      setSavedState(key, Object.assign(state, {value}));
    })(localStorageKey);
    formEl.onsubmit = onSubmit;
  }
});
