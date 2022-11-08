// Function for posting a new message
const newFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-post').value.trim();
    const body = document.querySelector('#body-post').value.trim();
    if (title && body) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

// function for viewing user post (edit/delete)
const viewPostHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    const response = await fetch(`/api/users/posts/${id}`, {
        method: 'GET',
    });
    if (response.ok) {
        document.location.replace(`/api/users/posts/${id}`);
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.post-form').addEventListener('submit', newFormHandler);

document.querySelectorAll('.edit-post-btn').forEach((button) => {
    button.addEventListener('click', viewPostHandler);
});