const express = require("express"),
	router = express.Router(),
	SurveyModel = require("../models/SurveyModel");

/* GET survey */
router.get("/summary/:id?", async function (req, res) {
	const { id } = req.params;
	const data = await SurveyModel.getSurveySummary(id);

	res.json(data).status(200);
});

/* GET survey questions */
router.get("/detail/:id?", async function (req, res) {
	const { id } = req.params;
	const data = await SurveyModel.getSurveyQuestions(id);

	res.json(data).status(200);
});

module.exports = router;
