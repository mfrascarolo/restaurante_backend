const mongoose = require("mongoose");

const PedidosSchema = mongoose.Schema({
    user : {
        type: String, //*--Hacer referencia al usuario de la DB--*
        required: true
    },
    date: {
        type: Date, //tomar fecha actual
    },
    menus : [
        {
            menu: {
                type: mongoose.Schema.Types.ObjectId, //Declaramos que va a ser un tipo de objeto de mongo
                ref: "Menu"
        },
            cantidad: {
                type: Number,
                default: 1
        }
    }
    ], 
    status: {
        type: Boolean,
        default : false
    }
}, {collection: "pedidos"});

/*PedidosSchema.method("toJSON", function(){
    const {__v, ...object} = this.toObjet();

    return object;
})*/

module.exports = mongoose.model("Pedido", PedidosSchema);