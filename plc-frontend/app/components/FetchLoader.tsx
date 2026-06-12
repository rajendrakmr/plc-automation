export function FetchLoader({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fetch-overlay">
      <div className="fetch-spinner" />
      <span>Loading...</span>
    </div>
  );
}