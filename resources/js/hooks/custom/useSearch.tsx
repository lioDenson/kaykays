import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

interface UseSearchProps {
    query: string;
    routeName: string;
    isEditing?: boolean;
    filter?: number[];
    isSearching?: (searching: boolean) => void;
}

export function useSearch({ query, routeName, isEditing, isSearching, filter }: UseSearchProps) {
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    // debounce query
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timeout);
    }, [query]);

    // fetch when debounced query changes
    useEffect(() => {
        if (debouncedQuery && !isEditing) {
            setSearching(true);
            isSearching?.(true);

            axios
                .get(routeName, { params: { query: debouncedQuery } })
                .then((res) => {
                    setResults(res.data);
                })
                .finally(() => {
                    setSearching(false);
                    isSearching?.(false);
                });
        }
    }, [debouncedQuery, isEditing, routeName, isSearching]);

    const filteredResults = useMemo(() => {
        if (!filter || filter.length === 0) return results;
        return results.filter((result) => filter.includes(result.id));
    }, [results, filter]);

    return { results: filteredResults, searching };
}
