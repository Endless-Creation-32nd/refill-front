import { IMember } from './IMember';

export interface IGroupTranscription {
  transcriptionId: number;
  transcriptionImage: string;
  title: string;
  createdAt: string;
  participation: IMember;
  bookmarkCount: number;
  commentCount: number;
}
