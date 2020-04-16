const db = require("./conn");

class SurveyModel {
	constructor(id) {
		this.id = id;
	}

	// Posts //

	static async getSurveySummary(survey_id) {
		try {
			const survey = await db.one(`
				SELECT surveys.survey_id, surveys.name, surveys.survey_type_id, surveys.user_id, surveys.created_timestamp, users.username
				FROM surveys
				INNER JOIN users ON surveys.user_id = users.user_id
				WHERE surveys.survey_id = ${survey_id};
			`);
			return survey;
		} catch (error) {
			return error.message;
		}
	}

	static async getSurveyQuestions(survey_id) {
		try {
			const surveyQuestions = await db.any(`
				SELECT questions.question_id, questions.text, surveys.survey_id, surveys.name, surveys.survey_type_id, surveys.user_id, surveys.created_timestamp, questions.question_type_id, questions.question_order, questions.option_1, questions.option_2, questions.option_3, questions.option_4, questions.option_5, questions.option_6, questions.other, questions.img_url 
				FROM questions
				INNER JOIN surveys
				ON questions.survey_id = surveys.survey_id
				WHERE questions.survey_id = ${survey_id}
				ORDER BY question_order ASC;
			`);
			return surveyQuestions;
		} catch (error) {
			return error.message;
		}
	}

	static async getSurveyResponsesCount(survey_id) {
		try {
			const surveyResponses = await db.one(`
				SELECT COUNT(*)
				FROM responses
				INNER JOIN surveys
				ON responses.survey_id = surveys.survey_id
				WHERE responses.survey_id = ${survey_id};
			`);
			return surveyResponses;
		} catch (error) {
			return error.message;
		}
	}

	static async getSurveyResponsesAll(survey_id) {
		try {
			const surveyResponses = await db.any(`
				SELECT *
				FROM responses
				INNER JOIN response_questions
				ON responses.response_id = response_questions.response_id
				WHERE responses.survey_id = ${survey_id}
			`);
			return surveyResponses;
		} catch (error) {
			return error.message;
		}
	}

	static async getSurveyResponsesQuestion(question_id) {
		try {
			const surveyResponses = await db.any(`
				SELECT *
				FROM response_questions
				INNER JOIN responses
				ON response_questions.response_id = responses.response_id
				WHERE response_questions.question_id = ${question_id}
				ORDER BY responses.submitted_timestamp ASC;
			`);
			return surveyResponses;
		} catch (error) {
			return error.message;
		}
	}

	static async getSurveyResponsesOther(survey_id) {
		try {
			const surveyResponses = await db.any(`
				SELECT *
				FROM response_questions
				INNER JOIN responses
				ON response_questions.response_id = responses.response_id
				WHERE responses.survey_id = ${survey_id}
				AND response_questions.other <> ''
				ORDER BY responses.submitted_timestamp ASC;
			`);
			return surveyResponses;
		} catch (error) {
			return error.message;
		}
	}

	// ADDING TO DB

	static async addSurvey(name, survey_type_id, user_id) {
		try {
			const addSurvey = await db.result(`
				INSERT INTO surveys (name, survey_type_id, user_id)
				VALUES ('${name}', '${survey_type_id}', '${user_id}')
				RETURNING survey_id;
			`);
			return addSurvey;
		} catch (error) {
			return error.message;
		}
	}

	static async addSurveyQuestions(
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
	) {
		try {
			const addSurveyQuestions = await db.result(`
				INSERT INTO questions (survey_id, text, question_type_id, question_order, option_1, option_2,	option_3,	option_4,	option_5,	option_6,	other, img_url)
				VALUES ('${survey_id}', '${text}', '${question_type_id}', '${question_order}', '${option_1}', '${option_2}', '${option_3}', '${option_4}', '${option_5}', '${option_6}', '${other}', '${img_url}')
			`);
			return addSurveyQuestions;
		} catch (error) {
			return error.message;
		}
	}

	static async addSurveyResponse(survey_id) {
		try {
			const addResponse = await db.result(`
				INSERT INTO responses (survey_id)
				VALUES (${survey_id})
				RETURNING response_id;
			`);
			return addResponse;
		} catch (error) {
			return error.message;
		}
	}

	static async addSurveyResponseQuestions(
		response_id,
		question_id,
		option_1,
		option_2,
		option_3,
		option_4,
		option_5,
		option_6,
		other
	) {
		try {
			const addResponseQuestions = await db.result(`
				INSERT INTO response_questions (response_id, question_id, option_1, option_2,	option_3,	option_4,	option_5,	option_6,	other)
				VALUES ('${response_id}', '${question_id}', '${option_1}', '${option_2}', '${option_3}', '${option_4}', '${option_5}', '${option_6}', '${other}')
			`);
			return addResponseQuestions;
		} catch (error) {
			return error.message;
		}
	}
}

module.exports = SurveyModel;
