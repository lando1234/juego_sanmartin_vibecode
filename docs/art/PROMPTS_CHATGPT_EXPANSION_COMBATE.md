# Prompts ChatGPT para expansion de combate

Fecha: 2026-03-28

Estos prompts mantienen la misma direccion visual del proyecto: caricatura urbana pintada, tren San Martin, lectura fuerte a tamano chico, fondo transparente, sin anime ni fantasia.

## Matriz operativa por personaje

Esta seccion define, personaje por personaje, que assets conviene generar ahora, como se llama cada archivo y donde va dentro del proyecto.

### Ricky

Estado actual:
- Ya integrado en juego.
- Ya existen estos archivos:
  - `public/sprites/characters/ricky/attack-02.png`
  - `public/sprites/characters/ricky/attack-03.png`
  - `public/sprites/characters/ricky/special-01.png`
  - `public/sprites/characters/ricky/dash-01.png`
  - `public/sprites/characters/ricky/grab-01.png`
  - `public/sprites/characters/ricky/throw-01.png`

No hace falta regenerar salvo retoque visual.

### colado

Estado actual:
- El set base alcanza.
- No conviene gastar prompts extra por ahora.

No generar de momento:
- `guard-01`
- `grabbed-01`
- `stagger-heavy-01`

Ruta futura si alguna vez se hace:
- `public/sprites/characters/colado/guard-01.png`
- `public/sprites/characters/colado/grabbed-01.png`
- `public/sprites/characters/colado/stagger-heavy-01.png`

### durmiente

Conviene generar ahora:
- `guard-01`
- `grabbed-01`

No es prioridad:
- `stagger-heavy-01`

Destino:
- `public/sprites/characters/durmiente/guard-01.png`
- `public/sprites/characters/durmiente/grabbed-01.png`

Uso esperado:
- `guard-01`: lectura de bloqueo frontal
- `grabbed-01`: cuando Ricky lo agarra

### mochilero

Conviene generar ahora:
- `grabbed-01`
- `stagger-heavy-01`

No es prioridad:
- `guard-01`

Destino:
- `public/sprites/characters/mochilero/grabbed-01.png`
- `public/sprites/characters/mochilero/stagger-heavy-01.png`

Uso esperado:
- `grabbed-01`: lectura de agarre corto
- `stagger-heavy-01`: impacto pesado, mejor que el `hurt` genérico

### vendedor_competencia

Estado actual:
- El set base alcanza.
- No tiene el mayor retorno visual en esta etapa.

No generar de momento:
- `guard-01`
- `grabbed-01`
- `stagger-heavy-01`

Ruta futura si alguna vez se hace:
- `public/sprites/characters/vendedor_competencia/guard-01.png`
- `public/sprites/characters/vendedor_competencia/grabbed-01.png`
- `public/sprites/characters/vendedor_competencia/stagger-heavy-01.png`

### senora_bolsos

Conviene generar ahora:
- `guard-01`
- `grabbed-01`

No es prioridad:
- `stagger-heavy-01`

Destino:
- `public/sprites/characters/senora_bolsos/guard-01.png`
- `public/sprites/characters/senora_bolsos/grabbed-01.png`

Uso esperado:
- `guard-01`: defensa con cuerpo y bolsos
- `grabbed-01`: lectura clara cuando Ricky la sujeta

### fisura

Estado actual:
- El set base alcanza.
- Su valor esta mas en movimiento/IA que en estados nuevos.

No generar de momento:
- `guard-01`
- `grabbed-01`
- `stagger-heavy-01`

Ruta futura si alguna vez se hace:
- `public/sprites/characters/fisura/guard-01.png`
- `public/sprites/characters/fisura/grabbed-01.png`
- `public/sprites/characters/fisura/stagger-heavy-01.png`

### borracho

Conviene generar ahora:
- `stagger-heavy-01`

Opcional despues:
- `grabbed-01` no aplica como agarre real
- `guard-01` no hace falta

Destino:
- `public/sprites/characters/borracho/stagger-heavy-01.png`

