const { Router } = require("express");
const {getMenus, postMenus, deleteMenus, putMenus} = require("../controllers/menus")

const router = Router();

/*  menus/  */
router.get("/", getMenus); 
router.post("/", postMenus);
router.delete("/:idmenu", deleteMenus);
router.put("/:idmenu", putMenus);

module.exports = router;