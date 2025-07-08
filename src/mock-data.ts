// Quiz configuration
export const quizData = {
  eventName: 'Annual Inter-School Quiz Competition',
  schoolName: 'St. Mary\'s High School',
  schoolLogo: '🏫',
  quizMaster: {
    name: 'Dr. Sarah Johnson',
    photo: '👩‍🏫'
  },
  date: '2025-07-15',
  venue: 'Main Auditorium',
  teams: [
    {
      id: 1, name: 'Team Alpha', participants: [
        { name: 'Alice Johnson', photo: '👩‍🎓' },
        { name: 'Bob Smith', photo: '👨‍🎓' }
      ], score: 0
    },
    {
      id: 2, name: 'Team Beta', participants: [
        { name: 'Charlie Brown', photo: '👨‍🎓' },
        { name: 'Diana Prince', photo: '👩‍🎓' }
      ], score: 0
    },
    {
      id: 3, name: 'Team Gamma', participants: [
        { name: 'Eve Wilson', photo: '👩‍🎓' },
        { name: 'Frank Miller', photo: '👨‍🎓' }
      ], score: 0
    },
    {
      id: 4, name: 'Team Delta', participants: [
        { name: 'Grace Lee', photo: '👩‍🎓' },
        { name: 'Henry Ford', photo: '👨‍🎓' }
      ], score: 0
    }
  ]
};

export const roundsData = [
  {
    id: 1,
    name: 'Science & Technology',
    type: 'normal',
    timeLimit: 30,
    points: {
      correct: 10,
      wrong: -2,
      bonus: 5, // Extra points for answering within first 10 seconds
      pass: 0
    },
    questions: [
      {
        question: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Go', 'Gd'],
        correct: 0
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correct: 1
      },
      {
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
        correct: 0
      }
    ]
  },
  // {
  //   id: 2,
  //   name: 'Audio/Visual Round',
  //   type: 'audio_visual',
  //   timeLimit: 45,
  //   points: {
  //     correct: 15,
  //     wrong: -3,
  //     bonus: 10, // Extra points for answering within first 15 seconds
  //     pass: 0
  //   },
  //   questions: [
  //     {
  //       question: 'Identify this famous landmark',
  //       media: '🗽',
  //       mediaType: 'image',
  //       options: ['Big Ben', 'Eiffel Tower', 'Statue of Liberty', 'Christ the Redeemer'],
  //       correct: 2
  //     },
  //     {
  //       question: 'What movie does this sound represent?',
  //       media: '🎵',
  //       mediaType: 'audio',
  //       options: ['Jaws', 'Star Wars', 'Titanic', 'The Lion King'],
  //       correct: 1
  //     }
  //   ]
  // },
  // {
  //   id: 3,
  //   name: 'History & Geography',
  //   type: 'normal',
  //   timeLimit: 30,
  //   points: {
  //     correct: 10,
  //     wrong: -2,
  //     bonus: 5,
  //     pass: 0
  //   },
  //   questions: [
  //     {
  //       question: 'In which year did World War II end?',
  //       options: ['1944', '1945', '1946', '1947'],
  //       correct: 1
  //     },
  //     {
  //       question: 'What is the capital of Australia?',
  //       options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
  //       correct: 2
  //     }
  //   ]
  // },
  // {
  //   id: 4,
  //   name: 'Rapid Fire Round',
  //   type: 'rapid_fire',
  //   timeLimit: 5,
  //   points: {
  //     correct: 5,
  //     wrong: 0, // No penalty for wrong answers in rapid fire
  //     bonus: 2, // Extra points for very quick answers
  //     pass: 0 // Not applicable for rapid fire
  //   },
  //   questions: [
  //     { question: 'What is 15 + 27?', correct: '42' },
  //     { question: 'Name the first President of the United States', correct: 'George Washington' },
  //     { question: 'What is the largest ocean on Earth?', correct: 'Pacific Ocean' },
  //     { question: 'How many continents are there?', correct: '7' },
  //     { question: 'What gas do plants absorb from the atmosphere?', correct: 'Carbon dioxide' }
  //   ]
  // },
  // {
  //   id: 5,
  //   name: 'Literature & Arts',
  //   type: 'normal',
  //   timeLimit: 30,
  //   points: {
  //     correct: 10,
  //     wrong: -2,
  //     bonus: 5,
  //     pass: 0
  //   },
  //   questions: [
  //     {
  //       question: 'Who wrote "Romeo and Juliet"?',
  //       options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
  //       correct: 1
  //     },
  //     {
  //       question: 'Which artist painted the Mona Lisa?',
  //       options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
  //       correct: 2
  //     }
  //   ]
  // }
];