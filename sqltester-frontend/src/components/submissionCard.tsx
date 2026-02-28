import "./scss/SubmissionCard.scss";

interface Submission {
  _id: string;
  submittedQuery: string;
  executionResult: any[];
  createdAt: string;
}

interface Props {
  submission: Submission;
}

const SubmissionCard = ({ submission }: Props) => {
  return (
    <div className="submission-card">
      <div className="submission-card__header">
        <span className="submission-card__date">
          {new Date(submission.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="submission-card__body">
        <p className="submission-card__query">
          {submission.submittedQuery}
        </p>

        <span className="submission-card__result">
          Rows Returned: {submission.executionResult?.length || 0}
        </span>
      </div>
    </div>
  );
};

export default SubmissionCard;