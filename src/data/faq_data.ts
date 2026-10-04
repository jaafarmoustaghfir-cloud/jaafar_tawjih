export interface FaqItem {
  id: string;
  category: 'Général' | 'Seuils & Calculs' | 'Concours' | 'Procédures & Bourses';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Seuils & Calculs',
    question: 'Comment est calculée la moyenne de présélection (Seuil) pour les concours au Maroc ?',
    answer:
      'La formule officielle adoptée par le Ministère de l’Enseignement Supérieur du Maroc pour la présélection à la majorité des concours post-bac (ENSA, ENSAM, ENCG, FMP/FMD, etc.) est : Note de Sélection = (Note de l’Examen National × 0.75) + (Note de l’Examen Régional × 0.25). Les notes du contrôle continu ne sont généralement pas prises en compte dans ce calcul national.',
  },
  {
    id: 'faq-2',
    category: 'Seuils & Calculs',
    question: 'Les seuils d’admissibilité sont-ils définitifs ou changent-ils chaque année ?',
    answer:
      'Les seuils ne sont jamais fixés à l’avance : ils sont déterminés après la proclamation des résultats du baccalauréat en fonction du nombre total de candidats inscrits, des capacités d’accueil de chaque établissement et du niveau général des notes obtenues cette année-là. Tous les seuils affichés sur JAAFAR TAWJIH sont donnés à titre indicatif sur la base des données historiques observées.',
  },
  {
    id: 'faq-3',
    category: 'Général',
    question: 'Un bachelier SVT ou PC peut-il intégrer une grande école d’ingénieurs (ENSA, ENSAM) ?',
    answer:
      'Oui, absolument. Les ENSA et ENSAM sont ouvertes aux bacheliers Sciences Physiques (PC) et Sciences de la Vie et de la Terre (SVT). Cependant, le seuil de présélection exigé pour ces séries est généralement un peu plus élevé que celui des Sciences Mathématiques en raison du nombre très élevé de bacheliers PC et SVT.',
  },
  {
    id: 'faq-4',
    category: 'Concours',
    question: 'Quelle est la différence entre présélection et admission définitive ?',
    answer:
      'La présélection (Seuil) n’est qu’une étape administrative éliminatoire qui vous autorise à passer le concours écrit. L’admission définitive dépend exclusivement de votre score obtenu aux épreuves du concours écrit et de votre rang dans le classement par ordre de mérite.',
  },
  {
    id: 'faq-5',
    category: 'Procédures & Bourses',
    question: 'Qu’est-ce que la plateforme nationale Tawjihi.ma ?',
    answer:
      'Tawjihi.ma est la plateforme numérique officielle gérée par le Ministère de l’Enseignement Supérieur pour la gestion des candidatures et des affectations post-bac dans les établissements d’enseignement supérieur public à accès régulé (notamment les EST et FST, et selon les années les ENSA et ENSAM).',
  },
  {
    id: 'faq-6',
    category: 'Procédures & Bourses',
    question: 'Comment faire une demande de bourse universitaire au Maroc (Minhaty) ?',
    answer:
      'La demande de bourse d’enseignement supérieur Minhaty s’effectue en ligne sur le portail officiel minhaty.ma durant la période fixée par le Ministère (généralement entre mai et juillet). L’octroi de la bourse est subordonné aux critères socio-économiques du Registre Social Unifié (RSU).',
  },
  {
    id: 'faq-7',
    category: 'Concours',
    question: 'Comment utiliser au mieux les QCM interactifs de JAAFAR TAWJIH ?',
    answer:
      'Nous vous recommandons de choisir un concours (ENSA 2024, Médecine 2025, Médecine 2022, FMP Rabat 2018), d’activer le chronomètre officiel, de vous installer dans le calme sans calculatrice ni aide extérieure, puis de réviser méthodiquement la correction détaillée et les explications scientifiques fournies pour chaque question ratée.',
  },
  {
    id: 'faq-8',
    category: 'Général',
    question: 'JAAFAR TAWJIH est-il un organisme officiel du gouvernement ?',
    answer:
      'Non. JAAFAR TAWJIH est une plateforme d’orientation et d’entraînement privée et indépendante, fondée par le consultant Jaafar Moustaghfir. Elle n’est affiliée à aucun ministère ni université. Pour toute décision administrative ou inscription officielle, les étudiants doivent impérativement se référer aux portails gouvernementaux officiels cités sur le site.',
  },
];
