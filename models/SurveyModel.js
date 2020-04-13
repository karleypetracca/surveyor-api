const db = require("./conn");

class SurveyModel {
	constructor(id) {
		this.id = id;
	}

	// Posts //

	static async getSurveySummary(id) {
		try {
			const survey = await db.one(`
				SELECT surveys.survey_id, surveys.name, surveys.survey_type_id, surveys.user_id, surveys.created_timestamp, users.username
				FROM surveys
				INNER JOIN users ON surveys.user_id = users.user_id
				WHERE surveys.survey_id = ${id};
			`);
			return survey;
		} catch (error) {
			return error.message;
		}
	}

	static async getSurveyQuestions(id) {
		try {
			const surveyQuestions = await db.any(`
				SELECT questions.question_id, questions.text, surveys.survey_id, surveys.name, surveys.survey_type_id, surveys.user_id, surveys.created_timestamp, questions.question_type_id, questions.question_order, questions.option_1, questions.option_2, questions.option_3, questions.option_4, questions.option_5, questions.option_6, questions.other, questions.img_url 
				FROM questions
				INNER JOIN surveys
				ON questions.survey_id = surveys.survey_id
				WHERE questions.survey_id = ${id}
				ORDER BY question_order ASC;
			`);
			return surveyQuestions;
		} catch (error) {
			return error.message;
		}
	}

	static async getSurveyResponses(id) {
		try {
			const surveyResponses = await db.any(`
				SELECT * FROM responses
				WHERE survey_id = ${id}
			`);
			return surveyResponses;
		} catch (error) {
			return error.message;
		}
	}

	// ADDING TO DB

	static async addSurveyResponse(survey_id) {
		try {
			const addResponse = await db.result(`
				INSERT INTO responses (survey_id)
				VALUES (${survey_id})
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

	// static async addPost(title, post, author_id) {
	// 	try {
	// 		const postPost = await db.result(`
	// 			INSERT INTO posts (title, post, author_id)
	// 			VALUES ('${title}', '${post}', ${author_id})
	// 		`);
	// 		return postPost;
	// 	} catch (error) {
	// 		console.error("ERROR", error);
	// 		return error.message;
	// 	}
	// }

	// static async addComment(comment, author_id, post_id) {
	// 	try {
	// 		const postComment = await db.result(`
	// 			INSERT INTO comments (comment, author_id, post_id)
	// 			VALUES ('${comment}', ${author_id}, '${post_id}')
	// 		`);
	// 		return postComment;
	// 	} catch (error) {
	// 		console.error("ERROR", error);
	// 		return error.message;
	// 	}
	// }
}

module.exports = SurveyModel;
