interface IComment {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  memberId: number;
  nickname: string;
  image: string | null;
}

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
  original: string;
  image: string;
  wordList: IWord[];
  commentList: IComment[];
}
