import { createContext, type Dispatch, type SetStateAction } from 'react';

export const SidebarContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([true, () => {}]);
