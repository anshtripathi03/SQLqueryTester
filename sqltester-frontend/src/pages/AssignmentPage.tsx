import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import API from "../services/axios";
import "./../pagesscss/AssignmentPage.scss";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAssignmentById } from "../features/assignment/assignmentSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AssignmentSkeleton from "./AssignmentSkeleton";

const AssignmentPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const {
    selected: assignment,
    loading,
    error,
  } = useAppSelector((state) => state.assignment);

  const [query, setQuery] = useState("");
  const [outputType, setOutputType] = useState<"result" | "hint" | null>(null);
  const [outputData, setOutputData] = useState<string>("");
  const [loadingAction, setLoadingAction] = useState<"submit" | "hint" | null>(
    null,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAssignmentById(id));
    }
  }, [id, dispatch, user, navigate]);

  const handleSubmit = async () => {
    if (!id) return;
    if (!user) {
      toast("Please sign up to start solving assignments 🚀", {
        icon: "⚡",
      });
      navigate("/login");
      return;
    }

    try {
      setLoadingAction("submit");
      setOutputType("result");

      const res = await API.post(`/action/execute/${id}`, { query });

      const formatted =
        res.data.rows.length > 0
          ? JSON.stringify(res.data.rows, null, 2)
          : "No result returned.";

      setOutputData(formatted);
    } catch (err) {
      setOutputData("Error executing query.");
    } finally {
      setLoadingAction(null);
    }
  };

  const renderTable = (dataString: string) => {
    try {
      const rows = JSON.parse(dataString);
      if (!rows || rows.length === 0) return <p>No rows returned.</p>;

      const columns = Object.keys(rows[0]);

      return (
        <table className="result-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, index: number) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } catch {
      return <pre>{dataString}</pre>;
    }
  };

  const handleHint = async () => {
    if (!id) return;
    if (!user) {
      toast("Please sign up to start solving assignments 🚀", {
        icon: "⚡",
      });
      navigate("/login");
      return;
    }

    try {
      setLoadingAction("hint");
      setOutputType("hint");

      const res = await API.post(`/action/hint/${id}`, { query });

      setOutputData(res.data.hint);
    } catch (err) {
      setOutputData("Error generating hint.");
    } finally {
      setLoadingAction(null);
    }
  };

  if (loading) return <AssignmentSkeleton />;
  if (error) return <div>{error}</div>;
  if (!assignment) return null;

  return (
    <div className="assignment-page">
      <div className="assignment-page__left">
        <h2>{assignment.title}</h2>
        <span className="assignment-page__difficulty">
          {assignment.difficulty}
        </span>

        <p className="assignment-page__question">{assignment.question}</p>

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
          <button
            className="primary-btn"
            onClick={handleSubmit}
            disabled={loadingAction !== null}
          >
            {loadingAction === "submit" ? "Executing..." : "Run Query"}
          </button>

          <button
            className="secondary-btn"
            onClick={handleHint}
            disabled={loadingAction !== null}
          >
            {loadingAction === "hint" ? "Generating..." : "Get Hint"}
          </button>
        </div>

        {outputType && (
          <div
            className={`assignment-page__output ${loadingAction ? "loading" : ""}`}
          >
            <div className="output-header">
              <h3>{outputType === "result" ? "Result" : "Hint"}</h3>
              {loadingAction && <span className="spinner" />}
            </div>

            {!loadingAction && outputType === "hint" && (
              <div className="hint-content">{outputData}</div>
            )}

            {!loadingAction && outputType === "result" && (
              <div className="result-content">{renderTable(outputData)}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentPage;
