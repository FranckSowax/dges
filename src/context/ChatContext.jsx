import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(prev => !prev);
  
  // Ouvrir le chat avec un message initial
  const openChatWithMessage = (message) => {
    setInitialMessage(message);
    setIsOpen(true);
  };
  
  // Récupérer et effacer le message initial
  const consumeInitialMessage = () => {
    const msg = initialMessage;
    setInitialMessage('');
    return msg;
  };

  return (
    <ChatContext.Provider value={{ 
      isOpen, 
      openChat, 
      closeChat, 
      toggleChat, 
      openChatWithMessage,
      consumeInitialMessage,
      initialMessage 
    }}>
      {children}
    </ChatContext.Provider>
  );
};