Uso esperado:
- mejorar lectura de golpe fuerte / finisher / special

### boss_fisura_bici

Conviene generar ahora:
- `stagger-heavy-01`
- `attack-telegraph-01`

Opcional despues:
- `guard-01`

Destino:
- `public/sprites/characters/boss_fisura_bici/stagger-heavy-01.png`
- `public/sprites/characters/boss_fisura_bici/attack-telegraph-01.png`

Uso esperado:
- `stagger-heavy-01`: vender daño pesado al boss
- `attack-telegraph-01`: pose previa más clara antes de ataques fuertes o phase attacks

## Orden recomendado de produccion

1. `durmiente/guard-01`
2. `durmiente/grabbed-01`
3. `mochilero/stagger-heavy-01`
4. `mochilero/grabbed-01`
5. `senora_bolsos/guard-01`
6. `senora_bolsos/grabbed-01`
7. `borracho/stagger-heavy-01`
8. `boss_fisura_bici/stagger-heavy-01`
9. `boss_fisura_bici/attack-telegraph-01`

## Regla de nombres y ubicacion

Todos los PNG nuevos tienen que guardarse asi:

- `public/sprites/characters/<personaje>/<asset>.png`

Ejemplos:
- `public/sprites/characters/durmiente/guard-01.png`
- `public/sprites/characters/mochilero/stagger-heavy-01.png`
- `public/sprites/characters/senora_bolsos/grabbed-01.png`
- `public/sprites/characters/boss_fisura_bici/attack-telegraph-01.png`

## Referencia obligatoria

