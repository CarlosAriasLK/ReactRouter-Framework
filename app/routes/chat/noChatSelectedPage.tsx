import { MessageCircle } from "lucide-react";

const noChatSelectedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <MessageCircle className="w-16 h-16 text-gray-400" />
      <p className="text-gray-500 mt-4 text-lg">No hay ningún chat seleccionado</p>
    </div>
  );
};

export default noChatSelectedPage;
