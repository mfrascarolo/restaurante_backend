const jwt = require('jsonwebtoken');
const { resolve } = require('path');

const jwtGenerate = async (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
            expiresIn: "6h"
            },
            (error, token) => {
                if(error){
                    console.log(error);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        )
        
    }) 
}

const jwtVerify = (req, res, next) => {
    try {
        const token = req.header("x-token");

        if(!token){
            return res.status(401).json({
                ok: false,
                msje: "El token no existe"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) //VERIFICA SI EL TOKEN ESTA BIEN
        if(decoded){
            next()//Permite seguir a la siguiente funcion 
        } else {
            return res.status(401).json({
                ok: false,
                msje: "Token invalido"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msje: "Hubo un error al validar el token"
        })
    }
}

module.exports = {
    jwtGenerate,
    jwtVerify
}