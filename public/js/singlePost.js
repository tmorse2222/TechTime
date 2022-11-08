// Function for comment form
const commentFormHandler = async (event) => {
    event.preventDefault();
    const comment_text = document.querySelector('#comment').value.trim();
    // Current issue with passing post_id to the comment
    const post_id = document.querySelector('#post-id').value.trim();
    console.log(post_id)
    if (comment_text && post_id) {
        const response = await fetch(`/api/posts/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);