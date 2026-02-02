import { RepoSearch } from '@/components/RepoSearch';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-2">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          Visualize any GitHub Repo
        </h1>
        <p className="text-xl mb-12 text-gray-400">
          Turn complex codebases into interactive flowcharts.
          Understand architecture, data flow, and components in seconds.
        </p>

        <RepoSearch />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Feature Highlights */}
          <div className="glass-node p-6">
            <h3 className="text-lg font-bold mb-2">Visual Architecture</h3>
            <p className="text-sm">See the big picture with auto-generated system diagrams.</p>
          </div>
          <div className="glass-node p-6">
            <h3 className="text-lg font-bold mb-2">Interactive Exploration</h3>
            <p className="text-sm">Click into components to see files, exports, and dependencies.</p>
          </div>
          <div className="glass-node p-6">
            <h3 className="text-lg font-bold mb-2">Instant Understanding</h3>
            <p className="text-sm">Save hours of reading code by starting with a visual map.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
