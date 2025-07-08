export interface Participant {
  name: string;
  photo: string;
}

export interface Team {
  id: number;
  name: string;
  participants: Participant[];
  score: number;
}

export interface QuizMaster {
  name: string;
  photo: string;
}

export interface Points {
  correct: number;
  wrong: number;
  bonus: number;
  pass: number;
}

export interface Question {
  question: string;
  options?: string[];
  correct: number | string;
  media?: string;
  mediaType?: 'image' | 'audio';
}

export interface Round {
  id: number;
  name: string;
  type: string;
  timeLimit: number;
  points: Points;
  questions: Question[];
}

export interface QuizConfig {
  eventName: string;
  schoolName: string;
  schoolLogo: string;
  quizMaster: QuizMaster;
  date: string;
  venue: string;
  teams: Team[];
}
