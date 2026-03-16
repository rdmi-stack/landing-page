"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import QuoteModal from "./QuoteModal";

const ModalContext = createContext<{ openModal: (productName?: string) => void }>({
  openModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const openModal = (productName?: string) => {
    setSelectedProduct(productName || "");
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <QuoteModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedProduct("");
        }}
        productName={selectedProduct}
      />
    </ModalContext.Provider>
  );
}
