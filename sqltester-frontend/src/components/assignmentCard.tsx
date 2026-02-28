import { useNavigate } from "react-router-dom";
import type { Difficulty } from "../features/assignment/assignmentSlice";
import "./scss/assignmentCard.scss";

interface Props {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
}

const AssignmentCard = ({
  id,
  title,
  description,
  difficulty,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className={`card card--${difficulty.toLowerCase()}`}
      onClick={() => navigate(`/assignment/${id}`)}
    >
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>

      <div className="card__difficulty">
        {difficulty}
      </div>
    </div>
  );
};

export default AssignmentCard;