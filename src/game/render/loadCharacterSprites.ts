import { spriteManifest, type SpriteCache } from "./spriteManifest";

const spriteCache: SpriteCache = {};

function loadSprite(path: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`No se pudo cargar sprite: ${path}`));
    image.src = path;
  });
}

export async function loadCharacterSprites() {
  const entries = Object.values(spriteManifest);

  await Promise.all(
    entries.map(async (asset) => {
      if (!spriteCache[asset.id]) {
        spriteCache[asset.id] = {};
      }

      await Promise.all(
        Object.entries(asset.frames).map(async ([state, paths]) => {
          const stateKey = state as keyof typeof asset.frames;

          if (!spriteCache[asset.id]?.[stateKey] || spriteCache[asset.id]?.[stateKey]?.length !== paths.length) {
            const images = await Promise.all(paths.map((path) => loadSprite(path)));
            spriteCache[asset.id]![stateKey] = images;
          }
        }),
      );
    }),
  );

  return spriteCache;
}

export function getLoadedCharacterSprites() {
  return spriteCache;
}

export function getSpriteForCharacter(characterId: string, state: keyof NonNullable<SpriteCache[string]>) {
  return spriteCache[characterId]?.[state];
}
