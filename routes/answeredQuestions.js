import express from "express";
import AnsweredQuestions from "../models/AnsweredQuestions.js";
import Question from "../models/Question.js";

const router = express.Router();

// Cavabları göndərmək (bir neçə sual birdən)
router.post("/", async (req, res) => {
  try {
    const { answerQuestions } = req.body; // [{ questionId, answer }]

    if (!Array.isArray(answerQuestions) || answerQuestions.length === 0)
      return res.status(400).json({ message: "Cavab siyahısı boşdur." });

    // Hər sualı yoxlayırıq və isCorrect dəyərini təyin edirik
    const checkedAnswers = await Promise.all(
      answerQuestions.map(async ({ questionId, answer }) => {
        const question = await Question.findById(questionId);
        console.log('question', question)
        const isCorrect = question?.correctAnswer === answer;

        console.log('iscorrect', isCorrect)
        return { questionId, answer, isCorrect };
      })
    );

    const saved = await AnsweredQuestions.create({
      answerQuestions: checkedAnswers
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const all = await AnsweredQuestions.find();

    // Sual üzrə nəticə toplamaq üçün obyekt
    const statsMap = {};

    all.forEach(doc => {
      doc.answerQuestions.forEach(aq => {
        const qId = aq.questionId.toString();

        if (!statsMap[qId]) {
          statsMap[qId] = { total: 0, correct: 0 };
        }

        statsMap[qId].total += 1;
        if (aq.isCorrect) statsMap[qId].correct += 1;
      });
    });

    // Faiz hesablamaq və nəticəni array şəklinə çevirmək
    const stats = await Promise.all(
      Object.keys(statsMap).map(async qId => {
        const question = await Question.findById(qId);
        const { total, correct } = statsMap[qId];
        return {
          questionId: qId,
          questionText: question?.questionText || "Unknown",
          correctPercent: total > 0 ? (correct / total) * 100 : 0,
          totalAnswered: total,
        };
      })
    );

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
