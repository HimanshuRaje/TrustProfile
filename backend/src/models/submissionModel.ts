import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  userId: mongoose.Types.ObjectId;
  answers: number[];
  traitScores: {
    extraversion: number;
    conscientiousness: number;
    emotionalStability: number;
    agreeableness: number;
    openness: number;
  };
  submittedAt: Date;
}

const SubmissionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  answers: { type: [Number], required: true },
  traitScores: {
    extraversion: Number,
    conscientiousness: Number,
    emotionalStability: Number,
    agreeableness: Number,
    openness: Number,
  },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISubmission>("Submission", SubmissionSchema);
