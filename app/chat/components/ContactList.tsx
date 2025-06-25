import { NavLink } from 'react-router';

import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import type { Client } from '../interfaces/chat.interfaces';

interface Props {
    clients: Client[];
}

export const ContactList = ({ clients }: Props) => {



    return (
        <ScrollArea className="h-[calc(100vh-130px)]">
            <div className="space-y-4 p-4">
                <div className="space-y-1">
                    <h3 className="px-2 text-sm font-semibold">Contacts</h3>
                    <div className="space-y-1">

                        {
                            clients.map(client => (
                                <NavLink
                                    key={client.id}
                                    to={`/chat/client/${ client.id }`}
                                    className={({ isActive }) =>
                                        `w-full flex items-center mt-1 transition-all duration-300 rounded-lg px-2 py-2 ${isActive
                                            ? 'bg-primary/10 border-primary shadow-md'
                                            : 'hover:bg-gray-100'
                                        }`
                                    }
                                >
                                    <div className="h-6 w-6 rounded-full bg-blue-400 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                                        {client.name.charAt(0)}
                                    </div>
                                    {client.name}
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
                <div className="pt-4 border-t mt-4">
                    <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
                    <Button variant="ghost" className="w-full justify-start">
                        <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                            TM
                        </div>
                        Thomas Miller
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                            SB
                        </div>
                        Sarah Brown
                    </Button>
                </div>
            </div>
        </ScrollArea>
    )
}
