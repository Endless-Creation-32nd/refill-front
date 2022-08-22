import { IComment } from './IComment';

interface IWord {
  wordId: number;
  word: string;
  definition: string;
  pos: string | '';
  cat: string | '';
}

export interface IUserTranslation {
  transcriptionId: number;
  title: string;
  author: string;
  original: string | null;
  image: string;
  isBookMark: boolean;
  wordList: IWord[];
  commentList: IComment[];
}
