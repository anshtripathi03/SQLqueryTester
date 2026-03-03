import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAssignments,
  setFilter,
  type Difficulty,
} from "../features/assignment/assignmentSlice";
import toast from "react-hot-toast";
import AssignmentCard from "../components/assignmentCard";
import "./../pagesscss/HomePage.scss";
import HomeSkeleton from "./Skeleton";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const difficulty = ["Easy", "Medium", "Hard"];
  const { list, filter, loading, error } = useAppSelector(
    (state) => state.assignment,
  );

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchAssignments(filter));
    }
  }, [dispatch, filter, list.length]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load assignments");
    }
  }, [error]);

  return (
    <div className="home">
      <div className="home__filter">
        <select
          value={filter}
          onChange={async (e) => {
            const value = e.target.value as Difficulty;
            dispatch(setFilter(value));
            dispatch(fetchAssignments(value));
          }}
        >
          {difficulty.map((value) => (
            <option value={value}>{value}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <HomeSkeleton />
      ) : error ? (
        <div className="home__error">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button
            onClick={() => dispatch(fetchAssignments(filter))}
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="home__grid">
          {list.map((assignment: any) => (
            <AssignmentCard
              key={assignment._id}
              id={assignment._id}
              title={assignment.title}
              description={assignment.description}
              difficulty={assignment.difficulty}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
