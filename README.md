<div align="center">
  <h2>Bienvenido a Financia.al</h2>
  <img src="https://github.com/user-attachments/assets/c2fb72ed-24db-4d00-a6ef-a857ee488b11" alt="Logo de Financia.al" width="100px" />
</div>


## 🚀 Introducción

**Financia.al** es una plataforma web fintech que busca conectar a inversores interesados en financiar la venta de terrenos en distintos países de Latinoamérica con potenciales compradores. Ofrecemos una experiencia simplificada y segura para que todos los usuarios puedan hacer solicitudes de financiamiento, pagar sus cuotas e invertir sus fondos en un activo de sólida revalorización a mediano plazo.

---
## 🎯 Objetivo Principal

Conectar a inversores interesados en financiar la venta de terrenos en distintos países de Latinoamérica con compradores potenciales.

---
## 🌟 Funcionalidades

<p>✅ <strong>Gestión de Financiamiento:</strong> Herramientas que permite a los usuarios definir términos de pago, tasas de interés y plazos personalizados.</p>
<p>✅ <strong>Simulador de Crédito:</strong> Un simulador interactivo que permite a los compradores e inversores simular diferentes escenarios de crédito y visualizar los resultados, estimando el monto de las cuotas mensuales basadas en el capital solicitado, tasa de interés y plazo.</p>
<p>✅ <strong>Evaluación de Riesgo Crediticio:</strong> Herramienta que permite evaluar el riesgo crediticio de los usuarios compradores, brindando transparencia para los inversores.</p>
<p>✅ <strong>Autenticación de Usuarios:</strong> Proceso de verificación riguroso que asegura la identidad de todos los usuarios para garantizar la confidencialidad y seguridad.</p>
<p>✅ <strong>Panel de Control de Usuarios:</strong> Muestra un resumen de las finanzas realizadas por el usuario. A los compradores les muestra la información de sus préstamos y cuotas a pagar. Mientras que a los inversores les muestra un resumen completo de su inversión y las ganancias por mes.</p>
<p>✅ <strong>Chatbot de Atención al Cliente:</strong> Chatbot que responde a preguntas frecuentes sobre la plataforma.</p>

---
## 📝 Instrucciones de Configuración e Instalación Local

