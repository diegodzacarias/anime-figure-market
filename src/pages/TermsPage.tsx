import { config } from "@/config";
import Navbar from "@/components/Navbar";

const TermsPage = () => {
  const { platformName, contactEmail } = config;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Términos y Condiciones</h1>
        <div className="max-w-3xl space-y-6 text-foreground">
          <p className="text-sm text-muted-foreground">Última actualización: 2026</p>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">1. Aceptación de Términos</h2>
            <p className="text-muted-foreground">
              Al acceder y utilizar {platformName}, aceptas estar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con cualquier parte de estos términos, no debes utilizar nuestra plataforma. Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">2. Descripción del Servicio</h2>
            <p className="text-muted-foreground">
              {platformName} es un catálogo en línea de figuras de anime que permite a los usuarios explorar, descubrir y consultar información sobre figuras de diferentes franquicias y personajes. La plataforma proporciona herramientas de búsqueda, filtrado y visualización de datos sobre figuras disponibles.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">3. Licencia de Uso</h2>
            <p className="text-muted-foreground">
              Otorgamos una licencia personal, no transferible y limitada para acceder y utilizar {platformName} únicamente con propósitos personales y no comerciales. Está prohibido:
            </p>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <ul className="list-inside list-disc space-y-2">
                <li>Reproduzir, duplicar o copiar contenidos sin autorización expresa</li>
                <li>Usar la plataforma para recopilar datos de forma masiva (scraping)</li>
                <li>Crear herramientas automatizadas para acceder a la plataforma sin permiso</li>
                <li>Intentar obtener acceso no autorizado a sistemas o datos</li>
                <li>Modificar, adaptar o traducir contenidos de la plataforma</li>
                <li>Usar la plataforma para fines competitivos o comerciales no autorizados</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">4. Registro de Cuenta</h2>
            <p className="text-muted-foreground">
              Algunos servicios pueden requerir que crees una cuenta. Eres responsable de:
            </p>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <ul className="list-inside list-disc space-y-2">
                <li>Proporcionar información precisa y actualizada en tu registro</li>
                <li>Mantener la confidencialidad de tu contraseña</li>
                <li>Ser responsable de toda actividad bajo tu cuenta</li>
                <li>Notificarnos de acceso no autorizado a tu cuenta</li>
              </ul>
            </div>
            <p className="mt-3 text-muted-foreground">
              Nos reservamos el derecho de suspender o eliminar cuentas que violen estos términos.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">5. Contenido e Información</h2>
            <p className="text-muted-foreground">
              {platformName} proporciona información sobre figuras de anime, incluyendo descripciones, imágenes, especificaciones y datos relacionados. Esta información se proporciona "tal cual" sin garantías de exactitud, completitud o disponibilidad. No somos responsables por errores, omisiones o cambios en la información del catálogo.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">6. Propiedad Intelectual</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <p className="mb-2">
                  <strong className="text-foreground">{platformName} No Es Propietario de las Figuras, Imágenes ni Contenido de Anime:</strong>
                </p>
                <p>
                  {platformName} es un catálogo informativo que recopila y exhibe información sobre figuras de anime. <strong className="text-foreground">No somos propietarios de</strong>:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-2">
                  <li><strong className="text-foreground">Imágenes:</strong> Todas las imágenes de figuras son propiedad de fabricantes, distribuidores y sus respectivos derechohabientes</li>
                  <li><strong className="text-foreground">Títulos y Nombres:</strong> Los nombres de figuras, títulos de anime, personajes y descripciones pertenecen a sus propietarios originales</li>
                  <li><strong className="text-foreground">Personajes y Franquicias:</strong> Todos los personajes, series de anime, manga y franquicias son propiedad de estudios de animación, autores, editores y empresas de medios</li>
                  <li><strong className="text-foreground">Datos y Especificaciones:</strong> La información sobre figuras (precios, disponibilidad, especificaciones) es propiedad de sus fabricantes y distribuidores</li>
                </ul>
              </div>
              <div>
                <p className="mb-2">
                  <strong className="text-foreground">Propiedad de {platformName}:</strong>
                </p>
                <p>
                  Los únicos contenidos de los cuales {platformName} es propietaria son: el diseño de la plataforma, estructura del código, interfaz de usuario, sistema de navegación y la selección y organización específica de información. Estos están protegidos por leyes de propiedad intelectual.
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong className="text-foreground">Tu Acceso:</strong>
                </p>
                <p>
                  Se te otorga un derecho limitado, no transferible y personal de acceder a la plataforma únicamente para uso informativo y no comercial. No posees ningún derecho sobre el contenido de figuras, imágenes o datos de anime mostrados.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">7. Enlaces Externos</h2>
            <p className="text-muted-foreground">
              {platformName} puede contener enlaces a sitios web externos de terceros. No somos responsables por el contenido, precisión, políticas o prácticas de estos sitios. Tu uso de sitios externos está sujeto a sus términos y políticas. Te recomendamos revisar sus términos antes de acceder.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">8. Conducta del Usuario</h2>
            <p className="text-muted-foreground">
              Aceptas no usar {platformName} para:
            </p>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <ul className="list-inside list-disc space-y-2">
                <li>Acosar, amenazar o difamar a otras personas</li>
                <li>Publicar contenido obsceno, ofensivo o ilegal</li>
                <li>Transmitir malware, virus o código malicioso</li>
                <li>Interferir con funcionamiento de la plataforma</li>
                <li>Intentar acceder sin autorización a cuentas de otros usuarios</li>
                <li>Violar derechos de propiedad intelectual de terceros</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">9. Renuncia de Garantías</h2>
            <p className="text-muted-foreground">
              {platformName} se proporciona "tal cual" sin garantías de ningún tipo, expresas o implícitas. No garantizamos disponibilidad, funcionalidad, precisión o que el acceso sea ininterrumpido. {platformName} no es responsable por:
            </p>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <ul className="list-inside list-disc space-y-2">
                <li>Daños directos, indirectos, incidentales o consecuentes</li>
                <li>Pérdida de datos, ganancias o uso</li>
                <li>Interrupción del servicio</li>
                <li>Acceso no autorizado a tu información</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">10. Limitación de Responsabilidad</h2>
            <p className="text-muted-foreground">
              En la máxima medida permitida por la ley, {platformName} no será responsable por daños de ningún tipo derivados del uso o imposibilidad de usar la plataforma, incluso si hemos sido advertidos de la posibilidad de tales daños.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">11. Indemnización</h2>
            <p className="text-muted-foreground">
              Aceptas indemnizar, defender y mantener indemne a {platformName}, sus propietarios, empleados y afiliados de cualquier reclamación, pérdida, daño o gasto (incluyendo honorarios legales) derivados de tu uso de la plataforma o violación de estos términos.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">12. Terminación</h2>
            <p className="text-muted-foreground">
              Podemos terminar o suspender tu acceso a {platformName} sin previo aviso si violamos estos términos. Al terminar, tu derecho de acceso cesa inmediatamente. Las secciones que por su naturaleza deben permanecer en vigencia seguirán aplicables.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">13. Ley Aplicable</h2>
            <p className="text-muted-foreground">
              Estos Términos y Condiciones se rigen por las leyes aplicables y tú te sometes a la jurisdicción exclusiva de los tribunales competentes. Cualquier disputa será resuelta a través de arbitraje o litigio según lo aplicable.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">14. Divisibilidad</h2>
            <p className="text-muted-foreground">
              Si cualquier disposición de estos términos se considera inválida o inaplicable, tal disposición será modificada en la medida mínima necesaria o, si no es posible, será separada. Las disposiciones restantes permanecerán en plena vigencia.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">15. Contacto</h2>
            <p className="text-muted-foreground">
              Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos en:
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

export default TermsPage;
