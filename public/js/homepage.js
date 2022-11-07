// Function for viewing a single message
const viewMessageHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    const response = await fetch(`/api/posts/${id}`, {
        method: 'GET',
    });
    if (response.ok) {
        document.location.replace(`api/posts/${id}`);
    } else {
        alert(response.statusText);
    }
}

document.querySelectorAll('.view-post-btn').forEach((button) => {
    button.addEventListener('click', viewMessageHandler);
});