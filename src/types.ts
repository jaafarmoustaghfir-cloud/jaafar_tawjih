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
