import { useLayoutEffect, useState } from "react";
import { firebaseAuth } from "../firebase";
import { signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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
        signUp
    }
}
export default useAuth