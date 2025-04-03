
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Send, Phone, Video } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const Messages = () => {
  const conversations = [
    { 
      id: 1, 
      name: 'Anne Dupont', 
      lastMessage: 'Bonjour, est-ce que ma commande est prête ?', 
      time: '10:30',
      unread: true,
      avatar: 'AD',
      online: true
    },
    { 
      id: 2, 
      name: 'Thomas Martin', 
      lastMessage: 'Merci pour les informations', 
      time: 'Hier',
      unread: false,
      avatar: 'TM',
      online: false
    },
    { 
      id: 3, 
      name: 'Sophie Petit', 
      lastMessage: "J'aurais besoin d'un conseil pour...", 
      time: 'Hier',
      unread: true,
      avatar: 'SP',
      online: false
    },
    { 
      id: 4, 
      name: 'Michel Durand', 
      lastMessage: 'Pouvez-vous me rappeler les horaires ?', 
      time: '31/03',
      unread: false,
      avatar: 'MD',
      online: true
    },
    { 
      id: 5, 
      name: 'Julie Leroy', 
      lastMessage: 'Je passerai demain récupérer mon ordonnance', 
      time: '30/03',
      unread: false,
      avatar: 'JL',
      online: false
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Anne Dupont',
      message: 'Bonjour, je voulais savoir si vous aviez reçu mon ordonnance envoyée hier ?',
      time: '10:15',
      isUser: false
    },
    {
      id: 2,
      sender: 'Pharmacie',
      message: 'Bonjour Mme Dupont, oui nous l\'avons bien reçue. Nous préparons votre commande.',
      time: '10:20',
      isUser: true
    },
    {
      id: 3,
      sender: 'Anne Dupont',
      message: 'Super, merci ! Est-ce que je pourrai la récupérer aujourd\'hui ?',
      time: '10:22',
      isUser: false
    },
    {
      id: 4,
      sender: 'Pharmacie',
      message: 'Oui, elle sera prête vers 15h. Souhaitez-vous que l\'on vous envoie une notification quand elle sera disponible ?',
      time: '10:25',
      isUser: true
    },
    {
      id: 5,
      sender: 'Anne Dupont',
      message: 'Bonjour, est-ce que ma commande est prête ?',
      time: '10:30',
      isUser: false
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-7rem)]">
        <h1 className="text-3xl font-bold mb-6">Messagerie</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          <Card className="md:col-span-1">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle>Conversations</CardTitle>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="text" placeholder="Rechercher..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-15rem)]">
                {conversations.map((conversation, index) => (
                  <React.Fragment key={conversation.id}>
                    <div className={`p-3 flex items-center gap-3 hover:bg-accent cursor-pointer ${conversation.id === 1 ? 'bg-accent' : ''}`}>
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
          </Card>

          <Card className="md:col-span-2 flex flex-col">
            <CardHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" alt="Anne Dupont" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Anne Dupont</CardTitle>
                    <p className="text-sm text-muted-foreground">En ligne</p>
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
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                        {!message.isUser && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt={message.sender} />
                            <AvatarFallback>AD</AvatarFallback>
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
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t mt-auto">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Écrivez votre message..." 
                    className="min-h-10 resize-none"
                  />
                  <Button size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Envoyer le message</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
