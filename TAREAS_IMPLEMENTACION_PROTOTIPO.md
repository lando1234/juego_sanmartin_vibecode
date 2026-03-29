# Tareas de Implementacion: Prototipo Furgon Final

Fecha: 2026-03-27

## 1. Objetivo operativo

Transformar el plan del vertical slice en un backlog ejecutable para construir el primer prototipo jugable de `Furgon Final` con:

- `Next.js`
- `React`
- `TypeScript`
- deploy en `Vercel`
- loop de juego propio sobre `Canvas 2D`

El prototipo objetivo sigue siendo:

- 1 nivel jugable;
- Ricky controlable;
- 3 enemigos comunes;
- 1 boss;
- HUD;
- pantalla inicial y reinicio;
- soporte desktop y mobile.

## 2. Camino critico

Hay tareas importantes, pero no todas bloquean igual. El camino critico real es:

1. scaffold del proyecto;
2. contrato tecnico del runtime;
3. loop e input;
4. movimiento y colisiones;
5. combate basico;
6. enemigos;
7. boss;
8. HUD y flujo de juego;
9. mobile;
10. deploy.

Si cualquiera de los puntos 2 a 7 queda flojo, el resto no salva el prototipo.

## 3. Decisiones cerradas antes de implementar

Estas decisiones ya pueden darse por tomadas para no seguir discutiendo en cada tarea:

- framework: `Next.js App Router`
- UI: `React`
- render del juego: `Canvas 2D`
- protagonista: `Ricky Ferreyra`
- slice inicial: `La Cofradia del Pasillo`
- boss inicial: `El Capo del Pasillo`
- enemigos comunes iniciales:
  - `Bloqueador de Puerta`
  - `Empujador de Hora Pico`
  - `Vendedor Relampago`

## 4. Tareas macro

### T1. Bootstrap del proyecto

Objetivo:

- crear la app base;
- dejar estructura inicial limpia;
- preparar entorno para iterar rapido.

Incluye:

- crear proyecto Next.js con TypeScript;
- usar App Router;
- configurar lint;
- definir estructura `src/`;
- dejar pagina principal montando el shell del juego.

Done cuando:

- el proyecto corre localmente;
- hay una pantalla inicial visible;
- la estructura de carpetas base existe.

Dependencias:

- ninguna.

### T2. Especificacion tecnica del runtime

Objetivo:

- congelar contratos antes de escribir demasiado codigo.

Incluye:

- definir modelo de `GameState`;
- definir ciclo del loop;
- definir shape minima de `Player`, `Enemy`, `Boss`, `Attack`, `InputState`;
- definir sistema de coordenadas;
- definir tamano de arena jugable;
- definir integracion React <-> engine.

Done cuando:

- existe un documento corto de contratos;
- no hay dudas sobre ownership del estado frame a frame;
- se sabe que vive en React y que vive fuera de React.

Dependencias:

- T1 puede correr en paralelo, pero idealmente se cierra antes de T4.

### T3. Layout del primer nivel

Objetivo:

- bajar `La Cofradia del Pasillo` a un espacio concreto.

Incluye:

- ancho total del nivel;
- profundidad de movimiento;
- zonas de spawn;
- punto de entrada;
- triggers de oleadas;
- zona de boss;
- decoracion minima del vagon.

Done cuando:

- existe layout tecnico utilizable por el engine;
- sabemos donde arranca, pelea y termina cada tramo del nivel.

Dependencias:

- T2.

### T4. Game loop e input desktop

Objetivo:

- tener un runtime vivo y jugable.

Incluye:

- `requestAnimationFrame`;
- delta time;
- input manager teclado;
- pause basica;
- inicio y stop del loop.

Done cuando:

- el loop corre estable;
- el input se registra de forma confiable;
- no dependemos de renders de React por frame.

Dependencias:

- T1;
- T2.

### T5. Movimiento y colisiones base

