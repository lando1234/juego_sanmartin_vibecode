import type {
  EnemyKind,
  GameState,
  ItemKind,
  LevelBounds,
  LevelLayout,
  SceneState,
} from "@/game/types/gameTypes";

export const VIEWPORT_WIDTH = 1280;
export const VIEWPORT_HEIGHT = 720;

type Spawn = {
  kind: EnemyKind;
  x: number;
  y: number;
};

type ItemPlacement = {
  kind: ItemKind;
  x: number;
  y: number;
};

type StationConfig = {
  station: string;
  subtitle: string;
  intro: string;
  openingObjective: string;
  firstWaveObjective: string;
  firstWaveClearedObjective: string;
  secondWaveObjective: string;
  secondWaveClearedObjective: string;
  bossObjective: string;
  victoryObjective: string;
  exitObjective: string;
  completionTitle: string;
  completionSummary: string;
};

export type CampaignLevel = {
  id: string;
  name: string;
  intro: string;
  bounds: LevelBounds;
  layout: LevelLayout;
  entryY: number;
  openingObjective: string;
  firstWaveObjective: string;
  firstWaveClearedObjective: string;
  secondWaveObjective: string;
  secondWaveClearedObjective: string;
  bossObjective: string;
  victoryObjective: string;
  exitObjective: string;
  completionTitle: string;
  completionSummary: string;
  items: ItemPlacement[];
};

