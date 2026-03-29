import type { ItemKind } from "@/game/types/gameTypes";

export type SceneArtCache = {
  background: HTMLImageElement | null;
  items: Partial<Record<ItemKind, HTMLImageElement>>;
};

const sceneArtCache: SceneArtCache = {
  background: null,
  items: {},
};

function loadImage(path: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`No se pudo cargar asset: ${path}`));
    image.src = path;
  });
}

export async function loadSceneArt() {
  if (!sceneArtCache.background) {
    sceneArtCache.background = await loadImage("/sprites/environment/carriage-bg.png");
  }

  const itemManifest: Record<ItemKind, string> = {
    mate_listo: "/sprites/items/mate-listo.png",
    tortita_negra: "/sprites/items/tortita-negra.png",
    sube_cargada: "/sprites/items/sube-cargada.png",
    paraguas_fierro: "/sprites/items/paraguas-fierro.png",
  };

  await Promise.all(
    Object.entries(itemManifest).map(async ([kind, path]) => {
      const itemKind = kind as ItemKind;
      if (!sceneArtCache.items[itemKind]) {
        sceneArtCache.items[itemKind] = await loadImage(path);
      }
    }),
  );

  return sceneArtCache;
}

export function getLoadedSceneArt() {
  return sceneArtCache;
}
