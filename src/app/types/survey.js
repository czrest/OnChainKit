// Survey type definition (for reference)
/**
 * @typedef {Object} Survey
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} creator
 * @property {string} reward
 * @property {Question[]} questions
 * @property {Response[]} responses
 * @property {boolean} finalized
 * @property {number} createdAt
 * @property {number} [numberOfRespondents]
 * @property {'public'|'targeted'} respondentType
 * @property {ScreeningInfo} [screeningInfo]
 * @property {Applicant[]} applicants
 * @property {string[]} acceptedRespondents
 * @property {boolean} openedEarly
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} text
 * @property {'short-answer'|'long-answer'|'multiple-choice'|'checkbox'|'rating'|'date'|'time'} type
 * @property {string[]} [options]
 */

/**
 * @typedef {Object} Response
 * @property {string} id
 * @property {string} surveyId
 * @property {string} responder
 * @property {Answer[]} answers
 * @property {number} timestamp
 */

/**
 * @typedef {Object} Answer
 * @property {string} questionId
 * @property {string|number|string[]} value
 */

/**
 * @typedef {Object} DashboardData
 * @property {Survey[]} createdSurveys
 * @property {Survey[]} answeredSurveys
 */

/**
 * @typedef {Object} ScreeningInfo
 * @property {string} description
 * @property {string} requirements
 * @property {string} [dateTime]
 * @property {string} [meetingLink]
 * @property {string} [location]
 * @property {boolean} flexibleScheduling
 * @property {string} deadline
 */

/**
 * @typedef {Object} Applicant
 * @property {string} address
 * @property {'pending'|'accepted'|'rejected'} status
 * @property {number} appliedAt
 * @property {string} [message]
 * @property {string} [selectedSlot]
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} userId
 * @property {string} surveyId
 * @property {'application_status'|'screening_reminder'|'survey_opened'|'survey_closed'} type
 * @property {string} title
 * @property {string} message
 * @property {boolean} read
 * @property {number} timestamp
 */
