interface IMember {
  memberId: number;
  nickname: string;
  image: string | null;
}
export interface IMyGroup {
  groupId: number;
  name: string;
  description: string;
  penalty: boolean;
  maxMember: number;
  adminId: number;
  perWeek: number;
  startTime: string;
  endTime: string;
  tagList: string[];
  participationMembers: IMember[];
  createdAt: string;
  updatedAt: string;
}
