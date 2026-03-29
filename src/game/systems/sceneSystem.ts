import { createEnemy } from "@/game/entities/createEnemy";
import type { GameState } from "@/game/types/gameTypes";

export function updateScene(state: GameState) {
  if (state.phase !== "playing") {
    return;
  }

  if (
    !state.scene.waveTriggered &&
    state.player.x >= state.levelLayout.wave1TriggerX
  ) {
    state.scene.waveTriggered = true;
    state.scene.gateClosed = true;
    state.scene.waveIndex = 1;
    state.scene.gateRightX = state.levelLayout.gate1EndX;
    state.scene.type = "carriage_combat";
    state.enemies = state.levelLayout.wave1Spawns.map((spawn) =>
      createEnemy(spawn.kind, spawn.x, spawn.y),
    );
    state.hud.objective = "Limpiá el pasillo y abrí el paso al siguiente tramo.";
  }

  if (
    state.scene.gateClosed &&
    state.scene.waveIndex === 1 &&
    state.enemies.every((enemy) => enemy.hp <= 0)
  ) {
    state.scene.gateClosed = false;
    state.scene.gateRightX = null;
    state.hud.objective =
      "Primera oleada limpia. Metete más adentro del vagon.";
  }

  if (
    state.scene.waveTriggered &&
    !state.scene.secondWaveTriggered &&
    state.player.x >= state.levelLayout.wave2TriggerX
  ) {
    state.scene.secondWaveTriggered = true;
    state.scene.gateClosed = true;
    state.scene.gateRightX = state.levelLayout.gate2EndX;
    state.scene.waveIndex = 2;
    state.scene.type = "carriage_combat";
    state.enemies = state.levelLayout.wave2Spawns.map((spawn) =>
      createEnemy(spawn.kind, spawn.x, spawn.y),
    );
    state.hud.objective = "La segunda manga se pudrió. Abrite paso al fondo.";
  }

  if (
    state.scene.gateClosed &&
    state.scene.waveIndex === 2 &&
    !state.scene.bossTriggered &&
    state.enemies.every((enemy) => enemy.hp <= 0)
  ) {
    state.scene.gateClosed = false;
    state.scene.gateRightX = null;
    state.hud.objective = "Se abrió el fondo del vagon. El Capo te está esperando.";
  }

  if (
    state.scene.secondWaveTriggered &&
    !state.scene.bossTriggered &&
    state.player.x >= state.levelLayout.bossTriggerX
  ) {
    state.scene.bossTriggered = true;
    state.scene.gateClosed = true;
    state.scene.gateRightX = state.levelLayout.bossGateEndX;
    state.scene.waveIndex = 3;
    state.scene.type = "boss_combat";
    state.enemies = [
      createEnemy(
        state.levelLayout.bossSpawn.kind,
        state.levelLayout.bossSpawn.x,
        state.levelLayout.bossSpawn.y,
      ),
    ];
    state.hud.objective = "Boss fight: tumbá al Capo del Pasillo.";
  }

  if (
    state.scene.bossTriggered &&
    state.scene.gateClosed &&
    state.enemies.every((enemy) => enemy.hp <= 0)
  ) {
    state.scene.gateClosed = false;
    state.scene.gateRightX = null;
    state.scene.victoryWalkTriggered = true;
    state.hud.objective = "El Capo cayó. Caminá al furgon y cerrá el nivel.";
  }

  if (
    state.scene.victoryWalkTriggered &&
    state.player.x >= state.levelLayout.exitTriggerX
  ) {
    state.hud.objective = "Saliste del cuello de botella. El vagon es tuyo.";
  }

  if (
    state.scene.victoryWalkTriggered &&
    state.player.x >= state.levelLayout.exitX
  ) {
    state.phase = "victory";
  }
}
