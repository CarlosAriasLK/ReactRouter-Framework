import { MessageCircle } from 'lucide-react'

export const NoContactSelected = () => {
    return (
        <div className="flex flex-col items-center h-full text-gray-500 text-lg p-2 text-center">
            <MessageCircle className="w-14 h-14 text-gray-400 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Ningún chat seleccionado</h2>
            <p className="text-sm text-center">Por favor, primero seleccione un cliente.</p>
            
        </div>
    )
}
