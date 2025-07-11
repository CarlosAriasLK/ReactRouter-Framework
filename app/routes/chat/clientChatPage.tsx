import { useState } from "react";

import { Copy, Download, ThumbsUp, ThumbsDown, Send, MessagesSquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { getClientMessages, sendMessage } from "~/fake/fake-data";
import { formateDate } from "~/lib/date-formater";
import { Form } from "react-router";
import type { Route } from "./+types/clientChatPage";
import type { ShouldRevalidateFunctionArgs } from "react-router";


//* Esta funcion viene por defecto en true
export function shouldRevalidate( arg: ShouldRevalidateFunctionArgs ) {
  return true;
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  const messages = await getClientMessages(id);
  return { messages };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formaData = await request.formData();
  const message = `${formaData.get('message')}`;

  const newMessage = await sendMessage({
    sender: 'agent',
    clientId: params.id,
    content: message,
    createdAt: new Date(),
  })

}


const clientChatPage = ({ loaderData }: Route.ComponentProps) => {
  const [input, setInput] = useState("");
  const { messages = [] } = loaderData;


  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">

          {
            messages.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <MessagesSquare className="w-13 h-13 text-gray-400 mb-2" />
                <p className="font-semibold">No messages yet</p>
              </div>
            )
          }

          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "client" ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">{formateDate(message.createdAt)}</span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">{formateDate(message.createdAt)}</span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Form method="post" className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
            name="message"
          />
          <Button className="h-[44px] px-4 flex items-center gap-2" type="submit">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default clientChatPage