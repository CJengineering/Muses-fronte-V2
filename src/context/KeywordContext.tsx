import { ex } from "@fullcalendar/core/internal-common";
import React, {ReactNode, createContext, useContext, useState} from "react";
import { ModalValuesType } from "./types";

const ModalContext = createContext<ModalValuesType | undefined>(undefined);
  type Props = {
    children: ReactNode
  }
  export const  ModalProvider = ({ children }:Props) => {
    const [modal, setModal] = useState(false);

    const openModal = () => {
      setModal(true);
    };
    const closeModal = () => {
      setModal(false);
    };
    const value : ModalValuesType = { openModal, closeModal, modal, setModal };

    return (
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
    }
    export const useModal = (): ModalValuesType => {
        const context = useContext(ModalContext);
        if (!context) {
          throw new Error('useModal must be used within a ModalProvider');
        }
        return context;
      };