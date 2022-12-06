

/* {
    nombre: '',
    apellido: '',
    dni:
    email: '',
    user: '',
    password: '',
    img: 'url'
    role: ''
    estado: Boolean
    google: false
} */

const {Schema, model} = require ('mongoose');

const UsuarioSechema = Schema({
    apellido: {
        type: String,
        required: [true, 'El campo es requerido'],
    },
    nombre: {
        type: String,
        required: [true, 'El campo es requerido'],
    },
    email: {
        type: String,
        required: [true, 'El campo es requerido'],
        unique: true
    },
    dni: {
        type: Number,
        required: [true, 'El campo es requerido'],
    },
    password: {
        type: String,
        required: [true, 'El campo es requerido'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El campo role es requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },

});


module.exports = model('Usuario', UsuarioSechema); 
