export default function Loading() {
  return (
    <main className="min-h-[60vh] bg-neutral-50">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-3">
            <div className="h-10 bg-neutral-200 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-neutral-200 rounded w-2/3 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-xl" />
                <div className="h-5 bg-neutral-200 rounded w-2/3" />
                <div className="h-4 bg-neutral-200 rounded" />
                <div className="h-4 bg-neutral-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
