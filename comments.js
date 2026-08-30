
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";


import {
    getDatabase,
    ref,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";



/*
=========================================
FIREBASE CONFIGURATION
=========================================

USE THE SAME CONFIGURATION AS index.html
*/

const firebaseConfig = {

    apiKey: "AIzaSyDiUUYeYdxlVOPzEVjCT0Dp2dX4O97140U",

    authDomain:
        "live-comment-simulator.firebaseapp.com",

    databaseURL:
        "https://live-comment-simulator-default-rtdb.firebaseio.com/",

    projectId:
        "live-comment-simulator",

    storageBucket:
        "live-comment-simulator.firebasestorage.app",

    messagingSenderId:
        "728026722349",

    appId:
        "1:728026722349:web:9aed33fea73839e2a3c8a4"

};



/*
=========================================
INITIALIZE FIREBASE
=========================================
*/

const app =
    initializeApp(
        firebaseConfig
    );


const database =
    getDatabase(app);



/*
=========================================
COMMENT ELEMENT
=========================================
*/

const floatingComments =
    document.getElementById(
        "floatingComments"
    );



/*
=========================================
DATABASE COMMENTS
=========================================
*/

const commentsRef =
    ref(
        database,
        "comments"
    );



/*
=========================================
LISTEN FOR NEW COMMENTS
=========================================

Firebase calls this when:

1. The page first loads
2. A new comment is added
*/

onChildAdded(
    commentsRef,
    function(snapshot) {

        const comment =
            snapshot.val();


        if (
            !comment ||
            !comment.username ||
            !comment.message
        ) {

            return;

        }


        createFloatingComment(
            comment
        );

    },

    function(error) {

        console.error(
            "Firebase error:",
            error
        );

    }
);



/*
=========================================
CREATE FLOATING COMMENT
=========================================
*/

function createFloatingComment(
    comment
) {

    const element =
        document.createElement(
            "div"
        );


    element.className =
        "floating-comment";



    /*
        Username
    */

    const username =
        document.createElement(
            "span"
        );


    username.className =
        "username";


    username.textContent =
        comment.username + ":";



    /*
        Message
    */

    const message =
        document.createElement(
            "span"
        );


    message.textContent =
        comment.message;



    /*
        Build comment
    */

    element.appendChild(
        username
    );


    element.appendChild(
        message
    );



    /*
        Random horizontal position
    */

    const position =
        Math.random() * 55 + 5;


    element.style.left =
        position + "%";



    /*
        Random animation speed
    */

    const duration =
        Math.random() * 3 + 5;


    element.style.animationDuration =
        duration + "s";



    /*
        Add to screen
    */

    floatingComments.appendChild(
        element
    );



    /*
        Remove after animation
    */

    setTimeout(
        function() {

            element.remove();

        },
        duration * 1000
    );

}
