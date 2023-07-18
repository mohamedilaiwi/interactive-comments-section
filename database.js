import mysql, { format } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Create a connection to the MySQL server
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// Standard Query to input to database
const queryUser = `
    INSERT INTO comments SET ?
`;

/* 
    submitNewPost: Adds a new post to the database
    @parameters:
        -currentUser: An object that contains the image and username of the user posting
        -content: The content/text of the comment
        -replyId: The id of the person they are replying to.
    pre: parameters are not null
    post: adds data to database
*/
export async function submitNewPost(currentUser, content, replyId) {
    if (!currentUser) 
        throw new Error('CurrentUser cannot be null. ');
    else if (!content) 
        throw new Error('Content cannot be null');
    
    const newPost = {
        content: content,
        createdAt: new Date(),
        image: currentUser.image.png,
        username: currentUser.username,
        parentId: replyId
    };

    pool.query(queryUser, newPost);
};


/*
    deleteFromDB: Given an id, deletes it from the database
*/
export async function deleteFromDB(id) {
    const row = await pool.query(`DELETE FROM comments WHERE id = ${id}`);
}


/*
    showAllComments: Fetches data from database and returns a JSON object acceptable for HTML template.
    
    @parameters: none
    pre: none
    post: JSON object that meets the standard of the html/css
*/
export async function showAllComments() {
    const rows = await pool.query(`SELECT * FROM comments`);
    return {
        "currentUser": {
            "image": {
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        },
        "comments": _convertToJSON(rows)
    };
};

/* 
    Converts a row in the database to a valid JSON object to send to user
*/
function _convertToJSON(data) {
    const objects = []; // container for JSON objects
                                                    
    // iterate over comments container (data)
    data[0].forEach(comment => {
        if (!comment.parentId) { // just a comment
            const formatJSON = {
                "id": comment.id,
                "content": comment.content,
                "createdAt": comment.createdAt,
                "score": comment.score,
                "user": {
                    "image": comment.image,
                    "username": comment.username
                },
                "replies": _getReplies(objects, comment)
            }
            objects.push(formatJSON);
        } else { // this is a reply
            _getReplies(objects, comment);
        }
    });
    return objects;
};


/*
    _getReplies: If the parentId is not null, then sets up reply container for  previous comment

    @parameters:
        -comment: object that contains id, content, createdAt, score, reply, 
        user
    @pre: comment is not null, else returns empty array
    @post returns array with objects
*/
function _getReplies(objects, comment) {
    if (!comment || !comment.parentId) return [];

    const parentid = comment.parentId;
    objects.forEach(object => {
        if (object.id === parentid) {
            const formatObject = {
                "id": comment.id,
                "content": comment.content,
                "createdAt": comment.createdAt, 
                "score": 0,
                "replyingTo": object.user.username, 
                "user": {
                    "image": comment.image,
                    "username": comment.username 
                }
            };
            object.replies.push(formatObject);
        }
    });
    return [];
};


// submitNewPost(
//     {
//         image: "./images/avatars/image-amyrobson.png",
//         username: "amyrobson"
//     },
//     "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
//     null 
// )


// submitNewPost(
//     {
//         image: "./images/avatars/image-juliusomo.png",
//         username: "juliusomo"
//     },
//     "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
//     23
// )

const data = await showAllComments();
// console.log(data);