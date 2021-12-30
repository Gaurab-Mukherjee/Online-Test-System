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
            const credential = result.credential;
            const user = result.user;
            const uid = user.uid;
            const token = user.accessToken;
            const email = user.email;
            const name = user.name;
            fetchUser(token, uid, email, name)
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
    });
}

//************************************
// Facebook Login **********************
//************************************
function facebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const credential = result.credential;
            const user = result.user;
            const uid = user.uid;
            const token = user.accessToken;
            const email = user.email;
            const name = user.name;
            fetchUser(token, uid, email, name)
        })
        .catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            // ...
        });
}

// /uid_map/20211230121105
function fetchUser(token, uid, email, name) {
    const db = firebase.firestore();
    db.collection("uid_map")
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    // console.log(doc.data());
                    const G_Address = doc.get("address");
                    const G_ContactNo = doc.get("contact_no");
                    const G_CustomerId = doc.get("customer_id");
                    const G_Name = doc.get("name");
                    const G_RegistrationDate = doc.get("registration_date");
                    const G_Token = doc.get("token");
                    const G_UID = doc.get("uid");
                    const G_USERTYPE = doc.get("user_type");
                    if(G_UID === uid) {
                    GoToHomePage(G_USERTYPE);
                    } else {
                        // console.log("-------->>");
                        // registerUser();
                    }
                });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error.message);
        });
}

function registerUser() {
    document.location.href = "RegistrationPage.html";
}


function GoToHomePage(G_USERTYPE) {
    if (G_USERTYPE === "student") {
        document.location.href = "../Online Test System/Student/StudentHomePage.html";
    } else if (G_USERTYPE === "teacher") {
        document.location.href = "../Online Test System/Faculty/FacultyHomePage.html";
    } else {
        document.location.href = "../Online Test System/Admin/AdminHomePage.html";
    }
}


// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
function progressBar() {
    const bar = new ProgressBar.Path('#heart-path', {
        easing: 'easeInOut',
        duration: 1400
    });

    bar.set(0);
    bar.animate(1.0);  // Number from 0.0 to 1.0
}