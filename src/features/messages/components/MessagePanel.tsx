
import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Message, Conversation } from '../types';
import { MessageBubble } from './MessageBubble';

interface MessagePanelProps {
  currentConversation?: Conversation;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export const MessagePanel: React.FC<MessagePanelProps> = ({
  currentConversation,
  messages,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Faire défiler automatiquement jusqu'au dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <>
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" alt={currentConversation?.name || 'Client'} />
              <AvatarFallback>{currentConversation?.avatar || 'CL'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{currentConversation?.name || 'Sélectionnez une conversation'}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {currentConversation?.online ? 'En ligne' : 'Hors ligne'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id}
                message={message}
                avatarFallback={currentConversation?.avatar || 'CL'}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Textarea 
              placeholder="Écrivez votre message..." 
              className="min-h-10 resize-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button size="icon" className="shrink-0" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Envoyer le message</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};
