# Prompts para Microsoft Designer

Fecha: 2026-03-27

## Herramienta recomendada

Herramienta elegida: `Microsoft Designer`

Motivo:

- tiene generacion gratuita con cuenta Microsoft;
- permite remover fondo;
- permite editar y reencuadrar dentro del mismo flujo;
- alcanza bien para `concept -> recorte -> sprite base`.

## Flujo recomendado en Designer

### Fase 1: concept

En `Image Creator`:

1. pegar prompt de concept;
2. generar varias opciones;
3. elegir la mejor silueta y ropa;
4. descargar la mejor.

### Fase 2: limpieza

En `Background remover`:

1. subir la imagen elegida;
2. remover el fondo;
3. exportar en PNG transparente.

### Fase 3: variantes de frame

Volver a `Image Creator` usando siempre el mismo prompt base y cambiar solo la pose:

- idle
- walk
- attack
- hurt
- defeated

### Fase 4: ajuste

Si un frame sale casi bien:

- usar el editor de Designer para limpiar;
- si no alcanza, regenerar solo ese frame.

## Ajustes de prompt recomendados para Designer

Designer responde mejor si el prompt es:

- directo;
- concreto;
- sin demasiado texto de diseño abstracto;
- con sujeto + ropa + pose + estilo + fondo claro.

Conviene repetir siempre:

- `full body`
- `transparent background` o `plain neutral background`
- `same character design`
- `same outfit`
- `readable silhouette`
- `semi-realistic digital illustration`

## Prompt base universal para Designer

```text
Full body character concept for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, grounded urban realism, readable silhouette, warm train interior lighting, slight 3/4 view, feet visible, centered character, everyday worn clothes, no text, no watermark, plain neutral background.
```

## Ricky Ferreyra

### Concept

```text
Full body character concept for Ricky Ferreyra, the main protagonist of a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Ordinary Argentine office worker around 35 years old, tired face, blue worn jacket, light shirt, dark pants, urban shoes, simple backpack, practical commuter look. Semi-realistic digital illustration, grounded urban realism, readable silhouette, warm train interior lighting, slight 3/4 view, feet visible, centered character, plain neutral background, no text, no watermark.
```

### Idle

```text
Full body sprite-style character image for Ricky Ferreyra, same character design, same outfit, same backpack, neutral standing pose with subtle tension, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train interior lighting, centered character, feet visible, transparent background, no text, no watermark.
```

### Walk

```text
Full body sprite-style character image for Ricky Ferreyra, same character design, same outfit, same backpack, walking pose, one leg forward, active torso, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train interior lighting, centered character, feet visible, transparent background, no text, no watermark.
```

### Attack

```text
Full body sprite-style character image for Ricky Ferreyra, same character design, same outfit, same backpack, short aggressive commuter fight pose, compact punch or elbow strike, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train interior lighting, centered character, feet visible, transparent background, no text, no watermark.
```

## Colado

### Concept

```text
Full body character concept for Colado, a common enemy in a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Lean opportunistic commuter, aggressive forward posture, cheap urban clothing, tense face, intrusive body language, looks ready to push through people. Semi-realistic digital illustration, grounded urban realism, readable silhouette, warm train interior lighting, slight 3/4 view, feet visible, centered character, plain neutral background, no text, no watermark.
```

### Idle

```text
Full body sprite-style character image for Colado, same character design, same outfit, tense idle stance, slightly leaning forward, ready to rush, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train interior lighting, centered character, feet visible, transparent background, no text, no watermark.
```

### Walk

```text
Full body sprite-style character image for Colado, same character design, same outfit, fast advancing walking pose, shoulders forward, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train interior lighting, centered character, feet visible, transparent background, no text, no watermark.
```

### Attack

```text
Full body sprite-style character image for Colado, same character design, same outfit, aggressive pushing attack pose, compact frontal strike, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train interior lighting, centered character, feet visible, transparent background, no text, no watermark.
```

## Boss Fisura Bici

### Concept

```text
Full body character concept for Boss Fisura Bici, the final boss of a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Intimidating urban legend figure linked to a bike, layered street clothing, aggressive posture, final boss presence, dangerous and memorable silhouette, grounded Buenos Aires commuter chaos. Semi-realistic digital illustration, urban realism, readable silhouette, warm train terminal lighting with subtle cold metallic accents, slight 3/4 view, feet visible, centered character, plain neutral background, no text, no watermark.
```

### Idle

```text
Full body sprite-style character image for Boss Fisura Bici, same character design, same outfit, dominant idle stance, dangerous calm posture, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train terminal lighting, centered character, feet visible, transparent background, no text, no watermark.
```

### Walk

```text
Full body sprite-style character image for Boss Fisura Bici, same character design, same outfit, advancing walk pose with dominant body language, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train terminal lighting, centered character, feet visible, transparent background, no text, no watermark.
```

### Attack

```text
Full body sprite-style character image for Boss Fisura Bici, same character design, same outfit, aggressive boss attack pose, memorable and readable silhouette, for a 2D beat'em up video game set inside the Buenos Aires San Martin commuter train. Semi-realistic digital illustration, readable silhouette, warm train terminal lighting with subtle cold metallic accents, centered character, feet visible, transparent background, no text, no watermark.
```

## Prompt de consistencia para variantes

Cuando una imagen te salga bien y quieras repetirla con otra pose, agregar al principio:

```text
Keep the exact same character design, face, clothes, proportions, palette and accessories.
```

Y cambiar solo la accion:

- `neutral standing pose`
- `walking pose`
- `compact punch pose`
- `hurt recoil pose`
- `defeated pose`

## Negative cues utiles para Designer

Si empieza a derivar, sumar:

```text
No anime, no cartoon, no fantasy, no sci-fi, no extra accessories, no cropped limbs, no background scene.
```

## Orden de trabajo recomendado

1. generar `Ricky concept`
2. generar `Colado concept`
3. generar `Boss Fisura Bici concept`
4. elegir una version de cada uno
5. hacer background removal
6. producir `idle`, `walk` y `attack`
7. probar dentro del juego
