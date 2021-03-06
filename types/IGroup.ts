export interface IGroup {
  groupId: number;
  name: string;
  description: string;
  penalty: boolean;
  maxMember: number;
  adminId: string;
  perWeek: number;
  startTime: string;
  endTime: string;
  tagList: string[];
  currentMemberCount: number;
  createdAt: string;
  updatedAt: string;
}
