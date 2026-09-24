/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  reinforcement: string; // Pedagogical reinforcement on error
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  content: {
    title: string;
    body: string;
    keyPoints?: string[];
  }[];
  quiz: QuizQuestion[];
}

export const inductionModules: Module[] = [
  {
    id: "identity",
    title: "Identidad Institucional",
    description: "Conoce la historia, misión, visión y los símbolos que nos representan.",
    icon: "Shield",
    image: "/src/assets/images/sena_identity_symbols_1790199523480.jpg",
    content: [
      {
        title: "Nuestra Historia",
        body: "El SENA nació en 1957, gracias a la iniciativa de Rodolfo Martínez Tono. Desde entonces, ha sido la institución encargada de la formación técnica y tecnológica en Colombia.",
        keyPoints: ["Fundado en 1957", "Enfoque en el desarrollo social", "Presencia nacional"]
      },
      {
        title: "Misión y Visión",
        body: "Nuestra misión es cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos. Nuestra visión es ser una organización de clase mundial.",
      },
      {
        title: "Símbolos SENA",
        body: "El escudo, la bandera y el himno son nuestros pilares. El escudo representa la libertad, el trabajo y el conocimiento.",
      }
    ],
    quiz: [
      {
        id: "q1_1",
        question: "¿En qué año fue fundado el SENA?",
        options: ["1948", "1957", "1962", "1970"],
        correctAnswer: 1,
        reinforcement: "El SENA fue fundado el 21 de junio de 1957 por Rodolfo Martínez Tono."
      },
      {
        id: "q1_2",
        question: "¿Quién fue el fundador del SENA?",
        options: ["Gabriel García Márquez", "Jorge Eliécer Gaitán", "Rodolfo Martínez Tono", "Alfonso López Pumarejo"],
        correctAnswer: 2,
        reinforcement: "Rodolfo Martínez Tono fue el visionario que impulsó la creación de esta institución para formar a los trabajadores colombianos."
      }
    ]
  },
  {
    id: "rights-and-duties",
    title: "Derechos y Deberes",
    description: "Entiende tus compromisos y beneficios como aprendiz SENA según el Acuerdo 9 de 2024.",
    icon: "GraduationCap",
    image: "/src/assets/images/sena_hero_training_1790199511539.jpg",
    content: [
      {
        title: "Derechos del Aprendiz",
        body: "Como aprendiz tienes derecho a una formación integral de calidad, inducción, acceso a infraestructura, bienestar y debido proceso.",
        keyPoints: ["Formación de Calidad", "Bienestar Integral", "Debido Proceso"]
      },
      {
        title: "Deberes del Aprendiz",
        body: "Tus deberes incluyen cumplir el reglamento, asistir puntualmente, portar el uniforme y respetar los recursos institucionales.",
        keyPoints: ["Asistencia y Puntualidad", "Uso de Uniforme", "Respeto Institucional"]
      },
      {
        title: "Prohibiciones",
        body: "Está prohibido el plagio, suplantación de identidad, consumo de sustancias prohibidas y cualquier acto que afecte la convivencia.",
      }
    ],
    quiz: [
      {
        id: "rd_1",
        question: "¿Cuál de estos es un DEBER fundamental del aprendiz?",
        options: [
          "Recibir elementos de protección personal",
          "Participar en el plan de bienestar",
          "Suscribir el acta de compromiso al matricularse",
          "Recibir orientación humanista"
        ],
        correctAnswer: 2,
        reinforcement: "Suscribir el acta de compromiso es un DEBER que adquieres al momento de la matrícula. Los otros puntos son DERECHOS."
      },
      {
        id: "rd_2",
        question: "Sobre el uso del uniforme, el reglamento indica que:",
        options: [
          "Es opcional para aprendices virtuales",
          "Debe portarse adecuadamente en sedes y ambientes",
          "Solo se usa en ceremonias especiales",
          "Puede modificarse según el estilo personal"
        ],
        correctAnswer: 1,
        reinforcement: "El reglamento (Acuerdo 9 de 2024) establece que portar el uniforme adecuadamente es un deber del aprendiz para su identificación."
      },
      {
        id: "rd_3",
        question: "¿Qué acción se considera una PROHIBICIÓN en el SENA?",
        options: [
          "Solicitar revisión de evaluaciones",
          "Plagiar materiales o trabajos",
          "Postularse como representante",
          "Participar en brigadas de salud"
        ],
        correctAnswer: 1,
        reinforcement: "El plagio es una falta grave y está explícitamente prohibido, ya que atenta contra la ética y el conocimiento."
      }
    ]
  },
  {
    id: "pedagogy",
    title: "Modelo Pedagógico y Tecnología",
    description: "Aprende sobre la formación por competencias y las herramientas digitales.",
    icon: "Cpu",
    image: "/src/assets/images/sena_tech_platforms_1790199534749.jpg",
    content: [
      {
        title: "Formación Profesional Integral (FPI)",
        body: "Nuestro modelo se basa en el desarrollo de competencias: Saber, Saber Hacer y Saber Ser. Buscamos que el aprendiz sea un ciudadano integral.",
      },
      {
        title: "Ecosistema Digital",
        body: "Contamos con plataformas líderes para tu formación: SofiaPlus para gestión administrativa y Zajuna como nuestro Sistema de Gestión de Aprendizaje (LMS).",
        keyPoints: ["SofiaPlus", "Zajuna", "Correo Institucional", "Biblioteca Virtual"]
      }
    ],
    quiz: [
      {
        id: "q2_1",
        question: "¿Cuál es el nombre del nuevo LMS del SENA?",
        options: ["Blackboard", "Moodle", "Zajuna", "Territorium"],
        correctAnswer: 2,
        reinforcement: "Zajuna es la plataforma oficial de aprendizaje (LMS) que el SENA ha implementado recientemente."
      },
      {
        id: "q2_2",
        question: "¿Cuáles son las dimensiones de la competencia en el SENA?",
        options: ["Saber, Ver, Oír", "Saber, Hacer, Ser", "Leer, Escribir, Hablar", "Pensar, Actuar, Decidir"],
        correctAnswer: 1,
        reinforcement: "El enfoque por competencias busca el equilibrio entre el conocimiento (Saber), la práctica (Hacer) y los valores (Ser)."
      }
    ]
  },
  {
    id: "curriculum",
    title: "Componente Curricular",
    description: "Entiende el diseño de tu programa y el proyecto formativo.",
    icon: "BookOpen",
    image: "/src/assets/images/sena_hero_training_1790199511539.jpg",
    content: [
      {
        title: "Proyecto Formativo",
        body: "Toda tu formación gira en torno a un proyecto real que resuelve una necesidad del sector productivo. Es la columna vertebral de tu aprendizaje.",
      },
      {
        title: "Resultados de Aprendizaje",
        body: "Son los indicadores que demuestran lo que has logrado aprender durante cada fase del programa: Análisis, Planeación, Ejecución y Evaluación.",
      }
    ],
    quiz: [
      {
        id: "q3_1",
        question: "¿Cuál es la estrategia didáctica principal del SENA?",
        options: ["Examen magistral", "Aprendizaje basado en proyectos", "Dictado de textos", "Memorización"],
        correctAnswer: 1,
        reinforcement: "El Aprendizaje Basado en Proyectos (ABP) es la estrategia central del SENA para conectar el aprendizaje con el mundo real."
      }
    ]
  },
  {
    id: "welfare",
    title: "Bienestar y Normatividad",
    description: "Tus derechos, deberes y los servicios de apoyo al aprendiz.",
    icon: "Heart",
    image: "/src/assets/images/sena_hero_training_1790199511539.jpg",
    content: [
      {
        title: "Reglamento del Aprendiz",
        body: "Es el documento que rige tu comportamiento y define tus derechos y deberes dentro de la institución. Es fundamental conocerlo para una convivencia sana.",
      },
      {
        title: "Plan de Bienestar",
        body: "Ofrecemos servicios de salud, deporte, cultura y apoyo socioeconómico para asegurar tu permanencia y éxito académico.",
      }
    ],
    quiz: [
      {
        id: "q4_1",
        question: "¿Dónde se encuentran consignados los derechos y deberes del aprendiz?",
        options: ["En la Constitución", "En el Reglamento del Aprendiz", "En el manual de convivencia escolar", "En el contrato de aprendizaje"],
        correctAnswer: 1,
        reinforcement: "El Reglamento del Aprendiz es el documento normativo que establece el marco de convivencia, derechos y deberes."
      }
    ]
  },
  {
    id: "characterization",
    title: "Caracterización del Aprendiz",
    description: "Analiza tu perfil, estilos de aprendizaje y construye tu proyecto de vida.",
    icon: "GraduationCap",
    image: "/src/assets/images/sena_hero_training_1790199511539.jpg",
    content: [
      {
        title: "¿Quién soy y hacia dónde voy?",
        body: "La caracterización nos permite conocer tus fortalezas y necesidades. Aquí definirás tus estilos de aprendizaje (Visual, Auditivo o Kinestésico) y comenzarás a plasmar tus metas en el Proyecto de Vida.",
      },
      {
        title: "Estilos de Aprendizaje",
        body: "Cada persona aprende de forma diferente. Identificar tu estilo te permitirá aprovechar al máximo los recursos que el SENA pone a tu disposición.",
      }
    ],
    quiz: [
      {
        id: "q5_1",
        question: "¿Cuál de estos es un estilo de aprendizaje comúnmente evaluado?",
        options: ["Rápido", "Kinestésico", "Teórico", "Pasivo"],
        correctAnswer: 1,
        reinforcement: "El estilo Kinestésico se refiere al aprendizaje a través del movimiento, la práctica y el tacto."
      }
    ]
  },
  {
    id: "services",
    title: "Servicios Transversales",
    description: "Conoce la Agencia Pública de Empleo (APE) y Seguridad y Salud en el Trabajo (SST).",
    icon: "Shield",
    image: "/src/assets/images/sena_tech_platforms_1790199534749.jpg",
    content: [
      {
        title: "Agencia Pública de Empleo (APE)",
        body: "Es la herramienta que te conecta con el mundo laboral. Podrás registrar tu hoja de vida, recibir orientación y aplicar a vacantes reales.",
      },
      {
        title: "Seguridad y Salud en el Trabajo (SST)",
        body: "Aprendemos a cuidar de nosotros mismos y de los demás en el ambiente de formación y futuro trabajo. La prevención es clave.",
      }
    ],
    quiz: [
      {
        id: "q6_1",
        question: "¿Qué significan las siglas APE en el SENA?",
        options: ["Asociación de Padres de Estudiantes", "Agencia Pública de Empleo", "Aporte Para el Emprendimiento", "Área de Proyectos Especiales"],
        correctAnswer: 1,
        reinforcement: "La APE es la Agencia Pública de Empleo del SENA, que facilita la vinculación laboral de los aprendices y egresados."
      }
    ]
  }
];
