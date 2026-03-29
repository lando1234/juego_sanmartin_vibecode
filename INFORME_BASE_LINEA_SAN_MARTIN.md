# Informe Base: Linea San Martin para Juego Web

Fecha: 2026-03-27

## 1. Objetivo del informe

Este documento junta contexto real de la linea San Martin del AMBA y lo traduce a material util para disenar un juego web de avance por vagones, con peleas y progresion hasta llegar al furgon final.

Hay dos tipos de contenido:

- `Hechos verificados`: datos de recorrido, servicio, infraestructura y operacion.
- `Inferencias de diseno`: perfiles, arquetipos y situaciones ambientadas para construir gameplay sin tratarlas como descripcion literal de todas las personas que viajan en la linea.

## 2. Contexto real de la linea

### 2.1 Recorrido y funcion

La linea San Martin une Retiro con Pilar y Dr. Cabred. Es una linea clave de cercanias entre CABA y el noroeste del conurbano. Segun fuentes oficiales, el corredor moviliza alrededor de 169.000 a 170.000 pasajeros diarios y su area de influencia alcanza a millones de personas por mes.

Cruza zonas muy distintas entre si:

- `Terminal y zonas centrales`: Retiro, Palermo, Villa Crespo.
- `Barrios urbanos intermedios`: La Paternal, Villa del Parque, Devoto.
- `Municipios suburbanos`: Tres de Febrero, Hurlingham, San Miguel, Jose C. Paz.
- `Borde periurbano y nodos de expansion`: Derqui, Astolfi, Pilar, Cabred.

Para el juego esto es importante porque la linea no tiene un solo tono social o visual: cambia mucho segun el tramo.

### 2.2 Sensacion de viaje

El viaje mezcla:

- Rutina laboral y estudiantil.
- Tramos muy cargados en hora pico.
- Estaciones remodeladas y otras con una estetica mas cruda o de borde.
- Ruido de vias, puertas automaticas, frenadas, altoparlantes y vendedores.
- Contraste entre sectores elevados del viaducto y sectores mas abiertos o perifericos.

Esto sirve para que cada nivel tenga una identidad propia aunque siga ocurriendo "adentro del mismo tren".

### 2.3 Infraestructura relevante

Fuentes oficiales describen:

- Proyecto de modernizacion Retiro-Pilar.
- Renovacion de vias y aparatos de via.
- Electrificacion proyectada en el tramo principal.
- Sistema de senalamiento con proteccion automatica ATS.
- Talleres y playa operativa.
- Estaciones con mejoras de accesibilidad, iluminacion, banos, ascensores y senaletica en varios puntos.

Desde julio de 2024 se informo nuevamente la implementacion del ATS en la linea, en el marco de la emergencia ferroviaria. En enero de 2025 el Gobierno tambien informo la compra de locomotoras diesel-electricas para reforzar la operacion del San Martin.

Para el juego, esto habilita una mezcla muy buena entre:

- mundo cotidiano;
- mundo mecanico ferroviario;
- tension por seguridad, senales, cables, talleres y control operacional.

## 3. Distintos tipos de vagones y espacios jugables

Nota: en la operacion real del San Martin predominan formaciones diesel de pasajeros con coches estandar y sectores auxiliares. Para el juego conviene exagerar levemente la diferenciacion interna para que la progresion por niveles sea legible.

### 3.1 Vagon comun de pasajeros

Es el corazon del juego. Tiene:

- Asientos laterales o combinados.
- Pasillo central relativamente angosto.
- Puertas automaticas a ambos lados.
- Barrales, agarres y espacio para pasajeros parados.
- Sonidos de aviso, frenada y apertura.

Uso jugable:

- Nivel base.
- Pelea cuerpo a cuerpo en espacio comprimido.
- Obstaculos con pasajeros neutrales.
- Interrupciones por apertura de puertas en estaciones.

### 3.2 Vagon mas cargado de hora pico

No es otro coche distinto a nivel tecnico, pero si un "tipo de nivel" distinto.

Rasgos:

- Saturacion humana.
- Muy poca movilidad.
- Golpes cortos, empujones, bloqueos.
- Enemigos que usan a la multitud como escudo.

Uso jugable:

- Nivel de dificultad tactica.
- Menos lugar para combos largos.
- Mas importancia del timing y la posicion.

### 3.3 Vagon semivacio de tramo largo

Aparece en horarios o sectores menos densos, hacia el oeste/noroeste.