Objetivo:

- darle cuerpo al jugador dentro del vagon.

Incluye:

- mover en eje X;
- mover en pseudo-eje Y;
- salto corto;
- limites de arena;
- colisiones simples contra enemigos y bounds.

Done cuando:

- Ricky se mueve con buena respuesta;
- no atraviesa limites indebidos;
- el espacio ya se siente como beat'em up.

Dependencias:

- T4.

### T6. Sistema de combate base

Objetivo:

- validar el "feel" del juego.

Incluye:

- golpe rapido;
- golpe fuerte;
- hit stun;
- knockback;
- ventana de recuperacion;
- vida del jugador y de enemigos;
- dano basico.

Done cuando:

- pegar se siente legible;
- los impactos tienen feedback visible;
- ya se puede ganar o perder un intercambio.

Dependencias:

- T5.

### T7. Sistema de enemigos comunes

Objetivo:

- poblar el nivel con amenazas distintas.

Incluye:

- base enemy shared;
- AI minima;
- implementacion de:
  - Bloqueador de Puerta
  - Empujador de Hora Pico
  - Vendedor Relampago

Done cuando:

- cada enemigo obliga a responder distinto;
- las tres clases tienen silueta mecanica diferenciada;
- se puede limpiar una oleada.

Dependencias:

- T5;
- T6;
- T3 para spawns reales.

### T8. Boss del primer slice

Objetivo:

- construir `El Capo del Pasillo` como prueba de identidad del juego.

Incluye:

- stats propias;
- patron de movimiento;
- ataques especiales;
- intro minima;
- barra de vida de boss;
- trigger de entrada y fin de combate.

Done cuando:

- el boss se siente distinto del resto;
- hay tension de cierre;
- vencerlo cierra el slice.

Dependencias:

- T6;
- T7;
- T3.

### T9. Render y presentacion del canvas

Objetivo:

- hacer que el runtime sea legible.

Incluye:

- fondo simple del vagon;
- representacion del player;
- representacion de enemigos;
- efectos de hit;
- orden de dibujo;
- camara basica o seguimiento simple.

Done cuando:

- el combate se entiende a simple vista;
- cada tipo de entidad se distingue;
- el juego deja de verse como debug puro.

Dependencias:

- T4;
- T5;
- T6.

### T10. HUD y flujo de partida

Objetivo:

- cerrar el loop de experiencia.

Incluye:

- pantalla de titulo;
- boton de jugar;
- HUD de vida;
- mensaje de inicio;
- game over;
- victoria;
- reinicio.

Done cuando:

- la partida tiene principio, desarrollo y cierre;
- no hace falta tocar codigo para jugar otra vez.

Dependencias:

- T6;
- T8;
- T9.

### T11. Controles mobile

Objetivo:

- hacer que el slice exista de verdad en mobile.

Incluye:

- stick virtual;
- botones tactiles;
- tamanos minimos tactiles;
- prevenir scroll accidental;
- layout horizontal util.

Done cuando:

- el juego puede jugarse en telefono;
- no hay conflicto grave entre canvas y touch controls.

Dependencias:

- T4;
- T5;
- T6;
- T10.

### T12. Pulido minimo y deploy

Objetivo:

- dejar una build compartible.

Incluye:

- revisar performance;
- ajustar dificultad;
- fix de input;
- deploy en Vercel;
- smoke test final.

Done cuando:

- hay URL desplegada;
- el juego carga y corre en desktop y mobile;
- el slice es mostrable.

Dependencias:

- T10;
- T11.

## 5. Orden recomendado de ejecucion

### Fase A: Fundacion

- T1 Bootstrap del proyecto
- T2 Especificacion tecnica del runtime
- T3 Layout del primer nivel

### Fase B: Core jugable

- T4 Game loop e input desktop
- T5 Movimiento y colisiones base
- T6 Sistema de combate base

### Fase C: Contenido jugable

