import { useLoaderData, useNavigation, useParams } from "react-router";

import { ContactInformation } from "./ContactInformation";
import { ContactInformationSkeleton } from "./ContactInformationSkeleton";
import { NoContactSelected } from "./NoContactSelected";
import type { Client } from "~/chat/interfaces/chat.interfaces";

interface Props {
    client?: Client;
}

export const ContactInformationCard = () => {

    const { id } = useParams();
    const { client } = useLoaderData(); // Toma el loader mas cercano
    const { state } = useNavigation();
    const isPending = state === 'loading';

    if ( client ) return <ContactInformation client={ client } />;

    if ( !client ) return <NoContactSelected />;
    if ( isPending ) return <ContactInformationSkeleton />;
    if ( !id ) return <NoContactSelected />;
}
