
import React, { useState, useEffect, useRef } from 'react';
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
import { useToast } from "@/components/ui/use-toast";

const Messages = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState([
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
  ]);

  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      conversationId: 1,
      sender: 'Anne Dupont',
      message: 'Bonjour, je voulais savoir si vous aviez reçu mon ordonnance envoyée hier ?',
      time: '10:15',
      isUser: false
    },
    {
      id: 2,
      conversationId: 1,
      sender: 'Pharmacie',
      message: 'Bonjour Mme Dupont, oui nous l\'avons bien reçue. Nous préparons votre commande.',
      time: '10:20',
      isUser: true
    },
    {
      id: 3,
      conversationId: 1,
      sender: 'Anne Dupont',
      message: 'Super, merci ! Est-ce que je pourrai la récupérer aujourd\'hui ?',
      time: '10:22',
      isUser: false
    },
    {
      id: 4,
      conversationId: 1,
      sender: 'Pharmacie',
      message: 'Oui, elle sera prête vers 15h. Souhaitez-vous que l\'on vous envoie une notification quand elle sera disponible ?',
      time: '10:25',
      isUser: true
    },
    {
      id: 5,
      conversationId: 1,
      sender: 'Anne Dupont',
      message: 'Bonjour, est-ce que ma commande est prête ?',
      time: '10:30',
      isUser: false
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  
  // Faire défiler automatiquement jusqu'au dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filtrer les conversations en fonction du terme de recherche
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtenir les messages pour la conversation active
  const activeMessages = messages.filter(msg => msg.conversationId === activeConversation);
  
  // Obtenir les détails de la conversation active
  const currentConversation = conversations.find(conv => conv.id === activeConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Créer un nouveau message
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newMessageObj = {
      id: messages.length + 1,
      conversationId: activeConversation,
      sender: 'Pharmacie',
      message: newMessage,
      time: timeString,
      isUser: true
    };
    
    // Ajouter le message à la liste
    setMessages([...messages, newMessageObj]);
    
    // Mettre à jour la dernière conversation
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversation 
          ? {...conv, lastMessage: newMessage, time: 'À l\'instant'} 
          : conv
      )
    );
    
    // Effacer le champ de saisie
    setNewMessage('');
    
    // Simuler une réponse après 2 secondes
    setTimeout(() => {
      simulateReply();
    }, 2000);

    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès",
    });
  };

  const simulateReply = () => {
    const replies = [
      "D'accord, merci pour l'information !",
      "Je comprends, je passerai plus tard.",
      "Parfait, merci pour votre aide.",
      "J'ai une autre question concernant ma prescription...",
      "Est-ce que vous avez des alternatives moins chères ?"
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const replyMessage = {
      id: messages.length + 2,
      conversationId: activeConversation,
      sender: currentConversation?.name || 'Client',
      message: randomReply,
      time: timeString,
      isUser: false
    };
    
    setMessages(prev => [...prev, replyMessage]);
    
    // Mettre à jour la dernière conversation
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversation 
          ? {...conv, lastMessage: randomReply, time: 'À l\'instant', unread: true} 
          : conv
      )
    );
  };

  const handleConversationClick = (convId) => {
    setActiveConversation(convId);
    
    // Marquer les messages comme lus
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === convId 
          ? {...conv, unread: false} 
          : conv
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exportConversation = () => {
    const conversationData = activeMessages.map(msg => ({
      Date: new Date().toLocaleDateString(),
      Heure: msg.time,
      Expéditeur: msg.sender,
      Message: msg.message
    }));
    
    // Création d'un fichier CSV
    const header = Object.keys(conversationData[0]).join(',');
    const rows = conversationData.map(row => 
      Object.values(row).map(value => `"${value}"`).join(',')
    );
    const csv = [header, ...rows].join('\n');
    
    // Téléchargement du fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const currentDate = new Date().toISOString().slice(0, 10);
    const clientName = currentConversation?.name.replace(' ', '_') || 'conversation';
    
    link.setAttribute('href', url);
    link.setAttribute('download', `messages_${clientName}_${currentDate}.csv`);
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversation exportée",
      description: "La conversation a été exportée avec succès",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-7rem)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Messagerie</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportConversation}>
              Exporter la conversation
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouvelle conversation
            </Button>
          </div>
        </div>
        
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
                <Input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-15rem)]">
                {filteredConversations.map((conversation, index) => (
                  <React.Fragment key={conversation.id}>
                    <div 
                      className={`p-3 flex items-center gap-3 hover:bg-accent cursor-pointer ${conversation.id === activeConversation ? 'bg-accent' : ''}`}
                      onClick={() => handleConversationClick(conversation.id)}
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
                    {index < filteredConversations.length - 1 && <Separator />}
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
                  {activeMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                        {!message.isUser && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt={message.sender} />
                            <AvatarFallback>{currentConversation?.avatar || 'CL'}</AvatarFallback>
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
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
