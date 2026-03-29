# Pipeline de Produccion de Sprites con IA

Fecha: 2026-03-27

## Objetivo

Pasar de ideas de personaje a sprites listos para integrar en el juego sin perder consistencia.

## Flujo recomendado

### Paso 1: elegir tres personajes piloto

No arrancar con todo el roster.

Orden recomendado:

1. `Ricky`
2. `Colado`
3. `Boss Fisura Bici`

Motivo:

- cubris protagonista;
- cubris enemigo comun;
- cubris boss;
- validas escala, contraste y estilo en tres extremos del juego.

### Paso 2: generar concept art

Para cada personaje:

1. generar `2` a `4` variantes de concept;
2. elegir una sola direccion;
3. descartar las otras;
4. cerrar:
   - ropa
   - paleta
   - accesorios
   - silueta
   - tono.

No pasar a sprites sin aprobar esto.

## Paso 3: congelar ficha del personaje

Guardar para cada personaje:

- prompt final de concept;
- imagen aprobada;
- nota de paleta;
- nota de escala relativa;
- lista de invariantes.

Invariantes tipicos:

- misma ropa;
- misma mochila o bolso;
- mismo peinado;
- misma complexion;
- misma paleta;
- misma camara.

## Paso 4: producir frames

Generar por separado:

- `idle-01`
- `idle-02`
- `walk-01`
- `walk-02`
- `attack-01`
- `hurt-01`
- `defeated-01`

Cada frame debe:

- usar el mismo prompt base;
- repetir invariantes;
- usar el concept aprobado como referencia visual;
- mantener fondo transparente.

## Paso 5: seleccion y limpieza

Despues de generar:

1. descartar frames con drift de cara o ropa;
2. descartar frames recortados;
3. descartar frames con silueta confusa;
4. quedarte con una sola version por pose.

Si un frame esta cerca pero no perfecto:

- editar o regenerar solo ese frame;
- no reiniciar toda la hoja.

## Paso 6: normalizacion tecnica

Antes de integrar al juego:

1. unificar resolucion;
2. alinear personaje al mismo baseline;
3. dejar margen transparente coherente;
4. mantener nombres estables.

Nombres recomendados:

- `public/sprites/characters/ricky/idle-01.png`
- `public/sprites/characters/ricky/idle-02.png`
- `public/sprites/characters/ricky/walk-01.png`
- `public/sprites/characters/ricky/walk-02.png`
- `public/sprites/characters/ricky/attack-01.png`
- `public/sprites/characters/ricky/hurt-01.png`
- `public/sprites/characters/ricky/defeated-01.png`

Replicar lo mismo para cada personaje.

## Paso 7: prueba dentro del juego

Integrar solo un personaje por vez y chequear:

- lectura a tamaño real;
- contraste contra el fondo del vagón;
- si la cabeza se pierde;
- si manos/pies se leen;
- si el ataque se entiende;
- si el boss se distingue del resto.

## Paso 8: correccion post-integracion

Ajustes tipicos:

- subir contraste;
- simplificar ropa;
- agrandar cabeza o manos un poco;
- reforzar accesorio principal;
- reducir detalle fino;
- aclarar sombras.

## Checklist de aprobacion

Un sprite entra al juego solo si:

- se entiende a escala chica;
- conserva identidad entre frames;
- no parece de otro estilo;
- no compite con el fondo;
- no rompe la silueta del gameplay;
- el ataque se reconoce rapido.

## Herramienta recomendada

Para generar:

- usar generacion de imagenes como etapa de concept y frames base.

Para ajustar:

- limpiar y reencuadrar en editor raster;
- exportar PNG transparente;
- integrar y probar;
- iterar.

## Como te recomiendo hacerlo en la practica

Flujo concreto:

1. generar `Ricky concept` con `3` variantes;
2. elegir `1`;
3. generar `Ricky idle-01` y `Ricky walk-01`;
4. probarlos dentro del juego;
5. corregir escala/lectura;
6. recien despues completar los otros frames;
7. repetir el proceso con `Colado`;
8. repetir el proceso con `Boss Fisura Bici`.

## Error comun que hay que evitar

No hagas esto:

- generar los 7 frames de 8 personajes de una sola vez.

Hacé esto:

- cerrar una mini cadena completa:
  concept -> 2 frames -> prueba en engine -> ajuste -> set completo.

## Siguiente accion recomendada

La mejor siguiente accion es generar ahora mismo:

1. `Ricky concept`
2. `Colado concept`
3. `Boss Fisura Bici concept`

Con eso validamos si la direccion visual realmente sirve para el juego antes de producir el resto.