Rasgos:

- Mas distancia entre grupos.
- Ventanas y exterior mas visibles.
- Sensacion de respiro antes de la siguiente pelea.

Uso jugable:

- Nivel de transicion.
- Mini jefe itinerante.
- Escena de historia o decision.

### 3.4 Sector de bicicletas / bultos / objetos grandes

Las formaciones modernas incorporaron espacios de accesibilidad y guardado. Aunque no todos los coches se vivan igual, para gameplay conviene consolidar un nivel centrado en objetos.

Rasgos:

- Bicis, bolsos, changuitos, paquetes.
- Objetos que traban paso o sirven de cobertura.
- Riesgo de tropiezo o rebote.

Uso jugable:

- Combate con fisica simple.
- Armas improvisadas del entorno.
- Enemigos que empujan objetos para cerrar el paso.

### 3.5 Vagon de borde operativo

Espacio inspirado en zonas de acceso restringido, interconexion entre coches, cabina cerrada, mantenimiento o extremos de la formacion.

Rasgos:

- Mas metal expuesto.
- Vibracion mas intensa.
- Senaletica tecnica.
- Sensacion de "aca ya no viaja cualquiera".

Uso jugable:

- Ultimos niveles antes del final.
- Enemigos mas duros.
- Menos civiles, mas tension.

### 3.6 Furgon final

Tomando tu idea, el furgon funciona mejor como zona de boss y cierre de run.

En la realidad reciente aparecio el furgon vacio como elemento visible en la narrativa publica del San Martin a partir del choque de Palermo del 10 de mayo de 2024. Para el juego, el furgon puede resignificarse como:

- deposito de mercaderia;
- guarida del jefe;
- zona tomada por una banda;
- espacio donde se guarda "la recompensa" o el objetivo.

Uso jugable:

- Boss final.
- Mecanicas mas sucias y menos regladas.
- Objetos de carga, cadenas, cajas, herramientas, puertas corredizas, luz deficiente.

## 4. Personajes extranos o memorables que se pueden encontrar

Importante: como la idea del proyecto es satirica, conviene trabajar con `arquetipos de tren` reconocibles, amplificados para ficcion. La satira funciona mejor cuando exagera conductas y codigos del viaje antes que cuando degrada a personas concretas.

### 4.1 Arquetipos civiles / neutrales

- `El dormido profesional`: se duerme en cualquier posicion, parece inofensivo, pero puede caer encima en una frenada.
- `La pasajera radar`: detecta todo lo que pasa en el vagon, comenta, advierte y senala peligros antes que nadie.
- `El que viaja con bolso imposible`: ocupa medio pasillo con mochila, bolso, bolsa y abrigo.
- `La persona de ventanilla`: mira todo el viaje, reacciona a cambios del paisaje y funciona como termometro del nivel.
- `El que sube justo y bloquea la puerta`: genera caos sin querer.
- `La madre o padre estratega`: protege espacio, criatura, cochecito o bolsos como si fuera una fortaleza.
- `El ciclista`: necesita girar, acomodar y defender su bici en un espacio minimo.

### 4.2 Arquetipos de color ferroviario

- `El vendedor ambulante`: recorre varios vagones con speech propio, ritmo insistente y gran movilidad. Como NPC o enemigo da mucho juego porque conoce el tren mejor que nadie.
- `La vendedora reina del speech`: no vende un producto, vende una presentacion. Tiene latiguillos, remate y una presencia casi de announcer.
- `El vendedor relampago`: entra, recita todo a velocidad imposible, cobra exacto y desaparece antes de que el tren frene.
- `El vendedor zen`: ofrece algo minimo con una calma desconcertante en medio del caos.
- `El musico de formacion`: entra, ejecuta, pide colaboracion y desaparece en la siguiente parada.
- `El predicador`: usa el vagon como escenario y rompe el ritmo general.
- `El narrador indignado`: opina de politica, tarifas, demoras y seguridad sin que nadie le haya preguntado.
- `La figura silenciosa`: alguien que viaja con estetica rara, mirada fija o comportamiento ambiguo. Ideal para suspenso.
- `El linyera filosofo`: parece desconectado, pero suelta una frase exacta sobre el tren, el pais o el protagonista. Puede funcionar como NPC sabio, comic relief o miniboss impredecible.
- `El linyera emperador del asiento`: defiende su rincon como territorio soberano y obliga a negociar o pelear.
- `El cartonero o recolector de objetos`: mueve bultos, conoce horarios flojos y zonas de paso.
- `El barra viajero`: fanatico de club, verborragico, territorial, ideal como miniboss carismatico.
- `El vendedor de medias legendario`: arquetipo inevitable del tren metropolitano, util como personaje recurrente con frases propias, upgrades absurdos o duelo ritual.
- `La inspectora fantasma`: nadie sabe si realmente controla boletos, seguridad o solo impone presencia.
- `El pibe freestyle del estribo`: mezcla energia de calle, humor y provocacion.
- `La pareja toxicamente sincronizada`: discuten, se amigaron, vuelven a discutir y condicionan todo el vagon.
- `El jubilado cronista`: recuerda como era el tren hace decadas y compara todo con otra epoca.
- `La bruja de la SUBE`: siempre sabe cuando la maquina no anda, cuando hay paro, cuando no va a pasar nada y cuando conviene bajarse ya.

