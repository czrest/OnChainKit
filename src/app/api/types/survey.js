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
 * @property {number} numberOfRespondents
 * @property {ScreeningInfo} screeningInfo
 * @property {Applicant[]} applicants
 * @property {string[]} acceptedRespondents
 * @property {boolean} openedEarly
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} text
 * @property {"short-answer" | "long-answer" | "multiple-choice" | "checkbox" | "rating" | "date" | "time"} type
 * @property {string[]} [options]
 * @property {boolean} required
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
 * @property {string | number | string[]} value
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
 * @property {string} [meetingLink]
 * @property {string} [location]
 * @property {string} applicationDeadline
 * @property {string} screeningDateTime
 * @property {string} surveyStartDate
 * @property {string} surveyFinalizeDate
 */

/**
 * @typedef {Object} Applicant
 * @property {string} address
 * @property {"pending" | "accepted" | "rejected"} status
 * @property {number} appliedAt
 * @property {string} [message]
 * @property {string} [selectedSlot]
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} userId
 * @property {string} surveyId
 * @property {"application_status" | "screening_reminder" | "survey_opened" | "survey_closed"} type
 * @property {string} title
 * @property {string} message
 * @property {boolean} read
 * @property {number} timestamp
 */

// Example usage:
const exampleSurvey = {
  id: "1",
  title: "Customer Feedback",
  description: "Survey about our new product",
  creator: "admin",
  reward: "10 points",
  questions: [],
  responses: [],
  finalized: false,
  createdAt: Date.now(),
  numberOfRespondents: 0,
  screeningInfo: {
    description: "Screening details here",
    requirements: "Must be 18+",
    applicationDeadline: "2025-10-20",
    screeningDateTime: "2025-10-22T10:00:00Z",
    surveyStartDate: "2025-10-23",
    surveyFinalizeDate: "2025-10-30",
  },
  applicants: [],
  acceptedRespondents: [],
  openedEarly: false,
};
