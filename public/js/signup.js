// function triggered on signup form submit
const signupFormHandler = async (event) => {
  event.preventDefault();
  // collect signup form values
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  // ensure values exist
  if (name && email && password) {
    // POST request to signup route
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // redirect on signup success, else alert error
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
// listen for submit event on signup form
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);