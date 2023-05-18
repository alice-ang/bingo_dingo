/* eslint-disable unused-imports/no-unused-vars */

export type Rule = {
  id: string;
  media?: string;
  title: string;
  amount: number;
  type: 'sips' | 'shots';
  assign?: string;
};

export type Dingo = {
  id: string;
  name: string;
  description: string;
  userId: string;
  media: string;
  isPublic: boolean;
  isShared: boolean;
  rules: Rule[];
};
