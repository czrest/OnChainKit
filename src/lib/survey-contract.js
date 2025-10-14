import { encodeFunctionData, parseEther } from 'viem';
import { addNotification } from './notification-service';

// Mock contract address for demo purposes
export const SURVEY_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';

// Contract ABI for survey operations
export const SURVEY_CONTRACT_ABI = [
    {
        type: 'function',
        name: 'createSurvey',
        inputs: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'questionsJson', type: 'string' },
        ],
        outputs: [{ name: 'surveyId', type: 'uint256' }],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'submitResponse',
        inputs: [
            { name: 'surveyId', type: 'uint256' },
            { name: 'answersJson', type: 'string' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'finalizeSurvey',
        inputs: [{ name: 'surveyId', type: 'uint256' }],
        outputs: [],
        stateMutability: 'nonpayable',
    },
];

// In-memory storage for demo (in production, this would be blockchain state)
let surveys = [];
let surveyIdCounter = 1;

// Helper to generate survey ID
function generateSurveyId() {
    return `survey-${surveyIdCounter++}`;
}

// Create a new survey
export async function createSurvey(
    title,
    description,
    questions,
    reward,
    creator,
    respondentType = 'public',
    numberOfRespondents,
    screeningInfo
) {
    const newSurvey = {
        id: generateSurveyId(),
        title,
        description,
        creator,
        reward,
        questions,
        responses: [],
        finalized: false,
        createdAt: Date.now(),
        respondentType,
        numberOfRespondents,
        screeningInfo,
        applicants: [],
        acceptedRespondents: [],
        openedEarly: false,
    };

    surveys.push(newSurvey);
    return newSurvey;
}

// Apply for screening
export async function applyForScreening(
    surveyId,
    applicantAddress,
    message,
    selectedSlot
) {
    const survey = getSurveyById(surveyId);

    if (!survey) {
        throw new Error('Survey not found');
    }

    if (survey.respondentType !== 'targeted') {
        throw new Error('This survey does not require screening');
    }

    // Check if already applied
    const existingApplicant = survey.applicants.find(
        (a) => a.address.toLowerCase() === applicantAddress.toLowerCase()
    );

    if (existingApplicant) {
        throw new Error('You have already applied for this survey');
    }

    const newApplicant = {
        address: applicantAddress,
        status: 'pending',
        appliedAt: Date.now(),
        message,
        selectedSlot,
    };

    survey.applicants.push(newApplicant);

    // Notify creator
    addNotification({
        userId: survey.creator,
        surveyId: survey.id,
        type: 'application_status',
        title: 'New Screening Application',
        message: `Someone applied for screening on "${survey.title}"`,
    });
}

// Accept applicant
export async function acceptApplicant(
    surveyId,
    applicantAddress,
    callerAddress
) {
    const survey = getSurveyById(surveyId);

    if (!survey) {
        throw new Error('Survey not found');
    }

    if (survey.creator.toLowerCase() !== callerAddress.toLowerCase()) {
        throw new Error('Only the creator can accept applicants');
    }

    const applicant = survey.applicants.find(
        (a) => a.address.toLowerCase() === applicantAddress.toLowerCase()
    );

    if (!applicant) {
        throw new Error('Applicant not found');
    }

    if (applicant.status === 'accepted') {
        throw new Error('Applicant already accepted');
    }

    applicant.status = 'accepted';
    survey.acceptedRespondents.push(applicantAddress);

    // Notify applicant
    addNotification({
        userId: applicantAddress,
        surveyId: survey.id,
        type: 'application_status',
        title: 'Application Accepted!',
        message: `Your application for "${survey.title}" has been accepted`,
    });

    // Auto-lock if target reached
    if (survey.numberOfRespondents && survey.acceptedRespondents.length >= survey.numberOfRespondents) {
        addNotification({
            userId: survey.creator,
            surveyId: survey.id,
            type: 'survey_opened',
            title: 'Target Reached',
            message: `"${survey.title}" has reached the target number of respondents`,
        });
    }
}

// Reject applicant
export async function rejectApplicant(
    surveyId,
    applicantAddress,
    callerAddress
) {
    const survey = getSurveyById(surveyId);

    if (!survey) {
        throw new Error('Survey not found');
    }

    if (survey.creator.toLowerCase() !== callerAddress.toLowerCase()) {
        throw new Error('Only the creator can reject applicants');
    }

    const applicant = survey.applicants.find(
        (a) => a.address.toLowerCase() === applicantAddress.toLowerCase()
    );

    if (!applicant) {
        throw new Error('Applicant not found');
    }

    applicant.status = 'rejected';

    // Notify applicant
    addNotification({
        userId: applicantAddress,
        surveyId: survey.id,
        type: 'application_status',
        title: 'Application Update',
        message: `Your application for "${survey.title}" was not selected this time`,
    });
}

// Open survey early
export async function openSurveyEarly(
    surveyId,
    callerAddress
) {
    const survey = getSurveyById(surveyId);

    if (!survey) {
        throw new Error('Survey not found');
    }

    if (survey.creator.toLowerCase() !== callerAddress.toLowerCase()) {
        throw new Error('Only the creator can open survey early');
    }

    survey.openedEarly = true;

    // Notify accepted respondents
    survey.acceptedRespondents.forEach((address) => {
        addNotification({
            userId: address,
            surveyId: survey.id,
            type: 'survey_opened',
            title: 'Survey Now Open!',
            message: `"${survey.title}" is now open for responses`,
        });
    });
}

