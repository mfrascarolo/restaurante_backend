const { Router } = require("express");
const {getPedidos, getOnePedidos, postItemPedidos, deleteItemPedidos, putItemPedidos} = require("../controllers/pedidos");
const { jwtVerify } = require("../utils/jwt");

const router = Router();

/*  pedidos/  */
router.get("/",jwtVerify, getPedidos); 
router.get("/idpedido", getOnePedidos); 
router.post("/", postItemPedidos);
router.delete("/:idpedido", deleteItemPedidos);
router.put("/:idpedido/:idmenu", putItemPedidos);

module.exports = router;