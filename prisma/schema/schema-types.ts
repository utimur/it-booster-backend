// This file is auto-generated from schema.prisma

export enum QuestionType {
  radio = "radio",
  checkbox = "checkbox",
  task = "task",
  text = "text",
  input = "input"
}

export enum UserRole {
  admin = "admin",
  user = "user",
  manager = "manager",
  mentor = "mentor"
}

export interface User {
  id: number;
  interviews?: Interview[];
  role: UserRole;
  firstName?: string;
  lastName?: string;
  username?: string;
  authDate: Date;
  photoUrl?: string;
  telegramId: number;
  firstLoginAt: Date;
  lastVisitAt: Date;
  Session?: Session[];
}

export interface Session {
  id: number;
  user?: User;
  userId: number;
  tgHash: string;
  token: string;
}

export interface Interview {
  id: number;
  author?: User;
  authorId: number;
  startedAt: Date;
  completedAt?: Date;
  interviewQuestions?: InterviewQuestion[];
  categories?: Category[];
  direction?: Direction;
  directionId: number;
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  title: string;
  explanation: string;
  category?: Category;
  categoryId: number;
  direction?: Direction;
  directionId: number;
  createdAt: Date;
  updatedAt: Date;
  answers?: Answer[];
  interviewQuestions?: InterviewQuestion[];
}

export interface Answer {
  id: number;
  text: string;
  isCorrect?: boolean;
  correctValue?: string;
  createdAt: Date;
  updatedAt: Date;
  question?: Question;
  questionId: number;
  interviewAnswers?: InterviewQuestionAnswer[];
}

export interface Direction {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  Questions?: Question[];
  Interviews?: Interview[];
}

export interface Category {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  parent?: Category;
  parentId?: number;
  children?: Category[];
  questions?: Question[];
  interviews?: Interview[];
}

export interface InterviewQuestion {
  id: number;
  position: number;
  createdAt: Date;
  completedAt?: Date;
  interview?: Interview;
  interviewId: number;
  question?: Question;
  questionId: number;
  interviewQuestionAnswers?: InterviewQuestionAnswer[];
}

export interface InterviewQuestionAnswer {
  id: number;
  answeredAt: Date;
  answer?: Answer;
  answerId: number;
  interviewQuestion?: InterviewQuestion;
  interviewQuestionId: number;
}