export interface IGroup {
  groupId: string;
  groupName: string;
  description: string;
  tagList: string[];
  maxMember: number;
  currentMember: number;
  postCount: number;
  startTime: string;
  endTime: string;
}
