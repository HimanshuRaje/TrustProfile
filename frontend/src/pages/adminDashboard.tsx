// src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Submission {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
  answers: number[];
  traitScores: Record<string, number>;
  createdAt: string;
}

export function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔑 JWT from login
        const res = await axios.get("http://localhost:5000/api/submissions", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: false,
        });
        setSubmissions(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div className="text-center p-8">Loading submissions...</div>;
  if (error) return <div className="text-red-600 text-center p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {submissions.map((sub) => (
          <div
            key={sub._id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{sub.userId.username}</h2>
              <p className="text-sm text-gray-600">{sub.userId.email}</p>
              <p className="text-xs text-gray-400">
                Submitted: {new Date(sub.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Trait Scores</h3>
              <ul className="space-y-1 text-sm">
                {Object.entries(sub.traitScores).map(([trait, score]) => (
                  <li key={trait} className="flex justify-between">
                    <span className="capitalize">{trait}</span>
                    <span className="font-medium">{score.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <details className="text-sm">
              <summary className="cursor-pointer text-blue-600">
                View Raw Answers
              </summary>
              <div className="mt-2 text-gray-700">
                {sub.answers.join(", ")}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
