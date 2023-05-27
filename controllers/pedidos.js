const Pedido = require("../models/pedidos");

const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        
        res.json({
            ok: true,
            mje: "Estos son los pedidos",
            pedidos: pedidos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mje: "Hubo un error",
            error: error
        });
    }
}

const getOnePedidos = async (req, res) => {
    try {
        const pedidoFind = req.params.idpedido;
        const pedido = await Pedido.findById(pedidoFind);
        
        res.json({
            ok: true,
            mje: "Estos son los pedidos",
            pedido: pedido
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mje: "Hubo un error",
            error: error
        });
    }
}

const postItemPedidos = async (req, res) => {
    try {
        const newPedido = new Pedido({
            ...req.body
        });

        const newPedidoDB = await newPedido.save();
        
        res.json({
            ok: true,
            mje: "se agrego con exito el pedido",
            menu: newPedidoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mje: "El pedido no se agrego",
            error: error
        });
    } 
}

const deleteItemPedidos = async (req, res) => {
    try {
        const idPedidoDelete = req.params.idpedido;

        const pedidoDB = await Pedido.findById(idPedidoDelete);
        
        if(!pedidoDB){
            return res.status(404).json(
                {
                    ok: false,
                    mje: "No se encontro el pedido"
                }
            );
        } 
            
        await Pedido.findByIdAndDelete(idPedidoDelete);
        
        res.json(
            {
                ok: true,
                mje: "Se elimino el pedido con exito"
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                mje: "No se pudo eliminar el pedido",
                error: error
            }
        );
    }
}

const putItemPedidos = async (req, res) => {
    try {
        const idPedidoEdit = req.params.idpedido;
        const idMenuEdit = req.params.idmenu;
        const menuCantidadBody = req.body.cantidad || 1;

       const pedidoDB = await Pedido.findById(idPedidoEdit);

       if(!pedidoDB) {
        return res.status(404).json(
            {
                ok: false,
                mje: "Pedido no encontrado"
            }
        );
       } 

       const menuExist = pedidoDB.menus.find((obj) => obj.menu.toString() === idMenuEdit);
       if(menuExist){
        await Pedido.findOneAndUpdate(
            {_id : idPedidoEdit},
            {
                $set: {
                    menus: {
                        menu: idMenuEdit,
                        cantidad: menuExist.cantidad + menuCantidadBody
                    }
                }
            }
        )
       } else {
        await Pedido.findOneAndUpdate(
            {_id: idPedidoEdit},
            {
                $push: {
                    menus: {
                        menu: idMenuEdit,
                        cantidad: menuCantidadBody
                    }
                }
            }
        )
       }
        res.json(
            {
                ok: true,
                mje: "Se actualizo el pedido con exito"
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                mje: "Hubo un error al editar el pedido"
            }
        );
    }
}


module.exports = {
    getPedidos,
    getOnePedidos,
    postItemPedidos,
    deleteItemPedidos,
    putItemPedidos
}