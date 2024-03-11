import { useLayoutEffect, useState } from "react";
import { firebaseAuth } from "../firebase";
import { signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, OAuthProvider} from "firebase/auth";
const useAuth = (setLoader) => {
    const [user,setUser] = useState(null)
    const [auth, setAuth] = useState(false)
    const login = async(email, password) => {
        setLoader("Iniciando Sesión")
        return signInWithEmailAndPassword(firebaseAuth, email, password).finally(()=>{
            setLoader("")
        })
    }
    const sendEmailToVerify = async() => {
        sendEmailVerification(firebaseAuth.currentUser).then(() => {
            console.log("Verifica tu Correo","Hemos enviado un codigo de verificacion a tu correo.")
        }).catch((error) => {
            console.log(error)
        });
    }
    const signUp = async(name, apellidos, email, password)=>{
        setLoader("Creando Cuenta")
        return createUserWithEmailAndPassword(firebaseAuth, email, password).then(async()=>{
            sendEmailToVerify()
        }).finally(()=>{
            setLoader("")
        });
    }
    const loginWithGoogle = async() => {
        setLoader("Iniciando Sesión")
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(firebaseAuth, googleProvider).finally(()=>{
            setLoader("")
        });
    }
    const loginWithFacebook = async() => {
        setLoader("Iniciando Sesión")
        const facebookProvider = new FacebookAuthProvider()
        return signInWithPopup(firebaseAuth, facebookProvider).finally(()=>{
            setLoader("")
        });
    }
    const loginWithMicrosoft = async() => {
        setLoader("Iniciando Sesión")
        const microsoftProvider = new OAuthProvider('microsoft.com')
        return signInWithPopup(firebaseAuth, microsoftProvider).finally(()=>{
            setLoader("")
        });
    }
    useLayoutEffect(()=>{
        const unsubscribe = onAuthStateChanged(firebaseAuth, async(currentUser) => {
            setUser(currentUser)
            if(currentUser === null){
                setAuth(false)
            }else{
                setAuth(true)
            }
        });
        return () => unsubscribe();
    },[user])
    return {
        user,
        auth,
        login,
        signUp,
        loginWithGoogle,
        loginWithFacebook,
        loginWithMicrosoft
    }
}
export default useAuth