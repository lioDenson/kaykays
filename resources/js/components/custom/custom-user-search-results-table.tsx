import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';

interface CustomSearchResultsTableProps {
    results: {
        id: number;
        name: string;
        email: string;
        phone: string;
    }[];
    onSelect: (user: Record<string, unknown>) => void;
}

const CustomUserSearchResultsTable = ({ results, onSelect }: CustomSearchResultsTableProps) => {
    return (
        <ScrollArea>
            <div className="max-h-[25vh]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                        {results.map((user, index) => (
                            <TableRow key={user.id as number} className="cursor-pointer" onClick={onSelect.bind(null, user as Record<string, string>)}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    );
};

export default CustomUserSearchResultsTable;
