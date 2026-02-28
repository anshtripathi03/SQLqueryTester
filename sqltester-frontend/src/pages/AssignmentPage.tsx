import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import API from "../services/axios";
import "./../pagesscss/AssignmentPage.scss";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAssignmentById } from "../features/assignment/assignmentSlice";

const AssignmentPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { selected: assignment, loading, error } = useAppSelector(
    (state) => state.assignment
  );

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [hint, setHint] = useState<string>("");

  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchAssignmentById(id));
    }
  }, [id, dispatch]);

  const handleSubmit = async () => {
    try {
      const res = await API.post(`/action/execute/${id}`, { query });
      setResult(res.data.rows);
      setShowResult(true);
      setShowHint(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleHint = async () => {
    try {
      const res = await API.post(`/action/hint/${id}`, { query });
      setHint(res.data.hint);
      setShowHint(true);
      setShowResult(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!assignment) return null;

  return (
    <div className="assignment-page">
      <div className="assignment-page__left">
        <h2>{assignment.title}</h2>
        <span className="assignment-page__difficulty">
          {assignment.difficulty}
        </span>

        <p className="assignment-page__question">
          {assignment.question}
        </p>

        <pre className="assignment-page__schema">
          {assignment.postgreSchema}
        </pre>
      </div>

      <div className="assignment-page__right">
        <Editor
          height="300px"
          defaultLanguage="sql"
          value={query}
          onChange={(value) => setQuery(value || "")}
          theme="vs-dark"
        />

        <div className="assignment-page__buttons">
          <button onClick={handleSubmit}>
            Submit
          </button>
          <button onClick={handleHint}>
            Hint
          </button>
        </div>

        {showResult && (
          <div className="assignment-page__result visible">
            {result.length > 0 ? (
              <pre>{JSON.stringify(result, null, 2)}</pre>
            ) : (
              <p>No result yet.</p>
            )}
          </div>
        )}

        {showHint && (
          <div className="assignment-page__hint visible">
            <p>{hint}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentPage;
