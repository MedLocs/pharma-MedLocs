
import { Message } from "../types";

export const exportConversationToCSV = (messages: Message[], clientName: string) => {
  const conversationData = messages.map(msg => ({
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
  const formattedClientName = clientName.replace(' ', '_');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `messages_${formattedClientName}_${currentDate}.csv`);
  link.click();
  URL.revokeObjectURL(url);
};
