import { isNotEmpty, isPopulated } from "@/utils/validation";
import { createContext, useState } from "react";

export const SurveyFormContext = createContext({
  questions: [],
  enteredVal: {
    title: "",
    description: "",
    reward: "",
    numberOfRespondents: "",
    screeningDescription: "",
    screeningRequirements: "",
    screeningDateTime: "",
    meetingLink: "",
    location: "",
    flexibleScheduling: false,
    screeningDeadline: "",
  },
  edited: {
    title: false,
    description: false,
    reward: false,
    numberOfRespondents: false,
    screeningDescription: false,
    screeningRequirements: false,
    screeningDateTime: false,
    meetingLink: false,
    location: false,
    screeningDeadline: false,
  },
  validation: {
    title: false,
    description: false,
    reward: false,
    numberOfRespondents: false,
    screeningDescription: false,
    screeningRequirements: false,
    screeningDateTime: false,
    meetingLink: false,
    location: false,
    flexibleScheduling: false,
    screeningDeadline: false,
    questions: false,
  },
  inputBlur: () => {},
  inputChange: () => {},
  missingInput: () => {},
  missingInput: () => {},
  reset: () => {},
});

export default function SurveyFormContextProvider({ children }) {
  const [enteredValues, setEnteredValues] = useState({
    title: "",
    description: "",
    reward: "",
    numberOfRespondents: "",
    screeningDescription: "",
    screeningRequirements: "",
    screeningDateTime: "",
    meetingLink: "",
    location: "",
    flexibleScheduling: false,
    screeningDeadline: "",
    isSubmitting: false,
  });
  const [didEdit, setDidEdit] = useState({
    title: false,
    description: false,
    reward: false,
    numberOfRespondents: false,
    screeningDescription: false,
    screeningRequirements: false,
    screeningDateTime: false,
    meetingLink: false,
    location: false,
    screeningDeadline: false,
  });

  const [questions, setQuestions] = useState([
    { id: "1", text: "", type: "short-answer" },
  ]);

  const validation = {
    title: didEdit.title && !isNotEmpty(enteredValues.title),
    description: didEdit.description && !isNotEmpty(enteredValues.description),
    reward: didEdit.reward && !isNotEmpty(enteredValues.reward),
    numberOfRespondents:
      didEdit.numberOfRespondents &&
      !isNotEmpty(enteredValues.numberOfRespondents),
    screeningDescription:
      didEdit.screeningDescription &&
      !isNotEmpty(enteredValues.screeningDescription),
    screeningRequirements:
      didEdit.screeningRequirements &&
      !isNotEmpty(enteredValues.screeningRequirements),
    screeningDateTime:
      didEdit.screeningDateTime && !isNotEmpty(enteredValues.screeningDateTime),
    meetingLink: didEdit.meetingLink && !isNotEmpty(enteredValues.meetingLink),
    location: didEdit.location && !isNotEmpty(enteredValues.location),
    screeningDeadline:
      didEdit.screeningDeadline && !isNotEmpty(enteredValues.title),
    questions: questions && !isPopulated(questions),
  };

  function handleInputChange(identifier, value) {
    if (identifier === "flexibleScheduling") {
      console.log("test");
      setEnteredValues((prevValues) => ({
        ...prevValues,
        [identifier]: false,
      }));
    }
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function checkMissingInput() {
    setDidEdit({
      title: true,
      description: true,
      reward: true,
      numberOfRespondents: true,
      screeningDescription: true,
      screeningRequirements: true,
      screeningDateTime: true,
      meetingLink: true,
      location: true,
      screeningDeadline: true,
      questions: true,
    });
  }

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      text: "",
      type: "short-answer",
    };
    setQuestions((prevValues) => [...prevValues, newQuestion]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions((prevValues) => prevValues.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((prevValues) =>
      prevValues.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (questionId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: [...(q.options || []), ""] } : q
      )
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions((prevValues) =>
      prevValues.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions((prevValues) =>
      prevValues.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = q.options.filter((_, idx) => idx !== optionIndex);
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  function handleLoading(state) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      loading: state,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  function resetForm() {
    setDidEdit({
      title: false,
      description: false,
      reward: false,
      numberOfRespondents: false,
      screeningDescription: false,
      screeningRequirements: false,
      screeningDateTime: false,
      meetingLink: false,
      location: false,
      screeningDeadline: false,
    });

    setEnteredValues({
      title: "",
      description: "",
      reward: "",
      numberOfRespondents: "",
      screeningDescription: "",
      screeningRequirements: "",
      screeningDateTime: "",
      meetingLink: "",
      location: "",
      flexibleScheduling: false,
      screeningDeadline: "",
    });

    setQuestions([{ id: "1", text: "", type: "short-answer" }]);
  }

  const ctxValue = {
    questions: questions,
    enteredVal: enteredValues,
    edited: didEdit,
    validation: validation,
    inputBlur: handleInputBlur,
    inputChange: handleInputChange,
    missingInput: checkMissingInput,
    reset: resetForm,
  };

  return (
    <SurveyFormContext.Provider value={ctxValue}>
      {children}
    </SurveyFormContext.Provider>
  );
}
