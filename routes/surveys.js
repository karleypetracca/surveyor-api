const express = require("express"),
	router = express.Router(),
	SurveyModel = require("../models/SurveyModel");

/* GET survey */
router.get("/summary/:survey_id?", async function (req, res) {
	const { survey_id } = req.params;
	const data = await SurveyModel.getSurveySummary(survey_id);

	res.json(data).status(200);
});

/* GET survey questions */
router.get("/detail/:survey_id?", async function (req, res) {
	const { survey_id } = req.params;
	const data = await SurveyModel.getSurveyQuestions(survey_id);

	res.json(data).status(200);
});

/* GET survey responses - count all */
router.get("/responses/count/:survey_id?", async function (req, res) {
	const { survey_id } = req.params;
	const data = await SurveyModel.getSurveyResponsesCount(survey_id);

	res.json(data).status(200);
});

/* GET survey responses - all questions */
router.get("/responses/all/:survey_id?", async function (req, res) {
	const { survey_id } = req.params;
	const data = await SurveyModel.getSurveyResponsesAll(survey_id);

	res.json(data).status(200);
});

/* GET survey responses - specific question */
router.get("/responses/question/:question_id?", async function (req, res) {
	const { question_id } = req.params;
	const data = await SurveyModel.getSurveyResponsesQuestion(question_id);

	res.json(data).status(200);
});

/* GET survey responses - specific question */
router.get("/responses/other/:survey_id?", async function (req, res) {
	const { survey_id } = req.params;
	const data = await SurveyModel.getSurveyResponsesOther(survey_id);

	res.json(data).status(200);
});

/* POST add survey */
router.post("/addsurvey", async (req, res) => {
	const { name, survey_type_id, user_id } = req.body;
	const response = await SurveyModel.addSurvey(name, survey_type_id, user_id);

	if (response.command === "INSERT" && response.rowCount >= 1) {
		res.json({ survey_id: response.rows[0].survey_id }).status(200);
	} else {
		res.send("Could not log survey").status(409);
	}
});

/* POST add survey questions */
router.post("/addsurveyquestions", async (req, res) => {
	const {
		survey_id,
		text,
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
		survey_id,
		text,
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
		res.send("Could not log survey questions").status(409);
	}
});

/* POST survey response */
router.post("/sendresponse", async (req, res) => {
	const { survey_id } = req.body;
	const response = await SurveyModel.addSurveyResponse(survey_id);

	if (response.command === "INSERT" && response.rowCount >= 1) {
		res.json({ response_id: response.rows[0].response_id }).status(200);
	} else {
		res.send("Could not log response").status(409);
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
		res.send("Could not log response").status(409);
	}
});

module.exports = router;
