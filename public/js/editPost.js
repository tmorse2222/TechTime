// Function for editing a post
const editPostHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    const title = document.querySelector('#title-post').value.trim();
    const body = document.querySelector('#body-post').value.trim();
    console.log(id, title, body);
    if (title && body) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
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

// Function for deleting a post
const deletePostHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');    
    const response = await fetch(`/api/users/posts/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);
document.querySelector('.delete-post-btn').addEventListener('click', deletePostHandler);