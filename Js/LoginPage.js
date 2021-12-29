document.getElementById("loginGoogleForm").addEventListener("submit", (event) => {
    event.preventDefault()
})

document.getElementById("loginFacebookForm").addEventListener("submit", (event) => {
    event.preventDefault()
})

// document.getElementById("loginAppleForm").addEventListener("submit", (event) => {
//     event.preventDefault()
// })
//************************************
// Google Login **********************
//************************************
function googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            let credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            let uid = result.uid;
             fetchUser(credential, token, user, result.uid)
        }).catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
    });
}
//************************************
// Facebook Login **********************
//************************************
function facebookLogin(){
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // @typeof {"https://onlinetestsystem-a4cc4.firebaseapp.com/__/auth/handler"}
            let credential = result.credential;
            // The signed-in user info.
            let user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            let accessToken = credential.accessToken;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;

            // ...
        });
}

function fetchUser(credential, token, user, uid) {

}


