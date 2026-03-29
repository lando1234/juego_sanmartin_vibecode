import { describe, expect, it } from "vitest";

import { enemyCatalog } from "@/game/data/enemyCatalog";

describe("enemyCatalog", () => {
  it("keeps enemy roles distinct through stats and pressure ranges", () => {
    expect(enemyCatalog.colado.behavior.cooldownMs).toBeLessThan(
      enemyCatalog.durmiente.behavior.cooldownMs,
    );
    expect(enemyCatalog.mochilero.hp).toBeGreaterThan(enemyCatalog.colado.hp);
    expect(enemyCatalog.vendedor_competencia.behavior.attackRange).toBeGreaterThan(
      enemyCatalog.colado.behavior.attackRange,
    );
    expect(enemyCatalog.fisura.speed).toBeGreaterThan(enemyCatalog.senora_bolsos.speed);
  });

  it("keeps miniboss and boss pressure above the common roster", () => {
    expect(enemyCatalog.borracho.hp).toBeGreaterThan(enemyCatalog.mochilero.hp);
    expect(enemyCatalog.boss_fisura_bici.hp).toBeGreaterThan(enemyCatalog.borracho.hp);
    expect(enemyCatalog.boss_fisura_bici.behavior.cooldownMs).toBeLessThan(
      enemyCatalog.borracho.behavior.cooldownMs,
    );
    expect(
      enemyCatalog.boss_fisura_bici.behavior.aggroRange,
    ).toBeGreaterThan(enemyCatalog.vendedor_competencia.behavior.aggroRange);
  });

  it("preserves defensive and anti-spam identities where they matter", () => {
    expect(enemyCatalog.durmiente.modifiers?.guardChance ?? 0).toBeGreaterThan(0.4);
    expect(enemyCatalog.senora_bolsos.modifiers?.guardChance ?? 0).toBeGreaterThan(0.25);
    expect(enemyCatalog.mochilero.modifiers?.poiseHits ?? 0).toBeGreaterThanOrEqual(3);
    expect(enemyCatalog.fisura.modifiers?.antiSpamBias ?? 0).toBeGreaterThan(
      enemyCatalog.colado.modifiers?.antiSpamBias ?? 0,
    );
  });
});
