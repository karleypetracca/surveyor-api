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

/* GET survey responses */
router.get("/responses/:id?", async function (req, res) {
	const { id } = req.params;
	const data = await SurveyModel.getSurveyResponses(id);

	res.json(data).status(200);
});

/* POST survey response */
router.post("/sendresponse", async (req, res) => {
	const { survey_id } = req.body;
	const response = await SurveyModel.addSurveyResponse(survey_id);

	if (response.command === "INSERT" && response.rowCount >= 1) {
		res.json({ response_id: response.rows[0].response_id }).status(200);
	} else {
		res.send("Could not add new blog post").status(409);
	}
});

/* POST survey response */
router.post("/sendresponsequestions", async (req, res) => {
	const {
		response_id,
		question_id,
		option_1,
		option_2,
		option_3,
		option_4,
		option_5,
		option_6,
		other,
	} = req.body;
	const response = await SurveyModel.addSurveyResponseQuestions(
		response_id,
		question_id,
		option_1,
		option_2,
		option_3,
		option_4,
		option_5,
		option_6,
		other
	);

	if (response.command === "INSERT" && response.rowCount >= 1) {
		res.sendStatus(200);
	} else {
		res.send("Could not add new blog post").status(409);
	}
});

module.exports = router;
