document.getElementById("loginGoogleForm").addEventListener("submit", (event) => {
    event.preventDefault()
})

document.getElementById("loginFacebookForm").addEventListener("submit", (event) => {
    event.preventDefault()
})
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
            // fetchUser(credential, token, user, result.uid)
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

}

function fetchUser(credential, token, user, uid) {

}


