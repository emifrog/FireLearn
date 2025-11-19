export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-4 text-4xl font-bold">Bienvenue sur FireLearn 🔥</h1>
        <p className="text-xl text-muted-foreground">
          Plateforme de formation LMS pour les pompiers
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Phase 1-2</h2>
            <p className="text-sm text-muted-foreground">
              Foundation & Setup en cours...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
