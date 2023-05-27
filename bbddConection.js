const mongoose = require("mongoose");

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("Se conecto la DB"));
    } catch (error) {
        console.log(error);
        throw Error("Error al iniciar la DB");
    }

}

module.exports = {
    dbConnection
}