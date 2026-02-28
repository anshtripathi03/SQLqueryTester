import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import API from "../services/axios";
import SubmissionCard from "../components/submissionCard";
import "./../pagesscss/DashboardPage.scss";

interface Submission {
  _id: string;
  submittedQuery: string;
  executionResult: any[];
  createdAt: string;
  isCorrect: boolean;
  assignmentId: {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
  };
}

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const res = await API.get("/action/user/solutions");
        setSubmissions(res.data.solutions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="dashboard">
      <section className="dashboard__profile">
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </section>

      <section className="dashboard__submissions">
        <h3>Your Submissions</h3>

        {loading ? (
          <p>Loading...</p>
        ) : submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <div className="dashboard__grid">
            {submissions.map((submission) => (
              <SubmissionCard
                key={submission._id}
                submission={submission}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;