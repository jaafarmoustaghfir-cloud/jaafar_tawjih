export interface FiliereDetailData {
  id: string;
  title: string;
  category: string;
  presentation: string;
  coreSubjects: string[];
  acquiredSkills: string[];
  requiredProfile: string;
  durationAndDiplomas: string;
  moroccanSchools: string[];
  careerOutcomes: string[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const FILIERES_DETAILS: FiliereDetailData[] = [
  {
    id: 'genie-informatique',
    title: 'Génie Informatique, Logiciel & Intelligence Artificielle',
    category: 'Ingénierie & Numérique',
    presentation:
      'Le Génie Informatique forme des ingénieurs et spécialistes capables de concevoir, développer, déployer et sécuriser des systèmes logiciels et des architectures cloud complexes. Portée par la transition numérique nationale et l’écosystème offshore marocain (Casaneashores, Technopolis Rabat), cette filière offre l’un des plus forts taux d’employabilité du Royaume.',
    coreSubjects: [
      'Algorithmique avancée et structures de données',
      'Développement logiciel Full-Stack (Java, Python, C++, TypeScript)',
      'Bases de données relationnelles et NoSQL (PostgreSQL, MongoDB)',
      'Intelligence Artificielle, Machine Learning et Big Data',
      'Architecture Cloud et DevOps (Docker, Kubernetes, AWS/Azure)',
      'Cybersécurité, cryptographie et sécurité des réseaux',
    ],
    acquiredSkills: [
      'Conception d’architectures logicielles scalables et robustes',
      'Entraînement et intégration de modèles d’apprentissage automatique',
      'Audit de sécurité des systèmes informatiques et tests d’intrusion',
      'Gestion de projets agiles (Scrum, Kanban) en environnement international',
    ],
    requiredProfile:
      'Adapté aux étudiants rigoureux dotés d’un esprit d’analyse aiguisé, d’une curiosité pour la technologie, d’une passion pour la résolution de problèmes abstraits et d’une bonne maîtrise de l’anglais technique.',
    durationAndDiplomas:
      'Cycle Ingénieur d’État en 5 ans (ou 3 ans après Bac+2/CPGE), ou Licence/Master universitaire en 3 à 5 ans, ou DUT Informatique en 2 ans.',
    moroccanSchools: [
      'ENSA (Tanger, Agadir, Marrakech, Oujda, Fès, Kénitra, etc.)',
      'ENSIAS Rabat',
      'INPT Rabat',
      'FST (Mohammedia, Settat, Fès, Marrakech)',
      'EST (DUT Informatique dans plusieurs villes)',
    ],
    careerOutcomes: [
      'Ingénieur d’études et développement Full-Stack',
      'Architecte Cloud & Ingénieur DevOps',
      'Data Scientist & Ingénieur IA',
      'Consultant en cybersécurité et gouvernance IT',
      'Chef de projet technique digital',
    ],
    faq: [
      {
        question: 'Faut-il avoir fait du codage au lycée pour réussir ?',
        answer:
          'Non. Les programmes en première année reprennent les concepts de programmation et d’algorithmique dès les fondements. Une bonne aisance en logique et en mathématiques suffit amplement.',
      },
    ],
  },

  {
    id: 'genie-civil',
    title: 'Génie Civil, Bâtiment & Travaux Publics (BTP)',
    category: 'Ingénierie & BTP',
    presentation:
      'Filière maîtresse de l’aménagement du territoire et de la construction, le Génie Civil prépare les ingénieurs qui conçoivent, calculent et pilotent les grands chantiers du Royaume : lignes à grande vitesse (LGV), ports majeurs (Tanger Med, Dakhla Atlantique), barrages hydrauliques, autoroutes, tours et stades.',
    coreSubjects: [
      'Résistance des matériaux (RDM) et mécanique des milieux continus',
      'Calcul des structures en béton armé et béton précontraint',
      'Mécanique des sols, géotechnique et fondations spéciales',
      'Hydraulique urbaine, assainissement et barrages',
      'Topographie, géodésie et modélisation BIM (Building Information Modeling)',
      'Management de chantier, droit de la construction et marchés publics',
    ],
    acquiredSkills: [
      'Dimensionnement réglementaire des ouvrages d’art et bâtiments',
      'Supervision technique et financière des chantiers de construction',
      'Expertise géotechnique des sols et stabilité des pentes',
      'Coordination de la sécurité et du contrôle qualité sur site',
    ],
    requiredProfile:
      'Idéal pour les étudiants qui apprécient le concret, les sciences physiques appliquées, le travail sur le terrain et la gestion d’équipes pluridisciplinaires.',
    durationAndDiplomas:
      'Diplôme d’Ingénieur d’État en 5 ans (ou 3 ans post-CPGE), ou DUT Génie Civil en 2 ans.',
    moroccanSchools: [
      'EHTP Casablanca (École Hassania des Travaux Publics)',
      'Mines Rabat (ENSMR)',
      'ENSA (Tanger, Agadir, Oujda, Fès, Tetouan, Safi)',
      'EST (Fès, Salé, Agadir)',
    ],
    careerOutcomes: [
      'Ingénieur structure en bureau d’études techniques',
      'Conducteur de travaux et directeur de projet BTP',
      'Ingénieur géotechnicien et contrôle qualité des matériaux',
      'Ingénieur d’État au Ministère de l’Équipement et de l’Eau ou à l’ONCF/ADM',
    ],
    faq: [
      {
        question: 'Le secteur du génie civil recrute-t-il activement au Maroc ?',
        answer:
          'Oui, le Maroc connaît une dynamique d’infrastructures exceptionnelle liée aux grands projets d’État, aux lignes ferroviaires LGV, aux usines de dessalement et à l’accueil de la Coupe du Monde 2030.',
      },
    ],
  },

  {
    id: 'gestion-finance',
    title: 'Finance, Audit, Comptabilité & Contrôle de Gestion',
    category: 'Commerce & Management',
    presentation:
      'Cette filière forme les stratèges financiers et les analystes indispensables à la gouvernance saine des entreprises, banques et institutions financières. Elle allie rigueur comptable, conformité fiscale et vision stratégique des investissements dans un contexte de conformité aux normes internationales IFRS.',
    coreSubjects: [
      'Comptabilité générale approfondie et comptabilité des sociétés',
      'Audit financier légal et contractuel',
      'Contrôle de gestion et pilotage de la performance',
      'Analyse financière et diagnostic d’entreprise',
      'Fiscalité marocaine des entreprises et droit des affaires',
      'Finance de marché, produits dérivés et gestion de portefeuille',
    ],
    acquiredSkills: [
      'Élaboration et contrôle des états financiers de synthèse',
      'Conduite de missions d’audit interne et externe',
      'Construction de budgets prévisionnels et tableaux de bord de gestion',
      'Évaluation financière des entreprises et structuration de financements',
    ],
    requiredProfile:
      'Destiné aux bacheliers ayant un goût prononcé pour les chiffres, une grande rigueur méthodologique, un esprit critique aiguisé et un sens éthique irréprochable.',
    durationAndDiplomas:
      'Diplôme des ENCG (Grade Master en 5 ans), Diplôme de l’ISCAE (Grade Master), ou Licence/Master universitaire FSJES.',
    moroccanSchools: [
      'ENCG (Settat, Casablanca, Tanger, Marrakech, Agadir, etc.)',
      'ISCAE Casablanca et Rabat',
      'Facultés FSJES (Toutes universités publiques)',
    ],
    careerOutcomes: [
      'Auditeur financier en cabinet international (Big 4)',
      'Contrôleur de gestion industriel ou commercial',
      'Directeur Administratif et Financier (DAF)',
      'Analyste crédit bancaire et chargé d’affaires corporate',
      'Expert-comptable stagiaire',
    ],
    faq: [
      {
        question: 'Le diplôme de l’ENCG permet-il de préparer le diplôme national d’expertise comptable ?',
        answer:
          'Oui, les diplômés des filières Gestion Financière et Comptable ou Audit de l’ENCG bénéficient de dispenses officielles sur plusieurs certificats du cycle préparatoire de l’Ordre des Experts-Comptables du Maroc.',
      },
    ],
  },

  {
    id: 'medecine-sante',
    title: 'Médecine Générale & Sciences Biomédicales',
    category: 'Santé & Médical',
    presentation:
      'La formation en médecine générale forme des praticiens compétents dévoués à la prévention, au diagnostic et au traitement des pathologies humaines. Le cursus exigeant articule cours fondamentaux, stages hospitaliers précoces, gardes médicales et travaux d’internat.',
    coreSubjects: [
      'Anatomie humaine descriptive et topographique',
      'Physiologie générale et des grands appareils',
      'Pharmacologie fondamentale et clinique',
      'Sémiologie médicale et chirurgicale',
      'Pathologies infectieuses, cardiovasculaires, pulmonaires et pédiatriques',
      'Urgences médicales, anesthésie-réanimation et santé publique',
    ],
    acquiredSkills: [
      'Examen clinique complet et raisonnement diagnostique médical',
      'Prescription rationnelle des thérapeutiques adaptées',
      'Gestes techniques d’urgence et réanimation de base',
      'Communication empathique avec le patient et sa famille',
    ],
    requiredProfile:
      'Vocation humaniste indéniable, endurance émotionnelle et physique, mémoire de travail solide, dévouement au service des autres et rigueur scientifique sans faille.',
    durationAndDiplomas:
      '6 années d’études médicales couronnées par le Diplôme d’État de Docteur en Médecine, suivi éventuellement du Résidanat de spécialité (4 à 5 ans).',
    moroccanSchools: [
      'Facultés publiques de Médecine et de Pharmacie (Rabat, Casablanca, Marrakech, Fès, Oujda, Agadir, Tanger, Laâyoune, Beni Mellal, Guelmim)',
      'Facultés privées ou semi-publiques sous tutelle (UM6SS, UIASS)',
    ],
    careerOutcomes: [
      'Médecin généraliste en centre hospitalier public ou privé',
      'Médecin praticien en cabinet médical libéral',
      'Médecin urgentiste ou médecin du travail en entreprise',
      'Médecin spécialiste après réussite au concours du résidanat',
    ],
    faq: [
      {
        question: 'Comment s’organisent les années d’études après la réforme des 6 ans ?',
        answer:
          'Les 3 premières années sont consacrées aux sciences fondamentales et à la sémiologie avec stages d’initiation. Les 4ème et 5ème années associent cours pathologiques et externat hospitalier. La 6ème année est une immersion clinique complète préparant à la thèse d’exercice.',
      },
    ],
  },
];