### 4.3 Arquetipos de amenaza para gameplay

- `El empujador`: gana por volumen, avance y desorden.
- `La dupla coordinada`: uno distrae y otro ataca.
- `El colado acrobatico`: se mueve entre puertas y uniones de coches con soltura.
- `El pesado del pasillo`: ocupa el centro del vagon y obliga a pelear en angulo.
- `El guardian del acceso`: cuida la puerta al siguiente coche.
- `El jefe de furgon`: mezcla autoridad de calle, conocimiento del tren y control del territorio final.

### 4.4 Lore satirico sugerido del San Martin

Para que el juego tenga identidad propia, conviene ordenar a estos personajes como un pequeno "ecosistema mitologico" del tren:

- `La Cofradia del Pasillo`: vendedores ambulantes que se conocen entre si, se pasan informacion y dominan la circulacion entre coches.
- `Los Reyes del Asiento de Tres`: faccion obsesionada con ocupar mas espacio del que corresponde.
- `La Orden del Furgon`: banda final que controla mercaderia, herramientas y accesos restringidos.
- `Los Profetas del Retraso`: personajes que siempre predicen cancelaciones, accidentes, cambios de anden y apocalipsis ferroviario.
- `Los Linyeras del Ultimo Coche`: figuras semilegendarias que aparecen cuando el viaje se pone raro y pueden ser aliados, obstaculos o jefes absurdos.
- `La Voz del Altoparlante`: presencia casi omnisciente que en clave satirica comenta el caos como si todo estuviera bajo control.

Este "lore" no tiene que ser realista al 100 por ciento. Al contrario: cuanto mas consistente sea internamente, mas facil sera hacer humor, bosses y dialogos memorables.

## 5. Perfil de las personas que viajan en el San Martin

Esto debe leerse como una `tipologia de uso del servicio`, no como una etiqueta fija sobre la gente.

### 5.1 Perfil dominante

El San Martin funciona sobre todo como tren de traslado diario. El perfil mas fuerte es:

- trabajadores que van y vuelven de CABA o de polos de empleo intermedios;
- estudiantes secundarios, terciarios o universitarios;
- personas que combinan tren con colectivo, subte o caminata larga;
- pasajeros que hacen viajes extensos desde el noroeste hacia zonas centrales;
- usuarios sensibles a frecuencia, cancelaciones y demoras porque el tren es parte critica de su rutina.

Esto surge del rol territorial de la linea, de su volumen de usuarios y de testimonios periodisticos de viaje cotidiano. En otras palabras: es un tren de necesidad real, no un trayecto turistico.

### 5.2 Variacion por tramo

- `Retiro-Palermo-Villa Crespo`: mas mezcla de oficinistas, estudiantes, personal de servicios, combinaciones y flujo urbano rapido.
- `La Paternal-Devoto-Caseros`: perfil barrial y de traslados intermedios.
- `Hurlingham-San Miguel-Jose C. Paz`: alto componente de viaje diario de trabajo y estudio, flujo intenso, mas uso funcional que contemplativo.
- `Derqui-Astolfi-Pilar-Cabred`: viajes largos, gente con bolsos, menor densidad relativa segun horario, mas sensacion de borde o final de linea.

### 5.3 Rasgos de comportamiento utiles para diseno