const stationConfigs: StationConfig[] = [
  {
    station: "Dr. Cabred",
    subtitle: "Inicio rural",
    intro:
      "Arrancás donde el ramal se abre entre quintas, vías largas y poco ruido. El tren todavía respira.",
    openingObjective:
      "Salir de la cabecera rural sin dormirse: el primer vagón ya trae empujones de provincia.",
    firstWaveObjective:
      "En la primera subida aparecen los colados del andén. Limpialos antes de que te cierren la puerta.",
    firstWaveClearedObjective:
      "La vía quedó despejada. Todavía estás lejos de Capital, pero el viaje ya empezó a ponerse serio.",
    secondWaveObjective:
      "El tren se llena con los últimos que suben a apuro. Bancá la presión y no pierdas el pasillo.",
    secondWaveClearedObjective:
      "Se abrió espacio en la formación. Falta el jefe del tramo y después seguir rumbo a Pilar.",
    bossObjective:
      "El guarda fantasma de Dr. Cabred intenta frenar la partida. Bajalo y tomá impulso hacia el norte.",
    victoryObjective:
      "La cabecera quedó atrás. Caminá hasta la salida del andén y preparate para el siguiente tramo.",
    exitObjective:
      "Dr. Cabred ya quedó lejos. El ramal se endurece camino a Pilar.",
    completionTitle: "Dr. Cabred despejada",
    completionSummary:
      "Ricky arrancó el ramal sin ceder el vagón y metió la primera victoria en terreno abierto.",
  },
  {
    station: "Pilar",
    subtitle: "Cabecera cargada",
    intro:
      "Pilar mete gente de todas partes: mochilas grandes, apuro de horario y el vagón ya viene lleno desde la salida.",
    openingObjective:
      "Acomodarte en la cabecera y sobrevivir a la primera ola de pasajeros que subió con bronca.",
    firstWaveObjective:
      "La cabecera se cerró con caras nuevas. Cortá el amontonamiento antes de que te saquen metros.",
    firstWaveClearedObjective:
      "Pilar afloja un poco, pero el tren sigue cargado. Aprovechá el hueco y empujá hacia adentro.",
    secondWaveObjective:
      "La conexión larga trae más presión desde atrás. Sostené la línea y no te dejes arrinconar.",
    secondWaveClearedObjective:
      "La formación quedó abierta. Falta el jefe de la estación y después el viaje se mete en zona más urbana.",
    bossObjective:
      "El cobratrapo de Pilar quiere marcar la cabecera. Bajalo y tomá control del vagón.",
    victoryObjective:
      "Pilar quedó bajo control. Seguí hacia la próxima estación sin regalar espacio.",
    exitObjective:
      "La cabecera quedó atrás. El ramal empieza a acelerar rumbo a José C. Paz.",
    completionTitle: "Pilar despejada",
    completionSummary:
      "Ricky ganó la cabecera y dejó atrás el primer tramo de densidad suburbana del San Martín.",
  },
  {
    station: "José C. Paz",
    subtitle: "Andén espeso",
    intro:
      "Acá el andén siempre parece corto para tanta gente. Las puertas abren y cierran con violencia.",
    openingObjective:
      "Entrar al vagón sin que el andén espeso te coma la posición.",
    firstWaveObjective:
      "La mezcla de subida y apuro se vuelve caótica. Ordená el primer embudo.",
    firstWaveClearedObjective:
      "Quedó aire en el pasillo. Todavía falta lidiar con el regreso de la masa hacia adentro.",
    secondWaveObjective:
      "José C. Paz aprieta desde ambos lados. Mantené la forma y no pierdas el centro.",
    secondWaveClearedObjective:
      "El vagón respira, pero el jefe ya está orbitando la puerta. Prepará el golpe final.",
    bossObjective:
      "El armador del andén quiere frenar el tren a puro amontonamiento. Bajalo y seguí.",
    victoryObjective:
      "El andén espeso se abrió. Salí del cuello de botella y seguí hacia San Miguel.",
    exitObjective:
      "José C. Paz quedó atrás. El ramal sigue subiendo de intensidad.",
    completionTitle: "José C. Paz despejada",
    completionSummary:
      "Ricky atravesó el andén más bravo del tramo y salió con el pasillo todavía en pie.",
  },
  {
    station: "San Miguel",
    subtitle: "Centro en ebullición",
    intro:
      "San Miguel mete comercio, ruido y gente subiendo de todos los costados. El centro del tren hierve.",
    openingObjective:
      "Tomar el centro sin quedar atrapado entre vendedores y empujadores.",
    firstWaveObjective:
      "La ebullición del centro arranca temprano. Limpiá el primer bloque antes de que se desordene todo.",
    firstWaveClearedObjective:
      "Se enfrió un poco el vagón, pero la estación sigue tirando presión desde el andén.",
    secondWaveObjective:
      "San Miguel vuelve a cargar el centro. Aguantá el ritmo o te comen la distancia.",
    secondWaveClearedObjective:
      "El centro quedó más limpio. Falta el jefe del tramo, un tipo que maneja la marea del vagón.",
    bossObjective:
      "El patrón de San Miguel quiere convertir el vagón en una feria. Bajalo y recuperá el control.",
    victoryObjective:
      "La estación quedó cocinada. Seguí hacia Muñiz con el pasillo a tu favor.",
    exitObjective:
      "San Miguel quedó atrás. El viaje sigue por una zona cada vez más densa.",
    completionTitle: "San Miguel despejada",
    completionSummary:
      "Ricky apagó el centro en ebullición y dejó la estación a su espalda.",
  },
  {
    station: "Muñiz",
    subtitle: "Cruce corto",
    intro:
      "Muñiz es breve pero traicionera: suben y bajan rápido, y el cruce corto no te deja acomodarte.",
    openingObjective:
      "Cortar el cruce corto antes de que el cambio de flujo te desordene.",
    firstWaveObjective:
      "La estación viene y va en segundos. Sacá del medio a los que se meten de costado.",
    firstWaveClearedObjective:
      "El cruce aflojó. Aprovechá la ventana, porque Muñiz nunca da descanso.",
    secondWaveObjective:
      "La corriente vuelve a cruzarte el vagón. Sostené el eje y no te muevas de más.",
    secondWaveClearedObjective:
      "Quedó camino libre. El jefe del cruce todavía intenta cortar tu avance.",
    bossObjective:
      "El operador del cruce corto quiere trabarte de un manotazo. Bajalo y seguí.",
    victoryObjective:
      "Muñiz quedó atrás. Tomá aire antes de entrar en Bella Vista.",
    exitObjective:
      "El cruce corto se cerró detrás tuyo. El ramal sigue subiendo la apuesta.",
    completionTitle: "Muñiz despejada",
    completionSummary:
      "Ricky salió del cruce corto sin perder posición y mantuvo la campaña en marcha.",
  },
  {
    station: "Bella Vista",
    subtitle: "Paso trabado",
    intro:
      "Bella Vista parece tranquila desde afuera, pero adentro el paso siempre está trabado por alguien con apuro.",
    openingObjective:
      "Destrabá el paso y no te dejes encerrar por la calma falsa de la estación.",
    firstWaveObjective:
      "Los primeros que suben te quieren correr del eje. Limpiá el paso antes de que se cierre.",
    firstWaveClearedObjective:
      "La vista se despejó un segundo. En este ramal eso ya cuenta como descanso.",
    secondWaveObjective:
      "Bella Vista vuelve a trabar la circulación con más fuerza. Sostené la línea.",
    secondWaveClearedObjective:
      "El paso quedó semi abierto. Falta el tipo que maneja el cuello de botella.",
    bossObjective:
      "El cerrajero del paso trabado quiere clavarte en la puerta. Bajalo y seguí.",
    victoryObjective:
      "Bella Vista se abrió. Seguí rumbo a W.C. Morris antes de que vuelva el amontonamiento.",
    exitObjective:
      "El paso trabado quedó atrás. El vagón siguiente viene más áspero.",
    completionTitle: "Bella Vista despejada",
    completionSummary:
      "Ricky destrabó la estación y se quedó con un tramo que parecía más fácil de lo que era.",
  },
  {
    station: "W.C. Morris",
    subtitle: "Subida áspera",
    intro:
      "La subida hacia Morris viene áspera: un tramo donde todo cuesta más y el piso parece pedirte equilibrio extra.",
    openingObjective:
      "Aguantar la subida áspera sin perder el ritmo ni el centro.",
    firstWaveObjective:
      "La pendiente te mete enemigos encima de entrada. Recortá la subida antes de que te empujen.",
    firstWaveClearedObjective:
      "Subiste un peldaño del ramal. Todavía falta el resto del esfuerzo.",
    secondWaveObjective:
      "Morris apila presión en la mitad del vagón. No aflojes justo ahora.",
    secondWaveClearedObjective:
      "El tramo áspero aflojó un poco. El jefe sigue arriba, marcando la pendiente.",
    bossObjective:
      "El capataz de la subida quiere frenarte en la mitad del esfuerzo. Bajalo y seguí.",
    victoryObjective:
      "La subida quedó vencida. Bajá al siguiente tramo con el tren de tu lado.",
    exitObjective:
      "W.C. Morris quedó atrás. Hurlingham ya está tirando más gente desde adelante.",
    completionTitle: "W.C. Morris despejada",
    completionSummary:
      "Ricky coronó la subida áspera y salió mejor parado de un tramo de esfuerzo real.",
  },
  {
    station: "Hurlingham",
    subtitle: "Zona caliente",
    intro:
      "Hurlingham viene con calor de barrio y vagón lleno. Nadie quiere ceder el pasillo y todos empujan.",
    openingObjective:
      "Entrar a la zona caliente sin entregar el centro del vagón.",
    firstWaveObjective:
      "La temperatura del pasillo sube. Cortá la primera concentración de rivales.",
    firstWaveClearedObjective:
      "Hurlingham baja un cambio, pero la tensión sigue pegada al techo.",
    secondWaveObjective:
      "La zona caliente vuelve a cerrarse. Sostené la pelea y seguí mirando al fondo.",
    secondWaveClearedObjective:
      "El vagón aflojó apenas. Falta el jefe local, más pesado que los demás.",
    bossObjective:
      "El fuego de Hurlingham tiene dueño. Bajalo y apagá la presión de la estación.",
    victoryObjective:
      "La zona caliente quedó controlada. Salí rumbo a El Palomar.",
    exitObjective:
      "Hurlingham quedó a tus espaldas. El ramal sigue subiendo en densidad.",
    completionTitle: "Hurlingham despejada",
    completionSummary:
      "Ricky apagó la zona caliente y mantuvo el tren bajo control en una estación pesadísima.",
  },
  {
    station: "El Palomar",
    subtitle: "Freno y empuje",
    intro:
      "El Palomar vive de la parada y el arranque: frenás para subir, empujás para seguir, y todo se vuelve inestable.",
    openingObjective:
      "Bancarte el freno y empuje sin que la formación te saque de eje.",
    firstWaveObjective:
      "El primer frenazo mete presión en el centro. Limpiá el tironeo inicial.",
    firstWaveClearedObjective:
      "La formación retomó aire. Aprovechá el impulso antes del próximo corte.",
    secondWaveObjective:
      "El empuje vuelve de golpe. No te quedes quieto en el momento equivocado.",
    secondWaveClearedObjective:
      "Quedó el sector central disponible. El jefe ya está marcando el ritmo del vagón.",
    bossObjective:
      "El maquinista del freno y empuje te quiere dormir. Bajalo y recuperá la velocidad.",
    victoryObjective:
      "El Palomar quedó en retroceso. Tomá impulso hacia Caseros.",
    exitObjective:
      "La estación quedó atrás. La presión ahora se vuelve más urbana.",
    completionTitle: "El Palomar despejada",
    completionSummary:
      "Ricky leyó el freno y el empuje sin perder la inercia y siguió avanzando.",
  },
  {
    station: "Caseros",
    subtitle: "Embudo urbano",
    intro:
      "Caseros es la primera gran pared urbana del tramo: todo se comprime y el vagón se vuelve embudo.",
    openingObjective:
      "Atravesar el embudo urbano sin dejar que te tapen la salida.",
    firstWaveObjective:
      "La gente se aprieta en la boca del vagón. Barré la primera congestión.",
    firstWaveClearedObjective:
      "Caseros deja un poco de aire, pero todavía queda el cuello de botella principal.",
    secondWaveObjective:
      "El embudo vuelve con más fuerza. Sostené la pelea hasta el fondo.",
    secondWaveClearedObjective:
      "Se abrió el centro de la estación. El jefe está listo para el choque.",
    bossObjective:
      "El acomodador del embudo urbano quiere trabarte la vía. Bajalo y seguí.",
    victoryObjective:
      "Caseros quedó abierto. Ahora sí, metete en Santos Lugares.",
    exitObjective:
      "El embudo urbano quedó atrás. El tren ya entra en territorio denso de verdad.",
    completionTitle: "Caseros despejada",
    completionSummary:
      "Ricky rompió el embudo urbano y dejó atrás uno de los tramos más apretados del ramal.",
  },
  {
    station: "Santos Lugares",
    subtitle: "Tramo apretado",
    intro:
      "Santos Lugares parece corta, pero el tramo apretado no te deja respirar. Todo pasa cerca y rápido.",
    openingObjective:
      "Soportar el tramo apretado y no perder la lectura del vagón.",
    firstWaveObjective:
      "La estación te muerde desde el arranque. Cortá la primera presión antes de que se cierre todo.",
    firstWaveClearedObjective:
      "Aire recuperado. El tramo sigue apretado, pero ya no te pisa tan de cerca.",
    secondWaveObjective:
      "Santos Lugares vuelve a cerrarse con más gente. Mantené distancia y pegá de frente.",
    secondWaveClearedObjective:
      "La presión afloja justo antes del jefe. Tomá la ventana.",
    bossObjective:
      "El dueño del tramo apretado no quiere perder la estación. Bajalo y seguí.",
    victoryObjective:
      "Santos Lugares quedó despejada. El viaje se pone cada vez más capitalino.",
    exitObjective:
      "El tramo apretado quedó atrás. Sáenz Peña ya está mucho más cerca.",
    completionTitle: "Santos Lugares despejada",
    completionSummary:
      "Ricky salió del tramo apretado sin ceder el control del vagón.",
  },
  {
    station: "Sáenz Peña",
    subtitle: "Presión constante",
    intro:
      "Sáenz Peña no te ataca de golpe, te va presionando todo el tiempo hasta que sentís el peso encima.",
    openingObjective:
      "Sostener la presión constante sin regalar la posición.",
    firstWaveObjective:
      "La estación empieza a apretar desde todos los costados. Cerrá el primer avance enemigo.",
    firstWaveClearedObjective:
      "Bajó un poco la presión, pero la calma dura poco en Sáenz Peña.",
    secondWaveObjective:
      "La segunda subida vuelve a cargar el vagón. Apretá los dientes y seguí.",
    secondWaveClearedObjective:
      "El vagón quedó listo para el jefe. Todavía falta el tirón final.",
    bossObjective:
      "El inspector de la presión quiere mantenerte quieto. Bajalo y seguí de largo.",
    victoryObjective:
      "Sáenz Peña quedó atrás. Ya sentís el peso de Devoto más adelante.",
    exitObjective:
      "La presión constante afloja apenas y el ramal sigue avanzando.",
    completionTitle: "Sáenz Peña despejada",
    completionSummary:
      "Ricky bancó la presión durante toda la estación y no perdió el pasillo.",
  },
  {
    station: "Devoto",
    subtitle: "Vagón pesado",
    intro:
      "Devoto entra con un vagón pesado, oscuro y compacto. Acá todo cuesta más, como si el tren cargara una derrota vieja.",
    openingObjective:
      "Mover un vagón pesado sin dejar que te inmovilicen.",
    firstWaveObjective:
      "El peso del tramo cae de golpe. Sacá del medio a los primeros bloqueos.",
    firstWaveClearedObjective:
      "El vagón sigue cargado, pero ya no está quieto. Eso te da margen.",
    secondWaveObjective:
      "Devoto vuelve a apretar con un paquete más duro. No te quedes bajo la carga.",
    secondWaveClearedObjective:
      "El peso aflojó un poco. Falta el jefe, que es el verdadero lastre.",
    bossObjective:
      "El capataz del vagón pesado quiere hundirte el avance. Bajalo y recuperá movimiento.",
    victoryObjective:
      "Devoto quedó liviano. Seguí hacia Villa del Parque con el tren de tu lado.",
    exitObjective:
      "El vagón pesado se fue atrás. Ahora el viaje entra en una zona de conexiones.",
    completionTitle: "Devoto despejada",
    completionSummary:
      "Ricky levantó un vagón que venía cargado de peso y salió con el control intacto.",
  },
  {
    station: "Villa del Parque",
    subtitle: "Conexión picante",
    intro:
      "Villa del Parque tiene conexiones por todos lados y cada combinación mete gente nueva con otra energía.",
    openingObjective:
      "Aguantar la conexión picante sin que te cambien el ritmo.",
    firstWaveObjective:
      "La combinación de líneas trae la primera ola. Desarmá el intercambio.",
    firstWaveClearedObjective:
      "Se enfrió la conexión un segundo. Aprovechá antes del próximo trasbordo.",
    secondWaveObjective:
      "Villa del Parque vuelve a subir la apuesta con otra tanda de pasajeros.",
    secondWaveClearedObjective:
      "La conexión quedó casi limpia. Falta el jefe que maneja el trasbordo.",
    bossObjective:
      "El combinador picante quiere transformar el vagón en un caos. Bajalo y seguí.",
    victoryObjective:
      "La conexión quedó resuelta. Seguí hacia La Paternal.",
    exitObjective:
      "Villa del Parque quedó atrás. El tramo empieza a sonar más porteño.",
    completionTitle: "Villa del Parque despejada",
    completionSummary:
      "Ricky sacó adelante la conexión más complicada del recorrido y siguió derecho.",
  },
  {
    station: "La Paternal",
    subtitle: "Último respiro",
    intro:
      "La Paternal es ese último respiro antes del salto final: todavía suburbio, pero ya se asoma la ciudad grande.",
    openingObjective:
      "Usar el último respiro para prepararte para el cierre del ramal.",
    firstWaveObjective:
      "La estación te deja una ventana corta. Aprovechala y limpiá la primera avanzada.",
    firstWaveClearedObjective:
      "Todavía hay aire en el vagón. No lo regales antes del segundo empuje.",
    secondWaveObjective:
      "La Paternal vuelve a cerrar el paso. Sostené la tensión y seguí mirando al fondo.",
    secondWaveClearedObjective:
      "Quedó la línea abierta. El jefe de la estación ya te está midiendo.",
    bossObjective:
      "El guardia del último respiro quiere frenar la campaña. Bajalo y encarate al centro.",
    victoryObjective:
      "La Paternal quedó atrás. El tren ya huele a ciudad cerrada.",
    exitObjective:
      "Último respiro tomado. Ahora el salto a Villa Crespo cambia el tono del viaje.",
    completionTitle: "La Paternal despejada",
    completionSummary:
      "Ricky aprovechó el último respiro antes de que el ramal se volviera completamente porteño.",
  },
  {
    station: "Villa Crespo",
    subtitle: "Ex Chacarita",
    intro:
      "Villa Crespo trae la memoria de Ex Chacarita: más ciudad, más ruido y un pulso de cancha que se siente en el vagón.",
    openingObjective:
      "Entrar al tramo ex Chacarita y aguantar el cambio de ritmo urbano.",
    firstWaveObjective:
      "El clima de cancha te arranca de inmediato. Bajá la primera línea de choque.",
    firstWaveClearedObjective:
      "La estación afloja apenas, pero el ruido sigue marcando el tempo.",
    secondWaveObjective:
      "Villa Crespo vuelve con otra tanda de presión. Sostené el empuje.",
    secondWaveClearedObjective:
      "El vagón quedó abierto para el duelo final del barrio.",
    bossObjective:
      "El hincha del ex barrio quiere que te quedes en la puerta. Bajalo y seguí.",
    victoryObjective:
      "Villa Crespo quedó en silencio. Ya te queda Palermo como puente final.",
    exitObjective:
      "El Ex Chacarita quedó atrás. La ciudad entra en su tramo más visible.",
    completionTitle: "Villa Crespo despejada",
    completionSummary:
      "Ricky atravesó el clima de cancha y dejó atrás una estación con mucha historia encima.",
  },
  {
    station: "Palermo",
    subtitle: "Conexión con Subte D",
    intro:
      "Palermo es la gran conexión: subte, colectivos, turistas, laburantes y el vagón mezclando todo en una sola marea.",
    openingObjective:
      "Sobrevivir la conexión con Subte D y no quedar atrapado en el intercambio.",
    firstWaveObjective:
      "La estación mezcla flujos distintos desde el arranque. Ordená la primera marea.",
    firstWaveClearedObjective:
      "Palermo te da un segundo de respiro. No te confíes, la conexión sigue viva.",
    secondWaveObjective:
      "La conexión con el D vuelve a cargar el vagón. Mantené la línea hasta el fondo.",
    secondWaveClearedObjective:
      "La estación quedó casi limpia. El jefe final de zona quiere cerrar la transición.",
    bossObjective:
      "El coordinador de Palermo quiere trabarte entre andenes. Bajalo y encarate a Retiro.",
    victoryObjective:
      "Palermo quedó cruzada. Te queda el último salto hacia la terminal.",
    exitObjective:
      "La conexión con Subte D quedó atrás. Retiro ya está al alcance.",
    completionTitle: "Palermo despejada",
    completionSummary:
      "Ricky cruzó la interconexión más densa del ramal y quedó a un paso de la terminal.",
  },
  {
    station: "Retiro",
    subtitle: "Terminal",
    intro:
      "Retiro recibe al ramal con terminal, transferencia y gente que no mira atrás. Acá termina el recorrido y se define todo.",
    openingObjective:
      "Llegar al terminal y mostrar que el San Martín quedó bajo tu control.",
    firstWaveObjective:
      "La entrada a Retiro explota de flujo. Abrí el camino antes de que se cierre la terminal.",
    firstWaveClearedObjective:
      "La terminal afloja un poco, pero todavía no te pertenece del todo.",
    secondWaveObjective:
      "Retiro junta todo lo que quedó suelto del recorrido. Aguantá la última marea.",
    secondWaveClearedObjective:
      "Quedó el corazón del terminal. Ahora sí, enfrentate al jefe final.",
    bossObjective:
      "El guardián de Retiro quiere mantener la terminal cerrada. Bajalo y cerrá el viaje.",
    victoryObjective:
      "Retiro está abierto. Caminá al andén final y cerrá la campaña.",
    exitObjective:
      "La terminal quedó servida. Un último paso y terminaste el San Martín.",
    completionTitle: "Retiro dominado",
    completionSummary:
      "Ricky cruzó todo el ramal desde Dr. Cabred hasta Retiro y se quedó con el terminal.",
  },
];

