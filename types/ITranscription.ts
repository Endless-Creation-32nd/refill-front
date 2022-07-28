import { IMember } from './IMember';

export interface ITranscription {
  transcriptionId: number;
  transcriptionImage: string;
  title: string;
  createdAt: string;
  participation: IMember;
  bookmarkCount: number;
  commentCount: number;
}
