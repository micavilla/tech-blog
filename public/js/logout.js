// function triggered on logout click
const logout = async () => {
  // POST request to logout route
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // redirect on logout success, else alert error
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};
// listen for click on logout button
document.querySelector('#logout').addEventListener('click', logout);