const laneY = [64, 104, 144, 188, 226];
const itemCycle: ItemKind[] = [
  "mate_listo",
  "tortita_negra",
  "sube_cargada",
  "paraguas_fierro",
];

const baseScene = (): SceneState => ({
  type: "carriage_intro",
  gateClosed: false,
  gateRightX: null,
  waveIndex: 0,
  waveTriggered: false,
  secondWaveTriggered: false,
  bossTriggered: false,
  victoryWalkTriggered: false,
});

function getEnemyKind(levelIndex: number, offset: number): EnemyKind {
  const difficulty = levelIndex + 1;

  if (difficulty <= 4) {
    return offset % 3 === 0 ? "durmiente" : "colado";
  }

  if (difficulty <= 10) {
    return ["colado", "durmiente", "mochilero"][
      (levelIndex + offset) % 3
    ] as EnemyKind;
  }

  return [
    "colado",
    "durmiente",
    "mochilero",
    "vendedor_competencia",
    "senora_bolsos",
    "fisura",
  ][(levelIndex + offset) % 6] as EnemyKind;
}

function createWave(levelIndex: number, count: number, startX: number): Spawn[] {
  return Array.from({ length: count }, (_, offset) => ({
    kind: getEnemyKind(levelIndex, offset),
    x: startX + offset * 118 + (levelIndex % 3) * 14,
    y: laneY[(levelIndex + offset) % laneY.length],
  }));
}

