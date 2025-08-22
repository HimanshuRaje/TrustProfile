import express from "express";
import { Request, Response } from "express";
import Submission from "../models/submissionModel";
import { AuthenticatedRequest, authMiddleware } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/checkRole";

const router = express.Router();

// POST /api/submissions (User submits answers)
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body; // answers should be an array of 10 numbers (1–5)

    if (!answers || !Array.isArray(answers) || answers.length !== 10) {
      return res.status(400).json({ message: "Answers must be an array of 10 numbers" });
    }

    // Step 1: Reverse score for Q7 (index 6 since array is 0-based)
    const scoredAnswers = [...answers];
    scoredAnswers[6] = 6 - scoredAnswers[6]; // reverse-scored

    // Step 2: Trait mapping
    const traitMap: Record<string, number[]> = {
      extraversion: [0, 6],          // Q1, Q7 (Q7 is already reversed)
      conscientiousness: [1, 5],     // Q2, Q6
      emotionalStability: [2, 7],    // Q3, Q8
      agreeableness: [3, 9],         // Q4, Q10
      openness: [4, 8],              // Q5, Q9
    };

    // Step 3: Calculate averages
    const traitScores: Record<string, number> = {};
    for (const trait in traitMap) {
      const indices = traitMap[trait];
      const total = indices.reduce((sum, idx) => sum + scoredAnswers[idx], 0);
      traitScores[trait] = total / indices.length; // average
    }

    // Step 4: Save submission
    const submission = new Submission({
      userId: (req as any).user.id,  // from authMiddleware
      answers,
      traitScores,
    });

    await submission.save();

    res.status(201).json({
      message: "✅ Your test was submitted successfully. For results, please visit our office inside the Medical Library."
    });

  } catch (err) {
    console.error("POST /submissions error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//getting the result and all the user's submission details
router.get("/submissions", authMiddleware, checkRole("admin"), async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("userId", "username email role") // show basic user info
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
