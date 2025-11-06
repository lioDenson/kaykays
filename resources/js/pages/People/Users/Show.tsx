import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Calendar1Icon, Mail, PhoneIcon, User2 } from 'lucide-react';

interface UserProps {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    created_at: string;
}

export default function User({ user }: { user: UserProps }) {
    return (
        <AppLayout>
            <Head title={user.name} />
            <div className="flex w-full flex-col p-1 text-xs md:p-4 md:text-sm">
                <div className="flex w-full gap-4 sm:flex-col md:flex-row">
                    <Card className="flex w-full flex-col items-center gap-2 shadow-accent ">
                        {/* avatar */}

                        <div className="flex flex-col p-2">
                            <div className="grid w-full grid-cols-2 items-center justify-center p-4">
                                <div className="flex w-full items-center justify-end">
                                    <Avatar className="h-30 w-30">
                                        <AvatarFallback className="text-xl font-bold uppercase">{user.name}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="p-4">
                                    <InputGroup className="rounded-0 border-0">
                                        <InputGroupAddon>
                                            {' '}
                                            <User2 />{' '}
                                        </InputGroupAddon>
                                        <InputGroupInput className="ps-6 uppercase" value={user.name} readOnly disabled />
                                    </InputGroup>
                                    <InputGroup className="rounded-0 border-0">
                                        <InputGroupAddon>
                                            {' '}
                                            <Mail />{' '}
                                        </InputGroupAddon>
                                        <InputGroupInput className="ps-6" value={user.email} readOnly disabled />
                                    </InputGroup>
                                    <InputGroup className="rounded-0 border-0">
                                        <InputGroupAddon>
                                            {' '}
                                            <PhoneIcon />
                                        </InputGroupAddon>
                                        <InputGroupInput className="ps-6" value={user.phone} readOnly disabled />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="flex flex-row justify-around">
                                <InputGroup className="rounded-0 w-1/2 border-0">
                                    <InputGroupAddon align={'inline-start'}>
                                        <Calendar1Icon className="" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        className="ps-6 text-green-400"
                                        value={new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        readOnly
                                        disabled
                                    />
                                </InputGroup>
                                <InputGroup className="rounded-0 gap-4 border-0">
                                    <InputGroupAddon>{' Last Seen:'}</InputGroupAddon>
                                    <InputGroupAddon>
                                        <Badge className="rounded-full bg-green-900/90 text-green-300  font-bold" variant={'success'}>
                                            {'online'}
                                        </Badge>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full"></Card>
                </div>
            </div>
        </AppLayout>
    );
}
