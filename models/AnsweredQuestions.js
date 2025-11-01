import mongoose from "mongoose";

const answeredQuestionSchema = new mongoose.Schema({
  answerQuestions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      answer: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("AnsweredQuestions", answeredQuestionSchema);
