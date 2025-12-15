// Data types and interfaces
export interface NavigationItemData {
  label: string;
  to: string;
  end?: boolean;
}

// Problem Solution Data
export const problemSolutionData = {
  title: "De El Problema a La Solución",
  subtitle: "La transformación real que necesitas para cambiar tu vida financiera",
  before: {
    title: "ANTES - Tu Situación Actual",
    features: [
      {
        title: "15 Horas de Trabajo Diarias",
        description: "Construcción, delivery, limpieza, taxista, pintor... trabajos que te consumen todo el tiempo"
      },
      {
        title: "Sueldo Bajo",
        description: "Recibes un pago mensual realmente malo por tanto esfuerzo y horas"
      },
      {
        title: "Sin Tiempo Libre",
        description: "No tienes tiempo para tu familia, descansar o enfocarte en lo que realmente te hace feliz"
      },
      {
        title: "Trabajo Físico Agotador",
        description: "Trabajos que desgastan tu cuerpo y mente sin seguridad financiera"
      }
    ]
  },
  after: {
    title: "AHORA - Con El Curso de Trading de Futuros y Criptomonedas",
    features: [
      {
          title: "Bases para Generar Ingresos Extra",
          description: "Adquiere los fundamentos técnicos para empezar a operar y generar ingresos adicionales trabajando desde tu hogar."
      },
      {
          title: "Control de Tu Rutina",
          description: "Aprende a operar cuando quieras y desde donde quieras. Empieza a tomar control de tu propio tiempo."
      },
      {
          title: "Enfócate en Lo Que Te Importa",
          description: "Aprovecha el tiempo recuperado para tu familia, descansar o perseguir tus verdaderos intereses personales."
      },
      {
          title: "El Primer Paso Hacia Tu Meta",
          description: "Construye el conocimiento esencial que te llevará a la meta de obtener una mayor libertad financiera a largo plazo."
      }
  ]
  }
};

// Testimonials Data
export const testimonialsData = {
  title: "Nuestro Compromiso y Fundamentos",
  subtitle: "Lo que garantizamos que aprenderás en el Módulo 1",
  testimonials: [
      {
          name: "Compromiso de Conocimiento",
          role: "Base Sólida",
          content: "Te guiaremos paso a paso a través de la configuración de las plataformas (Binance/Blofin) y los conceptos esenciales del mercado, incluso sin experiencia previa."
      },
      {
          name: "Enfoque en la Seguridad",
          role: "Gestión de Riesgo",
          content: "Dominarás la Gestión de Posición, el cálculo de PNL/ROI y cómo usar las órdenes Stop Loss para operar de forma responsable, que es la clave del éxito a largo plazo."
      },
      {
          name: "Aprendizaje Detallado",
          role: "Contenido Exhaustivo",
          content: "Accede a 3 horas de contenido en video, detallando cada tema para asegurar que entiendas los fundamentos antes de pasar a la práctica."
      }
  ]
};

// Course Inclusions Data
export const courseInclusionsData = {
  title: "Módulo 1 de Trading + Curso P2P: ¡Todo Incluido!",
  subtitle: "Obtén la base sólida para Trading de Futuros y el Curso de P2P como un Bonus Exclusivo.",
  inclusions: [
      {
          icon: "🎬",
          title: "+2 Horas de Video",
          description: "Acceso inmediato a todo el contenido del Módulo 1 de Trading de Futuros, con una duración total de **1 hora, 55 minutos y 32 segundos** de lecciones detalladas."
      },
      {
          icon: "🎁",
          title: "BONUS GRATUITO: Curso Completo de P2P",
          description: "Recibe el método de P2P completo 1Hora de video, un sistema comprobado para generar ingresos adicionales de forma consistente, totalmente gratis con tu compra."
      },
      {
          icon: "📱",
          title: "Plataformas y Herramientas Esenciales",
          description: "Todas las guías para descargar, instalar y configurar las aplicaciones y herramientas clave (como Binance y Blofin) para empezar a operar en ambos mundos."
      },
      {
          icon: "🔄",
          title: "Soporte Directo en la Comunidad",
          description: "Soporte continuo y directo dentro de la comunidad para resolver todas tus dudas y guiarte en tu proceso de aprendizaje en Trading y P2P."
      },
      {
          icon: "💰",
          title: "Calculadora de Trading Profesional",
          description: "Calculadora avanzada para ayudarte a estimar tus ganancias, pérdidas y comisiones en el arbitraje de P2P en tiempo real."
      }
  ]
};