function createItems(levelIndex: number): ItemPlacement[] {
  return [
    {
      kind: itemCycle[levelIndex % itemCycle.length],
      x: 470 + (levelIndex % 2) * 24,
      y: laneY[(levelIndex + 1) % laneY.length],
    },
    {
      kind: itemCycle[(levelIndex + 1) % itemCycle.length],
      x: 1490 + (levelIndex % 3) * 18,
      y: laneY[(levelIndex + 3) % laneY.length],
    },
    {
      kind: itemCycle[(levelIndex + 2) % itemCycle.length],
      x: 2050 + (levelIndex % 2) * 16,
      y: laneY[levelIndex % laneY.length],
    },
  ];
}

function createLevel(index: number, config: StationConfig): CampaignLevel {
  const difficulty = index + 1;
  const shiftX = index * 18;
  const width = 2520 + shiftX;
  const standardArenaWidth = 580;
  const wave1Count = 3 + Math.floor(index / 3);
  const wave2Count = 3 + Math.floor(index / 2);
  const wave1Spawns = createWave(index, wave1Count, 970 + shiftX);
  const wave2Spawns = createWave(index + 1, wave2Count, 1670 + shiftX);
  const bossSpawn: Spawn = {
    kind: index === stationConfigs.length - 1 ? "boss_fisura_bici" : "borracho",
    x: 2250 + shiftX,
    y: laneY[(index + 2) % laneY.length],
  };

  const layout: LevelLayout = {
    entryX: 180,
    wave1TriggerX: 720 + shiftX,
    gate1StartX: 790 + shiftX,
    gate1EndX: 1460 + shiftX,
    wave2TriggerX: 1500 + shiftX,
    gate2StartX: 1560 + shiftX,
    gate2EndX: 2140 + shiftX,
    bossTriggerX: 2120 + shiftX,
    bossGateStartX: 2470 + shiftX - standardArenaWidth,
    bossGateEndX: 2470 + shiftX,
    exitTriggerX: 2350 + shiftX,
    exitX: 2440 + shiftX,
    wave1Spawns,
    wave2Spawns,
    bossSpawn,
  };

  const bounds: LevelBounds = {
    width,
    depth: 320,
  };

  const stationLabel = `${config.station}${config.subtitle ? ` · ${config.subtitle}` : ""}`;

  return {
    id: `nivel-${difficulty}`,
    name: `Nivel ${difficulty} · ${stationLabel}`,
    intro: config.intro,
    bounds,
    layout,
    entryY: 158,
    openingObjective: config.openingObjective,
    firstWaveObjective: config.firstWaveObjective,
    firstWaveClearedObjective: config.firstWaveClearedObjective,
    secondWaveObjective: config.secondWaveObjective,
    secondWaveClearedObjective: config.secondWaveClearedObjective,
    bossObjective: config.bossObjective,
    victoryObjective: config.victoryObjective,
    exitObjective: config.exitObjective,
    completionTitle: config.completionTitle,
    completionSummary: config.completionSummary,
    items: createItems(index),
  };
}

