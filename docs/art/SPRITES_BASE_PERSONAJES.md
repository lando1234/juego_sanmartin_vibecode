# Sprites Base: Furgon Final

Este paquete deja la primera tanda de sprites vectoriales locales para los personajes principales del vertical slice.

## Ubicacion

- `public/sprites/characters/ricky-ferreyra.svg`
- `public/sprites/characters/bloqueador-puerta.svg`
- `public/sprites/characters/empujador-hora-pico.svg`
- `public/sprites/characters/vendedor-relampago.svg`
- `public/sprites/characters/capo-del-pasillo.svg`

Manifiesto:

- `src/game/render/spriteManifest.ts`

## Direccion visual

- proporcion semi-realista, no chibi;
- cabeza, torso y piernas mas definidos que en el renderer procedural;
- ropa y accesorios reconocibles segun el lore del San Martin;
- lectura clara a distancia arcade;
- tono costumbrista, satirico, pero sin convertirlos en caricaturas abstractas.

## Rasgos por personaje

### Ricky Ferreyra

- camisa celeste;
- campera azul;
- mochila cruzada;
- look de laburante comun de viaje matinal.

### Bloqueador de Puerta

- espalda ancha;
- paleta gris y oscura;
- postura de pared humana.

### Empujador de Hora Pico

- inclinacion corporal hacia adelante;
- energia mas agresiva y rapida;
- acento naranja en la ropa.

### Vendedor Relampago

- caja o bulto de mercaderia;
- silueta mas nerviosa;
- ropa naranja/ocres para destacarlo facil.

### El Capo del Pasillo

- saco oscuro;
- franja dorada/roja;
- silueta mas grande y pesada;
- presencia de jefe final.

## Siguiente paso recomendado

1. cargar estos SVG como `ImageBitmap` o `HTMLImageElement`;
2. reemplazar progresivamente el renderer procedural por drawImage;
3. si el look convence, pasar a sprite sheets por animacion:
   - `idle`
   - `walk`
   - `attack`
   - `hurt`
   - `defeated`
