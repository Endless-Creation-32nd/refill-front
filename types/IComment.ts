export interface IComment {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  memberId: number;
  nickname: string;
  image: string | null;
}
