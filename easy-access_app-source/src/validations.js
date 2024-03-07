export const validateEmail = (value) => {
    const pat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(pat.test(value)){
        return {fail: false, description: ""}
    }
    else{
        return {fail: true, description: "Ingresa un correo valido: nombredeusuario@dominio.com."}
    }
}


export const validatePass = (value) => {
    const pat = /^(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[@#$%&/])[A-Za-z0-9@#$%&/]{8,12}$/;
    if(pat.test(value)){
        return {fail: false, description: ""}
    }else{
        return {fail: true, description: "Se requiere: Minimo una Mayúscula, una Minúscula y un Número con al menos uno de estos caracteres @#$%& y una logitud de 8 a 12 caracteres."}
    }
}
