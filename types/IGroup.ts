import { IMember } from './IMember';

export interface IGroup {
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
  createdAt: string;
  updatedAt: string;
  participationMembers: IMember[];
}
