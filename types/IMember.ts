export interface IMember {
  memberId: number;
  nickname: string;
  image: string | null;
  status: 'PARTICIPATE' | 'PENDING';
}
