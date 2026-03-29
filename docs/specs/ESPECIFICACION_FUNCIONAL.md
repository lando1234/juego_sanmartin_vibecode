# Especificacion Funcional

Fecha base: `2026-03-27`

## 1. Vision del juego

`Furgon Final` es un juego de accion lateral con estructura beat'em up liviana, ambientado dentro de la linea `San Martin`.

El jugador controla a `Ricky Ferreyra` y avanza estacion por estacion desde `Dr. Cabred` hasta `Retiro`, peleando dentro de vagones cargados, atravesando oleadas de enemigos y venciendo a un boss al cierre de cada tramo.

## 2. Fantasia central

La fantasia jugable actual es:

- sobrevivir a la hora pico;
- ganar espacio dentro del vagon;
- limpiar cada estacion como si fuera un nivel;
- usar el entorno social y ferroviario como identidad del juego;
- llegar a `Retiro` como terminal final de la run.

## 3. Estructura de progresion

La campana actual tiene `18` niveles, uno por estacion:

1. `Dr. Cabred`
2. `Pilar`
3. `Jose C. Paz`
4. `San Miguel`
5. `Muniz`
6. `Bella Vista`
7. `W.C. Morris`
8. `Hurlingham`
9. `El Palomar`
10. `Caseros`
11. `Santos Lugares`
12. `Saenz Pena`
13. `Devoto`
14. `Villa del Parque`
15. `La Paternal`
16. `Villa Crespo`
17. `Palermo`
18. `Retiro`

Cada estacion incluye:

- intro tematica;
- objetivo de entrada;
- primera oleada;
- segunda oleada;
- boss del tramo;
- texto de salida;
- pantalla intermedia de cierre;
- avance manual al siguiente nivel.

## 4. Dificultad

La dificultad progresa de forma acumulativa:

- aumenta la cantidad de enemigos por oleada;
- aumenta la variedad de enemigos a medida que el recorrido se acerca a Capital;
- las estaciones finales tienen tono mas pesado y mayor presion narrativa;
- `Retiro` funciona como cierre final de campana.

## 5. Personaje jugador

`Ricky Ferreyra` tiene hoy:

- movimiento libre en eje horizontal;
- desplazamiento vertical tipo brawler;
- salto corto;
- golpe basico;
- vida;
- direccion/facing;
- estados temporales por buffs.

## 6. Enemigos

Arquetipos activos:

- `Bloqueador de Puerta`
- `Empujador de Hora Pico`
- `Vendedor Relampago`
- `Capo del Pasillo` como boss base reutilizado por tramo

Comportamiento actual:

- avance hacia el jugador;
- ataque a rango corto;
- dano;
- stun/hurt simple;
- derrota al agotar HP.

## 7. Items y buffs

Items activos en campana:

- `Mate listo`: mejora de velocidad temporal
- `Tortita negra`: recuperacion de vida
- `SUBE cargada`: aumento temporal de dano
- `Paraguas de fierro`: reduccion temporal de dano recibido

Comportamiento funcional actual:

- aparecen repartidos dentro del nivel;
- tienen pickup por proximidad;
- usan magnetismo corto al acercarse el jugador;
- muestran feedback visual y mensaje en HUD al tomarlos.

## 8. Flujo de juego

Flujo principal:

1. pantalla inicial;
2. inicio de partida;
3. avance y combate dentro del nivel;
4. transicion por oleadas;
5. boss;
6. salida del nivel;
7. pantalla de cierre del tramo;
8. paso manual a la siguiente estacion;
9. victoria final al completar `Retiro`.

Estados globales existentes:

- `title`
- `playing`
- `paused`
- `victory`
- `game_over`

## 9. Interfaz

La UI actual incluye:

- overlay de inicio;
- overlay de pausa;
- overlay de victoria por estacion;
- overlay de game over;
- HUD con:
  - nombre del nivel;
  - numero de estacion actual;
  - HP de Ricky;
  - HP de boss cuando aplica;
  - objetivo actual;
  - cantidad de enemigos vivos;
  - buffs activos;
  - mensaje de pickup;
- panel lateral de controles y contexto del viaje.

## 10. Controles

Desktop:

- movimiento: `WASD` o flechas
- salto: `Space`
- ataque: `J`
- pausa: `P`

Mobile:

- d-pad virtual;
- boton de salto;
- boton de golpe.

## 11. Objetivos funcionales abiertos

Puntos razonables para expandir despues:

- mas tipos de enemigos y bosses especificos por estacion;
- eventos propios de cada estacion;
- mas variedad de items;
- capas de audio y feedback;
- gamepad;
- remapeo de controles;
- mas profundidad de combate.
