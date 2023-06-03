const mongoose = require("mongoose");

const MenusSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default : false
    },
    price: {
        type: Number,
        required: true
    },
    img:{
        type: String,
        default: ""
    },
    detail : {
        type: String
    }, 
    category : {
        type: String,
        required: true
    }
}, {collection: "menus"});

/*MenusSchema.method("toJSON", function(){
    const {__v, ...object} = this.toObjet();

    return object;
})*/

module.exports = mongoose.model("Menu", MenusSchema);