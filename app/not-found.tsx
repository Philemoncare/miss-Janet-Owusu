export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
          Page not found
        </p>
        <h1 className="text-4xl font-semibold text-white">
          Sorry, this page doesn’t exist.
        </h1>
        <p className="text-slate-300">
          Return home to continue exploring Janice Owusu’s data intelligence
          portfolio.
        </p>
        <a
          href="/"
          className="inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-400"
        >
          Go home
        </a>
      </div>
    </main>
  );
}
