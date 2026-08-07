import { config } from "@/config";
import Navbar from "@/components/Navbar";

const PrivacyPage = () => {
  const { platformName, contactEmail } = config;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Política de Privacidad</h1>
        <div className="max-w-3xl space-y-6 text-foreground">
          <p className="text-sm text-muted-foreground">Última actualización: 2026</p>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">1. Introducción</h2>
            <p className="text-muted-foreground">
              {platformName} ("nosotros", "nuestro" o "la plataforma") se compromete a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, compartimos y protegemos tu información personal cuando utilizas nuestro catálogo de figuras de anime y servicios relacionados.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">2. Información que Recopilamos</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Información de Registro:</strong> Cuando creas una cuenta, recopilamos tu correo electrónico, nombre de usuario y contraseña (almacenada de forma segura mediante hash). Esto es opcional; puedes navegar nuestro catálogo sin crear una cuenta.
              </p>
              <p>
                <strong className="text-foreground">Datos de Navegación:</strong> Recopilamos información sobre cómo interactúas con nuestro catálogo, incluyendo figuras vistas, franquicias exploradas, búsquedas realizadas y tiempo de sesión. Esta información nos ayuda a mejorar la experiencia de descubrimiento.
              </p>
              <p>
                <strong className="text-foreground">Información de Preferencias:</strong> Almacenamos tus preferencias de navegación como moneda, idioma y tema visual (claro/oscuro). Estos datos se guardan en tu navegador localmente.
              </p>
              <p>
                <strong className="text-foreground">Información de Dispositivo:</strong> Tipo de navegador, sistema operativo, dirección IP y datos técnicos similares para garantizar compatibilidad y seguridad.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">3. Cómo Utilizamos Tu Información</h2>
            <div className="space-y-2 text-muted-foreground">
              <ul className="list-inside list-disc space-y-2">
                <li>Crear y mantener tu cuenta de usuario (si aplica)</li>
                <li>Personalizar tu experiencia de navegación según tus preferencias</li>
                <li>Mejorar el catálogo y las funcionalidades de descubrimiento</li>
                <li>Analizar patrones de uso para optimizar la plataforma</li>
                <li>Responder a consultas de usuarios</li>
                <li>Cumplir obligaciones legales y regulatorias</li>
                <li>Detectar y prevenir actividades no autorizadas</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">4. Almacenamiento y Seguridad</h2>
            <p className="text-muted-foreground">
              Tu información se almacena en servidores seguros con encriptación de datos en tránsito (HTTPS) y en reposo. Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tus datos contra acceso no autorizado, alteración o destrucción.
            </p>
            <p className="mt-3 text-muted-foreground">
              Sin embargo, ningún método de transmisión por internet es 100% seguro. Aunque nos esforzamos por proteger tu información, no podemos garantizar seguridad absoluta.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">5. Cookies y Tecnologías Similares</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies y tecnologías similares para mantener tu sesión activa, recordar tus preferencias, y analizar cómo utilizas la plataforma. Puedes controlar las cookies a través de la configuración de tu navegador. Ten en cuenta que desactivar cookies puede afectar algunas funcionalidades de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">6. Compartir Información</h2>
            <p className="text-muted-foreground">
              No vendemos ni compartimos tu información personal con terceros para marketing. Sin embargo, podemos compartir información con:
            </p>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <ul className="list-inside list-disc space-y-2">
                <li><strong className="text-foreground">Proveedores de Análisis:</strong> Servicios de análisis que nos ayudan a entender cómo los usuarios interactúan con el catálogo, bajo acuerdos de confidencialidad</li>
                <li><strong className="text-foreground">Autoridades Legales:</strong> Si es requerido por ley o para proteger derechos legales</li>
                <li><strong className="text-foreground">En Caso de Cambio de Control:</strong> Si {platformName} es adquirida o fusionada, tu información puede transferirse como parte de ese cambio</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">7. Retención de Datos</h2>
            <p className="text-muted-foreground">
              Retenemos tu información personal mientras tu cuenta esté activa o según sea necesario para proporcionar nuestros servicios. Puedes solicitar la eliminación de tu cuenta y datos asociados en cualquier momento, sujeto a requisitos legales de retención (como para auditoría fiscal).
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">8. Tus Derechos</h2>
            <p className="text-muted-foreground mb-3">Tienes derecho a:</p>
            <div className="space-y-2 text-muted-foreground">
              <ul className="list-inside list-disc space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminación de tu información</li>
                <li>Optar por no recibir comunicaciones de marketing</li>
                <li>Exportar tus datos en formato estructurado</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">9. Aclaración sobre Propiedad Intelectual</h2>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Es importante que entiendas claramente:</strong> {platformName} <strong>NO es propietaria</strong> de:
            </p>
            <div className="space-y-2 text-muted-foreground mb-4">
              <ul className="list-inside list-disc space-y-2">
                <li><strong className="text-foreground">Imágenes de Figuras:</strong> Todas las imágenes de figuras mostradas en el catálogo son propiedad de sus respectivos creadores, editores y marcas comerciales</li>
                <li><strong className="text-foreground">Títulos y Nombres:</strong> Los nombres, títulos, descripciones y especificaciones de figuras pertenecen a sus respectivos propietarios de derechos de autor</li>
                <li><strong className="text-foreground">Personajes y Franquicias:</strong> Todos los personajes, anime, manga y franquicias mencionadas son propiedad de sus respectivos estudios, autores y editores</li>
                <li><strong className="text-foreground">Datos de Figuras:</strong> La información sobre figuras, precios, disponibilidad y especificaciones pueden ser propiedad de fabricantes y distribuidores</li>
              </ul>
            </div>
            <p className="text-muted-foreground">
              {platformName} es únicamente un catálogo informativo que recopila y organiza información pública sobre figuras de anime. Actuamos bajo los principios de uso justo (fair use) con propósitos educativos e informativos. Si eres propietario de derechos y tienes objeciones sobre el contenido mostrado, por favor contacta con nosotros.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">10. Enlaces Externos</h2>
            <p className="text-muted-foreground">
              {platformName} no es responsable por las políticas de privacidad de sitios externos vinculados desde nuestra plataforma. Te recomendamos revisar sus políticas de privacidad antes de proporcionar información personal.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">11. Cambios a Esta Política</h2>
            <p className="text-muted-foreground">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Publicaremos cambios significativos en esta página y notificaremos a usuarios registrados por correo electrónico si es necesario. Tu uso continuado de la plataforma constituye aceptación de los cambios.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">12. Contacto</h2>
            <p className="text-muted-foreground">
              Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu información, puedes contactarnos en:
            </p>
            <div className="mt-3 space-y-1 text-muted-foreground">
              <p><strong className="text-foreground">Email:</strong> {contactEmail}</p>
              <p><strong className="text-foreground">Plataforma:</strong> {platformName}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