Siempre subir a ChatGPT la imagen madre ya aprobada del personaje correspondiente y agregar al inicio:

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
```

## Ricky states

### attack-02

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for Ricky Ferreyra in attack-02, a compact fast strike for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: Ricky Ferreyra, the tired office worker protagonist, in a tight attack pose with a quick forward jab, shoulders engaged, torso slightly twisted, same outfit and accessories as the approved character design
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, tense combat energy
Color palette: dusty blues, worn browns, dirty creams, muted grays, restrained orange accents
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve outfit and proportions exactly, no extra limbs, no cropped parts
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

### attack-03

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for Ricky Ferreyra in attack-03, a heavier follow-through strike for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: Ricky Ferreyra, the tired office worker protagonist, in a stronger attack pose with a longer reach and visible body follow-through, same outfit and accessories as the approved character design
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, tense combat energy
Color palette: dusty blues, worn browns, dirty creams, muted grays, restrained orange accents
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve outfit and proportions exactly, no extra limbs, no cropped parts
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

### special-01

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for Ricky Ferreyra in special-01, a committed signature move for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: Ricky Ferreyra, the tired office worker protagonist, in a distinct special attack pose with a bigger silhouette and stronger momentum, but still grounded and believable, same outfit and accessories as the approved character design
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, high-intensity combat energy
Color palette: dusty blues, worn browns, dirty creams, muted grays, restrained orange accents
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve outfit and proportions exactly, no fantasy effects baked into the body, no extra limbs, no cropped parts
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

### dash-01

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for Ricky Ferreyra in dash-01, a fast forward burst for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: Ricky Ferreyra, the tired office worker protagonist, in a low forward dash pose with one leg extended and the torso leaning into motion, same outfit and accessories as the approved character design
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, speed and urgency
Color palette: dusty blues, worn browns, dirty creams, muted grays, restrained orange accents
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve outfit and proportions exactly, no cropped parts, no motion blur that kills readability
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

### grab-01

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for Ricky Ferreyra in grab-01, a grapple initiation pose for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: Ricky Ferreyra, the tired office worker protagonist, in a clear grabbing motion with both arms reaching in and the torso braced, same outfit and accessories as the approved character design, with the opponent only implied if needed and never stealing focus
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, tense close-quarters combat energy
Color palette: dusty blues, worn browns, dirty creams, muted grays, restrained orange accents
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve outfit and proportions exactly, no cropped parts, keep the motion readable as a grab
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

### throw-01

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for Ricky Ferreyra in throw-01, a throw follow-through pose for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: Ricky Ferreyra, the tired office worker protagonist, in a strong throwing motion with the torso rotated and one arm extended after the release, same outfit and accessories as the approved character design, with any opponent kept secondary and minimal if present
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, forceful combat energy
Color palette: dusty blues, worn browns, dirty creams, muted grays, restrained orange accents
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve outfit and proportions exactly, no cropped parts, keep the motion readable as a throw
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

## Enemy utility states

Estas son las versiones genericas. Mas abajo estan los prompts concretos por personaje que conviene usar hoy.

### guard-01

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for an enemy guard-01 state in a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: enemy character in a defensive guard pose, elbows tucked in, shoulders raised, braced stance, same approved enemy identity and clothing, readable as a block or guard state
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved enemy sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, defensive tension
Color palette: worn neutrals, muted browns, dirty creams, dark grays, restrained accent colors from the character
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve identity exactly, no extra limbs, no cropped parts
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

### grabbed-01

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for an enemy grabbed-01 state in a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: enemy character in a clearly grabbed or restrained pose, torso compressed, arms constrained, expression reacting to being held, same approved enemy identity and clothing
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved enemy sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, trapped and tense
Color palette: worn neutrals, muted browns, dirty creams, dark grays, restrained accent colors from the character
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve identity exactly, no extra limbs, no cropped parts, keep the restraint readable
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

### stagger-heavy-01

```text
Use case: stylized-concept
Asset type: 2D game sprite frame
Primary request: single full body sprite frame for an enemy stagger-heavy-01 state in a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train
Scene/backdrop: transparent background
Subject: enemy character in a heavy stagger pose, torso bent, one shoulder dropped, balance broken, expression stunned but still standing, same approved enemy identity and clothing
Style/medium: stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds
Composition/framing: full body, centered, same camera and scale as the approved enemy sprite set, feet fully visible, readable silhouette
Lighting/mood: warm commuter train interior lighting, impact and instability
Color palette: worn neutrals, muted browns, dirty creams, dark grays, restrained accent colors from the character
Materials/textures: worn commuter clothes, believable fabric folds, practical everyday accessories
Constraints: transparent background, no text, no watermark, preserve identity exactly, no extra limbs, no cropped parts, keep the impact readable
Avoid: anime, fantasy, sci-fi, glossy render look, background objects, style drift
```

## Prompts concretos por personaje

### durmiente · guard-01

Guardar como:
- `public/sprites/characters/durmiente/guard-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Durmiente in guard-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. He should look heavy, sleepy, defensive and stubborn, blocking from the front with raised shoulders, tucked chin and braced stance, like a tired passenger using his own body mass as a shield. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

### durmiente · grabbed-01

Guardar como:
- `public/sprites/characters/durmiente/grabbed-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Durmiente in grabbed-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. He should look off-balance, compressed and restrained, like Ricky just grabbed him by the clothes in the aisle. Keep the pose readable as a held state, not as a normal hurt animation. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

### mochilero · grabbed-01

Guardar como:
- `public/sprites/characters/mochilero/grabbed-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Mochilero in grabbed-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. He should still feel wide and heavy because of the backpack, but clearly restrained and slightly folded forward by the grab. The backpack mass should help the silhouette. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

### mochilero · stagger-heavy-01

Guardar como:
- `public/sprites/characters/mochilero/stagger-heavy-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Mochilero in stagger-heavy-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. He should look heavily rocked by impact, shoulders uneven, weight broken, backpack dragging the pose to one side, but still upright. This must read as a heavier impact than a normal hurt frame. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

### senora_bolsos · guard-01

Guardar como:
- `public/sprites/characters/senora_bolsos/guard-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Senora Bolsos in guard-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. She should defend herself using both posture and bags, with a strong front-facing defensive silhouette, practical commuter aggression and believable weight. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

### senora_bolsos · grabbed-01

