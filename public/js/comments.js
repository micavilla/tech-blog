// function to handle comment form submit
const commentFormHandler = async function (event) {
  event.preventDefault();
  // collect blog ID from form data attribute and comment text
  const blog_id = document.querySelector('.new-comment-form').dataset.blog_id;
  const text = document.querySelector('#comment').value.trim();
  // POST request to comments route if text exists
  if(text) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        blog_id,
        text,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // reload page after successful comment post
    document.location.reload();
  }
};
// listen for comment form submit event
document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);