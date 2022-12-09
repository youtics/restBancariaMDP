const { response } = require("express");
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");



const login = async (req, res=response)=>{

const {email, password} = req.body;
try{
    //verificar si el email existe
    //verificar el usuario
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        return res.status(400).json({
            msg: 'Usuario y/o pass no son correcctos'
        })
    }
    //verificar si el usuario esta activo
    if(usuario.estado==false){
        return res.status(400).json({
            msg: 'Todavia no esta habilitado en el sistema'
        })
    }

    //verificar la contraseña
    const passValido = bcryptjs.compareSync(password, usuario.password);
    if(!passValido){
        return res.status(400).json({
            msg: 'Usuario y/o pass no son correcctos'
        })
    }

    // Generar el Token
    const token = await generarJWT(usuario.id);

    res.json({
            msg: "login OK",
            usuario,
            token
        });

}catch(error)
{
    console.log(error);
    return res.status(500).json({
        msg: 'Hable con el administrador'
    })
}


    
}

module.exports = {
    login
}