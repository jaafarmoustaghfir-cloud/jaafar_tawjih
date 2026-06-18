export type BacType = 'SM' | 'PC' | 'SVT' | 'Eco' | 'Tech' | 'Lettres';

export type SchoolCategory =
  | 'Ingénierie / Sciences'
  | 'Commerce / Gestion'
  | 'Administration'
  | 'Formation / Enseignement'
  | 'Santé / Paramédical'
  | 'Militaire / Sécurité'
  | 'Formation Professionnelle'
  | 'Universités Privées'
  | 'Spécial Concours';

export interface SchoolFr {
  id: string;
  name: string;
  city: string;
  category: SchoolCategory;
  thresholds: Record<BacType, number>;
  acceptedBacs: BacType[];
}

export const BAC_NAMES: Record<BacType, string> = {
  SM: 'Sciences Mathématiques (SM)',
  PC: 'Sciences Physiques-Chimie (PC)',
  SVT: 'Sciences de la Vie et de la Terre (SVT)',
  Eco: 'Sciences Économiques & Gestion (Eco)',
  Tech: 'Sciences et Technologies (Tech)',
  Lettres: 'Lettres & Sciences Humaines (Lettres)'
};

export const SCHOOLS_FR: SchoolFr[] = [
  // --- INGENIERIE / SCIENCES / TECH ---
  {
    id: 'ensa',
    name: 'ENSA (École Nationale des Sciences Appliquées - Toutes villes)',
    city: 'Marrakech, Tanger, Agadir, Oujda, Kenitra, Safi, El Jadida, Al Hoceima, Khouribga, Tetouan, Berrechid',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech'],
    thresholds: { SM: 12.0, PC: 14.0, SVT: 15.0, Tech: 14.0, Eco: 99, Lettres: 99 }
  },
  {
    id: 'ensam',
    name: 'ENSAM (École Nationale Supérieure d’Arts et Métiers - Meknès, Casablanca)',
    city: 'Meknès, Casablanca',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech', 'SVT'],
    thresholds: { SM: 12.0, PC: 16.0, Tech: 16.0, SVT: 16.0, Eco: 99, Lettres: 99 }
  },
  {
    id: 'emi',
    name: 'EMI (École Mohammadia d’Ingénieurs)',
    city: 'Rabat',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech'],
    thresholds: { SM: 15.0, PC: 16.0, Tech: 16.5, SVT: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'ensias',
    name: 'ENSIAS (École Nationale Supérieure d’Informatique et d’Analyse des Systèmes)',
    city: 'Rabat',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech'],
    thresholds: { SM: 15.5, PC: 16.5, Tech: 16.8, SVT: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'ehtp',
    name: 'EHTP (École Hassania des Travaux Publics)',
    city: 'Casablanca',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech'],
    thresholds: { SM: 15.0, PC: 16.0, Tech: 16.0, SVT: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'inpt',
    name: 'INPT (Institut National des Postes et Télécommunications)',
    city: 'Rabat',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech'],
    thresholds: { SM: 14.8, PC: 15.8, Tech: 15.5, SVT: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'insea',
    name: 'INSEA (Institut National de Statistique et d’Économie Appliquée)',
    city: 'Rabat',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech', 'Eco'],
    thresholds: { SM: 14.5, PC: 15.5, Tech: 15.5, SVT: 99, Eco: 14.0, Lettres: 99 }
  },
  {
    id: 'ensem',
    name: 'ENSEM (École Nationale Supérieure d’Électricité et de Mécanique)',
    city: 'Casablanca',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech'],
    thresholds: { SM: 14.2, PC: 15.2, Tech: 15.0, SVT: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'esith',
    name: 'ESITH (École Supérieure des Industries du Textile et de l’Habillement)',
    city: 'Casablanca',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech', 'SVT', 'Eco'],
    thresholds: { SM: 12.0, PC: 12.5, Tech: 12.5, SVT: 13.5, Eco: 13.0, Lettres: 99 }
  },
  {
    id: 'ensmr',
    name: 'ENSMR (Mines Rabat - École Nationale Supérieure des Mines de Rabat)',
    city: 'Rabat',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'Tech'],
    thresholds: { SM: 15.0, PC: 16.0, Tech: 16.0, SVT: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'ensck',
    name: 'ENSCK Chimie (École Nationale Supérieure de Chimie de Kénitra)',
    city: 'Kénitra',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT'],
    thresholds: { SM: 14.50, PC: 16.00, SVT: 17.00, Tech: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'fst',
    name: 'FST (Faculté des Sciences et Techniques - Toutes villes)',
    city: 'Fès, Marrakech, Tanger, Mohammedia, Settat, Errachidia, Al Hoceima, Beni Mellal',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech'],
    thresholds: { SM: 11.0, PC: 11.8, SVT: 12.5, Tech: 12.0, Eco: 99, Lettres: 99 }
  },
  {
    id: 'est',
    name: 'EST (École Supérieure de Technologie - Toutes villes)',
    city: 'Casablanca, Rabat, Fès, Agadir, Meknès, Oujda, El Jadida, Safi, Salé',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech', 'Eco', 'Lettres'],
    thresholds: { SM: 10.0, PC: 11.0, SVT: 11.5, Tech: 10.8, Eco: 11.2, Lettres: 12.5 }
  },
  {
    id: 'cpge',
    name: 'CPGE (Classes Préparatoires aux Grandes Écoles)',
    city: 'Rabat, Casablanca, Fès, Marrakech, Agadir, Oujda, Meknès, Tanger',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech', 'Eco'],
    thresholds: { SM: 14.0, PC: 15.5, Tech: 14.8, SVT: 16.5, Eco: 14.5, Lettres: 99 }
  },
  {
    id: 'iav',
    name: 'IAV Hassan II (Institut Agronomique et Vétérinaire)',
    city: 'Rabat, Agadir',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT'],
    thresholds: { SM: 16.0, PC: 16.0, SVT: 16.0, Tech: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'enam_agri',
    name: 'ENAM (École Nationale d’Agriculture de Meknès)',
    city: 'Meknès',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT'],
    thresholds: { SM: 16.0, PC: 16.0, SVT: 16.0, Tech: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'enfi',
    name: 'ENFI (École Nationale Forestière d’Ingénieurs)',
    city: 'Salé',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT'],
    thresholds: { SM: 13.0, PC: 13.5, SVT: 14.0, Tech: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'ena_archi',
    name: 'ENA (École Nationale d’Architecture)',
    city: 'Rabat, Marrakech, Fès, Tetouan, Agadir, Oujda',
    category: 'Ingénierie / Sciences',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech'],
    thresholds: { SM: 14.0, PC: 14.8, SVT: 15.0, Tech: 14.8, Eco: 99, Lettres: 99 }
  },

  // --- COMMERCE / GESTION ---
  {
    id: 'encg',
    name: 'ENCG (École Nationale de Commerce et de Gestion - Toutes villes)',
    city: 'Casablanca, Settat, Rabat, Tanger, Marrakech, Agadir, Oujda, El Jadida, Fès',
    category: 'Commerce / Gestion',
    acceptedBacs: ['Eco', 'SM', 'PC', 'SVT', 'Tech', 'Lettres'],
    thresholds: { Eco: 12.0, SM: 12.0, PC: 14.0, SVT: 14.0, Tech: 13.0, Lettres: 13.5 }
  },
  {
    id: 'iscae',
    name: 'ISCAE (Institut Supérieur de Commerce et d’Administration des Entreprises)',
    city: 'Casablanca, Rabat',
    category: 'Commerce / Gestion',
    acceptedBacs: ['Eco', 'SM', 'PC', 'Tech', 'SVT'],
    thresholds: { Eco: 17.24, SM: 17.66, PC: 18.59, Tech: 18.44, SVT: 18.14, Lettres: 99 }
  },
  {
    id: 'fsjes',
    name: 'FSJES (Faculté des Sciences Juridiques, Économiques et Sociales)',
    city: 'Toutes les villes universitaires',
    category: 'Commerce / Gestion',
    acceptedBacs: ['Eco', 'SM', 'PC', 'Tech', 'SVT', 'Lettres'],
    thresholds: { Eco: 10.0, SM: 10.0, PC: 10.0, Tech: 10.0, SVT: 10.0, Lettres: 10.0 }
  },

  // --- ADMINISTRATION ---
  {
    id: 'ena_admin',
    name: 'ENA (École Nationale d’Administration)',
    city: 'Rabat',
    category: 'Administration',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech', 'Eco'],
    thresholds: { SM: 14.0, PC: 14.5, SVT: 15.0, Tech: 14.5, Eco: 14.0, Lettres: 99 }
  },
  {
    id: 'era_admin',
    name: 'ERA (École Royale d’Administration)',
    city: 'Rabat',
    category: 'Administration',
    acceptedBacs: ['SM', 'PC', 'Eco', 'SVT'],
    thresholds: { SM: 14.0, PC: 14.5, Eco: 14.0, SVT: 15.0, Tech: 99, Lettres: 99 }
  },

  // --- FORMATION / ENSEIGNEMENT ---
  {
    id: 'ens',
    name: 'ENS (Écoles Normales Supérieures)',
    city: 'Rabat, Casablanca, Fès, Marrakech, Meknès, Tetouan',
    category: 'Formation / Enseignement',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech', 'Eco', 'Lettres'],
    thresholds: { SM: 13.0, PC: 13.5, SVT: 13.8, Tech: 13.5, Eco: 13.5, Lettres: 13.0 }
  },
  {
    id: 'esef',
    name: 'ESEF (Écoles Supérieures de l’Éducation et de la Formation)',
    city: 'Kenitra, Agadir, Oujda, El Jadida, Beni Mellal',
    category: 'Formation / Enseignement',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech', 'Eco', 'Lettres'],
    thresholds: { SM: 12.0, PC: 12.5, SVT: 12.8, Tech: 12.5, Eco: 12.5, Lettres: 12.5 }
  },

  // --- SANTE / PARAMÉDICAL ---
  {
    id: 'fmp',
    name: 'FMP (Faculté de Médecine et de Pharmacie)',
    city: 'Rabat, Casablanca, Marrakech, Fès, Oujda, Agadir, Tanger, Laâyoune',
    category: 'Santé / Paramédical',
    acceptedBacs: ['SM', 'PC', 'SVT'],
    thresholds: { SM: 12.0, PC: 12.0, SVT: 12.0, Tech: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'fmd',
    name: 'FMD (Faculté de Médecine Dentaire)',
    city: 'Rabat, Casablanca',
    category: 'Santé / Paramédical',
    acceptedBacs: ['SM', 'PC', 'SVT'],
    thresholds: { SM: 12.0, PC: 12.0, SVT: 12.0, Tech: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'ispits',
    name: 'ISPITS (Institut Supérieur des Professions Infirmières et Techniques de Santé)',
    city: 'Rabat, Casablanca, Fès, Marrakech, Oujda, Agadir, Tanger, Tetouan, Laâyoune',
    category: 'Santé / Paramédical',
    acceptedBacs: ['SVT', 'PC', 'SM'],
    thresholds: { SVT: 11.0, PC: 11.5, SM: 11.0, Tech: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'um6ss',
    name: 'UM6SS (Université Mohammed VI des Sciences de la Santé)',
    city: 'Casablanca, Rabat',
    category: 'Santé / Paramédical',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech'],
    thresholds: { SM: 10.0, PC: 10.0, SVT: 10.0, Tech: 10.5, Eco: 99, Lettres: 99 }
  },
  {
    id: 'ims',
    name: 'IMS (Instituts Médico-Sociaux)',
    city: 'Plusieurs villes d’implantation',
    category: 'Santé / Paramédical',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Eco', 'Tech', 'Lettres'],
    thresholds: { SM: 10.5, PC: 11.0, SVT: 11.0, Eco: 11.5, Tech: 11.0, Lettres: 11.0 }
  },

  // --- MILITAIRE / SÉCURITÉ ---
  {
    id: 'era_air',
    name: 'École Royale de l’Air (Militaires Aviateurs)',
    city: 'Marrakech',
    category: 'Militaire / Sécurité',
    acceptedBacs: ['SM', 'PC', 'Tech'],
    thresholds: { SM: 15.0, PC: 15.5, Tech: 16.0, SVT: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'ern_nav',
    name: 'École Royale Navale',
    city: 'Casablanca',
    category: 'Militaire / Sécurité',
    acceptedBacs: ['SM', 'PC', 'Tech'],
    thresholds: { SM: 14.5, PC: 15.0, Tech: 15.5, SVT: 99, Eco: 99, Lettres: 99 }
  },
  {
    id: 'gendarmerie',
    name: 'École Royale de Gendarmerie (Gendarmerie Royale)',
    city: 'Marrakech, Benguerir',
    category: 'Militaire / Sécurité',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Eco', 'Tech', 'Lettres'],
    thresholds: { SM: 11.0, PC: 11.5, SVT: 12.0, Eco: 12.0, Tech: 12.0, Lettres: 12.0 }
  },
  {
    id: 'police',
    name: 'Institut Royal de Police (DGSN / Sûreté Nationale)',
    city: 'Kenitra',
    category: 'Militaire / Sécurité',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Eco', 'Tech', 'Lettres'],
    thresholds: { SM: 10.5, PC: 11.0, SVT: 11.5, Eco: 11.5, Tech: 11.5, Lettres: 11.5 }
  },

  // --- FORMATION PROFESSIONNELLE ---
  {
    id: 'ofppt',
    name: 'OFPPT (ISTA / ISTA NTIC - Formations de Techniciens Spécialisés)',
    city: 'Toutes les villes du Royaume',
    category: 'Formation Professionnelle',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Eco', 'Tech', 'Lettres'],
    thresholds: { SM: 10.0, PC: 10.0, SVT: 10.0, Eco: 10.0, Tech: 10.0, Lettres: 10.0 }
  },
  {
    id: 'bts',
    name: 'BTS Maroc (Brevet de Technicien Supérieur)',
    city: 'Centres publics à travers le Maroc',
    category: 'Formation Professionnelle',
    acceptedBacs: ['SM', 'PC', 'Tech', 'SVT', 'Eco', 'Lettres'],
    thresholds: { SM: 12.0, PC: 12.5, Tech: 12.0, SVT: 13.0, Eco: 12.5, Lettres: 12.5 }
  },
  {
    id: 'est_dut',
    name: 'EST DUT / BUT (Diplôme Universitaire de Technologie - EST)',
    city: 'Casablanca, Rabat, Salé, Fès, Meknès, Oujda, Agadir, Safi',
    category: 'Formation Professionnelle',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech', 'Eco', 'Lettres'],
    thresholds: { SM: 10.0, PC: 11.5, SVT: 12.0, Tech: 11.0, Eco: 11.5, Lettres: 12.0 }
  },

  // --- UNIVERSITÉS PRIVÉES / INTERNATIONALES ---
  {
    id: 'um6p',
    name: 'UM6P (Université Mohammed VI Polytechnique - FGSES)',
    city: 'Benguerir, Rabat',
    category: 'Universités Privées',
    acceptedBacs: ['SM', 'PC', 'Tech', 'SVT', 'Eco', 'Lettres'],
    thresholds: { SM: 13.0, PC: 14.0, Tech: 13.5, SVT: 14.5, Eco: 13.5, Lettres: 13.5 }
  },
  {
    id: 'uir',
    name: 'UIR (Université Internationale de Rabat)',
    city: 'Rabat',
    category: 'Universités Privées',
    acceptedBacs: ['SM', 'PC', 'Tech', 'SVT', 'Eco', 'Lettres'],
    thresholds: { SM: 11.5, PC: 12.0, Tech: 12.0, SVT: 12.5, Eco: 12.0, Lettres: 11.5 }
  },
  {
    id: 'alakhawayn',
    name: 'Al Akhawayn University',
    city: 'Ifrane',
    category: 'Universités Privées',
    acceptedBacs: ['SM', 'PC', 'Tech', 'SVT', 'Eco', 'Lettres'],
    thresholds: { SM: 11.0, PC: 12.0, Tech: 12.0, SVT: 12.5, Eco: 12.0, Lettres: 11.5 }
  },
  {
    id: 'mundiapolis',
    name: 'Université Mundiapolis',
    city: 'Casablanca',
    category: 'Universités Privées',
    acceptedBacs: ['SM', 'PC', 'Tech', 'SVT', 'Eco', 'Lettres'],
    thresholds: { SM: 10.0, PC: 10.0, Tech: 10.0, SVT: 10.0, Eco: 10.0, Lettres: 10.0 }
  },
  {
    id: 'uiass',
    name: 'UIASS (Université Internationale Abulcasis des Sciences de la Santé)',
    city: 'Rabat',
    category: 'Universités Privées',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech'],
    thresholds: { SM: 10.5, PC: 10.5, SVT: 10.5, Tech: 10.5, Eco: 99, Lettres: 99 }
  },

  // --- SPECIAL CONCOURS SCHOOL ---
  {
    id: 'amdis',
    name: 'AMDIS (École de Préparation Spécifique aux Concours Grandes Écoles)',
    city: 'Casablanca, Rabat',
    category: 'Spécial Concours',
    acceptedBacs: ['SM', 'PC', 'SVT', 'Tech', 'Eco', 'Lettres'],
    thresholds: { SM: 10.0, PC: 10.0, SVT: 10.0, Tech: 10.0, Eco: 10.0, Lettres: 10.0 }
  },

  // --- NEW SPECIFIC SCHOOLS FOR BAC LETTRES & HUMANITIES ---
  {
    id: 'flsh',
    name: 'FLSH (Faculté des Lettres et des Sciences Humaines)',
    city: 'Rabat, Casablanca, Fès, Marrakech, Oujda, Meknès, El Jadida, Kenitra',
    category: 'Formation / Enseignement',
    acceptedBacs: ['Lettres', 'Eco', 'SM', 'PC', 'SVT'],
    thresholds: { SM: 10.0, PC: 10.0, SVT: 10.0, Eco: 10.0, Tech: 99, Lettres: 10.0 }
  },
  {
    id: 'isic',
    name: 'ISIC (Institut Supérieur de l’Information et de la Communication - Journalisme)',
    city: 'Rabat',
    category: 'Administration',
    acceptedBacs: ['Lettres', 'Eco', 'SM', 'PC', 'SVT', 'Tech'],
    thresholds: { SM: 13.0, PC: 13.0, SVT: 13.0, Eco: 13.0, Tech: 13.0, Lettres: 13.0 }
  },
  {
    id: 'isitt',
    name: 'ISITT (Institut Supérieur International du Tourisme de Tanger)',
    city: 'Tanger',
    category: 'Commerce / Gestion',
    acceptedBacs: ['Lettres', 'Eco', 'SM', 'PC', 'SVT', 'Tech'],
    thresholds: { SM: 11.0, PC: 11.0, SVT: 11.0, Eco: 11.0, Tech: 11.0, Lettres: 12.0 }
  },
  {
    id: 'fahd_traduction',
    name: 'École Supérieure Roi Fahd de Traduction (Traduction & Interprétariat)',
    city: 'Tanger',
    category: 'Formation / Enseignement',
    acceptedBacs: ['Lettres', 'Eco', 'SM', 'PC', 'SVT'],
    thresholds: { SM: 12.5, PC: 12.5, SVT: 12.5, Eco: 12.5, Tech: 99, Lettres: 13.0 }
  },
  {
    id: 'fse',
    name: 'FSE (Faculté des Sciences de l’Éducation)',
    city: 'Rabat',
    category: 'Formation / Enseignement',
    acceptedBacs: ['Lettres', 'Eco', 'SM', 'PC', 'SVT'],
    thresholds: { SM: 12.0, PC: 12.0, SVT: 12.0, Eco: 12.0, Tech: 99, Lettres: 12.5 }
  }
];
