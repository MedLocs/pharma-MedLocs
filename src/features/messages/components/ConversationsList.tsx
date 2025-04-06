
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Conversation } from '../types';

interface ConversationsListProps {
  conversations: Conversation[];
  activeConversationId: number;
  onConversationClick: (id: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  activeConversationId,
  onConversationClick,
  searchTerm,
  onSearchChange
}) => {
  return (
    <>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle>Conversations</CardTitle>
          <Button size="sm" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Rechercher..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-15rem)]">
          {conversations.map((conversation, index) => (
            <React.Fragment key={conversation.id}>
              <div 
                className={`p-3 flex items-center gap-3 hover:bg-accent cursor-pointer ${conversation.id === activeConversationId ? 'bg-accent' : ''}`}
                onClick={() => onConversationClick(conversation.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src="" alt={conversation.name} />
                    <AvatarFallback>{conversation.avatar}</AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{conversation.name}</p>
                    <p className="text-xs text-muted-foreground">{conversation.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && (
                  <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    <span className="sr-only">Messages non lus</span>
                  </Badge>
                )}
              </div>
              {index < conversations.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </ScrollArea>
      </CardContent>
    </>
  );
};