// CTA Urgency Data
export const ctaUrgencyData = {
  title: "No Pierdas Esta Oportunidad",
  subtitle: "Únete a los estudiantes que ya están transformando su vida financiera",
  price: "$25",
  originalPrice: "$40",
  buttonText: "Comprar Curso Ahora",
  urgencyLabel: "Oferta termina en:",
  urgencyTime: "48:00:00"
};

// Stats Data
export const statsData = {
  stats: [
    {
      number: "Lanzamiento",
      label: "Academia Recién Abierta",
      icon: "🚀" // Icono de lanzamiento
    },
    {
      number: "Módulo 1",
      label: "Fundamentos Esenciales Incluidos",
      icon: "📚" // Icono de conocimiento o módulo
    },
    {
      number: "98%",
      label: "Conocimiento Práctico", // Cambia Satisfacción por un enfoque en la práctica
      icon: "💡" // Icono de idea o solución
    },
    {
      number: "+3 Horas", // Si puedes verificar un tiempo total de contenido o lecciones
      label: "De Contenido Detallado",
      icon: "⏱️" // Icono de tiempo
    }
  ]
};

// Trust Badges Data
export const trustBadgesData = {
  badges: [ 
    {
      icon: "🔒",
      text: "Pago 100% Seguro",
      description: "SSL encriptado"
    },
    {
      icon: "✓",
      text: "Compra Verificada",
      description: "Transacción protegida"
    },
    {
      icon: "📱",
      text: "Soporte 24/7",
      description: "Ayuda inmediata"
    }
  ]
};

// FAQ Data
export const faqData = {
  title: "Preguntas Frecuentes",
  subtitle: "Resolvemos todas tus dudas sobre el Módulo 1 de Trading y el Bono P2P",
  faqs: [
    {
      question: "¿Funciona en mi país latinoamericano?",
      answer: "Sí, tanto el Trading de Futuros como el método P2P funcionan en la mayoría de los países de Latinoamérica. Te proporcionamos las guías necesarias para abrir y configurar tus cuentas en los exchanges (como Binance y Blofin) y sortear posibles restricciones locales."
    },
    {
      question: "¿Necesito experiencia previa en Trading?",
      answer: "No necesitas ninguna experiencia previa. El **Módulo 1** está diseñado para **principiantes absolutos**. Empezarás desde cero, aprendiendo la configuración de plataformas, fundamentos del mercado, tipos de órdenes y gestión de riesgo antes de operar."
    },
    {
      question: "¿Qué capital inicial necesito para empezar a hacer Trading?",
      answer: "Puedes empezar a operar Futuros con montos pequeños (por ejemplo, $10 o $50) dependiendo del exchange, gracias al apalancamiento. Sin embargo, para una gestión de riesgo adecuada, se recomienda que tu capital inicial sea manejable y que estés dispuesto a arriesgar solo lo que puedas permitirte perder."
    },
    {
      question: "¿Qué puedo esperar ganar con este curso?",
      answer: "El Módulo 1 es de **fundamentos y bases técnicas**, no podemos garantizar ninguna ganancia específica en Trading, ya que depende enteramente de tu aplicación, gestión de riesgo y las condiciones del mercado. **Sin embargo**, el curso incluye el **BONO P2P** que sí es un sistema comprobado que te puede ayudar a generar tus primeros ingresos adicionales, como lo ha demostrado mi comunidad anterior."
    },
    {
      question: "¿Cómo accedo al curso (Módulo 1 + Bono P2P) después de comprarlo?",
      answer: "Inmediatamente después de la compra, serás redirigido automáticamente a la sección privada donde encontrarás todo el material necesario: videos del Módulo 1 de Trading, el curso completo de P2P, guías descargables y acceso a la comunidad privada."
    },
    {
      question: "¿Qué incluye la garantía?",
      answer: "Debido a la naturaleza volátil del Trading, no ofrecemos una garantía de retorno monetario en el Módulo 1. **La garantía se centra en el soporte:** si tienes dudas o no entiendes un concepto, me comprometo a analizar tu caso en la comunidad para asegurar que domines la base técnica y conceptual antes de avanzar."
    },
    {
      question: "¿Necesito Internet muy rápido o una computadora potente?",
      answer: "No. Con una conexión normal de casa (5-10 Mbps) es más que suficiente. La operativa de Trading y P2P se realiza en apps o web sin necesidad de descargas grandes o streaming constante. Puedes empezar con una computadora o incluso solo con tu celular."
    },
    {
      question: "¿Puedo estudiar esto mientras mantengo mi trabajo actual?",
      answer: "Absolutamente. Tanto el estudio del Módulo 1 como el Trading (una vez que se opera) y el método P2P ofrecen una gran flexibilidad. Puedes dedicarle las horas que te sean posibles (mañanas, tardes o noches) y seguir construyendo una fuente de ingresos adicional."
    }
  ]
};