### Software requerido:
- **Node.js** (versión 16 o superior)
- **Git**
- **Visual Studio** (.NET 8 o superior)
- **Visual Studio Code** (C# Dev Kit)
- **Microsoft SQL Server 2019+**
- **SQL Server Management Studio**
- **PostgreSQL**
### Pasos para instalar el proyecto:

1. **Clonar el repositorio**:
    ```
    git clone https://github.com/No-Country-simulation/equipo-h3-18-proptech.git
    ```

2. **Para configurar el Frontend, es necesario entrar en la carpeta Frontend y luego en h3-18-proptech para poder instalar las dependencias**:
    ```
    \equipo-h3-18-proptech>cd Frontend
    \equipo-h3-18-proptech\Frontend> cd h3-18-proptech
    \equipo-h3-18-proptech\Frontend\h3-18-proptech> npm install
    ```

3. **Dentro de la carpeta `h3-18-proptech`, crear el archivo `.env` y agregar las siguientes variables de entorno**:
   ```env
   VITE_BACKEND_URL=<URL donde se encuentra alojado el Backend>
   VITE_MERCADO_PAGO_KEY=<Llave para desarrolladores de Mercado Pago>
   ```

4. **Ejecutar el servidor de desarrollo Frontend**:
   ```env
   \equipo-h3-18-proptech\Frontend\h3-18-proptech> npm run dev
   ```

6. **Visitar la URL**: [http://localhost:5173/](http://localhost:5173/)

### Configuración del Backend

#### Requisitos de servicios externos:
- **SendGrid** (para servicios de correo):
  - Necesitas un correo empresarial/fintech y una API Key, que puedes obtener en SendGrid.
- **Cloudinary** (para almacenamiento de archivos multimedia):
  - Necesitas `cloudName`, `apiKey` y `apiSecret`. Puedes registrarte y obtenerlas en Cloudinary.
- **Mercado Pago** (para pasarela de pagos):
  - Necesitas un `accessToken` y una `secretKey` para webhooks. Puedes obtenerlas desde Mercado Pago Developers.
> **Nota**: Asegúrate de reemplazar las URLs y claves en los archivos de configuración con los valores correctos obtenidos de las respectivas plataformas mencionadas. Para más información, visita las páginas oficiales de [SendGrid](https://sendgrid.com/en-us/blog/introducing-api-key-permissions), [Cloudinary](https://cloudinary.com/documentation/finding_your_credentials_tutorial) y [Mercado Pago Developers](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/credentials).

#### Configuración de bases de datos:
- **PostgreSQL**: Necesitas una cadena de conexión para la base de datos de la aplicación.
- **SQL Server**: Necesitas otra cadena de conexión para la base de datos de autenticación (Identity Framework).

#### Configuración de variables de entorno:
1. Ve a la carpeta `equipo-h3-18-proptech\Backend\h3-18-proptechback\h3-18-proptechback.API`.
2. Crear el archivo `appsettings.Development.json` y pegar el siguiente contenido, reemplazando los valores con tus claves obtenidas:
    ```json
    {
      "ConnectionStrings": {
        "ConnectionString": "[Tu cadena de conexión de PostgreSQL]",
        "IdentityConnectionString": "[Tu cadena de conexión de SQL Server]"
      },
      "EmailSettings": {
        "ApiKey": "[Tu API Key de SendGrid]",
        "FromAddress": "[Correo empresarial/fintech]",
        "FromName": "Financial.AI"
      },
      "Logging": {
        "LogLevel": {
          "Default": "Information",
          "Microsoft.AspNetCore": "Warning"
        }
      },
      "AllowedHosts": "*",
      "JwtSettings": {
        "Key": "[Tu clave JWT]",
        "Issuer": "https://www.equipo-h3-18-proptechbackend.somee.com",
        "Audience": "https://equipo-h3-18-proptech-desarrollo.onrender.com",
        "DurationInMinute": 360
      },
      "CloudinarySettings": {
        "CloudName": "[Tu CloudName de Cloudinary]",
        "ApiKey": "[Tu ApiKey de Cloudinary]",
        "ApiSecret": "[Tu ApiSecret de Cloudinary]"
      },
      "apiUrl": "https://api.bcra.gob.ar/CentralDeDeudores/",
      "dolarAPIURL": "https://dolarapi.com",
      "MercadoPagoConfiguration": {
        "AccessToken": "[Tu AccessToken de Mercado Pago]",
        "WebHookSecretKey": "[Tu SecretKey de webhooks de Mercado Pago]"
      }
    }
    ```
1. Reemplaza el valor `[TU clave JWT]` con una clave secreta de **32 caracteres** o más. 
#### Configurar las bases de datos:
1. Vuelve a la carpeta `equipo-h3-18-proptech\Backend\h3-18-proptechback`.
2. Abre el archivo `h3-18-proptechback.sln` con Visual Studio.
3. Abre la Consola del Administrador de Paquetes en Visual Studio.
![imagen](https://github.com/user-attachments/assets/25b3f084-bb2a-4491-8a37-afda16a8aa57)


5. Ejecuta los siguientes comandos para aplicar las migraciones y crear las bases de datos:
    ```powershell
    update-database -context h3_18_proptechbackIdentityDbContext
    update-database -context ApplicationDbContext
    ```

#### Ejecutar el proyecto:
Presiona **F5** en Visual Studio para iniciar el proyecto.

---
## 🛠️ Tecnologías

<table>
  <thead>
    <tr>
      <th>Front-End</th>
      <th>Back-End</th>
      <th>UX/UI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img alt="typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"></td>
      <td><img alt="csharp" src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white"></td>
      <td><img alt="figma" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"></td>
    </tr>
    <tr>
      <td><img alt="react.js" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"></td>
      <td><img alt="dotnet" src="https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white"></td>
      <td><img alt="canvas" src="https://img.shields.io/badge/Canva-%2300C4CC.svg?&style=for-the-badge&logo=Canva&logoColor=white"></td>
    </tr>
    <tr>
      <td><img alt="vite" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"></td>
      <td><img alt="microsoft-sql-server" src="https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white"></td>
      <td></td>
    </tr>
    <tr>
      <td><img alt="tailwindcss" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"></td>
      <td><img alt="postgresql" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"></td>
      <td></td>
    </tr>
  </tbody>
</table>
<br>

---
## 🌐 Integraciones Externas

La plataforma **Financia.al** utiliza diversas herramientas y servicios externos para ofrecer funcionalidades avanzadas y garantizar una experiencia óptima para los usuarios:

- 🖼️ **Cloudinary**: Gestión y almacenamiento de archivos multimedia y documentos en la nube. Este servicio permite cargar, almacenar, transformar y entregar archivos multimedia de manera eficiente.

- 💱 **DolarAPI**: Integración para consultar el tipo de cambio oficial del dólar a distintas monedas locales, facilitando transacciones financieras internacionales y cálculos precisos.

- 💳 **MercadoPago**: Implementación de una pasarela de pagos que permite realizar pagos con tarjetas de crédito, débito, y billeteras virtuales de manera segura.

- 📊 **BCRA API**: Consumo de la API del Banco Central de la República Argentina para obtener el score crediticio de entidades según el CUIT, lo que fortalece la evaluación de riesgo crediticio.

- ✉️ **SendGrid**: Herramienta para la personalización y envío de correos electrónicos transaccionales y de notificaciones, asegurando una comunicación directa y profesional con los usuarios.
---

## 👫 Equipo

  <h3>⚛️ Front-End</h3>
  <dd>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>GitHub</th>
          <th>LinkedIn</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Angel Añez</td>
          <td>
            <a href="https://github.com/AngelAnez">
              <img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
            </a>
          </td>
          <td>
            <a href="https://www.linkedin.com/in/angel-anez/">
              <img src="https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
            </a>
          </td>
        </tr>
        <tr>
          <td>Emanuel Capo</td>
          <td>
            <a href="https://github.com/Emanuel-Capo">
              <img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
            </a>
          </td>
          <td>
            <a href="https://www.linkedin.com/in/emanuel-capo/">
              <img src="https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </dd>
  <h3>💻 Back-End</h3>
  <dd>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>GitHub</th>
          <th>LinkedIn</th>
        </tr>
      </thead>
      <tbody>
        <tr>
              <td>Abel Montes Vega</td>
              <td>
                <a href="https://github.com/AbelMV29/">
                  <img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
                </a>
              </td>
              <td>
                <a href="https://www.linkedin.com/in/abel-montes-vega/">
                  <img src="https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
                </a>
              </td>
            </tr>
            <tr>
              <td>Deivison Jiménez</td>
              <td>
                <a href="https://github.com/Deivison81">
                  <img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
                </a>
              </td>
              <td>
                <a href="https://www.linkedin.com/in/deivison-jimenez/">
                  <img src="https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
                </a>
              </td>
            </tr>
      </tbody>
    </table>
  </dd>
  <dd>
  <h3>🖌 UX/UI</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Github</th>
            <th>Linkedin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Natalia Caniza</td>
            <td>
              <a href="https://github.com/NatiCaniza">
                <img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
              </a>
            </td>
            <td>
              <a href="https://www.linkedin.com/in/naticaniza/">
                <img src="https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
  </dd>
  <dd>
  <h3>♟️ Team Leader</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Github</th>
              <th>Linkedin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gloria Nabor</td>
              <td>
                <a href="http://github.com/Gloria-Nabor">
                  <img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
                </a>
              </td>
              <td>
                <a href="https://www.linkedin.com/in/gloria-nabor">
                  <img src="https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
  </dd>
<br>

---

## 🔗 Enlaces Importantes

* 🚀 [Front-End Deploy](https://equipo-h3-18-proptech-desarrollo.onrender.com/)
* 📜 [Back-End Swagger Documentation](https://www.equipo-h3-18-proptechbackend.somee.com/swagger/index.html)
* 🖌️ [Figma Design](https://www.figma.com/design/ELq2yYVZYHbDrE9ViAVQ8X/equipo-h3-18-proptech?node-id=149-17&p=f&t=SWJbM5Go1VvekH60-0)

