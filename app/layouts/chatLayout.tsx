import { Form, Link, Outlet, redirect } from "react-router";
import { LogOut, X } from "lucide-react";
import type { Route } from "./+types/chatLayout";

import { Button } from "~/components/ui/button";
import { ContactList } from "~/chat/components/ContactList";
import { ContactInformationCard } from '../chat/components/contactInformationCard/ContactInformationCard';

import { getClient, getClients } from "~/fake/fake-data";
import { getSession } from "~/session.server";


//? Este componente solo funciona en los route modules que estén definidos en mis rutas
export async function loader({ request, params }: Route.LoaderArgs ) {

    const session = await getSession( request.headers.get('Cookie') );

    const userName = session.get('name');
    console.log(session.get('name'))

    if( !session.has('userId') ) {
        return redirect('/auth/login');
    }
    const clients = await getClients();

    if ( params.id ) {
        const client = await getClient( params.id );
        return { client, clients }
    }

    return { clients, userName };
}


export default function Layout( { loaderData }: Route.ComponentProps ) {

    const { clients, userName } = loaderData;

    return (
        <div className="flex h-screen bg-background">

            {/* Sidebar */}
            <div className="w-64 border-r bg-muted/10">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary" />
                        <Link to='/chat' className="font-semibold">{userName}</Link>
                    </div>
                </div>
                
                <ContactList clients={ clients }/>

                <div className="p-4 border-t">
                    <Form action="/auth/logout" method="post">
                        <Button variant="destructive" className="w-full">
                            <LogOut/>
                            Logout
                        </Button>
                    </Form>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-14 border-b px-4 flex items-center justify-between">
                        <div></div> {/* Empty div to maintain spacing */}
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                                Save conversation
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </header>
                    <Outlet />
                </div>

                {/* Right Panel - Contact Details */}
                <div className="w-80 border-l">
                    <div className="h-14 border-b px-4 flex items-center">
                        <h2 className="font-medium">Contact details</h2>
                    </div>
                    
                    <ContactInformationCard />

                </div>
            </div>
        </div>
    )
}

