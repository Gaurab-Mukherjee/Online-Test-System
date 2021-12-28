// import * as module from "module";
// import {createContext, useContext, useEffect, useState} from "react"
import { auth } from "../../Js/init-firebase"
import { GoogleAuthProvider, signInWithPopup } from '../../node_modules/firebase/auth'
import firebase from "../../node_modules/firebase/compat";


// const AuthContext = createContext({
//     currentUser: null,
//     GoogleLogin: ()=> Promise
//
// })
//
// export const useAuth = () => useContext(AuthContext)
//
// export default function AuthContextProvider({children}) {
//     const [currentUser, setCurrentUser] = useState(null)
// }


document.getElementById('loginWithGoogle' ).onclick(GoogleLogin());

    function GoogleLogin(){
        const provider = new firebase.auth.GoogleAuthProvider();
        console.log('--------------->>> LoginDone');
        return signInWithPopup(auth, provider)
            .then(res=>{
            console.log(res.user)
            }).catch(e=>{
        console.log(e)
        })
    }

// const value = {
//     currentUser,
//     GoogleLogin
// }
//
//     return <AuthContext.AuthContext.LoginPage.AuthContext. Provider value={value}>{children}<AuthContext.Provider>

