const {response, request} = require ('express');



const usuariosGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        msg:'get API - controller',
        query
    })
}
const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;
    res.json({
        nombre,
        edad,
        msg:'post API - controller'
    })
}
const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg:'put API - controller'
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg:'delete API - controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut
}