- Tolerancia alta al movimiento brusco y al espacio reducido.
- Atencion parcial: muchos pasajeros observan, pero no siempre intervienen.
- Capacidad de adaptacion a demoras, desbordes y cambios de recorrido.
- Sensibilidad a puertas, asientos, espacio personal y lugar para bajar.
- Conciencia practica del tren: quien viaja seguido sabe donde conviene pararse y por donde escapar.

## 6. Aspectos clave para un juego por niveles de luchas

Tu idea de "escalar vagones hasta llegar al furgon" encaja muy bien con la logica del San Martin porque el tren ya tiene de por si:

- flujo lineal;
- tension de puertas y estaciones;
- mezcla de tramos muy llenos y tramos mas abiertos;
- identidad sonora y visual fuerte;
- sensacion de progresion fisica dentro de una formacion.

### 6.1 Fantasia central del juego

Una buena fantasia no es "matar a pasajeros" sino `abrirse paso por una formacion tomada`, donde algunos coches estan dominados por distintas bandas, personajes o situaciones.

Eso permite:

- conservar el color local;
- evitar una lectura gratuita de violencia contra civiles;
- justificar minibosses por coche;
- usar el furgon como objetivo narrativo fuerte.

### 6.2 Estructura de niveles sugerida

#### Nivel 1: Vagon comun

- Tutorial.
- Mucha gente, poca agresion directa.
- Presenta puertas, agarres, frenadas y golpes cortos.

#### Nivel 2: Vagon de vendedores

- Enemigos moviles.
- Ataques de distancia corta con cajas, bolsas, termos, mercaderia.
- Audio caotico y rutas de movimiento rapidas.

#### Nivel 3: Vagon hora pico

- Espacio minimo.
- Dificultad por hacinamiento.
- El jugador aprende a leer aperturas pequenas.

#### Nivel 4: Vagon de personajes raros

- Conductas impredecibles.
- Menos cantidad de enemigos, mas patron especial.
- Puede haber suspenso y humor raro.

#### Nivel 5: Vagon de bicicletas y bultos

- Nivel de objetos interactivos.
- Caidas, trabas, empujes, cobertura.

#### Nivel 6: Vagon de barra / banda territorial

- Enemigos mas coordinados.
- Identidad visual fuerte.
- Primer boss serio.

#### Nivel 7: Borde operativo

- Menos pasajeros.
- Mas metal, ruido, peligro de caida, puertas duras.
- Ritmo mas tenso y previo al final.

#### Nivel 8: Furgon

- Boss final.
- Espacio industrial y sucio.
- Fases del combate con cajas, cadenas, herramientas, portones y luz intermitente.

### 6.3 Elementos del San Martin que dan identidad propia

Para que no sea "un beat'em up cualquiera adentro de un tren", conviene explotar:

- voces de altoparlante;
- nombres de estaciones reales o inspiradas;
- paisaje del viaducto y del conurbano;
- puertas que abren en estaciones y alteran la arena;
- ruido del traqueteo y frenadas;
- cambios de densidad segun tramo;
- mezcla de humor, tension, cansancio y supervivencia cotidiana.

### 6.4 Mecanicas que pueden salir del contexto ferroviario

- `Apertura de puertas`: al detenerse el tren, cambia el espacio jugable.
- `Frenada brusca`: todos los personajes se desplazan unos pixels o pierden equilibrio.
- `Parada de estacion`: entra o sale gente, cambia la configuracion del combate.
- `Union entre vagones`: zona angosta y peligrosa, ideal para duelos.
- `Objetos del entorno`: mochilas, bolsos, termos, cajas, bicicletas, herramientas.
- `NPC neutrales`: se agachan, estorban, gritan o revelan datos.
- `Calor / cansancio / saturacion`: modificadores de dificultad en niveles avanzados.

## 7. Tono recomendado

El tono deberia quedar definido como `satira costumbrista ferroviaria con peleas arcade`. No conviene realismo crudo puro, pero tampoco una parodia vacia sin observacion del mundo real. El mejor punto es:

- base reconocible del AMBA;
- personajes exagerados pero no vacios;
- violencia estilizada, no gore;
- humor local y tension social;
- energia de viaje cotidiano convertido en odisea.

Referencias tonales posibles:

- beat'em up urbano;
- absurdo costumbrista;
- thriller barrial adentro de una formacion;
- satira de supervivencia cotidiana en el transporte publico.

La satira deberia apuntar a:

- los codigos no escritos del viaje;
- los discursos repetidos del tren;
- la lucha por espacio, asiento y paso;
- la teatralidad de vendedores, predicadores y opinologos;
- la sensacion de que cada vagon tiene su propia ley.

