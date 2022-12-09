const Role = require ('../models/role');
const Usuario = require ('../models/usuarios')


const esRoleValido = async ( role = '' ) => {
    const existeRole = await Role.findOne({role});
    if(!existeRole)
    {
        throw new Error(`El rol ${role} no es un rol valido`);
    }
}

//verificar si el email existe
const existeMailDB = async email => {
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail)
    {
        throw new Error (`El email ${email} ya existe en la BD`);
    }
};

//verificar el dni
const existeDNIDB = async dni =>{
    const existeDNI = await Usuario.findOne( {dni});

    if (existeDNI)
    {
        throw new Error (`El DNI ${dni} ya existe en la BD`);
    }
}

//verificar el nro de legajo
const existeNroAfDB = async nroAfiliado=>{
    const existeNroAF = await Usuario.findOne({nroAfiliado})

    if (existeNroAF)
    {
        throw new Error (`El NRO DE AFILIADA/O ${nroAfiliado} ya existe en la BD`);
    }
}

//verificar si el id existe
const existeidDB = async (id) => {
    const existeID = await Usuario.findById(id);

    if (!existeID)
    {
        throw new Error (`El de ID ${id} ya existe en la BD`);
    }
}
const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {esRoleValido, existeMailDB, existeDNIDB, existeNroAfDB, existeidDB, existeUsuarioPorId}