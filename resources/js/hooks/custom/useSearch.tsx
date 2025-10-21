import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

interface UseSearchProps {
    query: string;
    routeName: string;
    isEditing?: boolean;
    filter?: number[];
    isSearching?: (searching: boolean) => void;
    cacheTimeout?: number; // Cache duration in milliseconds
    minQueryLength?: number; // Minimum characters before searching
}

// Cache interface
interface CacheItem {
    data: any[];
    timestamp: number;
    query: string;
}

// Request tracking to prevent duplicates
const pendingRequests = new Map<string, Promise<any[]>>();
const searchCache = new Map<string, CacheItem>();

export function useSearch({
    query,
    routeName,
    isEditing,
    isSearching,
    filter,
    cacheTimeout = 30000, // 30 seconds cache
    minQueryLength = 2 // Minimum 2 characters
}: UseSearchProps) {
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Generate cache key based on route and query
    const cacheKey = useMemo(() => {
        return `${routeName}:${debouncedQuery}`;
    }, [routeName, debouncedQuery]);

    // Check if cache is still valid
    const getCachedResults = (key: string): any[] | null => {
        const cached = searchCache.get(key);
        if (!cached) return null;

        const isExpired = Date.now() - cached.timestamp > cacheTimeout;
        return isExpired ? null : cached.data;
    };

    // Debounce query with minimum length check
    useEffect(() => {
        // Don't search for very short queries
        if (query.length > 0 && query.length < minQueryLength) {
            setDebouncedQuery('');
            setResults([]);
            return;
        }

        const timeout = setTimeout(
            () => {
                setDebouncedQuery(query);
            },
            query ? 500 : 300
        ); // Shorter delay when clearing

        return () => clearTimeout(timeout);
    }, [query, minQueryLength]);

    // Fetch data with caching and request deduplication
    const fetchData = async (searchQuery: string, key: string): Promise<any[]> => {
        // Check cache first
        const cached = getCachedResults(key);
        if (cached) {
            return cached;
        }

        // Check for pending request with same key
        if (pendingRequests.has(key)) {
            return pendingRequests.get(key)!;
        }

        // Create new request
        const request = axios
            .get(routeName, {
                params: { query: searchQuery },
                signal: abortControllerRef.current?.signal
            })
            .then((res) => {
                // Cache the successful response
                const cacheItem: CacheItem = {
                    data: res.data,
                    timestamp: Date.now(),
                    query: searchQuery
                };
                searchCache.set(key, cacheItem);
                return res.data;
            })
            .finally(() => {
                // Clean up pending request
                pendingRequests.delete(key);
            });

        // Store the pending request
        pendingRequests.set(key, request);
        return request;
    };

    // Main search effect
    useEffect(() => {
        // Skip if editing, empty query, or query too short
        if (isEditing || !debouncedQuery || debouncedQuery.length < minQueryLength) {
            setResults([]);
            return;
        }

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        const performSearch = async () => {
            setSearching(true);
            isSearching?.(true);

            try {
                const data = await fetchData(debouncedQuery, cacheKey);
                setResults(data);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Search failed:', error);
                    setResults([]);
                }
            } finally {
                setSearching(false);
                isSearching?.(false);
            }
        };

        performSearch();

        // Cleanup function
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [debouncedQuery, isEditing, routeName, cacheKey, minQueryLength, isSearching]);

    // Filter results
    const filteredResults = useMemo(() => {
        if (!filter || filter.length === 0) return results;
        return results.filter((result) => !filter.includes(result.id));
    }, [results, filter]);

    // Clear cache for specific route (optional utility function)
    const clearCache = (specificRoute?: string) => {
        if (specificRoute) {
            for (const [key] of searchCache) {
                if (key.startsWith(specificRoute)) {
                    searchCache.delete(key);
                }
            }
        } else {
            searchCache.clear();
        }
        pendingRequests.clear();
    };

    return {
        results: filteredResults,
        searching,
        clearCache // Expose cache clearing if needed
    };
}
