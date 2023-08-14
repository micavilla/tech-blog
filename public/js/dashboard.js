// create blog submit handler
const newFormHandler = async (event) => {
  event.preventDefault();
  // collect form values
  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();
  // POST request if values exist
  if (name && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // redirect on success, else alert error
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  }
};
// delete blog click handler
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    // DELETE request to delete blog
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};
// update blog submit handler
const updButtonHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();
  const blogId = event.target.getAttribute('data-id');
  // PUT request if values exist
  if (name && description && blogId) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({name, description}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog');
    }
  }
};

// event listeners for update, submit, and delete buttons
document.querySelectorAll('.blog-update').forEach(button => {
  button.addEventListener('click', updButtonHandler);
});

document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);

document.querySelectorAll('.blog-delete').forEach(button => {
  button.addEventListener('click', delButtonHandler);
});