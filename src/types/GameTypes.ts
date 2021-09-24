import { Role } from 'types/PlayerTypes';

export type Candidate = {
  id: string;
  voteCount: number;
};

export type StageType = {
  name: string;
  curPlayer?: string;
  nextPlayer?: string;
  nextStage?: string;
  roles?: { [key in Role]: number };
  delay?: number;
  canVote?: boolean;
  candidates?: Candidate[];
  voteResult?: any;
  mafiaCount?: number;
};
