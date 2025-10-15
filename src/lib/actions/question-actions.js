export const addQuestion = (form) => {
 const currentValues = form.getValues("questions");
 form.setValue("questions", [
  ...currentValues,
  {
   id: Date.now().toString(),
   text: "",
   type: "short-answer",
   required: true,
  },
 ]);
};

export const removeQuestionHandler = (form, index) => {
 const currentValues = form.getValues("questions");
 if (currentValues.length > 1) {
  form.setValue(
   "questions",
   currentValues.filter((_, idx) => idx !== index)
  );
 }
};

export const updateQuestionField = (form, index, field, value) => {
 const currentValues = form.getValues("questions");
 const updatedQuestions = [...currentValues];
 updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
 form.setValue("questions", updatedQuestions);
 form.trigger("questions");
};

export const addOption = (form, questionIndex) => {
 const currentValues = form.getValues("questions");
 const updatedQuestions = [...currentValues];
 updatedQuestions[questionIndex] = {
  ...updatedQuestions[questionIndex],
  options: [...(updatedQuestions[questionIndex].options || []), ""],
 };
 form.setValue("questions", updatedQuestions);
 form.trigger("questions");
};

export const updateOption = (form, questionIndex, optionIndex, value) => {
 const currentValues = form.getValues("questions");
 const updatedQuestions = [...currentValues];
 const newOptions = [...(updatedQuestions[questionIndex].options || [])];
 newOptions[optionIndex] = value;
 updatedQuestions[questionIndex] = {
  ...updatedQuestions[questionIndex],
  options: newOptions,
 };
 form.setValue("questions", updatedQuestions);
 form.trigger("questions");
};

export const removeOption = (form, questionIndex, optionIndex) => {
 const currentValues = form.getValues("questions");
 const updatedQuestions = [...currentValues];
 const newOptions = (updatedQuestions[questionIndex].options || []).filter(
  (_, idx) => idx !== optionIndex
 );
 updatedQuestions[questionIndex] = {
  ...updatedQuestions[questionIndex],
  options: newOptions,
 };
 form.setValue("questions", updatedQuestions);
 form.trigger("questions");
};
