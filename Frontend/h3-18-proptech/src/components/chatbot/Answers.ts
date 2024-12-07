import { ChatbotAnswer } from "../../interfaces/Chatbot";

export const chatbotAnswers: ChatbotAnswer[] = [
  {
    question: "welcome",
    text: "¡Hola! Soy Financibot. Estoy aquí para resolver todas tus dudas. ¿En qué te puedo ayudar?",
    owner: "chatbot",
    options: [
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
      {
        text: "Financia.al",
        action: "platform",
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
        action: "loan-requirements",
        owner: "user",
      },
      {
        text: "¿En qué momento puedo retirar mi dinero?",
        action: "loan-time",
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
    text: "Para solicitar un financiamiento, es necesario indicar el costo del lote o terreno, el adelanto a pagar, la cantidad de cuotas deseadas y la Clave Bancaria Uniforme (CBU). Posteriormente es indispensable subir en formato PDF o Imagen los recibos de sueldo de los últimos 3 meses y un comprobante de servicio que valide tu domicilio actual. Finalmente, se debe completar toda la información personal y financiera, además de los archivos antes mencionados de las 2 personas que actuen como garantes del préstamo",
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
];
