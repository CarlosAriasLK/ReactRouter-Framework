import { useLoaderData, useNavigation, useParams } from "react-router";

import { ContactInformation } from "./ContactInformation";
import { ContactInformationSkeleton } from "./ContactInformationSkeleton";
import { NoContactSelected } from "./NoContactSelected";
import type { Client } from "~/chat/interfaces/chat.interfaces";


export const ContactInformationCard = () => {

    const { id } = useParams();
    const { clients = [] } = useLoaderData(); // Toma el loader mas cercano

    const { state } = useNavigation();

    const isPending = state === 'loading';
    const client = clients.find( (client:Client) => client.id === id );

    if ( isPending ) return <ContactInformationSkeleton />;
    if ( !id ) return <NoContactSelected />;
    if ( !client ) return <NoContactSelected />;
    
    return <ContactInformation client={ client } />;
    
}
