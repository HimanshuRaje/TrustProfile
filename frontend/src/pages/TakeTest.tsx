import { useState } from "react";
import axios from "axios";

const questions = [
  "I feel energized by meeting new people and starting conversations. (Extraversion)",
  "I keep my tasks organized and finish work on time. (Conscientiousness)",
  "I stay calm and level-headed when plans change unexpectedly. (Emotional Stability)",
  "I try to understand others’ perspectives before making judgments. (Agreeableness)",
  "I enjoy learning about unfamiliar ideas, cultures, or ways of doing things. (Openness)",
  "I double-check details to avoid preventable mistakes. (Conscientiousness)",
  "I prefer quiet time alone over social gatherings. (Extraversion, R)",
  "I bounce back quickly after setbacks. (Emotional Stability)",
  "I am comfortable questioning the usual way of doing things to improve results. (Openness)",
  "I admit mistakes and take responsibility when something goes wrong. (Integrity/Agreeableness)"
];

const options = [
  { value: 1, label: "Highly disagree" },
  { value: 2, label: "Less disagree" },
  { value: 3, label: "Not sure" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Highly agree" },
];

export default function TakeTest() {
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0));
  const [message, setMessage] = useState("");

  const handleChange = (qIndex: number, value: number) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(0)) {
      setMessage("⚠️ Please answer all questions before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // assuming you stored JWT after login
      const res = await axios.post(
        "http://localhost:5000/api/submit",
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Test submitted successfully! For results, please visit our office inside the Medical Library.");
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Failed to submit test.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Personality Test</h2>

        {questions.map((q, i) => (
          <div key={i} className="mb-6">
            <p className="font-medium mb-2">{i + 1}. {q}</p>
            <div className="flex gap-4">
              {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt.value}
                    checked={answers[i] === opt.value}
                    onChange={() => handleChange(i, opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>

        {message && (
          <p className="mt-4 text-center font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
}
