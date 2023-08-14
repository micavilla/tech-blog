// function triggered on login form submit
const loginFormHandler = async (event) => {
  event.preventDefault();

  // collect login form values
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  // ensure values exist
  if (email && password) {
    // POST request to login route
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // redirect on login success, else alert error
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
// listen for submit event on login form
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);