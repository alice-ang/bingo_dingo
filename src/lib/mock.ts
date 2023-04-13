/* eslint-disable unused-imports/no-unused-vars */
type Option = {
  text: string;
  isCorrect?: boolean;
};
type Question = {
  question: string;
  options: Option[];
  media: string;
  location?: string;
  time: number;
};

type Quiz = {
  name: string;
  distance: number;
  questions: Question[];
  author: string;
  logo: string;
  time: number;
  date?: Date;
  code: string;
  isPublic: boolean;
  description: string;
};
export const quizzes = [
  {
    name: 'Karstorpssjön',
    code: 'HTSY',
    distance: 3.5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed tempor odio. Maecenas ultrices iaculis vestibulum. Donec eu tellus pellentesque, vulputate ante non, pretium lorem. Vestibulum ut ultricies massa. Pellentesque vulputate arcu felis. Morbi commodo viverra eros, id rhoncus massa pretium nec.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed tempor odio. Maecenas ultrices iaculis vestibulum. Donec eu tellus pellentesque, vulputate ante non, pretium lorem. Vestibulum ut ultricies massa. Pellentesque vulputate arcu felis. Morbi commodo viverra eros, id rhoncus massa pretium nec',
    isPublic: true,
    questions: [
      {
        question: 'Lorem ipsum dolor?',
        options: [
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
            isCorrect: true,
          },
        ],
        media: '',

        time: 3,
      },
    ],
    creator: 'Skövdebostäder',
    logo: 'assets/skovdebostader.png',
  },
  {
    name: 'Skövde runt',
    distance: 7.8,
    code: 'LIYS',
    isPublic: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed tempor odio. Maecenas ultrices iaculis vestibulum. Donec eu tellus pellentesque, vulputate ante non, pretium lorem. Vestibulum ut ultricies massa. Pellentesque vulputate arcu felis. Morbi commodo viverra eros, id rhoncus massa pretium nec',
    questions: [
      {
        question: 'Lorem ipsum dolor?',
        options: [
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
            isCorrect: true,
          },
        ],
        media: '',

        time: 3,
      },
    ],
    creator: 'Skövdebostäder',
    logo: 'assets/skovdebostader.png',
  },
  {
    name: 'Majaslingan',
    distance: 2.5,
    code: 'ASNJ',
    isPublic: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed tempor odio. Maecenas ultrices iaculis vestibulum. Donec eu tellus pellentesque, vulputate ante non, pretium lorem. Vestibulum ut ultricies massa. Pellentesque vulputate arcu felis. Morbi commodo viverra eros, id rhoncus massa pretium nec',
    questions: [
      {
        question: 'Lorem ipsum dolor?',
        options: [
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
          },
          {
            text: 'lorem ipsum',
            isCorrect: true,
          },
        ],
        media: '',

        time: 3,
      },
    ],
    creator: 'Skövdebostäder',
    logo: 'assets/skovdebostader.png',
  },
];
