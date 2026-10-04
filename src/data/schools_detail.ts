export interface SchoolDetailData {
  id: string;
  name: string;
  shortName: string;
  category: string;
  institutionType: string;
  cities: string[];
  accessLevel: string;
  acceptedBacs: string[];
  duration: string;
  diploma: string;
  presentation: string;
  accessConditions: string;
  candidatureProcedure: string;
  concoursDetails: string;
  filieres: string[];
  furtherStudies: string;
  careerOutcomes: string[];
  importantNotes: string;
  officialSource: {
    label: string;
    url: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

export const SCHOOLS_DETAILS: Record<string, SchoolDetailData> = {
  ensa: {
    id: 'ensa',
    name: 'ENSA — Écoles Nationales des Sciences Appliquées',
    shortName: 'ENSA',
    category: 'Ingénierie / Sciences',
    institutionType: 'Réseau public des grandes écoles d’ingénieurs universitaires',
    cities: [
      'Tanger',
      'Agadir',
      'Marrakech',
      'Oujda',
      'Kénitra',
      'Safi',
      'Fès',
      'El Jadida',
      'Al Hoceima',
      'Tetouan',
      'Berrechid',
      'Beni Mellal',
    ],
    accessLevel: 'Post-Bac (Baccalauréat scientifique ou technique)',
    acceptedBacs: ['Sciences Mathématiques (SM)', 'Sciences Physiques (PC)', 'SVT', 'Sciences et Technologies (STE/STM)'],
    duration: '5 ans (2 ans de Cycle Préparatoire Intégré + 3 ans de Cycle Ingénieur)',
    diploma: 'Diplôme d’Ingénieur d’État (Reconnu par l’État et accrédité)',
    presentation:
      'Créé à la fin des années 1990, le réseau des ENSA constitue le plus grand réseau public de formation d’ingénieurs d’État au Maroc. Rattachées aux universités publiques, les ENSA répondent aux besoins croissants de l’industrie nationale en cadres techniques polyvalents et opérationnels dans les métiers du digital, de l’industrie 4.0, de l’énergie et des infrastructures.',
    accessConditions:
      'La sélection s’effectue en deux phases : d’abord une présélection sur la base de la moyenne pondérée du Baccalauréat (75% Examen National + 25% Examen Régional), suivie d’un concours écrit commun.',
    candidatureProcedure:
      'La candidature s’effectue exclusivement en ligne sur la plateforme nationale unifiée (généralement tawjihi.ma ou le portail concours ENSA dédié mis en place par le Ministère de l’Enseignement Supérieur). Le candidat ordonne ses vœux d’écoles par ordre de préférence géographique et thématique.',
    concoursDetails:
      'Le concours commun comporte des épreuves écrites sous forme de QCM portant sur deux disciplines fondamentales : Mathématiques (algèbre, analyse, géométrie) et Physique (mécanique, électricité, ondes). Une gestion rigoureuse du temps imparti est essentielle.',
    filieres: [
      'Génie Informatique & Systèmes d’Information',
      'Génie Logiciel & Intelligence Artificielle',
      'Génie Électrique & Télécommunications',
      'Génie Industriel & Logistique',
      'Génie Civil & Bâtiment',
      'Génie Mécatronique & Robotique',
      'Cybersécurité & Réseaux',
      'Génie des Systèmes Embarqués',
      'Énergie Renouvelable & Efficacité Énergétique',
    ],
    furtherStudies:
      'Les lauréats peuvent intégrer directement le marché de l’emploi ou poursuivre un Doctorat en sciences de l’ingénieur au sein des centres d’études doctorales (CEDoc), ou préparer un Master spécialisé / MBA technologique en double diplomation.',
    careerOutcomes: [
      'Ingénieur d’études et de développement informatique',
      'Chef de projet BTP et infrastructures',
      'Ingénieur production et supply chain dans l’industrie automobile / aéronautique',
      'Consultant en transformation numérique et cybersécurité',
      'Ingénieur automatisation et systèmes embarqués',
    ],
    importantNotes:
      'Le seuil de présélection varie chaque année selon la moyenne générale des bacheliers. Les candidats de la filière Sciences Mathématiques bénéficient généralement d’un seuil de présélection inférieur à celui des filières PC et SVT en raison de la pondération académique.',
    officialSource: {
      label: 'Portail National des Concours (Ministère ensup.gov.ma)',
      url: 'https://www.ensup.gov.ma',
    },
    faq: [
      {
        question: 'Peut-on changer d’ENSA après les deux années préparatoires ?',
        answer:
          'Oui, la mobilité inter-ENSA est envisageable à l’issue de la 2ème année préparatoire en fonction du classement national de l’étudiant, des places disponibles et de la filière d’ingénieur demandée.',
      },
      {
        question: 'Le concours comporte-t-il une épreuve orale ?',
        answer:
          'Non, l’accès post-bac aux ENSA se fait sur la base du concours écrit commun. Aucun entretien oral n’est actuellement prévu pour la 1ère année.',
      },
    ],
  },

  ensam: {
    id: 'ensam',
    name: 'ENSAM — Écoles Nationales Supérieures d’Arts et Métiers',
    shortName: 'ENSAM',
    category: 'Ingénierie / Sciences',
    institutionType: 'Grande école d’ingénieurs publique à vocation technologique et industrielle',
    cities: ['Meknès', 'Casablanca', 'Rabat'],
    accessLevel: 'Post-Bac (Bac scientifique ou technique)',
    acceptedBacs: ['Sciences Mathématiques (SM)', 'Sciences Physiques (PC)', 'Sciences et Technologies (STE/STM)', 'SVT'],
    duration: '5 ans (2 ans prépas intégrées + 3 ans cycle ingénieur)',
    diploma: 'Diplôme d’Ingénieur d’État en Génie Industriel / Mécanique / Électrique',
    presentation:
      'L’ENSAM forme des ingénieurs généralistes et spécialistes à forte culture industrielle, capables de concevoir, modéliser, fabriquer et superviser des systèmes industriels complexes. Fondée sur le modèle historique des Arts et Métiers, elle jouit d’une réputation prestigieuse auprès des grands donneurs d’ordre industriels au Maroc.',
    accessConditions:
      'Présélection sur dossier basée sur le barème 75% National + 25% Régional, suivie d’un concours écrit rigoureux axé sur les sciences exactes et industrielles.',
    candidatureProcedure:
      'Pré-inscription obligatoire en ligne sur la plateforme officielle (ensam-concours ou portail ministériel unifié) avant la date limite fixée par la circulaire ministérielle annuelle.',
    concoursDetails:
      'Le concours écrit se compose d’épreuves de Mathématiques et de Physique-Chimie / Sciences de l’ingénieur sous forme de questions à choix multiples (QCM) portant sur le programme du baccalauréat marocain.',
    filieres: [
      'Génie Mécanique & Systèmes de Production',
      'Génie Industriel & Productique',
      'Génie Électromécanique',
      'Génie des Matériaux & Procédés',
      'Intelligence Artificielle & Big Data pour l’Industrie',
      'Génie Énergétique & Environnement',
    ],
    furtherStudies:
      'Possibilité de préparer un Doctorat en génie mécanique/industriel ou de poursuivre des masters d’excellence en partenariat avec des universités européennes et américaines.',
    careerOutcomes: [
      'Ingénieur de conception mécanique dans les usines automobiles (Renault, Stellantis)',
      'Ingénieur méthodes et maintenance aéronautique (zone franche Nouaceur)',
      'Responsable de ligne de production et lean manufacturing',
      'Chef de projet énergies renouvelables et transition industrielle',
    ],
    importantNotes:
      'L’ENSAM accorde une part importante aux travaux pratiques, aux ateliers d’usinage, à la fonderie, au soudage et à la modélisation CAO/FAO dès les deux premières années.',
    officialSource: {
      label: 'Site Officiel ENSAM Meknès & Casablanca',
      url: 'https://www.ensam-um5.ac.ma',
    },
    faq: [
      {
        question: 'Quelle est la différence fondamentale entre ENSA et ENSAM ?',
        answer:
          'L’ENSAM met un accent très fort sur le génie mécanique, électromécanique, les procédés industriels et la fabrication assistée par ordinateur, tandis que l’ENSA offre un spectre plus diversifié incluant une forte proportion de génie informatique, réseaux et génie civil.',
      },
    ],
  },

  encg: {
    id: 'encg',
    name: 'ENCG — Écoles Nationales de Commerce et de Gestion',
    shortName: 'ENCG',
    category: 'Commerce / Gestion',
    institutionType: 'Réseau public des grandes écoles de commerce et de management',
    cities: [
      'Settat',
      'Casablanca',
      'Tanger',
      'Marrakech',
      'Agadir',
      'Oujda',
      'Kénitra',
      'El Jadida',
      'Fès',
      'Dakhla',
      'Beni Mellal',
      'Meknès',
    ],
    accessLevel: 'Post-Bac (Toutes filières du Baccalauréat)',
    acceptedBacs: ['Sciences Économiques & Gestion (Eco)', 'Sciences Mathématiques (SM)', 'Sciences Physiques (PC)', 'SVT', 'Lettres & Sciences Humaines'],
    duration: '5 ans (Tronc commun en gestion + spécialisation Master)',
    diploma: 'Diplôme des Écoles Nationales de Commerce et de Gestion (Grade Master)',
    presentation:
      'Créé au début des années 1990 avec l’ENCG Settat comme école pionnière, le réseau ENCG forme les cadres dirigeants, analystes financiers, auditeurs et managers des entreprises marocaines et multinationales. Il allie formation théorique rigoureuse, bilinguisme (français-anglais) et stages pratiques obligatoires.',
    accessConditions:
      'Présélection sur la note du baccalauréat (75% national + 25% régional) avec des seuils différenciés par série de bac (seuil spécifique pour les bacheliers Eco et SM), suivie du concours écrit TAFEM.',
    candidatureProcedure:
      'Pré-inscription sur le portail national tafem.ma (géré par le réseau des ENCG). Une seule candidature permet de postuler à l’ensemble des ENCG du Royaume.',
    concoursDetails:
      'Le concours TAFEM (Test d’Aptitude à la Formation En Management) comprend 4 sous-tests sous format QCM : Mémorisation et attention, Résolution de problèmes mathématiques et logiques, Culture générale et actualité, Maîtrise des langues (Français et Anglais).',
    filieres: [
      'Filière Commerce : Marketing & Action Commerciale',
      'Filière Commerce : Commerce International & Supply Chain',
      'Filière Commerce : Publicité & Communication',
      'Filière Gestion : Audit & Contrôle de Gestion',
      'Filière Gestion : Gestion Financière & Comptable (GFC)',
      'Filière Gestion : Management des Ressources Humaines (MRH)',
    ],
    furtherStudies:
      'Préparation de diplômes d’expertise comptable (DCG, DSCG, cycle expert-comptable national), Masters de recherche et Doctorat en Sciences Économiques et de Gestion.',
    careerOutcomes: [
      'Auditeur financier en cabinet (Big Four : PwC, EY, KPMG, Deloitte)',
      'Contrôleur de gestion en multinationale',
      'Directeur financier ou trésorier d’entreprise',
      'Chef de produit marketing et responsable brand management',
      'Responsable achats et commerce international',
    ],
    importantNotes:
      'Le choix de la spécialisation (Commerce ou Gestion) intervient généralement à la fin du 6ème semestre (3ème année) selon le classement académique de l’étudiant.',
    officialSource: {
      label: 'Portail Officiel TAFEM ENCG',
      url: 'https://tafem.ma',
    },
    faq: [
      {
        question: 'Un bachelier de la filière Sciences Physiques peut-il réussir le TAFEM ?',
        answer:
          'Absolument. Une proportion importante des admis au TAFEM provient des filières scientifiques (SM, PC, SVT) grâce à leurs compétences solides en raisonnement logique et calcul mathématique.',
      },
    ],
  },

  fmp: {
    id: 'fmp',
    name: 'FMP & FMD — Facultés de Médecine, Pharmacie et Médecine Dentaire',
    shortName: 'Médecine & Pharmacie',
    category: 'Santé / Paramédical',
    institutionType: 'Facultés publiques des sciences de la santé',
    cities: ['Rabat', 'Casablanca', 'Marrakech', 'Fès', 'Oujda', 'Agadir', 'Tanger', 'Laâyoune', 'Guelmim', 'Beni Mellal'],
    accessLevel: 'Post-Bac (Séries scientifiques exclusivement)',
    acceptedBacs: ['Sciences Mathématiques (SM)', 'Sciences Physiques (PC)', 'SVT'],
    duration: '6 ans (Médecine Générale), 6 ans (Pharmacie), 6 ans (Médecine Dentaire)',
    diploma: 'Diplôme de Docteur en Médecine / Docteur en Pharmacie / Docteur en Médecine Dentaire',
    presentation:
      'Les Facultés de Médecine et de Pharmacie et les Facultés de Médecine Dentaire assurent la formation des médecins, pharmaciens et dentistes du Royaume. La formation associe enseignements académiques biomédicaux, stages cliniques hospitaliers dès la 3ème année et internat en milieu hospitalo-universitaire (CHU).',
    accessConditions:
      'Présélection sur la note du baccalauréat (75% National + 25% Régional) fixée annuellement (le seuil de présélection unifié a été fixé autour de 12.00/20 ces dernières années pour élargir l’accès au concours).',
    candidatureProcedure:
      'Inscription en ligne obligatoire sur la plateforme ministérielle officielle (cursom.ma ou portail concours médecine). Le candidat choisit sa filière d’intérêt : Médecine, Pharmacie ou Médecine Dentaire.',
    concoursDetails:
      'Le concours commun d’accès comporte 4 épreuves sous forme de QCM d’une durée de 45 minutes chacune : Sciences de la Vie et de la Terre (SVT), Physique, Chimie, et Mathématiques. Des pénalités pour mauvaises réponses peuvent être appliquées selon la notice officielle.',
    filieres: [
      'Médecine Générale (6 années d’études)',
      'Pharmacie d’officine et hospitalière (6 années d’études)',
      'Médecine Dentaire & Odontologie (6 années d’études)',
      'Spécialités Médicales & Chirurgicales (Résidanat de 4 à 5 ans après le doctorat)',
    ],
    furtherStudies:
      'Après l’obtention du Doctorat d’État, les médecins peuvent passer le concours du Résidanat pour se spécialiser (Cardiologie, Pédiatrie, Radiologie, Chirurgie, Anesthésie-Réanimation, etc.).',
    careerOutcomes: [
      'Médecin généraliste en secteur public (hôpitaux et centres de santé) ou en cabinet privé',
      'Médecin spécialiste hospitalier ou libéral',
      'Pharmacien d’officine, biologiste médical ou pharmacien industriel',
      'Chirurgien-dentiste en cabinet ou en centre de soins dentaires',
    ],
    importantNotes:
      'La réforme des études médicales a ramené la durée des études de médecine générale à 6 ans avec un renforcement immersif des stages cliniques en 6ème année.',
    officialSource: {
      label: 'Portail National des Concours de Médecine (cursom.ma)',
      url: 'https://cursom.ma',
    },
    faq: [
      {
        question: 'Le concours de médecine est-il commun à toutes les villes ?',
        answer:
          'Oui, le concours d’accès aux facultés de médecine, de pharmacie et de médecine dentaire est un concours national unifié avec les mêmes épreuves et la même grille de correction sur l’ensemble du territoire.',
      },
    ],
  },

  est: {
    id: 'est',
    name: 'EST — Écoles Supérieures de Technologie',
    shortName: 'EST',
    category: 'Ingénierie / Sciences',
    institutionType: 'Instituts universitaires publics d’enseignement technologique court',
    cities: ['Casablanca', 'Rabat-Salé', 'Fès', 'Agadir', 'Meknès', 'Oujda', 'El Jadida', 'Safi', 'Essaouira', 'Guelmim', 'Beni Mellal', 'Kénitra'],
    accessLevel: 'Post-Bac (Séries scientifiques, techniques et économiques)',
    acceptedBacs: ['Sciences Mathématiques', 'Sciences Physiques', 'SVT', 'Sciences et Technologies', 'Sciences Économiques'],
    duration: '2 ans (4 semestres académiques et professionnels)',
    diploma: 'DUT — Diplôme Universitaire de Technologie',
    presentation:
      'Rattachées aux universités publiques, les Écoles Supérieures de Technologie dispensent une formation professionnelle et appliquée de haut niveau en deux ans. L’enseignement combine cours magistraux, travaux pratiques en laboratoires équipés et deux stages obligatoires en entreprise (stage d’initiation et projet de fin d’études).',
    accessConditions:
      'Admission sur dossier basée sur la moyenne pondérée du Baccalauréat (75% National + 25% Régional) avec application de coefficients multiplicateurs selon la filière du bac et la spécialité demandée. Aucun concours écrit.',
    candidatureProcedure:
      'La candidature s’effectue en ligne via la plateforme nationale tawjihi.ma en ordonnant les filières et les villes selon ses priorités.',
    concoursDetails:
      'Sélection exclusivement sur titre (dossier académique du baccalauréat). Aucun concours écrit ni oral.',
    filieres: [
      'Génie Informatique & Développement Web',
      'Génie Électrique & Informatique Industrielle (GEII)',
      'Génie Mécanique & Productique (GMP)',
      'Génie Civil & Construction Durable',
      'Techniques de Management & Gestion des Entreprises',
      'Finance, Comptabilité & Fiscalité',
      'Gestion Logistique & Transport (GLT)',
      'Maintenance Industrielle',
    ],
    furtherStudies:
      'Les diplômés majeurs de promotion accèdent sur concours passerelle aux grandes écoles d’ingénieurs (ENSA, ENSAM, ENSIAS, EHTP) ou de commerce (ENCG, ISCAE), ou poursuivent en Licence Professionnelle (LP) puis Master.',
    careerOutcomes: [
      'Technicien supérieur spécialisé en informatique et réseaux',
      'Conducteur de travaux et métreur BTP',
      'Technicien de maintenance industrielle automatisée',
      'Assistant de gestion administrative et comptable',
      'Agent d’exploitation logistique et transport',
    ],
    importantNotes:
      'Le DUT de l’EST offre un excellent équilibre entre insertion professionnelle rapide après Bac+2 et possibilité de poursuite d’études universitaires ou en cycle d’ingénieur pour les étudiants bien classés.',
    officialSource: {
      label: 'Plateforme Nationale Tawjihi',
      url: 'https://www.tawjihi.ma',
    },
    faq: [
      {
        question: 'Peut-on intégrer une école d’ingénieurs après un DUT à l’EST ?',
        answer:
          'Oui, les lauréats de l’EST classés parmi les premiers de leur promotion peuvent se présenter aux concours nationaux de passerelle pour intégrer la 3ème année (1ère année du cycle ingénieur) des ENSA, ENSAM, etc.',
      },
    ],
  },

  fst: {
    id: 'fst',
    name: 'FST — Facultés des Sciences et Techniques',
    shortName: 'FST',
    category: 'Ingénierie / Sciences',
    institutionType: 'Facultés d’enseignement scientifique et technique à accès régulé (système LMD)',
    cities: ['Fès', 'Marrakech', 'Tanger', 'Mohammedia', 'Settat', 'Errachidia', 'Al Hoceima', 'Beni Mellal'],
    accessLevel: 'Post-Bac (Séries scientifiques et techniques)',
    acceptedBacs: ['Sciences Mathématiques', 'Sciences Physiques', 'SVT', 'Sciences et Technologies'],
    duration: '3 ans (DEUST en 2 ans + Licence Sciences et Techniques LST), avec Masters et cycles d’ingénieurs intégrés',
    diploma: 'DEUST (Bac+2), Licence Sciences et Techniques (Bac+3), Master (Bac+5), Ingénieur d’État (Bac+5)',
    presentation:
      'Les Facultés des Sciences et Techniques (FST) ont été créées pour combler le fossé entre les facultés traditionnelles et les grandes écoles d’ingénieurs. Elles proposent des cursus universitaires professionalisants à accès régulé dans le cadre du système LMD adapté aux sciences appliquées.',
    accessConditions:
      'Sélection sur dossier académique calculé selon les notes du baccalauréat (National 75% + Régional 25%) avec une formule de pondération favorisant les matières scientifiques (Maths, Physique, SVT).',
    candidatureProcedure:
      'Candidature en ligne via la plateforme nationale tawjihi.ma. Le candidat choisit le tronc commun initial (généralement MIPC : Mathématiques, Informatique, Physique, Chimie ou BCG : Biologie, Chimie, Géologie ou GE-GM : Génie Électrique, Génie Mécanique).',
    concoursDetails:
      'Sélection sur dossier de présélection sans épreuve écrite pour l’entrée en 1ère année post-bac.',
    filieres: [
      'Tronc commun MIPC (Maths, Informatique, Physique, Chimie)',
      'Tronc commun BCG (Biologie, Chimie, Géologie)',
      'Tronc commun GE-GM (Génie Électrique & Génie Mécanique)',
      'Licence LST Génie Logiciel & Réseaux',
      'Licence LST Biotechnologies & Analyse Médicale',
      'Licence LST Ingénierie Chimique & Procédés',
      'Cycle d’Ingénieur d’État (Génie Industriel, Systèmes Embarqués, Matériaux)',
    ],
    furtherStudies:
      'Poursuite d’études en Master Sciences et Techniques (MST), concours passerelles vers les grandes écoles d’ingénieurs (EMI, ENSIAS, ENSA, ENSAM), ou Doctorat dans les laboratoires de recherche accrédités.',
    careerOutcomes: [
      'Spécialiste de la qualité et du contrôle en laboratoire agroalimentaire et pharmaceutique',
      'Développeur d’applications et administrateur systèmes',
      'Chargé d’études environnementales et géologiques',
      'Ingénieur d’études (pour les diplômés du cycle ingénieur FST)',
    ],
    importantNotes:
      'Le rythme de travail en FST est rigoureux avec des contrôles continus réguliers chaque semestre et des travaux pratiques obligatoires dont la validation conditionne l’obtention des modules.',
    officialSource: {
      label: 'Portail National Tawjihi & Universités',
      url: 'https://www.tawjihi.ma',
    },
    faq: [
      {
        question: 'Quelle est la différence entre une Faculté des Sciences classique (FS) et une FST ?',
        answer:
          'La FS est un établissement à accès ouvert sans sélection sur seuil, tandis que la FST est à accès régulé avec sélection préalable sur dossier, encadrement renforcé, travaux pratiques denses et formations à finalité professionnalisante.',
      },
    ],
  },

  cpge: {
    id: 'cpge',
    name: 'CPGE — Classes Préparatoires aux Grandes Écoles',
    shortName: 'CPGE',
    category: 'Ingénierie / Sciences',
    institutionType: 'Filières d’élite d’enseignement supérieur public intensif en 2 ans',
    cities: ['Rabat', 'Casablanca', 'Fès', 'Marrakech', 'Agadir', 'Oujda', 'Meknès', 'Tanger', 'Kénitra', 'Beni Mellal', 'Taza', 'Safi'],
    accessLevel: 'Post-Bac (Élèves bacheliers à très fort potentiel académique)',
    acceptedBacs: ['Sciences Mathématiques (A et B)', 'Sciences Physiques', 'Sciences et Technologies', 'Sciences Économiques (pour ECT)'],
    duration: '2 ans (1ère année Sup + 2ème année Spé)',
    diploma: 'Admissibilité et admission aux Grandes Écoles d’Ingénieurs et de Commerce via le CNC et le CNAEM',
    presentation:
      'Les CPGE constituent la voie royale traditionnelle vers les grandes écoles d’ingénieurs marocaines (EMI, EHTP, ENSIAS, INPT, Mines Rabat, Centrale Casablanca) et étrangères (Polytechnique Paris, Mines-Ponts, CentraleSupélec) ainsi que les écoles de management via le Concours National Commun (CNC).',
    accessConditions:
      'Sélection rigoureuse sur dossier scolaire calculé sur les notes des examens national et régional ainsi que les notes de contrôle continu de la 1ère et 2ème année du baccalauréat dans les matières clés (Maths, Physique, Français, Anglais, Philosophie).',
    candidatureProcedure:
      'Candidature en ligne sur le portail ministériel cpge.ac.ma au cours du 2ème semestre de l’année terminale.',
    concoursDetails:
      'À la fin de la deuxième année, les étudiants passent les épreuves écrites puis orales du Concours National Commun (CNC) pour les filières scientifiques ou du CNAEM pour la filière économique.',
    filieres: [
      'MPSI / MP (Mathématiques, Physique et Sciences de l’Ingénieur)',
      'PCSI / PSI (Physique, Chimie et Sciences de l’Ingénieur)',
      'TSI (Technologie et Sciences Industrielles - réservé aux bacheliers techniques)',
      'ECS / ECT (Économique et Commerciale option Technologique)',
    ],
    furtherStudies:
      'Intégration directe des grandes écoles d’ingénieurs d’État en 3 ans (Bac+5) ou des grandes écoles de commerce (ISCAE, ENCG), ou équivalence en 3ème année de Licence universitaire.',
    careerOutcomes: [
      'Ingénieur d’État dans les corps techniques prestigieux de l’État et les multinationales',
      'Ingénieur financier, trader quantitatif et consultant en stratégie',
      'Haut fonctionnaire technique et directeur de grands projets nationaux',
    ],
    importantNotes:
      'Le cursus des CPGE exige un engagement personnel exceptionnel, une grande endurance intellectuelle et une méthodologie d’apprentissage intensive avec des khôlles hebdomadaires (interrogations orales).',
    officialSource: {
      label: 'Portail National des CPGE Maroc',
      url: 'https://www.cpge.ac.ma',
    },
    faq: [
      {
        question: 'Un étudiant en CPGE qui ne réussit pas le CNC perd-il ses années ?',
        answer:
          'Non. Les étudiants de CPGE bénéficient d’équivalences de crédits universitaires leur permettant d’intégrer directement la 3ème année de Licence en faculté des sciences ou de postuler aux concours passerelles.',
      },
    ],
  },

  ena_archi: {
    id: 'ena_archi',
    name: 'ENA — École Nationale d’Architecture',
    shortName: 'ENA Architecture',
    category: 'Ingénierie / Sciences',
    institutionType: 'Établissement public d’enseignement supérieur en architecture et urbanisme',
    cities: ['Rabat', 'Marrakech', 'Fès', 'Tétouan', 'Agadir', 'Oujda'],
    accessLevel: 'Post-Bac (Séries scientifiques, techniques et économiques)',
    acceptedBacs: ['Sciences Mathématiques', 'Sciences Physiques', 'SVT', 'Sciences et Technologies'],
    duration: '6 ans (12 semestres structurés en 2 cycles)',
    diploma: 'Diplôme d’Architecte délivré par l’État (Obligatoire pour exercer la profession)',
    presentation:
      'L’École Nationale d’Architecture est l’institution publique de référence au Maroc dédiée à la formation des architectes et urbanistes. Elle allie créativité artistique, maîtrise technique des structures et des matériaux, et conscience patrimoniale et environnementale.',
    accessConditions:
      'Présélection sur la moyenne du baccalauréat (75% National + 25% Régional) fixée autour de 14.50 à 15.00/20, suivie d’un concours comprenant des épreuves d’aptitude graphique et d’expression écrite.',
    candidatureProcedure:
      'Pré-inscription sur le portail national concoursena.ma selon le calendrier fixé par le Ministère de l’Aménagement du Territoire National et de l’Urbanisme.',
    concoursDetails:
      'Le concours se compose généralement d’une épreuve écrite de culture générale / analyse de texte et d’une épreuve pratique de dessin et perception de l’espace (perspective, sensibilité aux formes et à la composition visuelle).',
    filieres: [
      'Architecture & Conception spatiale',
      'Urbanisme & Aménagement du territoire',
      'Restauration du patrimoine architectural et médinas',
      'Construction durable et éco-habitat bioclimatique',
    ],
    furtherStudies:
      'Poursuite en Master recherche en urbanisme ou Doctorat en architecture au sein des laboratoires universitaires partenaires.',
    careerOutcomes: [
      'Architecte libéral inscrit à l’Ordre National des Architectes',
      'Architecte conseil au sein d’agences d’urbanisme et ministères',
      'Chef de projets immobiliers et aménagement paysager',
    ],
    importantNotes:
      'L’exercice du métier d’architecte au Maroc est réglementé par la loi et subordonné à l’obtention du diplôme d’État de l’ENA ou d’un diplôme équivalent reconnu.',
    officialSource: {
      label: 'Site Officiel ENA Rabat & Réseau',
      url: 'https://www.archi.ac.ma',
    },
    faq: [
      {
        question: 'Faut-il savoir parfaitement dessiner pour réussir le concours de l’ENA ?',
        answer:
          'Le concours évalue avant tout le sens de l’observation, la compréhension des volumes, la sensibilité spatiale et la créativité plus qu’une virtuosité technique de dessinateur professionnel.',
      },
    ],
  },

  ispits: {
    id: 'ispits',
    name: 'ISPITS — Instituts Supérieurs des Professions Infirmières et Techniques de Santé',
    shortName: 'ISPITS',
    category: 'Santé / Paramédical',
    institutionType: 'Établissements publics sous tutelle du Ministère de la Santé',
    cities: ['Rabat', 'Casablanca', 'Fès', 'Marrakech', 'Oujda', 'Agadir', 'Tanger', 'Tétouan', 'Laâyoune', 'Beni Mellal', 'Errachidia', 'Dakhla'],
    accessLevel: 'Post-Bac (Séries scientifiques prioritairement)',
    acceptedBacs: ['SVT', 'Sciences Physiques', 'Sciences Mathématiques'],
    duration: '3 ans (Cycle Licence Professionnelle du système LMD)',
    diploma: 'Diplôme d’État de Technicien de Santé / Infirmier Polyvalent (Grade Licence)',
    presentation:
      'Placés sous la tutelle directe du Ministère de la Santé et de la Protection Sociale, les ISPITS forment les professionnels paramédicaux indispensables au fonctionnement des hôpitaux, cliniques et centres de santé marocains.',
    accessConditions:
      'Présélection sur la moyenne du baccalauréat (75% National + 25% Régional) avec des seuils propres à chaque filière (souvent entre 11.5 et 13.5 selon la spécialité), suivie d’épreuves écrites et d’un test d’aptitude.',
    candidatureProcedure:
      'Candidature en ligne sur la plateforme ministérielle ispits.sante.gov.ma selon la ville de résidence et le bassin de desserte de chaque institut.',
    concoursDetails:
      'Épreuves écrites portant sur la matière de spécialité (SVT ou Chimie/Physique selon la filière) et une épreuve de langue française / culture générale.',
    filieres: [
      'Infirmier Polyvalent',
      'Infirmier en Anesthésie & Réanimation (IAR)',
      'Infirmier en Soins d’Urgence et Soins Intensifs',
      'Sage-Femme / Maïeutique',
      'Kinésithérapie & Rééducation fonctionnelle',
      'Radiologie & Imagerie Médicale',
      'Laboratoire d’Analyses Biomédicales',
      'Orthophonie & Psychomotricité',
      'Diététique & Nutrition clinique',
    ],
    furtherStudies:
      'Poursuite d’études en Master de santé publique / pédagogie des sciences de la santé et Doctorat.',
    careerOutcomes: [
      'Infirmier en milieu hospitalier public ou privé',
      'Technicien supérieur de radiologie et scanner/IRM',
      'Technicien de laboratoire d’analyses médicales',
      'Kinésithérapeute en cabinet de rééducation ou club sportif',
    ],
    importantNotes:
      'Les diplômés bénéficient d’une insertion professionnelle quasi-immédiate en raison des besoins massifs de recrutement dans le cadre de la généralisation de la couverture médicale obligatoire (AMO) au Maroc.',
    officialSource: {
      label: 'Portail du Ministère de la Santé (ispits.sante.gov.ma)',
      url: 'https://ispits.sante.gov.ma',
    },
    faq: [
      {
        question: 'Le diplôme ISPITS permet-il d’ouvrir son propre cabinet ?',
        answer:
          'Certaines spécialités comme la kinésithérapie, l’orthophonie et les soins infirmiers autorisent l’exercice libéral conformément à la réglementation en vigueur après quelques années d’expérience.',
      },
    ],
  },
};
