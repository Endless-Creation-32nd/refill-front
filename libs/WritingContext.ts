import { createContext, Dispatch, SetStateAction } from 'react';
import { IWriting } from '../types/IWriting';

export interface WritingContextType {
  writing: IWriting;
  setWriting: Dispatch<SetStateAction<IWriting>>;
}

export const WritingContext = createContext<WritingContextType | null>(null);
