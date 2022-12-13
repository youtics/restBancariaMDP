const { response, request } = require('express');
const jwt = require ('jsonwebtoken');
const Usuario = require ('../models/usuarios');

const validarJWT = async(req = request, res = response, next) =>{

    const token = req.header('x-token');
    console.log(token);
    if(!token)
    {
        return res.json({
            msg: 'No ha iniciado sesión'
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //leer el usuario que corresponde al uid y este usuario es el que lee usuario autenticado
        const usuario = await Usuario.findById(uid);
        if(!usuario)
        {
            return res.json({
                msg: 'El Usuario no existe'
            })
        }

        //verificar el estado es false
        if(usuario.estado==false)
        {
            return res.status(401).json({
                msg: 'El administrador del sistema todavia no lo habilito'
            });
        }

        req.usuario = usuario;

        next();
    }catch(error){
        console.log(error);
        return res.json({
            msg: 'Token no valido...'
        })
    }

}

module.exports = {validarJWT}