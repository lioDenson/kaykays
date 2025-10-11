import { edit } from "@/routes/profile";
import { useEffect, useState } from "react"
import anxios from "axios";

interface SearchProps {
    query: string,
    routeName: string,
    isEditing?: boolean,

    isSearching:(searching: boolean) => void
}
const Search = ({query, isEditing, routeName, isSearching}: SearchProps) => {

    const [debouncingQuery, setDebouncingQuery] = useState(query);
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncingQuery(query);
        }, 500);
        return clearTimeout(timeout);
    })

    useEffect(() => {
        if (debouncingQuery && !isEditing) {
            setSearching(true);
            isSearching(searching);

            anxios.get(routeName, {
                params: {
                    query: debouncingQuery
                }
            }).then(res => {
                setResults(res.data);
            }).finally(() => {
                setSearching(false);
                isSearching(searching);
            });
        }
        
    }, [debouncingQuery,]);

    return results;
}

export default Search;