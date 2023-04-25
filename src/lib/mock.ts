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

export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;

export const quizSettings = [
  { title: '12', subtitle: 'Kilometer', icon: '🏃‍♀️', color: 'bg-palette-beige' },
  { title: '8', subtitle: 'Frågor', icon: '✏️', color: 'bg-palette-green' },
  { title: '2', subtitle: 'Priser', icon: '🏆', color: 'bg-palette-purple' },
  { title: '24', subtitle: 'Deltagare', icon: '🏁', color: 'bg-palette-pink' },
];
