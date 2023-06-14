const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");


router.post("/addEmp", AdminController.AddEmp)
router.put("/updateEmp", AdminController.UpdateEmp)
router.get("/getEmp", AdminController.SingleEmp)
router.delete("/deleteEmp", AdminController.DeleteEmp)

router.get("/getEmpByInactv", AdminController.GetEmpByInactv)

router.get("/getEmpByCatgry", AdminController.GetEmpByCatgry)
router.get("/getEmpByDept", AdminController.GetEmpByDept)

module.exports = router;