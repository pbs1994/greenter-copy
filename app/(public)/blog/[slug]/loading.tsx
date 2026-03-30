export default function Loading() {
  return (
    <main className="min-h-[60vh] bg-neutral-50">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-neutral-200 rounded w-3/4" />
          <div className="h-4 bg-neutral-200 rounded w-1/2" />
          <div className="h-64 bg-neutral-200 rounded-xl" />
          <div className="space-y-3">
            <div className="h-4 bg-neutral-200 rounded" />
            <div className="h-4 bg-neutral-200 rounded w-5/6" />
            <div className="h-4 bg-neutral-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    </main>
  )
}
