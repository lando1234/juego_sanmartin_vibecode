# Plan Operativo de Produccion Grafica

## Objetivo
Llevar `Furgon Final` desde un slice funcional a una presentacion visual lista para produccion local, con personajes reconocibles, identidad satirica clara, UI consistente y menos dependencia de dibujo procedimental.

## Alcance
Este plan cubre todo lo que hoy hace que el juego siga viendose como prototipo visual:
- personajes con una sola pose o un solo sprite por estado;
- escenarios demasiado sinteticos;
- HUD y overlays con look de panel tecnico;
- feedback de combate insuficiente;
- falta de consistencia entre arte, UI y tono satirico.

## Backlog Priorizado
1. Reemplazar el sprite unico por personaje con animaciones por estado.
2. Definir una biblia visual corta para personajes principales y enemigos recurrentes.
3. Construir fondos de vagon por capas, con elementos modulares reutilizables.
4. Redisenar HUD, title overlay, pause, victory y game over con branding final.
5. Agregar FX graficos de impacto, golpe, dano y victoria.
6. Completar adaptacion visual mobile y mejorar legibilidad en pantallas chicas.
7. Crear pipeline de assets para exportar, nombrar y cargar sprites sin friccion.
8. Eliminar texto y naming residual de "prototipo" en todo lo visible al jugador.

## Frentes De Trabajo
### 1. Personajes
Responsabilidad:
- definir siluetas reconocibles para Ricky, enemigos comunes y boss;
- producir animaciones `idle`, `walk`, `attack`, `hurt` y `defeated`;
- mantener una lectura clara en movimiento y en mobile.

Entregables:
- sprite sheets o secuencias de frames por personaje;
- manifiesto de assets actualizado;
- pruebas visuales en canvas para cada estado.

### 2. Escenarios
Responsabilidad:
- pasar del vagon sintetico a fondos con identidad propia;
- separar primer plano, fondo y elementos interactivos;
- incorporar variacion visual entre tramos del tren.

Entregables:
- set de capas reutilizables para vagon;
- puertas, ventanas, pasamanos, asientos y carteleria;
- palette de color por momento del viaje.

### 3. UI Y HUD
Responsabilidad:
- llevar overlays y HUD a una estetica arcade final;
- reducir el look de panel web;
- mejorar jerarquia de informacion durante combate.

Entregables:
- HUD final con vida, boss, objetivo y estado;
- overlays de title, pause, victory y game over;
- tratamiento visual consistente con el juego.

### 4. FX Y Feedback
Responsabilidad:
- hacer que cada golpe se lea;
- agregar microfeedback para dano, impacto y victoria;
- mejorar la sensacion arcade sin saturar la pantalla.

Entregables:
- flashes de dano;
- impacto de hit y knockback visual;
- particulas o trazos simples de combate;
- feedback de final de boss.

### 5. Integracion
Responsabilidad:
- conectar los assets nuevos con el renderer;
- mantener fallback seguro mientras los recursos se incorporan;
- evitar roturas entre arte, UI y runtime.

Entregables:
- loader de assets robusto;
- contractos claros de nombres y tamanos;
- tests de render y montaje UI.

## Dependencias
1. Antes de animar, hay que cerrar silueta, escala y proporciones por personaje.
2. Antes de producir fondos, hay que fijar resolucion base y camera framing.
3. Antes de tocar HUD final, hay que decidir que informacion es permanente y cual solo aparece en combate.
4. Antes de producir sprites masivos, hay que fijar nomenclatura de archivos y estados.
5. Antes de reemplazar render procedural, hay que mantener fallback funcional.

## Definicion De Terminado Visual
Un componente grafico se considera listo cuando cumple todo esto:
- se entiende a primera vista quien es cada personaje;
- no depende de formas cuadradas ni placeholders;
- mantiene coherencia de paleta, trazo y escala con el resto del juego;
- se ve bien en desktop y en mobile;
- no rompe lectura del combate ni del desplazamiento;
- no muestra texto o labels de prototipo;
- tiene pruebas o verificaciones de render asociadas.

## Propuesta De Paralelizacion Por Agentes
### Agente A: Personajes
- producir animaciones y variantes de Ricky;
- producir estados base para el primer enemigo y el boss;
- preparar nomenclatura de sprites.

### Agente B: Escenarios
- construir fondos por capas del vagon;
- definir props reutilizables;
- validar profundidad y contraste.

### Agente C: UI Y HUD
- redisenar HUD, overlay inicial y pantallas de resultado;
- ajustar tipografia, espaciado y color;
- limpiar lenguaje de prototipo.

### Agente D: FX Y Feedback
- agregar golpes, destellos y marcas de impacto;
- ajustar lectura visual de ataque y dano;
- validar que no ensucie la pantalla.

### Agente E: Integracion
- conectar loaders y renderer con los nuevos assets;
- agregar tests de smoke render y montaje;
- resolver regresiones de performance o carga.

## Orden Recomendado De Ejecucion
1. Cerrar biblia visual minima.
2. Producir personajes principales.
3. Producir escenario base del vagon.
4. Redisenar HUD y overlays.
5. Agregar FX de combate.
6. Integrar, testear y corregir.

## Riesgo Principal
El riesgo mas alto es producir arte antes de fijar proporciones, naming y estados. Eso multiplica retrabajo. Por eso el orden debe respetarse, aunque varias piezas se produzcan en paralelo.