- T7 Sistema de enemigos comunes
- T8 Boss del primer slice
- T9 Render y presentacion del canvas

### Fase D: Cierre de experiencia

- T10 HUD y flujo de partida
- T11 Controles mobile
- T12 Pulido minimo y deploy

## 6. Paralelizacion recomendada

No todo conviene hacerlo en paralelo. Lo correcto es abrir paralelismo recien cuando T2 ya fije contratos.

### Bloque serial inicial

- T1
- T2

Estas dos tareas no conviene repartirlas a ciegas.

### Primer bloque paralelizable

Una vez cerrada T2:

- una linea puede tomar T3;
- otra linea puede tomar T4;
- una tercera puede avanzar base visual temporal de T9.

### Segundo bloque paralelizable

Con T4 y T5 cerradas:

- una linea toma T6;
- otra toma T7;
- otra prepara T10.

### Tercer bloque paralelizable

Con T6 y T7 razonablemente estables:

- una linea toma T8;
- otra toma T11;
- otra hace pulido visual de T9.

## 7. Reparto por agentes

Si usamos multiples agentes, esta es la division correcta.

### Agente A: Fundacion y shell web

Ownership:

- scaffold Next.js;
- `src/app/*`;
- shell principal;
- estructura de proyecto.

Tareas:

- T1;
- parte estructural de T10.

### Agente B: Runtime core

Ownership:

- `src/game/core/*`
- contratos de loop, input y colision

Tareas:

- T2;
- T4;
- T5.

### Agente C: Combate y entidades

Ownership:

- `src/game/entities/*`
- `src/game/data/attacks.ts`

Tareas:

- T6;
- base de T7;
- base de T8.

### Agente D: Nivel y contenido

Ownership:

- `src/game/data/levels.ts`
- `src/game/data/characters.ts`
- `src/game/scenes/*`

Tareas:

- T3;
- parte de T7;
- parte de T8.

### Agente E: UI, HUD y mobile

Ownership:

- `src/components/game/*`
- estilos de interfaz

Tareas:

- T10;
- T11.

### Integracion principal

La integracion no conviene delegarla por completo. Tiene que quedar centralizada para:

- unir contratos;
- resolver roce entre React y engine;
- detectar duplicacion de estado;
- ajustar dificultad y feel.

## 8. Tareas que NO conviene hacer todavia

- coop real;
- audio completo;
- backend;
- guardado;
- inventario complejo;
- multiples vagones;
- cinematicas largas;
- arte final.

Todo eso empuja el proyecto fuera de vertical slice.

## 9. Propuesta de primer sprint real

Sprint 1 deberia cerrar solo esto:

1. T1 Bootstrap del proyecto.
2. T2 Especificacion tecnica del runtime.
3. T3 Layout del primer nivel.
4. T4 Game loop e input desktop.
5. T5 Movimiento y colisiones base.

Si al final de Sprint 1 Ricky ya se mueve bien dentro del vagon, el proyecto esta sano. Si no, hay que corregir arquitectura antes de meter combate.

## 10. Propuesta de segundo sprint

Sprint 2:

1. T6 Sistema de combate base.
2. T7 Sistema de enemigos comunes.
3. T9 Render y presentacion del canvas.

Objetivo:

- que ya exista una pelea real.

## 11. Propuesta de tercer sprint

Sprint 3:

1. T8 Boss del primer slice.
2. T10 HUD y flujo de partida.
3. T11 Controles mobile.
4. T12 Pulido minimo y deploy.

Objetivo:

- tener demo compartible.

## 12. Siguiente entregable recomendado

Antes de abrir codigo, el siguiente documento ideal es:

`ESPECIFICACION_RUNTIME_PROTOTIPO.md`

Ese documento tiene que fijar:

- shape de estado;
- entidades;
- coordenadas;
- escenas;
- eventos;
- integracion con React;
- loop principal.
