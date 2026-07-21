const Loading = ({ label = "Loading…" }) => (
  <div className="grid min-h-[50vh] place-items-center bg-base-100">
    <div className="flex flex-col items-center gap-3">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm text-base-content/50">{label}</p>
    </div>
  </div>
);

export default Loading;
