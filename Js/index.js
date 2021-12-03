
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyCmQSird5PmlaN89gGEiOMRNxdDG_v8YNw",
    authDomain: "onlinetestsystem-a4cc4.firebaseapp.com",
    projectId: "onlinetestsystem-a4cc4",
    storageBucket: "onlinetestsystem-a4cc4.appspot.com",
    messagingSenderId: "822940975771",
    appId: "1:822940975771:web:28fbe25245ce527e1cfc3e",
    measurementId: "G-RD31LXMBSG"
};

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
