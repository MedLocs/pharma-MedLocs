
export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
  online: boolean;
}

export interface Message {
  id: number;
  conversationId: number;
  sender: string;
  message: string;
  time: string;
  isUser: boolean;
}
