import { ChatbotAnswer } from "../../interfaces/Chatbot";

export const chatbotAnswers: ChatbotAnswer[] = [
  {
    question: "welcome",
    text: "¡Hola! Soy Financibot. Estoy aquí para resolver todas tus dudas. ¿En qué te puedo ayudar?",
    owner: "chatbot",
    options: [
      {
        text: "Financia.al",
        action: "platform",
        owner: "user",
      },
      {
        text: "Cuentas",
        action: "accounts",
        owner: "user",
      },
      {
        text: "Préstamos",
        action: "loans",
        owner: "user",
      },
      {
        text: "Inversiones",
        action: "invests",
        owner: "user",
      },
    ],
  },
  {
    question: "platform",
    text: "¿Qué deseas conocer sobre nosotros?",
    owner: "chatbot",
    options: [
      {
        text: "Objetivo",
        action: "platform-goal",
        owner: "user",
      },
      {
        text: "Misión",
        action: "platform-mission",
        owner: "user",
      },
      {
        text: "Contactar con ustedes",
        action: "platform-contact",
        owner: "user",
      },
    ],
  },
  {
    question: "accounts",
    text: "¿Qué deseas conocer sobre las cuentas?",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo puedo crearme una cuenta como Comprador?",
        action: "buyer-account",
        owner: "user",
      },
      {
        text: "¿Cómo puedo crearme una cuenta como Inversor?",
        action: "invest-account",
        owner: "user",
      },
      {
        text: "¿Qué requisitos necesito para validar mi identidad?",
        action: "validate-identity",
        owner: "user",
      },
    ],
  },
  {
    question: "loans",
    text: "¿Qué deseas conocer sobre los préstamos?",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo solicitar un financiamiento?",
        action: "loan-request",
        owner: "user",
      },
      {
        text: "¿Cuánto debo esperar para obtener mi financiamiento?",
        action: "loan-time",
        owner: "user",
      },
      {
        text: "¿Por qué mi financiamiento fue rechazado?",
        action: "loan-reject",
        owner: "user",
      },
      {
        text: "¿Por qué necesito dos garantes?",
        action: "loan-guarantors",
        owner: "user",
      },
    ],
  },
  {
    question: "invests",
    text: "¿Qué deseas conocer sobre las inversiones?",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo invertir?",
        action: "invest-requirement",
        owner: "user",
      },
      {
        text: "¿Cuál es la tasa de interés de mis inversiones?",
        action: "invest-interest-rate",
        owner: "user",
      },
      {
        text: "¿En qué momento puedo retirar mi dinero?",
        action: "invest-retire-time",
        owner: "user",
      },
    ],
  },
  {
    question: "platform-goal",
    text: "Somos una plataforma web que busca conectar a inversores interesados financiar la venta de terrenos en distintos países de Latinoamérica con compradores potenciales. Ofrecemos herramientas de análisis de inversión y métricas detalladas para los inversores, permitiéndoles evaluar el rendimiento y riesgo de sus inversiones, además de conocer su historial de ganancias. Presentamos una experiencia intuitiva y transparente para ayudar a nuestros usuarios con sus finanzas.",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo puedo crearme una cuenta como Comprador?",
        action: "buyer-account",
        owner: "user",
      },
      {
        text: "¿Cómo puedo crearme una cuenta como Inversor?",
        action: "invest-account",
        owner: "user",
      },
      {
        text: "Misión de la Plataforma",
        action: "platform-mission",
        owner: "user",
      },
      {
        text: "Contactar con ustedes",
        action: "platform-contact",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "platform-mission",
    text: "Nuestra misión tiene un impacto social relevante. Ante la falta de opciones de crédito accesible, ofrecemos a las familias la posibilidad de adquirir un terreno donde construir su hogar. Al mismo tiempo, proporcionamos a quienes tienen capacidad de ahorro una forma de invertir sus fondos en un activo de sólida revalorización a mediano plazo.",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo puedo crearme una cuenta como Comprador?",
        action: "buyer-account",
        owner: "user",
      },
      {
        text: "¿Cómo puedo crearme una cuenta como Inversor?",
        action: "invest-account",
        owner: "user",
      },
      {
        text: "Objetivo de la Plataforma",
        action: "platform-goal",
        owner: "user",
      },
      {
        text: "Contactar con ustedes",
        action: "platform-contact",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "platform-contact",
    text: "Por cualquier duda o inconveniente, puedes contactar con nosotros llamando a nuestra línea telefónica: 123 456 789. También a traves de nuestro correo electrónico: financia.al@info.com.",
    owner: "chatbot",
    options: [
      {
        text: "Misión de la Plataforma",
        action: "platform-mission",
        owner: "user",
      },
      {
        text: "Objetivo de la Plataforma",
        action: "platform-goal",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "buyer-account",
    text: 'La cuenta de Comprador corresponde a aquellos usuarios que desean solicitar un financiamiento para poder comprar un lote. Se puede crear haciendo click en "Comprador" en el Switch y luego seleccionar el botón "Solicitar financiamiento". Tras llenar el formulario, su cuenta será creada immediatamente. Sin embargo, antes de poder solicitar un financiamiento, es necesario validar su identidad.',
    owner: "chatbot",
    options: [
      {
        text: "¿Qué requisitos necesito para validar mi identidad?",
        action: "validate-identity",
        owner: "user",
      },
      {
        text: "¿Cómo puedo crearme una cuenta como Inversor?",
        action: "invest-account",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "invest-account",
    text: 'La cuenta de Inversor corresponde a aquellos usuarios que desean invertir en el mercado de terrenos latinoamericano mediante oportunidades de financiamiento. Se puede crear haciendo click en "Inversor" en el Switch y luego seleccionar el botón "Quiero invertir". Tras llenar el formulario, su cuenta será creada immediatamente. Sin embargo, antes de poder invertir, es necesario validar su identidad.',
    owner: "chatbot",
    options: [
      {
        text: "¿Qué requisitos necesito para validar mi identidad?",
        action: "validate-identity",
        owner: "user",
      },
      {
        text: "¿Cómo puedo crearme una cuenta como Comprador?",
        action: "buyer-account",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "validate-identity",
    text: 'La validación de identidad es un proceso para asegurar que las transacciones de la plataforma sean legítimas y autorizadas por la persona correcta, evitando fraudes y creando un entorno más seguro y confiable para los usuarios de la plataforma. Para validar tu identidad, debes acceder a tu perfil y hacer clic en el botón "Validar Identidad". En el formulario, se requiere indicar el DNI, el CUIT y subir una foto del rostro del usuario, así como del frente y reverso de su DNI',
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo solicitar un financiamiento?",
        action: "loan-request",
        owner: "user",
      },
      {
        text: "¿Cómo invertir?",
        action: "invest-requirement",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "loan-request",
    text: "Para solicitar un financiamiento, es necesario indicar el costo del lote o terreno, el adelanto a pagar, la cantidad de cuotas deseadas y la Clave Bancaria Uniforme (CBU). Posteriormente es indispensable subir en formato PDF o Imagen los recibos de sueldo de los últimos 3 meses y un comprobante de servicio que valide tu domicilio actual. Finalmente, se debe completar toda la información personal y financiera, además de los archivos antes mencionados, de las 2 personas que actuen como garantes del préstamo",
    owner: "chatbot",
    options: [
      {
        text: "¿Cuánto debo esperar para obtener mi financiamiento?",
        action: "loan-time",
        owner: "user",
      },
      {
        text: "¿Por qué mi financiamiento fue rechazado?",
        action: "loan-reject",
        owner: "user",
      },
      {
        text: "¿Por qué necesito dos garantes?",
        action: "loan-guarantors",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "loan-time",
    text: "Una vez solicitado el financiamiento, debe esperar a que sea aprobado por un administrador de la plataforma. Este proceso puede tomar unos días. Si su solicitud cumple con todos los requisitos y su score crediticio es válido, su financiamiento será aprobado. De lo contrario, será rechazado.",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo solicitar un financiamiento?",
        action: "loan-request",
        owner: "user",
      },
      {
        text: "¿Por qué mi financiamiento fue rechazado?",
        action: "loan-reject",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "loan-reject",
    text: "Su solicitud de financiamiento puede ser rechazada si se determina que no cumple con los requisitos de la plataforma. Esto puede ser por solicitar un monto cuyas cuotas sean mayores al triple de su salario mensual, por enviar documentos incorrectos, por un score crediticio inválido o porque alguno de los garantes no cumpla con los requerimientos. Sin embargo, es posible volver a solicitar un financiamiento nuevamente.",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo solicitar un financiamiento?",
        action: "loan-request",
        owner: "user",
      },
      {
        text: "¿Por qué necesito dos garantes?",
        action: "loan-guarantors",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "loan-guarantors",
    text: "Los garantes son aquellas personas que se comprometen a pagar las cuotas del préstamo en caso de que el usuario principal no lo haga. Para solicitar un financiamiento de la plataforma, es nesario introducir los datos principales de 2 garantes, entre ellos su nombre y apellido, correo electrónico, teléfono, DNI, CUIT, recibos de sueldo, comprobante de domicilio y demás. Si algún documento del garante resultara inválido, la financiación puede ser rechazada por la plataforma. Por lo tanto, es importante llenar con cuidado la información de los 2 garantes",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo solicitar un financiamiento?",
        action: "loan-request",
        owner: "user",
      },
      {
        text: "¿Por qué mi financiamiento fue rechazado?",
        action: "loan-reject",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "invest-requirement",
    text: "Para invertir, primero debes haber validado tu identidad. Posteriormente, solo debes hacer la transferencia del dinero a través de nuestra pasarela de pago. Una vez que se realice la transacción, empezarás a recibir ganancias a partir del siguiente mes.",
    owner: "chatbot",
    options: [
      {
        text: "¿Cuál es la tasa de interés de mis inversiones?",
        action: "invest-interest-rate",
        owner: "user",
      },
      {
        text: "¿En qué momento puedo retirar mi dinero?",
        action: "invest-retire-time",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "invest-interest-rate",
    text: "Actualmente, nuestra tasa de interés para las inversiones se encuentra en 1.52%.",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo invertir?",
        action: "invest-requirement",
        owner: "user",
      },
      {
        text: "¿En qué momento puedo retirar mi dinero?",
        action: "invest-retire-time",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "invest-retire-time",
    text: "Una vez realizada tu inversión, puede retirar tu dinero en cualquier momento.",
    owner: "chatbot",
    options: [
      {
        text: "¿Cómo invertir?",
        action: "invest-requirement",
        owner: "user",
      },
      {
        text: "¿Cuál es la tasa de interés de mis inversiones?",
        action: "invest-interest-rate",
        owner: "user",
      },
      {
        text: "Volver a las preguntas iniciales",
        action: "welcome",
        owner: "user",
      },
    ],
  },
];
