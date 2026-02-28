import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAssignments,
  setFilter,
} from "../features/assignment/assignmentSlice";
import AssignmentCard from "../components/assignmentCard";
import "./../pagesscss/HomePage.scss";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { list, filter, loading } = useAppSelector(
    (state) => state.assignment
  );

  useEffect(() => {
    dispatch(fetchAssignments(filter));
  }, [dispatch, filter]);

  return (
    <div className="home">
      <div className="home__filter">
        <select
          value={filter}
          onChange={(e) =>
            dispatch(setFilter(e.target.value as any))
          }
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {loading ? (
        <div className="home__loading">Loading...</div>
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