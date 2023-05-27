const bcrypt = require('bcryptjs');
const Usuario = require("../models/users");
const { jwtGenerate } = require("../utils/jwt");
const { validationResult } = require('express-validator');


const loginUsers = async (req, res) => {
    try {
        const {username, password} = req.body;

        const userDB = await Usuario.findOne({username})
        
        if (!userDB) {
            return res.json({
                ok: false,
                mje: "usuario no encontrado"
            });
        }

        const validatePassword = await bcrypt.compare(password, userDB.password)

        if(!validatePassword){
            return res.json({
                ok: false,
                mje: "Contraseña incorrecta",
                usuario: userDB.username
            });
        }


        const userToken = await jwtGenerate(userDB._id);

        res.json({
            ok: true,
            mje: "El usuario fue encontrado",
            user: userDB,
            token: userToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mje: "Hubo un error al buscar el usuario",
            error: error
        });
    } 
}

const registerUsers = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        return res.status(400).json(
            {
                ok: false,
                mje: "Usuario o contraseña no cumple con los requisitos para registrar"
            }
        )
    }

    try {
        const {username, password, email} = req.body;

        const userDB = await Usuario.findOne({username})
        
        if (userDB) {
            return res.json({
                ok: false,
                mje: "Usuario ya registrado"
            });
        }

        const passEncrypt = await bcrypt.hash(password,12);

        const newUser = Usuario({
            username : username,
            password : passEncrypt,
            email: email
        });

        newUser.save();

        res.json({
            ok: true,
            mje: "se agrego con exito el usuario",
            usuario: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mje: "El usuario no se agrego",
            error: error
        });
    } 
}

module.exports = {
    loginUsers,
    registerUsers
}