import { create } from "zustand";

interface AlertDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm?: () => void;
  openDialog: (options: {
    title: string;
    description: string;
    onConfirm?: () => void;
  }) => void;
  closeDialog: () => void;
}

export const useAlertDialog = create<AlertDialogState>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  onConfirm: undefined,
  openDialog: ({ title, description, onConfirm }) =>
    set({ isOpen: true, title, description, onConfirm }),
  closeDialog: () =>
    set({ isOpen: false, title: "", description: "", onConfirm: undefined }),
}));
