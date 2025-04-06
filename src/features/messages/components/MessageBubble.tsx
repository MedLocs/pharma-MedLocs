
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  avatarFallback: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, avatarFallback }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
        {!message.isUser && (
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={message.sender} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <div className={`rounded-lg p-3 ${
            message.isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          }`}>
            <p className="text-sm">{message.message}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {message.time}
          </p>
        </div>
      </div>
    </div>
  );
};
