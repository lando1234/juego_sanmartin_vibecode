import type { HazardType, ItemKind } from "@/game/types/gameTypes";

export type UiArtKind =
  | "combo_burst"
  | "special_flash"
  | "danger_telegraph"
  | "recoverable_health_highlight";

export type SceneArtCache = {
  background: HTMLImageElement | null;
  items: Partial<Record<ItemKind, HTMLImageElement>>;
  hazards: Partial<Record<HazardType, HTMLImageElement>>;
  ui: Partial<Record<UiArtKind, HTMLImageElement>>;
};

const sceneArtCache: SceneArtCache = {
  background: null,
  items: {},
  hazards: {},
  ui: {},
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

  const hazardManifest: Partial<Record<HazardType, string>> = {
    door_slam: "/sprites/hazards/door-slam-active.png",
    sudden_brake: "/sprites/hazards/brake-shake-overlay.png",
    passenger_push: "/sprites/hazards/passenger-push-lane.png",
    floor_clutter: "/sprites/hazards/floor-clutter.png",
    seat_block: "/sprites/hazards/seat-block.png",
  };

  const uiManifest: Record<UiArtKind, string> = {
    combo_burst: "/sprites/ui/combo-burst.png",
    special_flash: "/sprites/ui/special-flash.png",
    danger_telegraph: "/sprites/ui/danger-telegraph.png",
    recoverable_health_highlight: "/sprites/ui/recoverable-health-highlight.png",
  };

  await Promise.all(
    Object.entries(itemManifest).map(async ([kind, path]) => {
      const itemKind = kind as ItemKind;
      if (!sceneArtCache.items[itemKind]) {
        sceneArtCache.items[itemKind] = await loadImage(path);
      }
    }),
  );

  await Promise.all(
    Object.entries(hazardManifest).map(async ([kind, path]) => {
      const hazardKind = kind as HazardType;
      if (!sceneArtCache.hazards[hazardKind]) {
        sceneArtCache.hazards[hazardKind] = await loadImage(path);
      }
    }),
  );

  await Promise.all(
    Object.entries(uiManifest).map(async ([kind, path]) => {
      const uiKind = kind as UiArtKind;
      if (!sceneArtCache.ui[uiKind]) {
        sceneArtCache.ui[uiKind] = await loadImage(path);
      }
    }),
  );

  return sceneArtCache;
}

export function getLoadedSceneArt() {
  return sceneArtCache;
}