// Footer Data
export const footerData = {
  description: "Educación de calidad a precio justo • Fundamentos sólidos para tu futuro",
  copyright: "© 2025. Todos los derechos reservados."
};

// Header Data
export const headerData = {
  logo: {
    alt: "FZ Academy Logo",
    width: 40
  },
  navigation: [
    { label: "Mi Historia", to: "#video" },
    { label: "Problema", to: "#problema-solucion" },
    { label: "Compromiso", to: "#testimonios" },
    { label: "Qué Incluye", to: "#incluye" },
    { label: "FAQ", to: "#faq" },
    { label: "Comprar", to: "#comprar" }
  ],
  button: {
    text: "Iniciar Sesión",
    variant: "primary" as const,
    onClick: () => console.log('Iniciar Sesión clicked')
  }
};

// Courses Data
export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: string;
  lessons: number;
  duration: string;
  price: string;
  gradientFrom: string;
  gradientTo: string;
  badge?: string;
  logo?: string;
  videoUrl?: string;
}

export const coursesData: CourseData[] = [
  {
    id: 'p2p',
    title: 'Curso Completo de Trading P2P',
    subtitle: 'De cero a experto',
    description: 'Domina el arte de la compra y venta de criptomonedas a través de Binance P2P. Aprende estrategias avanzadas, gestión de riesgo y cómo generar ingresos consistentes desde cualquier lugar del mundo.',
    type: 'Curso',
    lessons: 1,
    price: 'Incluido',
    gradientFrom: '#ff72e1',
    gradientTo: '#0072f5',
    logo: '💰',
    videoUrl: 'https://impkable.com/wp-content/uploads/2025/10/curso-p2p.mp4',
    duration: '1 hora'
  },
  {
    id: 'trading-module-1',
    title: 'Trading de Futuros: Módulo 1',
    subtitle: 'Fundamentos Esenciales',
    description: 'Aprende Trading de Futuros en profundidad, partiendo de cero conocimiento en esta tecnología. Configuración de plataformas (Binance/Blofin), fundamentos del mercado, tipos de órdenes y gestión de riesgo.',
    type: 'Curso',
    lessons: 23,
    price: 'Incluido',
    gradientFrom: '#ff705b',
    gradientTo: '#dc3545',
    badge: 'MÓDULO 1',
    logo: '📈',
    duration: '2 horas'
  }
];

// Trading Module 1 Syllabus Data
export interface Lesson {
  id: string;
  title: string;
  videoUrl?: string;
  duration?: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}


