const Menu = require("../models/menus");

const getMenus = async (req, res) => {//Async porque trabajamos con base de datos
    try {
        const menus = await Menu.find();//Busca todos los productos y almacena en variable y await para esperar que llegue la info de la DB
        
        res.json({
            ok: true,
            mje: "Estos son los menus",
            menus: menus
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mje: "Hubo un error",
            error: error
        });
        console.log(error);
    }
}

const postMenus = async (req, res) => {
    try {
        const newMenu = new Menu({ //Creo nuevo producto con lo que viene del body en un objeto 
            ...req.body//Crear buenas validaciones al enviar los datos
        });

        const newMenuDB = await newMenu.save();
        
        res.json({
            ok: true,
            mje: "se agrego con exito el menu",
            menu: newMenuDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mje: "El menu no se agrego",
            error: error
        });
    } 
}

const deleteMenus = async (req, res) => {
    try {
        const idMenuDelete = req.params.idmenu;

        const menuDB = await Menu.findById(idMenuDelete);
        
        if(!menuDB){
            return res.status(404).json(
                {
                    ok: false,
                    mje: "No se encontro el menu"
                }
            );
        } 
            
        await Menu.findByIdAndDelete(idMenuDelete);
        
        res.json(
            {
                ok: true,
                mje: "Se elimino el producto con exito"
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                mje: "No se pudo eliminar el producto",
                error: error
            }
        );
    }
}

const putMenus = async (req, res) => {
    try {
        const idMenuEdit = req.params.idmenu;
        const menuEditBody = req.body;

       const menuDB = await Menu.findById(idMenuEdit);

       if(!menuDB) {
        return res.status(404).json(
            {
                ok: false,
                mje: "Menu no encontrado"
            }
        );
       } 

       const newMenuUpdate = await Menu.findByIdAndUpdate(idMenuEdit, menuEditBody,
        {
            new: true //Para aceptar los cambios en la DB
        });

        res.json(
            {
                ok: true,
                mje: "Se actualizo el menu con exito",
                menuUpdate : newMenuUpdate
            }
        );

    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                mje: "Hubo un error al editar el menu"
            }
        );
    }
}

//Exporta las funciones en el backend
module.exports = {
    getMenus,
    postMenus,
    deleteMenus,
    putMenus
}