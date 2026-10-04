export interface ConcoursDetailData {
  id: string;
  title: string;
  schools: string;
  level: string;
  conditions: string;
  procedure: string;
  documents: string[];
  calendarSteps: {
    step: string;
    description: string;
  }[];
  examFormat: {
    subject: string;
    duration: string;
    questionsCount: string;
    grading: string;
  }[];
  preparationTips: string[];
  practiceQuizKey?: 'ENSA_2024' | 'MEDECINE_2025' | 'MEDECINE_2022' | 'FMP_RABAT_2018';
  officialSource: {
    label: string;
    url: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

export const CONCOURS_DETAILS: ConcoursDetailData[] = [
  {
    id: 'concours-medecine',
    title: 'Concours Commun d’Accès aux Facultés de Médecine, Pharmacie et Médecine Dentaire (FMP/FMD)',
    schools: 'Facultés publiques de Médecine et de Pharmacie de Rabat, Casablanca, Marrakech, Fès, Oujda, Agadir, Tanger, Laâyoune, Beni Mellal, Guelmim et Facultés Dentaires',
    level: 'Bacheliers scientifiques de l’année en cours ou de l’année précédente',
    conditions:
      'Être titulaire d’un Baccalauréat marocain ou équivalent reconnu dans les filières Sciences Mathématiques (A ou B), Sciences Physiques-Chimie (PC) ou Sciences de la Vie et de la Terre (SVT). Présélection nationale unifiée basée sur la formule : 75% Examen National + 25% Examen Régional.',
    procedure:
      'Inscription en ligne obligatoire sur la plateforme officielle (cursom.ma ou portail désigné par le Ministère de l’Enseignement Supérieur). Le candidat choisit l’ordre de ses préférences entre Médecine Générale, Pharmacie et Médecine Dentaire ainsi que l’affectation géographique de rattachement.',
    documents: [
      'Copie de la Carte Nationale d’Identité Électronique (CNIE)',
      'Relevé de notes officiel du Baccalauréat (codes Massar et national)',
      'Attestation du Baccalauréat pour les bacheliers des sessions antérieures autorisées',
      'Récépissé de confirmation de pré-inscription en ligne',
    ],
    calendarSteps: [
      { step: 'Mai - Juin', description: 'Publication de la circulaire ministérielle fixant les modalités et ouverture des pré-inscriptions sur cursom.ma' },
      { step: 'Début Juillet', description: 'Clôture des inscriptions et calcul algorithmique du seuil national de présélection' },
      { step: 'Mi-Juillet', description: 'Affichage des listes des candidats convoqués et téléchargement des convocations individuelles' },
      { step: 'Fin Juillet', description: 'Passation des 4 épreuves écrites QCM simultanément dans tous les centres d’examen du Royaume' },
      { step: 'Fin Juillet / Début Août', description: 'Publication des listes principales et des listes d’attente d’admission' },
    ],
    examFormat: [
      { subject: 'Sciences de la Vie et de la Terre (SVT)', duration: '45 minutes', questionsCount: '15 à 20 questions', grading: '+1 bonne réponse, 0 abstention, -0.25 à -0.5 mauvaise réponse selon consigne' },
      { subject: 'Chimie', duration: '45 minutes', questionsCount: '15 à 20 questions', grading: 'Questions à choix multiples ciblées sur solutions, réactions acido-basiques, cinétique et chimie organique' },
      { subject: 'Physique', duration: '45 minutes', questionsCount: '15 à 20 questions', grading: 'Mécanique, ondes mécaniques, électricité (RLC) et physique nucléaire' },
      { subject: 'Mathématiques', duration: '45 minutes', questionsCount: '15 à 20 questions', grading: 'Analyse (limites, dérivées, intégrales), suites numériques, probabilités et nombres complexes' },
    ],
    preparationTips: [
      'Maîtrisez parfaitement les formules fondamentales de chimie et de physique pour ne pas perdre de temps en dérivation.',
      'Entraînez-vous impérativement en temps chronométré strict : vous ne disposez que d’environ 2 minutes par question.',
      'En présence d’un barème à points négatifs, abstenez-vous de répondre au hasard si vous ne pouvez pas éliminer au moins 2 propositions erronées.',
      'Révisez en priorité les schémas et définitions clés de SVT (génétique humaine, immunologie, respiration et photosynthèse).',
    ],
    practiceQuizKey: 'MEDECINE_2025',
    officialSource: {
      label: 'Plateforme Officielle Cursom Médecine',
      url: 'https://cursom.ma',
    },
    faq: [
      {
        question: 'Le seuil de présélection en médecine change-t-il d’une ville à l’autre ?',
        answer:
          'Non. Depuis l’instauration du concours national commun, le seuil de présélection pour passer l’écrit est unifié au niveau national (autour de 12.00/20 ces dernières années) pour donner une chance équitable à un maximum de bacheliers.',
      },
      {
        question: 'Peut-on utiliser une calculatrice scientifique programmable ?',
        answer:
          'Non, l’usage de la calculatrice est strictement interdit pendant les épreuves du concours de médecine. Tous les calculs doivent être effectués mentalement ou sur les feuilles de brouillon fournies.',
      },
    ],
  },

  {
    id: 'concours-ensa',
    title: 'Concours Commun d’Accès aux Écoles Nationales des Sciences Appliquées (ENSA Maroc)',
    schools: 'Réseau des 12 ENSA : Tanger, Agadir, Marrakech, Oujda, Kénitra, Safi, Fès, El Jadida, Al Hoceima, Tétouan, Berrechid, Beni Mellal',
    level: 'Bacheliers scientifiques et techniques',
    conditions:
      'Baccalauréat en Sciences Mathématiques (A ou B), Sciences Physiques-Chimie (PC), SVT ou Sciences et Technologies (STE/STM). Présélection basée sur la formule : 75% Examen National + 25% Examen Régional.',
    procedure:
      'Pré-candidature sur la plateforme nationale en ligne. Le candidat classe les villes des ENSA selon ses préférences d’affectation.',
    documents: [
      'Code Massar et CNE valide',
      'Carte Nationale d’Identité Électronique',
      'Relevé des notes officielles du baccalauréat',
      'Convocation imprimée téléchargeable après affichage des listes de présélection',
    ],
    calendarSteps: [
      { step: 'Juin', description: 'Ouverture des pré-inscriptions sur la plateforme ministérielle' },
      { step: 'Début Juillet', description: 'Affichage des seuils de présélection et des listes des admissibles à l’écrit' },
      { step: 'Mi-Juillet', description: 'Passation des épreuves écrites dans les centres d’examen régionaux' },
      { step: 'Fin Juillet', description: 'Affichage des résultats d’admission et confirmation d’affectation par phase' },
    ],
    examFormat: [
      { subject: 'Mathématiques', duration: '1h30', questionsCount: '20 questions QCM', grading: 'Analyse, suites, géométrie dans l’espace, probabilités, nombres complexes' },
      { subject: 'Physique', duration: '1h30', questionsCount: '20 questions QCM', grading: 'Mécanique newtonienne, électricité (RL, RC, RLC), ondes et optique' },
    ],
    preparationTips: [
      'Les épreuves de l’ENSA privilégient la rapidité de calcul et la reconnaissance de patterns mathématiques classiques.',
      'Entraînez-vous avec les annales des 5 dernières années (l’épreuve 2024 est entièrement disponible et corrigée sur JAAFAR TAWJIH).',
      'Vérifiez scrupuleusement les consignes de noircissement de la grille de réponses optique (stylo noir ou bleu, aucune rature).',
    ],
    practiceQuizKey: 'ENSA_2024',
    officialSource: {
      label: 'Ministère de l’Enseignement Supérieur (ensup.gov.ma)',
      url: 'https://www.ensup.gov.ma',
    },
    faq: [
      {
        question: 'Le seuil de présélection est-il le même pour les Sciences Maths et les Sciences Physiques ?',
        answer:
          'Non. En règle générale, le seuil exigé pour les bacheliers Sciences Physiques et SVT est légèrement plus élevé que pour les Sciences Mathématiques en raison de la formule de pondération nationale.',
      },
    ],
  },

  {
    id: 'concours-ensam',
    title: 'Concours Commun d’Accès aux Écoles Nationales Supérieures d’Arts et Métiers (ENSAM)',
    schools: 'ENSAM Meknès, ENSAM Casablanca, ENSAM Rabat',
    level: 'Bacheliers scientifiques et technologiques',
    conditions:
      'Baccalauréat en Sciences Mathématiques, Sciences Physiques, Sciences et Technologies (STE/STM). Présélection 75% National + 25% Régional.',
    procedure:
      'Pré-inscription sur le portail concours unifié. Les candidats présélectionnés passent un concours écrit commun.',
    documents: [
      'Copie de la CNIE',
      'Relevé de notes du Baccalauréat',
      'Fiche de convocation officielle',
    ],
    calendarSteps: [
      { step: 'Juin', description: 'Lancement des pré-candidatures sur le portail ENSAM' },
      { step: 'Juillet', description: 'Publication des listes de présélection' },
      { step: 'Mi-Juillet', description: 'Épreuves écrites de Mathématiques et Physique / Sciences de l’ingénieur' },
      { step: 'Fin Juillet', description: 'Résultats définitifs et inscription administrative' },
    ],
    examFormat: [
      { subject: 'Mathématiques', duration: '1h30', questionsCount: 'QCM approfondi', grading: 'Algèbre, analyse et trigonométrie avancée' },
      { subject: 'Physique & Sciences Industrielles', duration: '1h30', questionsCount: 'QCM orienté applications', grading: 'Mécanique du point et du solide, électromagnétisme et thermodynamique' },
    ],
    preparationTips: [
      'L’ENSAM valorise une forte intuition physique et technique : travaillez particulièrement les problèmes de cinématique et de dynamique.',
      'Revoyez les bases de mécanique analytique et de forces appliquées.',
    ],
    officialSource: {
      label: 'Portail ENSAM Université Mohammed V',
      url: 'https://www.ensam-um5.ac.ma',
    },
    faq: [
      {
        question: 'Quelle ENSAM choisir entre Meknès et Casablanca ?',
        answer:
          'Les deux écoles délivrent le même diplôme d’Ingénieur d’État avec des normes d’excellence équivalentes. Le choix se fait généralement selon la proximité géographique et les filières de spécialisation souhaitées en cycle ingénieur.',
      },
    ],
  },

  {
    id: 'concours-tafem',
    title: 'Test d’Aptitude à la Formation en Management (TAFEM — ENCG Maroc)',
    schools: 'Réseau des 12 ENCG : Settat, Casablanca, Tanger, Marrakech, Agadir, Oujda, Kénitra, El Jadida, Fès, Dakhla, Beni Mellal, Meknès',
    level: 'Bacheliers toutes filières (Scientifiques, Économiques et Littéraires)',
    conditions:
      'Baccalauréat marocain toutes séries. Seuils de présélection spécifiques calculés par filière de baccalauréat pour garantir l’équité entre séries économiques et scientifiques.',
    procedure:
      'Inscription unique sur la plateforme nationale tafem.ma.',
    documents: [
      'Code Massar de l’élève',
      'Carte Nationale d’Identité Électronique',
      'Formulaire TAFEM validé en ligne',
    ],
    calendarSteps: [
      { step: 'Juin', description: 'Ouverture du site tafem.ma pour la saisie des candidatures' },
      { step: 'Début Juillet', description: 'Publication des seuils par série de bac et convocation au test' },
      { step: 'Mi-Juillet', description: 'Passation du test TAFEM (2 heures)' },
      { step: 'Fin Juillet', description: 'Affichage des résultats du test et affectation par ordre de mérite' },
    ],
    examFormat: [
      { subject: 'Sous-test 1 : Mémorisation & Attention', duration: '30 min', questionsCount: 'Test de mémoire visuelle et textuelle', grading: 'QCM rigoureux' },
      { subject: 'Sous-test 2 : Résolution de problèmes & Logique', duration: '30 min', questionsCount: 'Calcul rapide, suites logiques, raisonnement', grading: 'Logique quantitative' },
      { subject: 'Sous-test 3 : Culture Générale & Actualité', duration: '30 min', questionsCount: 'Économie, géopolitique, histoire du Maroc et institutions', grading: 'Connaissances générales' },
      { subject: 'Sous-test 4 : Maîtrise des Langues (Français & Anglais)', duration: '30 min', questionsCount: 'Grammaire, vocabulaire, compréhension écrite', grading: 'Aptitude linguistique' },
    ],
    preparationTips: [
      'Lisez régulièrement la presse économique marocaine et internationale pour réussir le volet culture générale.',
      'Entraînez-vous quotidiennement sur des tests psychotechniques, suites de dominos et énigmes de logique numérique.',
      'Gérez scrupuleusement les 30 minutes de chaque sous-test sans vous attarder sur les questions bloquantes.',
    ],
    officialSource: {
      label: 'Site Officiel TAFEM ENCG',
      url: 'https://tafem.ma',
    },
    faq: [
      {
        question: 'Le test TAFEM pénalise-t-il les mauvaises réponses ?',
        answer:
          'Selon les sessions, une consigne stricte de barème est précisée sur la page de couverture du cahier d’épreuves. Lisez attentivement la consigne avant de cocher vos réponses.',
      },
    ],
  },
];
