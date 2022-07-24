export interface IGroup {
  groupId: string;
  name: string;
  description: string;
  penalty: boolean;
  maxMember: number;
  adminId: string;
  perWeek: string;
  startTime: string;
  endTime: string;
  tagList: string[];
  currentMemberCount: number;
  createdAt: string;
  updatedAt: string;
}
