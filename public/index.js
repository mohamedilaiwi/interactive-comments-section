import handleSubmit from './submits.js';
import { getCurrrentUser } from '../js/currentUser.js';

/* QuerySelectors and GetElementID global variables */
// const mainCard = document.querySelector('main');

/* Functions to retrieve data */


/* */
// export default async function fetchCommentsData() {
//     try {
//         const response = await fetch('data.json');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error with raising data:', error);
//     }
// };

// mainCard.addEventListener('click', function(event) {
//     // Check if the event target matches the desired element
//     if (event.target.id === 'delete-btn') {
//       // Event handling logic for the dynamically added element
//       displayDeleteWarning();
//       document.documentElement.scrollTop = 0; // move view to top
//     }
// });





function _generateCommentHTML(comment, type, isAuthor) {
    const commentType = type === 'regular' ? 'regular' : 'reply';
    const showOnAuthor = isAuthor ? "" : 'hidden';

    const commentHTML = `
        <div id="${comment.id}" class='${commentType} c'>
            <div id='reply-visual'></div>
            <div class="comment-header">
                <img src=${comment.user.image}>
                <h4>${comment.user.username}</h4>
                <span id='author-handle' class='${showOnAuthor}'>you</span>
                <p>${_getDifferenceTime(comment.createdAt)}</p>
            </div>
            <div class="comment-text">
                <p>${commentType === 'reply' ? `<span id="replayAt">@${comment.replyingTo}</span>` : ''}${comment.content}</p>
            </div>
            <div class="comment-footer">
                <div class='upvote-btn-container'>
                    <button id="btn-upvote" class='active-state'>+</button>
                    <span id="upvotes">${comment.score}</span>
                    <button id="btn-downvote" class='active-state'>-</button>
                </div>
                <div>
                    <div class='reply-container active-state'>
                        <img id="reply-logo" src="./images/icon-reply.svg" class='${!isAuthor ? "" : 'hidden'}'>
                        <span id="reply" class='${!isAuthor ? "" : 'hidden'}'>Reply</span>
                    </div>
                    <figure class='active-state'>
                        <img class='${showOnAuthor}' src="./images/icon-delete.svg" alt="Description of the image">
                        <figcaption onclick="${isAuthor ? `handleDelete(${comment.id})` : '-1'}" id='delete-btn' class='${showOnAuthor}''>Delete</figcaption>
                    </figure>
                    <figure class='active-state'>
                        <img class='${showOnAuthor}' src="./images/icon-edit.svg">
                        <figcaption class='${showOnAuthor}'>Edit</figcaption>
                    </figure>
                </div>
            </div>
        </div>
    `;
    return commentHTML;
}








function _getDifferenceTime(createdAt) {
    // Get the current date and time
    const now = new Date();
    // Calculate the time difference in milliseconds
    const timeDiff = now.getTime() - createdAt.getTime();
    // Convert the time difference to a human-readable format
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeAgo;

    if (days > 0) {
    timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
    timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
    timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
    timeAgo = `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }

    return timeAgo;
}



export function generateWriteComment(userData) {
    const writeComment = `
        <div class='write-comment-container'>
            <form action='/' method='POST'>
                <textarea name='comment'  id='add-comment' placeholder="Add a comment..."></textarea>
                <div class='footer'>
                    <button type='submit' id='send-btn' class='active-state'>SEND</button>
                    <img src='${userData.image.png}'>
                </div>
            </form>
        </div>
    `;
    return writeComment;
}




export function generateCommentsHTML(comments) {
    let temp_html = '';
    const currentUser = getCurrrentUser();
    comments.forEach(comment => {
        let isAuthor = currentUser.username === comment.user.username;
        const commentHTML = _generateCommentHTML(comment, 'regular', isAuthor);
        // commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
        temp_html += commentHTML;

        if (comment.replies.length > 0) {
            comment.replies.forEach(replyComment => {
                isAuthor = currentUser.username === replyComment.user.username;
                const replyHTML = _generateCommentHTML(replyComment, 'reply', isAuthor);
                // commentsContainer.insertAdjacentHTML('beforeend', replyHTML);
                temp_html += replyHTML;
            });
        }
    });
    return temp_html;
}

