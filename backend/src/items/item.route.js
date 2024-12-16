const express = require('express');
const item = require('./item.model');
const { postAitem, getAllitems, getSingleitem, Updateitem, deleteAitem } = require('./item.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router =  express.Router();


// post a item
router.post("/create-item", verifyAdminToken, postAitem)

// get all items
router.get("/", getAllitems);

// single item endpoint
router.get("/:id", getSingleitem);

// update a item endpoint
router.put("/edit/:id", verifyAdminToken, Updateitem);

router.delete("/:id", verifyAdminToken, deleteAitem)


module.exports = router;
