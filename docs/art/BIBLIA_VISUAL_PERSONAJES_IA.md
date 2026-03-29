# Biblia Visual de Personajes IA

Fecha: 2026-03-27

## Objetivo

Definir una direccion visual consistente para generar personajes nuevos con IA y convertirlos en sprites jugables de `Furgon Final`.

La meta no es fotorealismo puro. La meta es:

- lectura excelente dentro del juego;
- tono costumbrista del tren San Martin;
- anatomia humana simple y legible;
- personajes en la misma familia visual del fondo del tren y los items;
- consistencia entre protagonista, enemigos y bosses.

## Norte estetico

Estilo recomendado:

- `caricatura urbana pintada`;
- ilustracion plana con volumen suave;
- formas simples, redondeadas y claras;
- pocos detalles internos;
- sombras amplias y limpias;
- expresion corporal fuerte;
- acabado parecido al fondo del vagon y a los pickups, no a concept art renderizado.

Lo que queremos transmitir:

- cansancio de viaje diario;
- violencia cotidiana del transporte publico;
- humor satirico argentino;
- hora pico, calor, roce, presion, ansiedad.

## Lo que no hay que hacer

- fotorealismo cinematografico;
- anime;
- chibi;
- pixel art;
- caricatura extrema;
- render hiper detallado;
- pinceladas realistas;
- texturas complejas de tela o piel;
- fondos complejos metidos en el sprite;
- props irrelevantes que rompan la silueta;
- poses demasiado suaves que no lean a escala chica.

## Reglas de consistencia

Todos los personajes deben compartir:

- misma camara:
  cuerpo entero, eje vertical, leve vista 3/4, lente normal;
- misma luz:
  luz calida de vagon, relleno suave, sombra debajo del personaje;
- misma altura visual aproximada dentro del cuadro;
- mismo nivel de detalle;
- misma familia de color:
  ocres, azules gastados, grises metalicos, marrones, naranjas de acento;
- sombras simples en bloques grandes;
- borde limpio contra el fondo, sin halo realista ni humo de recorte;
- fondo transparente o neutro facilmente recortable.

## Regla clave de compatibilidad con el juego

Los personajes tienen que sentirse dibujados para este mundo:

- mismo lenguaje de formas que el interior del vagon;
- mismo nivel de simplificacion que mate, tortita, SUBE y paraguas;
- materiales sugeridos, no renderizados;
- cara y manos un poco exageradas para que lean a escala chica;
- menos detalle que una ilustracion de portada;
- mas claridad que un concept art.

## Reglas de produccion

Cada personaje debe producirse en dos etapas.

### Etapa 1: concept art

Generar:

- 1 pose neutra full body;
- 1 pose 3/4;
- 1 pose de accion;
- 1 close-up de torso/cara opcional si hace falta cerrar identidad.

Objetivo:

- validar silueta;
- validar ropa;
- validar accesorios;
- validar paleta;
- validar tono narrativo.

### Etapa 2: set de sprites

Generar solo despues de aprobar la etapa 1.

Frames minimos:

- `idle-01`
- `idle-02`
- `walk-01`
- `walk-02`
- `attack-01`
- `hurt-01`
- `defeated-01`

## Especificacion tecnica recomendada

Formato:

- `PNG`
- fondo transparente

Resolucion de trabajo:

- `1024x1024` para concepts
- `768x1024` o `1024x1536` para sprites verticales

Encuadre:

- personaje entero dentro del cuadro;
- pies visibles;
- margen superior suficiente para cabeza y accesorios;
- no cortar manos ni pies.

## Paleta y acabado

La paleta tiene que conversar con el juego ya existente:

- azules gastados;
- marrones de asiento;
- cremas y ocres del vagon;
- grises metalicos suaves;
- acentos naranjas o rojos solo cuando el personaje lo necesita.

Acabado recomendado:

- cel shading suave;
- una sombra principal;
- una luz principal;
- casi nada de textura fina;
- pliegues grandes y pocos.

## Ficha visual por personaje

### Ricky Ferreyra

Rol:

- protagonista;
- laburante comun;
- heroe accidental.

Claves visuales:

- 32-38 anos;
- rostro cansado;
- campera azul gastada;
- camisa clara;
- pantalon oscuro de oficina o trabajo;
- zapatillas o zapatos urbanos gastados;
- mochila cruzada o mochila simple de viaje.

Sensacion:

- un tipo comun que esta al limite pero sigue entero.

### Colado

Rol:

- common;
- melee rapido;
- agresion frontal.

Claves visuales:

- cuerpo tenso y anguloso;
- ropa barata urbana;
- postura inclinada hacia adelante;
- cara de oportunismo y apuro.

Sensacion:

- alguien que se mete donde no debe y avanza a empujones.

### Durmiente

Rol:

- common;
- bloqueador lento;
- obstaculo pesado.

Claves visuales:

- cuerpo vencido;
- ojos semicaidos;
- ropa arrugada;
- mochila o campera vieja;
- postura floja, como si pudiera caerse encima.

Sensacion:

- cansancio convertido en amenaza fisica.

### Mochilero

Rol:

- common;
- tanque;
- ocupa espacio.

Claves visuales:

- mochila grande;
- hombros anchos;
- volumen frontal;
- ropa outdoor o de viaje suburbano;
- piernas firmes.

Sensacion:

- un cuerpo que invade todo el pasillo.

### Vendedor de la Competencia

Rol:

- special;
- hybrid;
- rapido y verborragico.

Claves visuales:

- bolso, caja o mercaderia;
- ropa naranja, roja o mostaza;
- energia de vendedor ambulante;
- una mano siempre lista para arrojar algo.

Sensacion:

- alguien que domina el pasillo con velocidad y chamuyo.

### Señora de los Bolsos

Rol:

- special;
- zone control;
- amenaza de proximidad.

Claves visuales:

- bolsos pesados;
- ropa cotidiana de tren;
- postura firme;
- barrido de brazos amplio;
- volumen lateral interesante.

Sensacion:

- presencia de andén que te saca del eje.

### Fisura

Rol:

- special;
- erratico;
- agresion impredecible.

Claves visuales:

- ropa muy castigada;
- movimientos quebrados;
- silueta nerviosa;
- ojos perdidos o hiperalerta;
- energia desordenada.

Sensacion:

- peligro caotico y dificil de leer.

### Borracho

Rol:

- mini boss.

Claves visuales:

- cuerpo pesado;
- centro de gravedad inestable;
- ropa desacomodada;
- volumen grande;
- cara colorada o cansada;
- pose que mezcla tambaleo con amenaza.

Sensacion:

- fuerza desordenada pero contundente.

### Boss Fisura Bici

Rol:

- boss final.

Claves visuales:

- figura urbana mitologica;
- mezcla de bici, ropa callejera y amenaza de terminal;
- presencia dominante;
- pose agresiva;
- acentos frios y metalicos;
- lectura instantanea como jefe final.

Sensacion:

- leyenda urbana del tren convertida en boss.

## Check de aprobacion antes de integrar

Antes de aprobar un personaje, verificar:

- se entiende el rol sin texto;
- la silueta se lee a tamaño chico;
- la pose no se rompe al recortar;
- el personaje sigue siendo del San Martin y no de otro universo;
- la paleta combina con el vagón;
- el personaje se puede reproducir en 7 frames sin perder identidad.
