"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import QuoteModal from "./QuoteModal";

const ModalContext = createContext<{ openModal: () => void }>({ openModal: () => {} });

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal: () => setIsOpen(true) }}>
      {children}
      <QuoteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ModalContext.Provider>
  );
}
