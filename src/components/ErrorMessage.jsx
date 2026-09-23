export default function ErrorMessage({ message }) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
      <p className="font-medium">{message}</p>
    </div>
  );
}
