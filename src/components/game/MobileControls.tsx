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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-3 pb-4 lg:hidden [touch-action:none] [user-select:none] sm:px-4 sm:pb-5">
        <div className="pointer-events-auto grid grid-cols-3 gap-2 rounded-[30px] border border-[#ff8a63]/28 bg-[linear-gradient(180deg,rgba(30,12,10,0.8),rgba(11,4,4,0.72))] p-3 shadow-[0_24px_48px_rgba(0,0,0,0.42)] backdrop-blur-md">
          <div />
          <ControlButton
            ariaLabel="Mover arriba"
            keyName="up"
            label="▲"
            onInput={onInput}
            className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#ff8a63]/45 bg-[radial-gradient(circle_at_35%_30%,rgba(255,124,92,0.94),rgba(175,24,14,0.96))] text-xl font-black text-white shadow-[0_0_28px_rgba(255,73,37,0.32)] transition active:scale-[0.96]"
          />
          <div />
          <ControlButton
            ariaLabel="Mover izquierda"
            keyName="left"
            label="◀"
            onInput={onInput}
            className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#ff8a63]/45 bg-[radial-gradient(circle_at_35%_30%,rgba(255,124,92,0.94),rgba(175,24,14,0.96))] text-xl font-black text-white shadow-[0_0_28px_rgba(255,73,37,0.32)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Mover abajo"
            keyName="down"
            label="▼"
            onInput={onInput}
            className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#ff8a63]/45 bg-[radial-gradient(circle_at_35%_30%,rgba(255,124,92,0.94),rgba(175,24,14,0.96))] text-xl font-black text-white shadow-[0_0_28px_rgba(255,73,37,0.32)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Mover derecha"
            keyName="right"
            label="▶"
            onInput={onInput}
            className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#ff8a63]/45 bg-[radial-gradient(circle_at_35%_30%,rgba(255,124,92,0.94),rgba(175,24,14,0.96))] text-xl font-black text-white shadow-[0_0_28px_rgba(255,73,37,0.32)] transition active:scale-[0.96]"
          />
        </div>
        <div className="pointer-events-auto grid gap-3">
          <ControlButton
            ariaLabel="Especial"
            keyName="special"
            label="Especial"
            onInput={onInput}
            className="flex h-[4.25rem] min-w-[7.5rem] items-center justify-center rounded-[1.45rem] border border-[#fff0cf]/28 bg-[radial-gradient(circle_at_30%_30%,rgba(255,227,128,0.98),rgba(209,117,28,0.92))] px-5 text-base font-black text-white shadow-[0_0_34px_rgba(255,182,43,0.28)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Bloquear"
            keyName="block"
            label="Bloqueo"
            onInput={onInput}
            className="flex h-[4.25rem] min-w-[7.5rem] items-center justify-center rounded-[1.45rem] border border-[#cde2ff]/28 bg-[radial-gradient(circle_at_30%_30%,rgba(149,187,255,0.95),rgba(48,89,173,0.9))] px-5 text-base font-black text-white shadow-[0_0_30px_rgba(81,143,255,0.24)] transition active:scale-[0.96]"
          />
          <ControlButton
            ariaLabel="Golpear"
            keyName="attack"
            label="Golpe"
            onInput={onInput}
            className="flex h-[5rem] min-w-[8.5rem] items-center justify-center rounded-[1.6rem] border border-[#ffd0b5]/35 bg-[radial-gradient(circle_at_30%_30%,rgba(255,116,76,0.98),rgba(150,6,6,0.94))] px-6 text-lg font-black text-white shadow-[0_0_38px_rgba(255,51,22,0.34)] transition active:scale-[0.96]"
          />
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
        <div className="grid gap-2">
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
            ariaLabel="Bloquear"
            keyName="block"
            label="Bloquear"
            onInput={onInput}
            className="rounded-2xl border border-black/8 bg-[color:rgba(72,113,196,0.95)] px-4 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(34,66,128,0.24)] transition active:scale-[0.98]"
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
        <p>Golpe: tocá rápido para el combo básico</p>
        <p>Especial: limpia espacio, pero gasta vida recuperable</p>
        <p>Bloqueo: mantenelo de frente al golpe</p>
      </div>
    </section>
  );
}
