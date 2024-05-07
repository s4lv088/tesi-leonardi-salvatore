import { LucideIcon, HomeIcon, FolderArchiveIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  url: string;
  icon?: LucideIcon;
  emptyPage?: boolean; //se è true, nel mobile-sidebar non chiude la sidebar al click su un nodo padre in modo che si può selezionare un figlio prima di chiudere la sidebar
}
export const MENU_ITEMS: MenuItem[] = [
  { label: "Home", url: "/", icon: HomeIcon },
  { label: "Preferiti", url: "/preferiti", icon: FolderArchiveIcon },
];
