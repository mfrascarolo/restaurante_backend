const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    }, 
    state: {
        type: Boolean,
        default : false
    },
    admin: {
        type: Boolean,
        default : false,
    }
}, {collection: "users"});

/*UsersSchema.method("toJSON", function(){
    const {__v, ...object} = this.toObjet();

    return object;
})*/

module.exports = mongoose.model("Usuario", UsersSchema);

//Validacion usuarios
//Img en menus
//api en la direccion