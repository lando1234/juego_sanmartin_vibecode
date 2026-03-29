# GDD Inicial: Juego Arcade del San Martin

Fecha: 2026-03-27

## 1. Concepto general

Juego beat'em up arcade de desplazamiento lateral, pensado para web en desktop y mobile, inspirado en la estructura de `The Simpsons Arcade Game` y `Double Dragon`, pero con identidad local argentina y tono de satira costumbrista ferroviaria.

La partida transcurre durante un viaje de la manana en la linea San Martin. El protagonista es una persona comun que solo quiere llegar a trabajar, pero una serie de situaciones absurdas convierten el trayecto en una guerra por avanzar vagon por vagon hasta llegar al furgon final.

## 2. Premisa

Un lunes a la manana, en hora pico, una formacion del San Martin queda tomada por distintas facciones del "lore del tren". Lo que parecia un viaje rutinario a Capital se convierte en una escalada ridicula de caos: vendedores que controlan el pasillo, personajes delirantes que imponen sus propias reglas y una organizacion que domina el furgon como si fuera territorio propio.

El protagonista no es un heroe profesional ni un peleador callejero. Es un laburante comun, cansado, medio dormido, con cara de "no me rompan las pelotas", que termina obligado a cruzar toda la formacion para recuperar algo crucial antes de bajar.

## 3. Protagonista

### 3.1 Identidad base

Nombre tentativo: `Ricardo "Ricky" Ferreyra`

Perfil:

- Tiene entre 28 y 40 anos.
- Vive lejos y hace viaje largo.
- Va a trabajar temprano a CABA.
- No es canchero ni heroe de accion.
- Tiene reflejos de pasajero curtido: sabe esquivar, agarrarse en frenadas, meterse entre gente y usar el entorno.

### 3.2 Por que funciona

Conviene que el protagonista sea una persona completamente comun porque:

- vuelve mas gracioso el contraste con el caos;
- refuerza la fantasia de "sobrevivir al viaje";
- hace que el tono satirico sea mas humano;
- permite animaciones torpes, secas y con bronca contenida en lugar de artes marciales perfectas.

### 3.3 Motivo del recorrido

La opcion mas fuerte para el arranque es esta:

`Le roban la vianda, la mochila o el celular justo antes de que arranque el tren, y el objeto termina pasando de mano en mano hasta el furgon.`

Eso da:

- una excusa simple y arcade;
- motivacion inmediata;
- humor costumbrista;
- un objetivo entendible en 5 segundos.

Recomendacion: que el objeto principal sea `la mochila con la vianda, la SUBE, el celu y la credencial del laburo`. Es mucho mas gracioso y mas argentino que una reliquia o algo solemne.

## 4. Titulo del juego

Opciones fuertes:

- `San Martin Arcade`
- `Ultimo Vagon`
- `Furgon Final`
- `Manana de Mierda: Linea San Martin`
- `No Llego al Laburo`

Recomendacion principal:

`Furgon Final`

Es corto, suena a arcade, instala la meta y deja espacio para que el subtitulo explique el tono si hace falta.

Ejemplo:

`Furgon Final: Una manana en el San Martin`

## 5. Fantasia jugable

La fantasia central no es "ganarle a todos", sino:

`abrirse paso por el peor viaje de la manana usando punos, codazos, empujones, objetos del tren y pura desesperacion de trabajador que no puede llegar tarde otra vez`

Eso define todo el tono del combate.

## 6. Estructura arcade

### 6.1 Loop principal

1. El jugador avanza por el vagon.
2. Entran enemigos o se bloquea la salida.
3. Se limpia la pantalla.
4. Se abre el paso al siguiente coche o se llega a una estacion-evento.
5. Cambia el layout, la musica y el tipo de amenaza.
6. Se repite hasta el boss del furgon.

### 6.2 Duracion objetivo

- Partida completa: 20 a 30 minutos.
- Nivel individual: 2 a 4 minutos.
- Ideal para rejugar, speedrun o coop corto.

### 6.3 Numero de niveles

Recomendacion:

- 7 niveles principales.
- 1 boss final.

Es suficiente para tener variedad sin inflar demasiado el primer prototipo.

## 7. Niveles y bosses

### Nivel 1: El Vagon Dormido

Funcion:

- tutorial;
- presenta agarres, golpes, salto corto, frenadas y puertas.

Enemigos:

- bloqueador de puerta;
- empujador;
- pasajero enojado que se suma por error.

Mini boss:

- `El Que Se Bajo de Mal Humor`

Chiste del nivel:

- nadie entiende bien por que empezo la pelea, pero ya es tarde.

### Nivel 2: La Cofradia del Pasillo

Funcion:

- primer nivel con identidad fuerte;
- enemigos moviles y habladores.

Enemigos:

- vendedor de medias;
- vendedor relampago;
- vendedora reina del speech.

Boss:

- `El Capo del Pasillo`

Mecanicas:

- cajas de mercaderia;
- termos;
- bolsas que traban movimiento;
- ataques rapidos en linea.

### Nivel 3: Hora Pico

Funcion:

- vagon saturado;
- menos espacio y mas caos.

Enemigos:

- dupla coordinada;
- pesado del pasillo;
- colado acrobatico.

Boss:

- `Los Reyes del Asiento de Tres`

Mecanica distintiva:

- enemigos que empujan al jugador contra la multitud;
- zonas donde casi no se puede saltar.

### Nivel 4: Los Raros del Fondo

