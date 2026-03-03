const AssignmentSkeleton = () => {
  return (
    <div className="assignment-page">
      <div className="assignment-page__left">
        <div className="skeleton skeleton-heading" />
        <div className="skeleton skeleton-difficulty" />
        <div className="skeleton skeleton-paragraph" />
        <div className="skeleton skeleton-schema" />
      </div>

      <div className="assignment-page__right">
        <div className="skeleton skeleton-editor" />
        <div className="skeleton skeleton-button-row" />
      </div>
    </div>
  );
};

export default AssignmentSkeleton;