export const tradingModule1Syllabus: Section[] = [
  {
    id: 'section-1',
    title: '1 Configuración de la plataforma',
    lessons: [
      { id: '1-1', title: '1-1 Como descargar e instalar la App', duration: '2:14', videoUrl:'1/1-introduccion.mp4' },
      { id: '1-2', title: '1-2 Como abrir una cuenta de Binance y Blofin', duration: '8:48', videoUrl:'1/2-descargar-app.mp4' },
      { id: '1-3', title: '1-3 Como verificar la cuenta', duration: '6:51', videoUrl:'1/3-creacion-y-verificacion-de-cuentas.mp4'  },
      { id: '1-4', title: '1-4 Como depositar en ambas plataformas', duration: '11:15' , videoUrl:'1/4-depositar-fondos.mp4' }
    ]
  },
  {
    id: 'section-2',
    title: '2 Fundamentos del mercado',
    lessons: [
      { id: '2-1', title: '2-1 Diferencia entre spot y futuros', duration: '4:34', videoUrl:'2/1-spot-y-futuros.mp4' },
      { id: '2-2', title: '2-2 Significado de aislado y cruzado', duration: '3:01', videoUrl:'2/2-aislado-y-cruzado.mp4' },
      { id: '2-3', title: '2-3 Apalancamiento', duration: '4:21', videoUrl:'2/3-apalancamiento.mp4' },
      { id: '2-4', title: '2-4 Diferencia entre Long (Largo) – y Short (Corto)', duration: '3:31', videoUrl:'2/4-long-y-short.mp4' }
    ]
  },
  {
    id: 'section-3',
    title: '3 Ordenes y Ejecución',
    lessons: [
      { id: '3-1', title: '3-1 Diferencia entre Market Order y Limit Order', duration: '9:32', videoUrl:'3/1-limit-order-y- market-order.mp4' },
      { id: '3-2', title: '3-2 Ordenes Stop-Limit y Stop-Market', duration: '7:53', videoUrl:'3/2-stop-limit-y-stop-market.mp4' },
      { id: '3-3', title: '3-3 Ordenes Post-Only', duration: '2:26', videoUrl:'3/3-post-only.mp4' }
    ]
  },
  {
    id: 'section-4',
    title: '4 Gestión de posición y Riesgo',
    lessons: [
      { id: '4-1', title: '4-1 Margen Inicial', duration: '4:41', videoUrl:'4/1-margen-inicial.mp4' },
      { id: '4-2', title: '4-2 Tamaño de posición', duration: '2:49', videoUrl:'4/2-tamano-de-posicion.mp4' },
      { id: '4-3', title: '4-3 Gestión del riesgo', duration: '1:00', videoUrl:'4/3-gestion-de-riesgo.mp4' },
      { id: '4-4', title: '4-4 Stop Lost (SL) y Take Profit (TP)', duration: '7:43', videoUrl:'4/4-sl-y-tp.mp4' },
      { id: '4-5', title: '4-5 Como abrir una entrada', duration: '4:15', videoUrl:'4/5-como-abrir-una-operacion.mp4' },
      { id: '4-6', title: '4-6 Como cerrar una operación', duration: '5:17', videoUrl:'4/6-cerrar-operacion.mp4' },
      { id: '4-7', title: '4-7 Como añadir margen, aumentar la liquidación y Precio de liquidación', duration: '3:13', videoUrl:'4/7-8-margen-y-liquidacion.mp4' }
    ]
  },
  {
    id: 'section-5',
    title: '5 Cálculos y Costos',
    lessons: [
      { id: '5-1', title: '5-1 Que es PNL', duration: '2:12', videoUrl:'5/1-pnl.mp4' },
      { id: '5-2', title: '5-2 Que es ROI', duration: '1:24', videoUrl:'5/2-roi.mp4' },
      { id: '5-3', title: '5-3 Tasa de financiación (Funding Rate)', duration: '1:35', videoUrl:'5/3-funding-rate.mp4' },
      { id: '5-4', title: '5-4 Tasa de comisión', duration: '2:32', videoUrl:'5/4-tasa-de-comision.mp4' }
    ]
  },
  {
    id: 'section-6',
    title: '6 Revisión de Historial',
    lessons: [
      { id: '6-1', title: '6-1 Revisión de historial de posiciones', duration: '3:19', videoUrl:'6/1-historial.mp4' }
    ]
  }
];

// Export all data as a single object for easier imports
export const appData = {
  problemSolution: problemSolutionData,
  testimonials: testimonialsData,
  courseInclusions: courseInclusionsData,
  ctaUrgency: ctaUrgencyData,
  stats: statsData,
  trustBadges: trustBadgesData,
  faq: faqData,
  footer: footerData,
  header: headerData,
  courses: coursesData,
  tradingModule1Syllabus: tradingModule1Syllabus
};
