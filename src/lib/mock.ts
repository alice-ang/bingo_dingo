/* eslint-disable unused-imports/no-unused-vars */

export type Option = {
  text: string;
  isCorrect?: boolean;
};
export type Question = {
  id: string;
  question: string;
  options: Option[];
  media: string;
};

export type Quiz = {
  id: string;
  name: string;
  distance: number;
  questions: Question[];
  author: string;
  code: string;
  // elimination: Question;
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
    elimination: {
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
    elimination: {
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
    elimination: {
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
    creator: 'Skövdebostäder',
    logo: 'assets/skovdebostader.png',
  },
];

export const quizSettings = [
  { title: '12', subtitle: 'Kilometer', icon: '🏃‍♀️', color: 'bg-beige' },
  { title: '8', subtitle: 'Frågor', icon: '✏️', color: 'bg-green' },
  { title: '2', subtitle: 'Priser', icon: '🏆', color: 'bg-purple' },
  { title: '24', subtitle: 'Deltagare', icon: '🏁', color: 'bg-pink' },
];