Funcion:

- subir la extraneza del viaje;
- meter mas humor y patron raro.

Enemigos y NPC:

- predicador;
- narrador indignado;
- pareja toxicamente sincronizada;
- figura silenciosa.

Boss:

- `El Linyera Emperador del Asiento`

Mecanica distintiva:

- patrones impredecibles;
- objetos escondidos en mantas, bolsos y asientos;
- dialogos absurdos como parte del combate.

### Nivel 5: Bicis, Bultos y Changuitos

Funcion:

- nivel mas fisico y de objetos.

Enemigos:

- cartonero veloz;
- ciclista defensivo;
- guardian del acceso.

Boss:

- `La Dama del Changuito Blindado`

Mecanica distintiva:

- cobertura;
- rebotes;
- empujes de objetos;
- cadenas de golpes cortadas por obstaculos.

### Nivel 6: Los Profetas del Retraso

Funcion:

- momento de satira mas verbal;
- sensacion de que el tren entro en otra dimension.

Enemigos:

- jubilado cronista;
- bruja de la SUBE;
- inspectora fantasma;
- profetas del retraso.

Boss:

- `La Voz del Altoparlante`

Formato del boss:

- no es una pelea tradicional.
- el vagon entero reacciona a anuncios, alarmas, frenadas y cambios de puerta.
- mezcla combate con evento escenico.

### Nivel 7: Borde Operativo

Funcion:

- ultimo empuje antes del final;
- menos humor, mas tension mecanica.

Enemigos:

- guardianes del furgon;
- patoteros de la orden final;
- dupla pesada con herramientas.

Boss:

- `El Guarda Torcido`

Mecanica distintiva:

- uniones de vagones;
- puertas duras;
- vibracion fuerte;
- zonas de riesgo.

### Boss Final: Furgon Final

Boss principal:

- `El Rey del Furgon`

Perfil:

- mezcla de puntero ferroviario, jefe de banda improvisado y mito urbano del tren.
- controla mercaderia, herramientas, cadenas y secuaces.
- es ridiculo, peligroso y carismatico.

Fases:

1. pelea contra secuaces y objetos del furgon;
2. duelo directo contra el jefe;
3. escape final antes de llegar a estacion.

Resolucion:

- el protagonista recupera su mochila;
- suena el anuncio de llegada;
- baja todo roto, despeinado y apenas a tiempo para fichar.

## 8. Sistema de combate

Debe ser simple, arcade y legible.

Acciones base:

- golpe rapido;
- golpe fuerte;
- salto;
- agarron;
- empujon;
- ataque especial de bronca.

Movimientos recomendados del protagonista:

- combo corto de punetazos;
- codazo lateral;
- rodillazo;
- empujon contra asiento o puerta;
- lanzamiento de bolso, termo, caja o diario;
- especial: `Modo Llegar al Laburo`, un ataque de desesperacion que limpia espacio alrededor.

## 9. Controles

### Desktop

- mover: `WASD` o flechas;
- golpe: `J`;
- golpe fuerte: `K`;
- salto: `L`;
- agarre o interactuar: `I`.

### Mobile

- stick virtual a la izquierda;
- botones grandes a la derecha;
- prioridad en legibilidad y respuesta rapida;
- pocos botones, hitboxes amplias.

## 10. Cooperativo

Conviene dejarlo previsto desde el diseño, aunque no se implemente primero.

Jugador 2 posible:

- companero de viaje;
- amiga de oficina;
- otro pasajero comun que tambien quedo atrapado.

La estructura arcade se beneficia mucho del coop local o compartido en teclado.

## 11. Estilo visual

Direccion recomendada:

- pixel art 2D grande y expresivo;
- personajes cabezones y faciles de leer;
- animacion exagerada;
- fondos llenos de detalles locales;
- paleta sucia pero viva: metal, amarillo senalizacion, rojo desgaste, verde suburbano, azul de interior ferroviario.

El tren tiene que sentirse real, pero pasado por filtro de caricatura satirica.

## 12. Audio y musica

Sonidos clave:

- traqueteo constante;
- anuncio de puertas;
- frenadas;
- altoparlante distorsionado;
- murmullo de pasajeros;
- speech de vendedores.

Musica:

- base arcade urbana;
- toques de cumbia, rock barrial, percusion metalica y sintetizador retro;
- cada boss con su motivo propio.

## 13. Humor

El humor tiene que venir de:

- frases reconocibles del transporte publico;
- exageracion del codigo social del tren;
- nombres de enemigos y bosses;
- contraste entre problema ridiculo y reaccion epica;
- el hecho de que todo esto ocurre antes de las 9 de la manana.

No conviene escribir chistes demasiado literales o de meme de internet. Funciona mejor un humor seco, de observacion y de saturacion cotidiana.

## 14. Frase de venta

`Subiste al San Martin para ir a trabajar. Ahora tenes que pelear vagon por vagon para recuperar tu mochila antes de llegar tarde.`

## 15. Recomendacion para la siguiente etapa

El siguiente documento deberia ser uno de estos dos:

- `Documento de personajes`: protagonista, bosses, enemigos comunes y NPC memorables.
- `Documento de prototipo`: resolucion, camara, controles definitivos, layout del primer nivel y tecnologias web.

La prioridad correcta es:

1. cerrar nombre del juego;
2. definir protagonista y boss final visualmente;
3. disenar el primer nivel jugable;
4. elegir stack web para el prototipo.