export const campaignLevels: CampaignLevel[] = stationConfigs.map((config, index) =>
  createLevel(index, config),
);

export function getCampaignLevel(index: number): CampaignLevel {
  return campaignLevels[index] ?? campaignLevels[0];
}

function createLevelItems(level: CampaignLevel) {
  return level.items.map((item, index) => ({
    id: `${level.id}-item-${index + 1}`,
    kind: item.kind,
    name:
      item.kind === "mate_listo"
        ? "Mate listo"
        : item.kind === "tortita_negra"
          ? "Tortita negra"
          : item.kind === "sube_cargada"
            ? "SUBE cargada"
            : "Paraguas de fierro",
    description:
      item.kind === "mate_listo"
        ? "Velocidad arriba por unos segundos."
        : item.kind === "tortita_negra"
          ? "Recupera aire y algo de vida."
          : item.kind === "sube_cargada"
            ? "Pega más fuerte por un rato."
            : "Amortigua parte del daño recibido.",
    x: item.x,
    y: item.y,
    width: 44,
    depth: 28,
    collected: false,
  }));
}

export function applyLevelToState(
  state: GameState,
  levelIndex: number,
  preserveElapsedRun = true,
) {
  const level = getCampaignLevel(levelIndex);

  state.currentLevelIndex = levelIndex;
  state.totalLevels = campaignLevels.length;
  state.scene = baseScene();
  state.enemies = [];
  state.items = createLevelItems(level);
  state.levelBounds = { ...level.bounds };
  state.levelLayout = {
    ...level.layout,
    wave1Spawns: [...level.layout.wave1Spawns],
    wave2Spawns: [...level.layout.wave2Spawns],
    bossSpawn: { ...level.layout.bossSpawn },
  };
  state.player.x = level.layout.entryX;
  state.player.y = level.entryY;
  state.player.z = 0;
  state.player.vx = 0;
  state.player.vy = 0;
  state.player.vz = 0;
  state.player.hp = state.player.maxHp;
  state.player.onGround = true;
  state.player.facing = "right";
  state.player.isMoving = false;
  state.player.attack.activeMs = 0;
  state.player.attack.cooldownMs = 0;
  state.player.hurtCooldownMs = 0;
  state.player.speedBoostMs = 0;
  state.player.attackBoostMs = 0;
  state.player.shieldMs = 0;
  state.camera.x = 0;
  state.input = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    attack: false,
    pause: false,
  };
  state.hud.levelName = level.name;
  state.hud.hints = [
    "Moverse: WASD o flechas",
    "Saltar: espacio",
    "Pausa: P",
  ];
  state.hud.enemyCount = 0;
  state.hud.objective = level.openingObjective;
  state.hud.completionTitle = null;
  state.hud.completionSummary = null;
  state.hud.pickupMessage = null;
  state.hud.activePickup = null;
  if (!preserveElapsedRun) {
    state.hud.elapsedMs = 0;
  }
}
