const express = require("express"),
	router = express.Router(),
	Model = require("../models/Model");

/* GET home page. */
router.get("/", function (req, res) {
	res.render("index", { title: "Surveyor API" });
});

module.exports = router;
