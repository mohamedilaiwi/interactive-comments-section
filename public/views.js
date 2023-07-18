/*
    Deals with setting the HTML of each page
*/

import {generateCommentsHTML, generateWriteComment} from './index.js';


export default function generateHomePage(data) {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->

    <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon-32x32.png">
    <link rel="stylesheet" href="./styles.css">

    <script type="module" src="./index.js" defer></script>
    <script type="module" src="./submits.js" defer></script>
    <title>Frontend Mentor | Interactive comments section</title>

    <!-- Feel free to remove these styles or customise in your own stylesheet 👍 -->
    <style>
        .attribution { font-size: 11px; text-align: center; }
        .attribution a { color: hsl(228, 45%, 44%); }
    </style>
    </head>
    <body>
    <!-- Pull dynamic content from the data.json file -->
    <main >
        <div class="comment-container">
    `;
    html += generateCommentsHTML(data.comments);
    html += `</div>`
    html += generateWriteComment(data.currentUser);
    html += `
            </main>
            <script>
                async function handleDelete(id) {
                    try {
                        const response = await fetch('/delete?id=' + id, {
                            method: 'DELETE',
                        });
                    
                        if (response.ok) {
                            console.log('Delete request sent');
                            // Refresh the page after successful deletion
                            window.location.reload();
                        } else {
                            console.error('Failed to send delete request');
                        }
                    } catch (error) {
                        console.error('An error occurred while sending the delete request:', error);
                    }
                }


            </script>
        </body>
        </html>
    `;
    return html
}