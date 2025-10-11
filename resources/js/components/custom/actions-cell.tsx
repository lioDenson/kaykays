import { Button } from '@/components/ui/button';

interface ActionsCellProps {
    row: any;
    onInfo?: (row: any) => void;
    onPay?: (row: any) => void;
}

const ActionsCell = ({ row, onInfo, onPay }: ActionsCellProps) => {
    const isPending = row.status === 'pending';
    const isOverdue = row.status === 'overdue';

    return (
        <div className="flex justify-end gap-2">
            {/* Always show Info */}
            <Button variant="outline" size="sm" onClick={() => onInfo?.(row)}>
                Info
            </Button>

            {/* Show Pay button only if pending or overdue */}
            {(isPending || isOverdue) && (
                <Button variant={isOverdue ? 'destructive' : 'default'} size="sm" onClick={() => onPay?.(row)}>
                    Pay
                </Button>
            )}
        </div>
    );
};

export default ActionsCell;
