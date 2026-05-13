export class RequestCache {
    private static cache = new Map<string, { data: any; expiry: number }>();
    private static pendingRequests = new Map<string, Promise<any>>();
    private static defaultTTL = 10 * 60 * 1000; // 10 minutes

    /**
     * Executes a promise-returning function with caching and deduplication.
     * @param key Unique cache key
     * @param fetcher Function to fetch data if not cached
     * @param ttl Time to live in milliseconds
     */
    static async fetchWithCache<T>(
        key: string,
        fetcher: () => Promise<T>,
        ttl: number = this.defaultTTL
    ): Promise<T> {
        // 1. Check Cache
        const cached = this.cache.get(key);
        if (cached && cached.expiry > Date.now()) {
            return cached.data as T;
        }

        // 2. Check Pending Requests (Throttling / Deduplication)
        if (this.pendingRequests.has(key)) {
            return this.pendingRequests.get(key) as Promise<T>;
        }

        // 3. Fetch and Cache
        const promise = fetcher()
            .then(data => {
                this.cache.set(key, { data, expiry: Date.now() + ttl });
                this.pendingRequests.delete(key);
                return data;
            })
            .catch(err => {
                this.pendingRequests.delete(key);
                throw err;
            });

        this.pendingRequests.set(key, promise);
        return promise;
    }

    /**
     * Clear specific key or entire cache
     */
    static clearCache(key?: string) {
        if (key) {
            this.cache.delete(key);
            this.pendingRequests.delete(key);
        } else {
            this.cache.clear();
            this.pendingRequests.clear();
        }
    }
}
