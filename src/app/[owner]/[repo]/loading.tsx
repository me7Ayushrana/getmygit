export default function Loading() {
    return (
        <div className="w-full h-[calc(100vh-60px)] p-6 flex items-center justify-center">
            <div className="glass-panel p-8 rounded-xl flex flex-col items-center animate-pulse">
                <div className="w-16 h-16 rounded-full bg-white/10 mb-4"></div>
                <div className="h-4 w-48 bg-white/10 rounded mb-2"></div>
                <div className="h-3 w-32 bg-white/10 rounded"></div>

                <p className="mt-6 text-sm text-gray-400">Analyzing repository architecture...</p>
            </div>
        </div>
    )
}
