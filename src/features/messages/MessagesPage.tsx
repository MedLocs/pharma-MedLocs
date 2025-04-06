
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { ConversationsList } from './components/ConversationsList';
import { MessagePanel } from './components/MessagePanel';
import { Conversation, Message } from './types';
import { exportConversationToCSV } from './utils/exportUtils';

const MessagesPage = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([
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
  const [messages, setMessages] = useState<Message[]>([
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
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrer les conversations en fonction du terme de recherche
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtenir les messages pour la conversation active
  const activeMessages = messages.filter(msg => msg.conversationId === activeConversation);
  
  // Obtenir les détails de la conversation active
  const currentConversation = conversations.find(conv => conv.id === activeConversation);

  const handleConversationClick = (convId: number) => {
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

  const handleSendMessage = (newMessage: string) => {
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
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès",
    });
    
    // Simuler une réponse après 2 secondes
    setTimeout(() => {
      simulateReply();
    }, 2000);
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

  const handleExportConversation = () => {
    if (!currentConversation) return;
    
    exportConversationToCSV(activeMessages, currentConversation.name);
    
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
            <Button variant="outline" onClick={handleExportConversation}>
              Exporter la conversation
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouvelle conversation
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          <Card className="md:col-span-1">
            <ConversationsList 
              conversations={filteredConversations}
              activeConversationId={activeConversation}
              onConversationClick={handleConversationClick}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </Card>

          <Card className="md:col-span-2 flex flex-col">
            <MessagePanel 
              currentConversation={currentConversation}
              messages={activeMessages}
              onSendMessage={handleSendMessage}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
