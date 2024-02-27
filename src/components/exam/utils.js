export function resolveQuestionComponent(questionType) {
  // Determine which component to use based on the question type
  switch (questionType) {
    case "single-best-answer":
      return "SingleBestAnswer";
    case "written":
      return "WrittenAnswer";
    case "multiple-true-false":
      return "MultipleTrueFalse";
    case "multiple-answer":
      return "MultipleAnswer";
    case "multilayered-type-2":
      return "MultiLayer2";
    case "multilayered-type-1":
      return "MultiLayer1";
    default:
      return "DefaultComponent"; // Provide a default component or handle invalid types
  }
}

export function  getOptionAnnotationColor(option) {
  return option.answer.data.is_correct ? "green"
    : ""
}