Guardar como:
- `public/sprites/characters/senora_bolsos/grabbed-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Senora Bolsos in grabbed-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. She should look constrained and angry, with the bags pulled into the pose and the body clearly caught by Ricky in close quarters. Keep the silhouette readable as a grabbed state. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

### borracho · stagger-heavy-01

Guardar como:
- `public/sprites/characters/borracho/stagger-heavy-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Borracho in stagger-heavy-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. He should look massively staggered by a heavy blow, with unstable legs, dropped shoulder, drunken imbalance and strong body weight, but still readable and upright. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

### boss_fisura_bici · stagger-heavy-01

Guardar como:
- `public/sprites/characters/boss_fisura_bici/stagger-heavy-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Boss Fisura Bici in stagger-heavy-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. He should look hit hard enough to briefly lose dominance, with a dramatic but readable heavy stagger pose, urban menace still intact, suitable for boss feedback in a beat'em up. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

### boss_fisura_bici · attack-telegraph-01

Guardar como:
- `public/sprites/characters/boss_fisura_bici/attack-telegraph-01.png`

```text
Use the uploaded approved character image as the exact visual reference. Keep the exact same face, silhouette, proportions, clothes, palette, accessories and art style.
Create a single full body sprite frame for Boss Fisura Bici in attack-telegraph-01 for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train. He should be winding up for a dangerous attack, with a very clear anticipatory pose, readable center of gravity, obvious threat, and a silhouette that instantly tells the player a strong move is coming. Stylized urban caricature, flat painted game art, grounded Buenos Aires commuter realism, same visual family as the train interior and pickup items, slightly cartoonish but believable, expressive proportions, clean shape language, simple large shadows, minimal texture, simplified clothing folds. Transparent background. Full body. Feet visible. No text. No watermark.
```

## Hazards

### door-slam-warning

```text
Use case: stylized-concept
Asset type: environment hazard sprite or overlay
Primary request: a door-slam-warning visual for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing the train door about to slam or close with a clear danger cue
Scene/backdrop: transparent background
Subject: sliding train door warning asset, with a strong red-orange warning shape, motion cue, and clear readable threat signal, no character
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, simple large shapes, minimal texture, bold readable signage-like design, grounded commuter realism
Composition/framing: centered hazard asset, full frame readable, enough padding around the danger zone
Lighting/mood: tense commuter train lighting, urgent warning energy
Color palette: warning reds, oranges, dirty metal grays, muted beige train tones
Materials/textures: painted metal door, worn train surfaces, simple graphic motion marks
Constraints: transparent background, no text, no watermark, no characters, keep it clear at small size
Avoid: photorealism, neon cyberpunk, fantasy magic effects, cluttered background
```

### door-slam-active

```text
Use case: stylized-concept
Asset type: environment hazard sprite or overlay
Primary request: a door-slam-active visual for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing the train door fully closed or slamming shut as an active hazard
Scene/backdrop: transparent background
Subject: sliding train door impact asset, with heavy metal contact, sharp composition, and a dangerous closed-door read, no character
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, simple large shapes, minimal texture, bold readable design, grounded commuter realism
Composition/framing: centered hazard asset, full frame readable, enough padding around the door edges
Lighting/mood: tense commuter train lighting, impact and confinement energy
Color palette: dirty metal grays, dark neutrals, muted beige train tones, restrained red hazard accents
Materials/textures: painted metal door, worn train surfaces, simple impact marks
Constraints: transparent background, no text, no watermark, no characters, keep it clear at small size
Avoid: photorealism, neon cyberpunk, fantasy magic effects, cluttered background
```

### brake-shake-overlay

```text
Use case: stylized-concept
Asset type: full-screen UI/effect overlay
Primary request: a brake-shake-overlay visual for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing sudden braking motion, vibration, and visual disturbance
Scene/backdrop: transparent background
Subject: abstract motion overlay with shake lines, slight smear, impact vibration, and train-brake energy, no text and no characters
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, graphic but grounded, simple large shapes, minimal texture, easy to read over gameplay
Composition/framing: full-frame overlay, soft edges where useful, enough openness to let gameplay show through
Lighting/mood: tense braking moment, sudden movement, commuter chaos
Color palette: muted grays, dusty browns, warm beige, restrained red-orange warning accents
Materials/textures: motion streaks, subtle blur shapes, train vibration marks
Constraints: transparent background, no text, no watermark, no characters, no fantasy effects, no excessive detail
Avoid: photorealism, neon cyberpunk, cluttered collage look
```

### passenger-push-lane

```text
Use case: stylized-concept
Asset type: environment hazard lane or overlay
Primary request: a passenger-push-lane hazard for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing the pressure of a crowd pushing laterally through the aisle
Scene/backdrop: transparent background
Subject: wide lane-shaped hazard visual made of pressed commuter silhouettes, shoulders, elbows, or crowd-pressure shapes, readable as a lane attack without needing text
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, simple large shapes, minimal texture, grounded commuter realism
Composition/framing: long horizontal lane asset, centered, easy to tile or overlay across the aisle
Lighting/mood: cramped rush-hour pressure, social friction, commuter congestion
Color palette: muted grays, dirty creams, brown and blue commuter tones, restrained warning accents
Materials/textures: simplified clothing masses, shoulder shapes, packed train density
Constraints: transparent background, no text, no watermark, no fantasy effects, keep the lane readable at small size
Avoid: photoreal crowd scene, busy background, horror swarm look
```

### floor-clutter

```text
Use case: stylized-concept
Asset type: environment hazard sprite
Primary request: a floor-clutter hazard for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing scattered bags, dropped items, newspapers, and messy commuter debris that obstruct movement
Scene/backdrop: transparent background
Subject: isolated clutter cluster on the train floor, visually messy but readable, no characters
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, simple large shapes, minimal texture, grounded commuter realism
Composition/framing: centered floor hazard asset, low profile, readable at small size
Lighting/mood: dirty rush-hour train interior, inconvenience and obstruction
Color palette: dirty cream, muted brown, gray, worn navy, restrained orange accents
Materials/textures: paper, cloth bags, plastic items, worn floor debris
Constraints: transparent background, no text, no watermark, no characters, keep it simple and usable in-game
Avoid: photorealism, excessive clutter, fantasy debris, background scene
```

### seat-block

```text
Use case: stylized-concept
Asset type: environment hazard sprite
Primary request: a seat-block hazard for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing one or more seats blocked by bags, body posture, or crowded obstruction
Scene/backdrop: transparent background
Subject: blocked train seat visual, with bags or obstructive commuter arrangement making the seat unusable, no characters
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, simple large shapes, minimal texture, grounded commuter realism
Composition/framing: centered hazard asset, readable as an obstruction to the player, low to mid height
Lighting/mood: cramped commuter frustration, passive blocking energy
Color palette: muted browns, dirty cream, gray-blue, worn seat tones, restrained orange accents
Materials/textures: fabric seats, bags, straps, worn upholstery
Constraints: transparent background, no text, no watermark, no characters, keep the obstruction obvious at small size
Avoid: photorealism, background scene, abstract geometry, fantasy props
```

## UI and effects

### combo burst

Quién lo usa: sistema global de combo y golpes encadenados, principalmente Ricky y opcionalmente finishers de boss o miniboss

Dónde aparece: sobre el punto de impacto o cerca del contador de combo dentro del playfield

Archivo sugerido: `public/sprites/ui/combo-burst.png`

```text
Use case: stylized-concept
Asset type: UI effect sprite
Primary request: a combo burst effect for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing a punchy impact burst that feels urban and energetic but not fantasy-driven
Scene/backdrop: transparent background
Subject: graphic burst of impact lines, sparks, and strong motion shapes that emphasize a combo hit, no text
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, bold shapes, minimal texture, easy to read over combat
Composition/framing: centered effect burst with clean edges and room for layering over characters
Lighting/mood: aggressive, fast, satisfying combat feedback
Color palette: warm oranges, dirty yellow, red accents, dark neutral contrast
Materials/textures: graphic streaks, painted burst shapes, compact impact marks
Constraints: transparent background, no text, no watermark, no numbers, no fantasy aura, no clutter
Avoid: neon anime impact, comic-book word art, photoreal explosion
```

### special flash

Quién lo usa: principalmente Ricky cuando activa `special`; opcionalmente reusable para ataques especiales del boss final si más adelante querés unificarlos visualmente

Dónde aparece: superpuesto al arranque o al impacto principal del special, centrado cerca del cuerpo o del frente del ataque

Archivo sugerido: `public/sprites/ui/special-flash.png`

```text
Use case: stylized-concept
Asset type: UI effect sprite
Primary request: a special flash effect for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing a stronger brighter burst than the combo burst
Scene/backdrop: transparent background
Subject: concentrated flash of light, sharp impact rays, and decisive motion shapes for a special move, no text
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, bold shapes, minimal texture, easy to layer in gameplay
Composition/framing: centered effect with strong core and readable outer rays
Lighting/mood: high-intensity combat peak, brief and explosive
Color palette: bright warm white, orange, yellow, restrained red accents, dark neutral contrast
Materials/textures: graphic light rays, painted burst shapes, compact impact core
Constraints: transparent background, no text, no watermark, no fantasy magic symbols, no clutter
Avoid: neon anime aura, sci-fi energy grid, photoreal light bloom
```

### danger telegraph

Quién lo usa: enemigos peligrosos, minibosses, `boss_fisura_bici` y cualquier peligro de escenario que necesite aviso previo

Dónde aparece: en el piso, alrededor del objetivo o delante del enemigo durante el startup de ataques peligrosos

Archivo sugerido: `public/sprites/ui/danger-telegraph.png`

```text
Use case: stylized-concept
Asset type: UI warning effect sprite
Primary request: a danger telegraph effect for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, clearly warning the player before an attack or hazard triggers
Scene/backdrop: transparent background
Subject: graphic warning markers, arrows, lines, or hazard shapes that read instantly as danger, no text
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, bold shapes, minimal texture, practical and readable
Composition/framing: centered warning effect, easy to overlay on floor or around a target area
Lighting/mood: urgent, tense, readable at a glance
Color palette: hazard red, orange, dirty yellow, dark neutral contrast
Materials/textures: painted warning shapes, simple graphic motion marks
Constraints: transparent background, no text, no watermark, no fantasy symbols, no clutter
Avoid: neon sci-fi warning UI, abstract geometry, photoreal overlays
```

### recoverable health highlight

Quién lo usa: HUD del jugador, específicamente la barra de vida de Ricky cuando acumula vida recuperable por usar `special`

Dónde aparece: dentro o detrás del segmento recuperable de la barra de HP, nunca sobre el centro del playfield

Archivo sugerido: `public/sprites/ui/recoverable-health-highlight.png`

```text
Use case: stylized-concept
Asset type: UI effect sprite
Primary request: a recoverable health highlight effect for a side-scrolling beat'em up set inside the Buenos Aires San Martin commuter train, showing which health can be recovered with a clean glowing outline or soft emphasis
Scene/backdrop: transparent background
Subject: graphic highlight ring, outline, or glow that suggests recoverable health without using text, numbers, or icons that are too busy
Style/medium: stylized urban caricature, flat painted game art, same visual family as the train interior and pickup items, subtle but readable, minimal texture
Composition/framing: centered effect that can sit behind or around a health element without obscuring gameplay
Lighting/mood: calm helpful feedback inside a tense combat UI
Color palette: soft warm cream, muted orange, subtle green if needed for readability, dark neutral contrast
Materials/textures: clean graphic glow, painted outline, restrained UI emphasis
Constraints: transparent background, no text, no watermark, no fantasy aura, no clutter
Avoid: neon sci-fi UI, medical iconography overload, photoreal bloom, noisy decoration
```

## Nota de uso

Si el modelo empieza a derivar, repetir al final de cualquier prompt estas restricciones:

```text
Transparent background. Full body or isolated effect. Same stylized urban caricature look. No text. No watermark. No anime. No fantasy. No sci-fi. Readable at small size.
```
