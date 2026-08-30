import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


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


const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const commentsRef = ref(database, "comments");

const floatingComments =
    document.getElementById("floatingComments");


/*
========================================
RECEIVE COMMENTS FROM FIREBASE
========================================
*/

onChildAdded(commentsRef, (snapshot) => {

    const comment = snapshot.val();

    console.log("COMMENT RECEIVED:", comment);

    if (!comment) {
        return;
    }

    createFloatingComment(comment);

});


/*
========================================
CREATE FLOATING COMMENT
========================================
*/

function createFloatingComment(comment) {

    const element =
        document.createElement("div");

    element.className =
        "floating-comment";


    const username =
        document.createElement("span");

    username.className =
        "username";

    username.textContent =
        (comment.username || "User") + ":";


    const message =
        document.createElement("span");

    message.textContent =
        comment.message || "";


    element.appendChild(username);

    element.appendChild(message);


    /*
    Random horizontal position
    */

    element.style.left =
        (Math.random() * 55 + 5) + "%";


    /*
    Random animation speed
    */

    const duration =
        Math.random() * 3 + 5;

    element.style.animationDuration =
        duration + "s";


    floatingComments.appendChild(element);


    /*
    Remove after animation
    */

    setTimeout(() => {

        element.remove();

    }, duration * 1000);

}