## 8. Riesgos creativos a evitar

- Caer en caricatura clasista del pasajero del conurbano.
- Tratar a todo el tren como espacio marginal uniforme.
- Hacer todos los vagones iguales en layout y ritmo.
- Usar solo "vendedores y locos" como identidad del tren.
- Convertir la linea en decorado generico sin detalles ferroviarios concretos.

## 9. Conclusiones practicas para el juego

Lo mas valioso del San Martin para este proyecto es:

1. `Tiene progresion geografica y social natural`: centro, barrios, conurbano, borde.
2. `Permite variedad visual sin salir del tren`: densidad, luz, objetos, estado del coche, paisaje exterior.
3. `Tiene cultura de viaje fuerte`: vendedores, linyeras, comentarios, cansancio, estrategias para subir y bajar, rutina laboral.
4. `El furgon final tiene mucho potencial`: mecanico, narrativo y visual.
5. `La idea funciona mejor si la amenaza no son "los pasajeros" sino coches tomados por facciones o personajes`.
6. `La satira puede ser la identidad principal`: no solo ambientacion, sino sistema de bosses, dialogos, items y nombres de niveles.

## 10. Recomendacion de base para la siguiente etapa

Con este informe, la mejor siguiente decision de diseno seria definir:

- protagonista;
- motivo para atravesar toda la formacion;
- cantidad exacta de niveles;
- tono visual: pixel art, ilustracion 2D o 3D estilizado;
- sistema de combate: simple arcade, combo ligero o combate tactico corto;
- jefes por vagon.

## 11. Fuentes

Hechos verificados y contexto ferroviario:

- Argentina.gob.ar, `Linea San Martin`: https://www.argentina.gob.ar/transporte/trenes-argentinos/horarios-tarifas-y-recorridos/areametropolitana/lineasanmartin
- Argentina.gob.ar, `Consulta Publica - FC San Martin`: https://www.argentina.gob.ar/transporte/dgppse/consulta-publica-fc-san-martin
- Argentina.gob.ar, `El tren San Martin sera electrico` (nota con cifras de pasajeros y tiempos): https://www.argentina.gob.ar/noticias/el-tren-san-martin-sera-electrico
- Argentina.gob.ar, `Modificaciones en el servicio y novedades` (servicios a Cabred y mejoras recientes): https://qa2-back.argentina.gob.ar/transporte/trenes-argentinos/modificaciones-en-el-servicio-y-novedades
- Argentina.gob.ar, `Comenzo la implementacion del sistema de frenado automatico ATS...` (5 de julio de 2024): https://www.argentina.gob.ar/noticias/comenzo-la-implementacion-del-sistema-de-frenado-automatico-ats-en-las-lineas-sarmiento-0
- Argentina.gob.ar, `Despues de 9 anos, Trenes Argentinos compra material rodante...` (20 de enero de 2025): https://www.argentina.gob.ar/noticias/despues-de-9-anos-trenes-argentinos-compra-material-rodante-y-repuestos-para-mejorar-la

Contexto periodistico y color de viaje:

- LA NACION, `Los pasajeros, contentos y aliviados con el nuevo viaducto del tren San Martin` (11 de julio de 2019, actualizado el 27 de enero de 2026): https://www.lanacion.com.ar/buenos-aires/los-pasajeros-contentos-aliviados-nuevo-viaducto-del-nid2266332/
- Infobae, `Cuales son las hipotesis de por que se produjo el choque de trenes de la linea San Martin` (10 de mayo de 2024): https://www.infobae.com/sociedad/2024/05/10/la-primera-hipotesis-de-por-que-se-produjo-el-choque-de-trenes-de-la-linea-san-martin/
- Diario Popular, `Inauguran los trenes del Ferrocarril San Martin` (23 de abril de 2014): https://www.diariopopular.com.ar/noroeste/inauguran-los-trenes-del-ferrocarril-san-martin-n189827

## 12. Nota metodologica

Las secciones de perfiles de pasajeros, personajes memorables y estructura de niveles combinan:

- datos reales de operacion y geografia de la linea;
- observaciones de cultura de viaje publicamente documentada;
- inferencia de diseno orientada a videojuego.

No deben leerse como descripcion exhaustiva ni cerrada de quienes viajan en el San Martin, sino como una base creativa controlada para construir un juego con identidad local.
