const {Router} = require ('express');
const {check}= require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const {validarCampos} = require ('../middlewares/validar-campos');
const router = Router();
const {esRoleValido, existeMailDB, existeDNIDB, existeNroAfDB, existeidDB, existeUsuarioPorId} = require ('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', usuariosGet );

router.put('/:id',
[
   check('id', 'No es un id valido de Mongodb').isMongoId(),
   check('id').custom(existeidDB),
   check('role').custom(esRoleValido),
   validarCampos
],usuariosPut);

router.post('/',
[
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Es obligatorio y mas de 6 letras').isLength({min:6}),
    check('dni', 'No es un número').isNumeric(),
    check('dni').custom(existeDNIDB),
    check('nroAfiliado', 'No es un numero').isNumeric(),
    check('nroAfiliado').custom(existeNroAfDB),
    check('email', 'El valor ingresado no es un correo...').isEmail(),
    check('email').custom(existeMailDB),
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
] ,usuariosPost);

router.delete('/:id',
[
    validarJWT,
    check('id', 'El id que quiere eleminar No es un id valido de Mongodb').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);

module.exports = router