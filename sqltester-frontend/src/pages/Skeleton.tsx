const HomeSkeleton = () => {
  return (
    <div className="home__grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-desc" />
          <div className="skeleton skeleton-tag" />
        </div>
      ))}
    </div>
  );
};

export default HomeSkeleton;