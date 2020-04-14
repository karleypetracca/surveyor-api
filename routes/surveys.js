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
router.get("/responses/:survey_id?/:question_id?", async function (req, res) {
	const { survey_id, question_id } = req.params;
	const data = await SurveyModel.getSurveyResponses(question_id);

	res.json(data).status(200);
});

/* POST add survey */
router.post("/addsurvey", async (req, res) => {
	const { name, survey_type_id, user_id } = req.body;
	const response = await SurveyModel.addSurvey(name, survey_type_id, user_id);

	if (response.command === "INSERT" && response.rowCount >= 1) {
		res.json({ survey_id: response.rows[0].survey_id }).status(200);
	} else {
		res.send("Could not add new blog post").status(409);
	}
});

/* POST add survey questions */
router.post("/addsurveyquestions", async (req, res) => {
	const {
		text,
		survey_id,
		question_type_id,
		question_order,
		option_1,
		option_2,
		option_3,
		option_4,
		option_5,
		option_6,
		other,
		img_url,
	} = req.body;
	const response = await SurveyModel.addSurveyQuestions(
		text,
		survey_id,
		question_type_id,
		question_order,
		option_1,
		option_2,
		option_3,
		option_4,
		option_5,
		option_6,
		other,
		img_url
	);

	if (response.command === "INSERT" && response.rowCount >= 1) {
		res.sendStatus(200);
	} else {
		res.send("Could not add new blog post").status(409);
	}
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
