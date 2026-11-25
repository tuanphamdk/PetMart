export default function Toast({ message, type = 'success' }) {
  if (!message) return null;

  const isError = type === 'error';

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 text-white text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 ${
        isError ? 'bg-red-600' : 'bg-slate-900'
      }`}
    >
      <span>{isError ? '⚠️' : '✅'}</span>
      <span>{message}</span>
    </div>
  );
}