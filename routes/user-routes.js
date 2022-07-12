const router = require("express").Router();
const { 
    getAllUsers,
    registration,
    authenticate
 } = require("../controllers/user-controller");

router.get("/", getAllUsers);
router.post("/register", registration);
router.post("/authenticate", authenticate);

module.exports = router;