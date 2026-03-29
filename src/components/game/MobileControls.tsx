"use client";

import type { MouseEvent, PointerEvent } from "react";

import type { InputState } from "@/game/types/gameTypes";

type MobileControlsProps = {
  onInput: (input: Partial<InputState>) => void;
  variant?: "panel" | "overlay";
};

function pressHandlers(
  key: keyof InputState,
  onInput: (input: Partial<InputState>) => void,
) {
  const release = () => onInput({ [key]: false });

  return {
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (event.currentTarget.setPointerCapture) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      onInput({ [key]: true });
    },
    onPointerUp: (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      release();
      if (
        event.currentTarget.hasPointerCapture &&
        event.currentTarget.hasPointerCapture(event.pointerId)
      ) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    onPointerCancel: (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      release();
    },
    onLostPointerCapture: release,
    onContextMenu: (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
  };
}

type ControlButtonProps = {
  ariaLabel: string;
  keyName: keyof InputState;
  label: string;
  onInput: (input: Partial<InputState>) => void;
  className: string;
};

function ControlButton({
  ariaLabel,
  keyName,
  label,
  onInput,
  className,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      {...pressHandlers(keyName, onInput)}
    >
      {label}
    </button>
  );
}

export function MobileControls({
  onInput,
  variant = "panel",
}: MobileControlsProps) {
  if (variant === "overlay") {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-3 pb-3 lg:hidden [touch-action:none] [user-select:none] sm:px-4 sm:pb-4">
        <div className="pointer-events-auto grid grid-cols-3 gap-2 rounded-[28px] border border-[#ff5a36]/35 bg-[linear-gradient(180deg,rgba(24,2,2,0.82),rgba(10,0,0,0.72))] p-2 shadow-[0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-md">
          <div />
          <ControlButton
            ariaLabel="Mover arriba"
            keyName="up"
            label="▲"
            onInput={onInput}
            className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-[#ff6842]/55 bg-[radial-gradient(circle_at_35%_30%,rgba(255,105,75,0.92),rgba(173,11,11,0.94))] text-lg font-black text-white shadow-[0_0_28px_rgba(255,61,28,0.34)] transition active:scale-[0.96]"
          />
          <div />
          <ControlButton
            ariaLabel="Mover izquierda"
            keyName="left"
            label="◀"
            onInput={onInput}
            className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-[#ff6842]/55 bg-[radial-gradient(circle_at_35%_30%,rgba(255,105,75,0.92),rgba(173,11,11,0.94))] text-lg font-black text-white shadow-[0_0_28px_rgba(255,61,28,0.34)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Mover abajo"
            keyName="down"
            label="▼"
            onInput={onInput}
            className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-[#ff6842]/55 bg-[radial-gradient(circle_at_35%_30%,rgba(255,105,75,0.92),rgba(173,11,11,0.94))] text-lg font-black text-white shadow-[0_0_28px_rgba(255,61,28,0.34)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Mover derecha"
            keyName="right"
            label="▶"
            onInput={onInput}
            className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-[#ff6842]/55 bg-[radial-gradient(circle_at_35%_30%,rgba(255,105,75,0.92),rgba(173,11,11,0.94))] text-lg font-black text-white shadow-[0_0_28px_rgba(255,61,28,0.34)] transition active:scale-[0.96]"
          />
        </div>
      <div className="pointer-events-auto grid grid-cols-5 gap-3 pb-1">
          <ControlButton
            ariaLabel="Esquivar"
            keyName="dash"
            label="D"
            onInput={onInput}
            className="mb-10 flex h-14 w-14 items-center justify-center self-end rounded-full border border-[#ffe2c9]/30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,188,131,0.96),rgba(174,78,18,0.9))] text-xl font-black text-white shadow-[0_0_28px_rgba(255,145,51,0.3)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Saltar"
            keyName="jump"
            label="A"
            onInput={onInput}
            className="flex h-16 w-16 items-center justify-center self-end rounded-full border border-[#ff9a74]/45 bg-[radial-gradient(circle_at_30%_30%,rgba(255,141,98,0.98),rgba(204,39,7,0.92))] text-xl font-black text-white shadow-[0_0_34px_rgba(255,79,33,0.36)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Especial"
            keyName="special"
            label="S"
            onInput={onInput}
            className="mb-7 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-[#fff0cf]/30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,226,120,0.98),rgba(205,106,15,0.92))] text-xl font-black text-white shadow-[0_0_34px_rgba(255,182,43,0.34)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Agarrar"
            keyName="grab"
            label="C"
            onInput={onInput}
            className="mb-4 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-[#fff0cf]/28 bg-[radial-gradient(circle_at_30%_30%,rgba(255,210,145,0.95),rgba(171,95,20,0.9))] text-xl font-black text-white shadow-[0_0_30px_rgba(255,180,72,0.28)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Golpear"
            keyName="attack"
            label="B"
            onInput={onInput}
            className="mt-8 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-[#ffd0b5]/35 bg-[radial-gradient(circle_at_30%_30%,rgba(255,116,76,0.98),rgba(150,6,6,0.94))] text-2xl font-black text-white shadow-[0_0_38px_rgba(255,51,22,0.42)] transition active:scale-[0.96]"
          />
        </div>
        <div className="pointer-events-none absolute bottom-[5.25rem] right-4 rounded-[18px] border border-white/10 bg-black/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f8e5c6]/78 shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
          B x3 combo · S especial · C agarrar/lanzar · D esquive
        </div>
      </div>
    );
  }

  return (
    <section className="grid gap-4 rounded-[24px] border border-black/10 bg-[var(--panel)] p-4 shadow-[0_20px_60px_var(--shadow)] backdrop-blur-sm lg:hidden [touch-action:none] [user-select:none]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
        Controles Mobile
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div />
          <ControlButton
            ariaLabel="Mover arriba"
            keyName="up"
            label="↑"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-black/8 px-4 py-3 font-semibold transition active:scale-[0.98] active:bg-black/12"
          />
          <div />
          <ControlButton
            ariaLabel="Mover izquierda"
            keyName="left"
            label="←"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-black/8 px-4 py-3 font-semibold transition active:scale-[0.98] active:bg-black/12"
          />
          <ControlButton
            ariaLabel="Mover abajo"
            keyName="down"
            label="↓"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-black/8 px-4 py-3 font-semibold transition active:scale-[0.98] active:bg-black/12"
          />
          <ControlButton
            ariaLabel="Mover derecha"
            keyName="right"
            label="→"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-black/8 px-4 py-3 font-semibold transition active:scale-[0.98] active:bg-black/12"
          />
        </div>
        <div className="grid grid-cols-5 gap-2">
          <ControlButton
            ariaLabel="Esquivar"
            keyName="dash"
            label="Esquive"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-[var(--accent-strong)] px-4 py-3 font-semibold text-[#2c1509] shadow-[0_12px_28px_rgba(187,77,0,0.18)] transition active:scale-[0.98]"
          />
          <ControlButton
            ariaLabel="Saltar"
            keyName="jump"
            label="Saltar"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-[var(--accent)] px-4 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(187,77,0,0.26)] transition active:scale-[0.98]"
          />
          <ControlButton
            ariaLabel="Especial"
            keyName="special"
            label="Especial"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-[color:rgba(210,129,21,0.95)] px-4 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(148,88,7,0.24)] transition active:scale-[0.98]"
          />
          <ControlButton
            ariaLabel="Agarrar"
            keyName="grab"
            label="Agarrar"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-[color:rgba(166,101,24,0.95)] px-4 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(99,58,4,0.24)] transition active:scale-[0.98]"
          />
          <ControlButton
            ariaLabel="Golpear"
            keyName="attack"
            label="Golpe"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-black px-4 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] transition active:scale-[0.98]"
          />
        </div>
      </div>
      <div className="grid gap-1 rounded-[18px] border border-black/8 bg-black/6 p-3 text-xs text-black/68">
        <p>Combo: Golpe x3</p>
        <p>Especial: Especial, gasta vida recuperable</p>
        <p>Agarre: Agarrar y repetir para lanzar</p>
        <p>Defensa: cubrirse solo con Paraguas activo</p>
      </div>
    </section>
  );
}