// Check if user can access survey
export function canAccessSurvey(survey, userAddress) {
    if (!userAddress) return false;

    if (survey.respondentType === 'public') return true;

    if (survey.creator.toLowerCase() === userAddress.toLowerCase()) return true;

    // Check if accepted
    const isAccepted = survey.acceptedRespondents.some(
        (addr) => addr.toLowerCase() === userAddress.toLowerCase()
    );

    // Check if survey is open
    const isOpen = survey.openedEarly ||
        (survey.numberOfRespondents ? survey.acceptedRespondents.length >= survey.numberOfRespondents : false);

    return isAccepted && isOpen;
}

// Get all surveys
export function getAllSurveys() {
    return surveys;
}

// Get a specific survey by ID
export function getSurveyById(id) {
    return surveys.find((survey) => survey.id === id);
}

// Submit a response to a survey
export async function submitResponse(
    surveyId,
    responder,
    answers
) {
    const survey = getSurveyById(surveyId);

    if (!survey) {
        throw new Error('Survey not found');
    }

    if (survey.finalized) {
        throw new Error('Survey is already finalized');
    }

    // Check access for targeted surveys
    if (survey.respondentType === 'targeted' && !canAccessSurvey(survey, responder)) {
        throw new Error('You do not have access to this survey');
    }

    // Check if user already responded
    const existingResponse = survey.responses.find(
        (r) => r.responder.toLowerCase() === responder.toLowerCase()
    );

    if (existingResponse) {
        throw new Error('You have already responded to this survey');
    }

    const newResponse = {
        id: `response-${Date.now()}`,
        surveyId,
        responder,
        answers,
        timestamp: Date.now(),
    };

    survey.responses.push(newResponse);

    // Notify creator
    addNotification({
        userId: survey.creator,
        surveyId: survey.id,
        type: 'application_status',
        title: 'New Response',
        message: `Someone responded to "${survey.title}"`,
    });

    return newResponse;
}

// Finalize a survey and distribute rewards
export async function finalizeSurvey(surveyId, caller) {
    const survey = getSurveyById(surveyId);

    if (!survey) {
        throw new Error('Survey not found');
    }

    if (survey.creator.toLowerCase() !== caller.toLowerCase()) {
        throw new Error('Only the creator can finalize this survey');
    }

    if (survey.finalized) {
        throw new Error('Survey is already finalized');
    }

    if (survey.responses.length === 0) {
        throw new Error('Cannot finalize survey with no responses');
    }

    // Mark as finalized
    survey.finalized = true;

    // Notify all respondents
    survey.responses.forEach((response) => {
        addNotification({
            userId: response.responder,
            surveyId: survey.id,
            type: 'survey_closed',
            title: 'Rewards Distributed!',
            message: `"${survey.title}" has been finalized and your reward has been distributed`,
        });
    });

    console.log(`Survey ${surveyId} finalized. Rewards distributed to ${survey.responses.length} respondents.`);

    return true;
}

// Get surveys created by a specific address
export function getSurveysByCreator(creator) {
    return surveys.filter((survey) =>
        survey.creator.toLowerCase() === creator.toLowerCase()
    );
}

// Get surveys answered by a specific address
export function getSurveysByResponder(responder) {
    return surveys.filter((survey) =>
        survey.responses.some((r) =>
            r.responder.toLowerCase() === responder.toLowerCase()
        )
    );
}

// Update survey metadata
export async function updateSurveyMetadata(
    surveyId,
    callerAddress,
    updates
) {
    const survey = getSurveyById(surveyId);

    if (!survey) {
        throw new Error('Survey not found');
    }

    if (survey.creator.toLowerCase() !== callerAddress.toLowerCase()) {
        throw new Error('Only the creator can update this survey');
    }

    if (updates.title) survey.title = updates.title;
    if (updates.description) survey.description = updates.description;
    if (updates.questions) survey.questions = updates.questions;
    if (updates.screeningInfo) survey.screeningInfo = updates.screeningInfo;
}

// Build transaction data for creating a survey (for onchain implementation)
export function buildCreateSurveyTransaction(
    title,
    description,
    questions,
    reward
) {
    const questionsJson = JSON.stringify(questions);

    return {
        address: SURVEY_CONTRACT_ADDRESS,
        abi: SURVEY_CONTRACT_ABI,
        functionName: 'createSurvey',
        args: [title, description, questionsJson],
        value: parseEther(reward),
    };
}

// Build transaction data for submitting a response
export function buildSubmitResponseTransaction(
    surveyId,
    answers
) {
    const answersJson = JSON.stringify(answers);

    return {
        address: SURVEY_CONTRACT_ADDRESS,
        abi: SURVEY_CONTRACT_ABI,
        functionName: 'submitResponse',
        args: [BigInt(surveyId.replace('survey-', '')), answersJson],
    };
}

// Build transaction data for finalizing a survey
export function buildFinalizeSurveyTransaction(surveyId) {
    return {
        address: SURVEY_CONTRACT_ADDRESS,
        abi: SURVEY_CONTRACT_ABI,
        functionName: 'finalizeSurvey',
        args: [BigInt(surveyId.replace('survey-', ''))],
    };
}
