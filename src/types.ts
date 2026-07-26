export type BacType = 'SM' | 'PC' | 'SVT' | 'Eco' | 'Tech';

export type SchoolType = 'Engineering' | 'Business' | 'Medical' | 'Administrative' | 'Technical' | 'Military' | 'Health';

export type DifficultyLevel = 'Low' | 'Medium' | 'High' | 'Elite';

export type AdmissionStatus = 'Accepted' | 'Possible' | 'Difficult';

export interface School {
  id: string;
  name: string;
  fullName: string;
  type: SchoolType;
  city: string;
  difficulty: DifficultyLevel;
  description: string;
  // Threshold values mapped by BacType
  thresholds: Record<BacType, number>;
  // For schools that don't accept certain BAC types, we can specify. E.g. Eco can't go to SM Cpge.
  acceptedBacs: BacType[];
  // URL or info mention
  notes?: string;
}

export interface StudentData {
  bacType: BacType;
  nationalGrade: number;
  regionalGrade: number;
}

// QCM Concours Médecine Types
export type QuestionOptionKey = 'A' | 'B' | 'C' | 'D' | 'E';

export interface ExamSectionInfo {
  nom: string;
  de: number;
  a: number;
  coefficient: number;
}

export interface ExamInfo {
  title: string;
  annee_universitaire: string;
  date: string;
  duree: string;
  version: string;
  sections: ExamSectionInfo[];
  consignes: string[];
}

export interface SpecialFormat {
  needed: boolean;
  reason?: string;
  assets_needed?: string[];
}

export interface Question {
  id: number;
  section: string;
  points: number;
  context?: string;
  question: string;
  options: Record<QuestionOptionKey, string>;
  correct_answer: QuestionOptionKey;
  special_format: SpecialFormat;
}

export interface ExamDataset {
  exam_info: ExamInfo;
  questions: Question[];
}

export type UserAnswers = Record<number, QuestionOptionKey>;

export interface SectionScoreSummary {
  nom: string;
  totalQuestions: number;
  totalPoints: number;
  obtainedPoints: number;
  correctCount: number;
}

export interface QuizResult {
  totalPointsObtained: number;
  maxPointsPossible: number;
  percentage: number;
  totalAnswered: number;
  correctAnswersCount: number;
  wrongAnswersCount: number;
  unansweredCount: number;
  sectionSummaries: Record<string, SectionScoreSummary>;
}

