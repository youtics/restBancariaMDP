const { request, response } = require("express")



const esAdminRole = (req=request, res=response, next)=>{
    if(!req.usuario)
    {
        return res.json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const {role, apellido} = req.usuario;
    if (role!== 'ADMIN_ROLE')
    {
        return res.json({
            msg: `El usuario ${apellido}, ${nombre} no esta autorizado para realizar esta operación`
        })
    }
    next()
}

const tieneRol = (...roles) => {
    return (req=request, res=response, next)=>{
        if(!req.usuario)
        {
            return res.json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.role))
        {
            return res.json({
                msg: 'No es un usuario con permisos de administración'
            });
        }
        next();
    }
}

module.exports = {esAdminRole, tieneRol}