/* eslint-disable unused-imports/no-unused-vars */

export type Option = {
  text: string;
  isCorrect?: boolean;
};
export type Question = {
  id: string;
  title: string;
  options: Option[];
  media: string;
  quizParent: string;
  userId: string;
};

export type Quiz = {
  id: string;
  name: string;
  distance: number;
  questions: Question[];
  author: string;
  media: string;
  code: string;
  // elimination: Question;
  isPublic: boolean;
  description: string;
};

export const quizSettings = [
  { title: '12', subtitle: 'Kilometer', icon: '🏃‍♀️', color: 'bg-beige' },
  { title: '8', subtitle: 'Frågor', icon: '✏️', color: 'bg-green' },
  { title: '2', subtitle: 'Priser', icon: '🏆', color: 'bg-purple' },
  { title: '24', subtitle: 'Deltagare', icon: '🏁', color: 'bg-pink' },
];
