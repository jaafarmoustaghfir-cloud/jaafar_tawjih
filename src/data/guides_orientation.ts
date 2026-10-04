export interface GuideOrientationData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  category: string;
  summary: string;
  sections: {
    heading: string;
    content: string[];
    keyTakeaway?: string;
  }[];
  relatedSchools: string[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const GUIDES_ORIENTATION: GuideOrientationData[] = [
  {
    id: 'que-faire-apres-bac-maroc',
    slug: 'que-faire-apres-bac-maroc',
    title: 'Que faire après le Bac au Maroc ? Le panorama complet',
    subtitle: 'Grandes écoles, universités régulées, facultés ouvertes et filières courtes : la cartographie pour bien choisir.',
    readingTime: '7 min de lecture',
    category: 'Panorama Général',
    summary:
      'L’obtention du baccalauréat marocain ouvre l’accès à une multitude de trajectoires académiques. Entre les grandes écoles d’ingénieurs, les écoles de commerce, les facultés de médecine, les cursus technologiques et les universités, ce guide synthétise les options selon vos ambitions et vos résultats.',
    sections: [
      {
        heading: '1. Les Grandes Écoles d’Ingénieurs et de Commerce à Prépa Intégrée (Bac+5)',
        content: [
          'Les réseaux d’excellence comme l’ENSA (ingénierie appliquée), l’ENSAM (génie mécanique et industriel) et l’ENCG (commerce et gestion) recrutent directement après le baccalauréat sur la base d’une présélection (75% national + 25% régional) suivie d’un concours écrit national unifié.',
          'Le grand atout de cette formule réside dans la continuité pédagogique : l’étudiant intègre deux années préparatoires intégrées sans le stress d’un concours éliminatoire de fin de prépa, à condition de valider ses modules chaque semestre.',
        ],
        keyTakeaway:
          'Idéal pour les élèves réguliers et motivés qui ont une vision claire de leur projet d’ingénierie ou de management.',
      },
      {
        heading: '2. Les Facultés de Médecine, Pharmacie et Dentaire (FMP/FMD)',
        content: [
          'Accessibles exclusivement aux séries scientifiques (SM, PC, SVT), les études de santé s’étalent sur 6 années et forment les piliers du système médical national.',
          'Le concours national commun cursom comporte 4 épreuves QCM (SVT, Chimie, Physique, Maths) de 45 minutes chacune sans calculatrice. Le travail méthodique des annales dès la fin des examens du bac est déterminant.',
        ],
        keyTakeaway:
          'Exige une vraie vocation de service et une grande endurance académique.',
      },
      {
        heading: '3. Les Classes Préparatoires aux Grandes Écoles (CPGE)',
        content: [
          'Filière publique d’excellence en 2 ans (MPSI, PCSI, TSI, ECT), les CPGE préparent au Concours National Commun (CNC) permettant d’intégrer les écoles d’ingénieurs les plus sélectives du Maroc (EMI, EHTP, ENSIAS, INPT, Mines Rabat) ainsi que les concours français.',
          'Cette voie demande une capacité de travail intellectuel intense, une résistance au stress et une passion sincère pour les mathématiques et les sciences théoriques.',
        ],
      },
      {
        heading: '4. Les Formations Universitaires Technologiques Courtes (EST & BTS)',
        content: [
          'Les Écoles Supérieures de Technologie (DUT en 2 ans) et les sections de Brevet de Technicien Supérieur (BTS en 2 ans) allient théorie et immersion professionnelle rapide par le biais de stages obligatoires.',
          'Loin d’être une voie sans issue, les meilleurs diplômés de DUT/BTS peuvent intégrer les cycles d’ingénieurs d’État via les concours passerelles réservés aux Bac+2.',
        ],
      },
      {
        heading: '5. Les Facultés des Sciences et Techniques (FST) et Facultés Spécialisées',
        content: [
          'À mi-chemin entre l’université et l’école d’ingénieurs, les FST proposent des cursus LMD scientifiques à accès régulé avec sélection préalable. Elles abritent également leurs propres cycles d’ingénieurs d’État accrédités.',
        ],
      },
    ],
    relatedSchools: ['ENSA', 'ENSAM', 'ENCG', 'FMP', 'EST', 'FST', 'CPGE'],
    faq: [
      {
        question: 'Quelle est la date limite habituelle des pré-candidatures ?',
        answer:
          'La majorité des portails officiels (Tawjihi, Cursom, TAFEM) ouvrent leurs inscriptions entre fin mai et début juillet. Restez attentifs aux circulaires ministérielles annuelles.',
      },
    ],
  },

  {
    id: 'est-vs-fst-comparatif',
    slug: 'est-vs-fst-comparatif',
    title: 'EST vs FST : Quel parcours technique et universitaire choisir ?',
    subtitle: 'Comprendre en profondeur les différences de diplômes, de rythme d’études et de perspectives de carrière.',
    readingTime: '6 min de lecture',
    category: 'Comparatifs',
    summary:
      'Beaucoup de bacheliers hésitent entre l’École Supérieure de Technologie (EST) et la Faculté des Sciences et Techniques (FST). Bien que toutes deux axées sur les sciences appliquées, leurs philosophies pédagogiques, la durée de leurs diplômes initiaux et leurs passerelles diffèrent notablement.',
    sections: [
      {
        heading: '1. Philosophie et Format des Diplômes',
        content: [
          'L’EST délivre en 2 ans un DUT (Diplôme Universitaire de Technologie). C’est une formation professionnalisante courte, très encadrée, organisée en cours, TP et projets pratiques, comprenant 2 stages obligatoires en entreprise.',
          'La FST fonctionne selon l’architecture LMD (Licence en 3 ans, Master en 5 ans, Doctorat en 8 ans). Après 2 années de tronc commun (DEUST), l’étudiant poursuit en 3ème année pour obtenir sa Licence Sciences et Techniques (LST). La FST propose également des cycles d’ingénieurs d’État intégrés en 3 ans après Bac+2.',
        ],
        keyTakeaway:
          'L’EST vise une insertion professionnelle ou une passerelle rapide à Bac+2 ; la FST propose un parcours universitaire structuré jusqu’au Bac+3, Bac+5 ou Doctorat.',
      },
      {
        heading: '2. Modes de Sélection et Seuils',
        content: [
          'Les deux établissements sélectionnent sur dossier sans concours écrit, en utilisant la formule officielle : 75% Examen National + 25% Examen Régional.',
          'Cependant, l’EST applique des coefficients spécifiques selon les filières (les bacheliers techniques ont souvent des quotas favorables), tandis que la FST calcule une moyenne scientifique pondérée par filière de tronc commun (MIPC, BCG, GE-GM).',
        ],
      },
      {
        heading: '3. Passerelles vers les Grandes Écoles d’Ingénieurs',
        content: [
          'Après un DUT à l’EST : Les étudiants classés parmi les majors de promotion peuvent postuler aux concours passerelles pour entrer en 3ème année (1ère année du cycle ingénieur) des ENSA, ENSAM, etc.',
          'Après un DEUST ou une LST à la FST : L’accès au cycle ingénieur se fait soit en interne au sein de la même FST, soit par concours passerelle national (CNC passerelles, concours propres des écoles comme EMI, ENSIAS, EHTP).',
        ],
      },
    ],
    relatedSchools: ['EST', 'FST', 'ENSA', 'ENSAM'],
    faq: [
      {
        question: 'Quel choix privilégier si je veux travailler le plus tôt possible ?',
        answer:
          'L’EST est plus directement opérationnelle grâce à ses stages industriels obligatoires et son diplôme professionnalisant Bac+2 très apprécié des PME et grandes entreprises marocaines.',
      },
    ],
  },

  {
    id: 'ensa-vs-ensam-comparatif',
    slug: 'ensa-vs-ensam-comparatif',
    title: 'ENSA vs ENSAM : Le comparatif exhaustif des deux géants de l’ingénierie',
    subtitle: 'Spécialités, culture industrielle, présence géographique et débouchés : faites votre choix en toute lucidité.',
    readingTime: '6 min de lecture',
    category: 'Comparatifs',
    summary:
      'L’ENSA et l’ENSAM sont les deux plus prestigieux réseaux publics d’écoles d’ingénieurs à prépa intégrée au Maroc. Découvrez leurs différences majeures en matière de culture d’école, de spectre de filières et d’adéquation avec votre projet professionnel.',
    sections: [
      {
        heading: '1. Éventail des Spécialités et Orientations Métiers',
        content: [
          'L’ENSAM cultive une ADN résolument orientée vers l’industrie lourde, la mécanique de précision, les procédés de fabrication, la mécatronique et la productique. C’est le vivier historique des ingénieurs de production des grands groupes automobiles et aéronautiques au Maroc.',
          'L’ENSA propose un spectre beaucoup plus polyvalent et diversifié : très forte dominante en Génie Informatique, Réseaux, Cybersécurité, Intelligence Artificielle, mais aussi Génie Civil, Génie Électrique et Génie Industriel.',
        ],
        keyTakeaway:
          'Si votre passion est le software, le cloud, la data ou le génie civil : l’ENSA offre davantage d’options. Si votre passion est la mécanique, la robotique industrielle, les matériaux et la conception d’usines : l’ENSAM est la référence absolue.',
      },
      {
        heading: '2. Réseau Géographique et Capacité d’Accueil',
        content: [
          'L’ENSA compte 12 écoles réparties à travers tout le Royaume (Tanger, Agadir, Marrakech, Oujda, Fès, Kénitra, Safi, El Jadida, etc.), offrant une plus grande proximité géographique.',
          'L’ENSAM compte actuellement 3 campus (Meknès, Casablanca, Rabat), ce qui concentre les promotions et confère un esprit de corps d’anciens élèves (Gadzarts marocains) très soudé.',
        ],
      },
      {
        heading: '3. Concours d’Accès et Épreuves Écrites',
        content: [
          'L’ENSA et l’ENSAM organisent chacune leur propre concours écrit commun sous forme de QCM (Mathématiques et Physique).',
          'L’épreuve de physique de l’ENSAM comporte régulièrement des composantes de sciences de l’ingénieur et de mécanique analytique, tandis que celle de l’ENSA se concentre sur l’électricité, les ondes et la mécanique générale du programme du bac.',
        ],
      },
    ],
    relatedSchools: ['ENSA', 'ENSAM'],
    faq: [
      {
        question: 'Le diplôme a-t-il la même valeur sur le marché du travail marocain ?',
        answer:
          'Oui, les deux institutions délivrent le Diplôme d’Ingénieur d’État avec le même statut juridique et la même grille salariale dans la fonction publique et les conventions collectives du secteur privé.',
      },
    ],
  },

  {
    id: 'etudes-courtes-vs-longues',
    slug: 'etudes-courtes-vs-longues',
    title: 'Études courtes (Bac+2 : DUT, BTS) vs Études longues (Bac+5 : Ingénieur, Master)',
    subtitle: 'Quelle stratégie d’orientation adopter après le Bac selon son autonomie et ses ressources ?',
    readingTime: '5 min de lecture',
    category: 'Méthodologie & Choix',
    summary:
      'Faut-il viser directement un cycle de 5 années ou opter pour un diplôme court à Bac+2 avec l’ambition d’une passerelle ? Analyse objective des avantages, des risques et des passerelles pour sécuriser son parcours post-bac au Maroc.',
    sections: [
      {
        heading: '1. Les Avantages d’un Cursus Long Direct (Bac+5)',
        content: [
          'Entrer en école d’ingénieurs ou de commerce à prépa intégrée sécurise votre statut : pas de rupture de cursus, un environnement académique stable pendant 5 ans et l’assurance de sortir avec un diplôme d’État de niveau Bac+5 très prisé.',
          'Cependant, l’accès est sélectif dès le départ et nécessite d’obtenir une note solide au baccalauréat pour franchir le seuil de présélection.',
        ],
      },
      {
        heading: '2. L’Atout Stratégique des Formations Courtes (DUT & BTS)',
        content: [
          'Pour les étudiants dont la moyenne au bac est légèrement sous les seuils des grandes écoles, l’EST ou le BTS représente un tremplin d’excellence.',
          'En 2 ans, vous acquérez des compétences concrètes très recherchées par les entreprises (technicien supérieur) et vous vous donnez une seconde chance d’intégrer une grande école par la voie des concours passerelles réservés aux diplômés Bac+2.',
        ],
      },
    ],
    relatedSchools: ['EST', 'ENSA', 'ENSAM', 'ENCG', 'FST'],
    faq: [
      {
        question: 'Est-il difficile d’obtenir une passerelle ingénieur après un DUT ?',
        answer:
          'Il faut généralement figurer dans le premier tiers ou premier quart de sa promotion et réussir le concours écrit passerelle, ce qui demande une rigueur constante tout au long des deux années.',
      },
    ],
  },

  {
    id: 'comment-reussir-concours-qcm-maroc',
    slug: 'comment-reussir-concours-qcm-maroc',
    title: 'Comment réussir les concours écrits au Maroc : Méthodologie et gestion du temps QCM',
    subtitle: 'Les techniques éprouvées pour maximiser votre score aux concours ENSA, Médecine et TAFEM.',
    readingTime: '6 min de lecture',
    category: 'Méthodologie de Concours',
    summary:
      'Passer un concours écrit sous forme de QCM ne ressemble en rien aux examens traditionnels du baccalauréat. Vitesse de traitement, gestion des points négatifs, élimination d’options et gestion du stress : voici les clés méthodologiques fondamentales.',
    sections: [
      {
        heading: '1. Le Changement de Paradigme : Du Baccalauréat au Concours QCM',
        content: [
          'Au baccalauréat, le correcteur note la rigueur de la rédaction, la démonstration et le respect des étapes. Au concours QCM, seul le résultat final coché sur la grille optique compte.',
          'Vous devez apprendre à utiliser des méthodes rapides : analyse dimensionnelle en physique, élimination des valeurs impossibles par ordre de grandeur, vérification par cas particuliers ou valeurs limites.',
        ],
        keyTakeaway:
          'Ne cherchez pas à rédiger une démonstration complète : cherchez l’argument le plus rapide qui disqualifie 3 des 4 propositions proposées.',
      },
      {
        heading: '2. La Gestion du Chronomètre : L’Ennemi N°1',
        content: [
          'Au concours de médecine par exemple, vous disposez de 45 minutes pour environ 15 à 20 questions, soit à peine plus de 2 minutes par question en incluant le noircissement de la grille.',
          'Adoptez la stratégie des 3 passages : 1er passage pour résoudre instantanément les questions évidentes, 2ème passage pour les questions nécessitant un calcul modéré, 3ème passage pour les problèmes ardus s’il reste du temps.',
        ],
      },
      {
        heading: '3. La Maîtrise des Barèmes à Points Négatifs',
        content: [
          'Certains concours appliquent une pénalité pour chaque mauvaise réponse (-0.25 ou -0.5 point). Ne cochez jamais au hasard pur.',
          'Si vous hésitez entre 2 réponses après avoir éliminé formellement les 2 autres, le calcul d’espérance mathématique peut justifier une prise de risque mesurée ; sinon, abstenez-vous.',
        ],
      },
      {
        heading: '4. S’Entraîner en Conditions Réelles sur JAAFAR TAWJIH',
        content: [
          'Utilisez les simulateurs de QCM interactifs intégrés sur JAAFAR TAWJIH (Médecine 2025, Médecine 2022, FMP Rabat 2018, ENSA 2024). Activez le chronomètre, isolez-vous sans calculatrice et analysez systématiquement la correction détaillée de chaque erreur commise.',
        ],
      },
    ],
    relatedSchools: ['ENSA', 'FMP', 'ENSAM', 'ENCG'],
    faq: [
      {
        question: 'Quand faut-il commencer la préparation des concours ?',
        answer:
          'La période idéale se situe dès le lendemain de l’examen national du baccalauréat. Deux à trois semaines d’entraînement intensif quotidien aux QCM font souvent toute la différence.',
      },
    ],
  },
];
