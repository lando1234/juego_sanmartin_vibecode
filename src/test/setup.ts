import "@testing-library/jest-dom/vitest";

let rafHandle = 0;

Object.defineProperty(window, "requestAnimationFrame", {
  writable: true,
  value: () => {
    rafHandle += 1;
    return rafHandle;
  },
});

Object.defineProperty(window, "cancelAnimationFrame", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "Image", {
  writable: true,
  value: class MockImage {
    onload: null | (() => void) = null;
    onerror: null | (() => void) = null;

    set src(_value: string) {
      if (this.onload) {
        this.onload();
      }
    }
  },
});

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () =>
    ({
      canvas: {
        width: 1280,
        height: 720,
      },
      clearRect: () => {},
      createLinearGradient: () => ({
        addColorStop: () => {},
      }),
      fillRect: () => {},
      beginPath: () => {},
      ellipse: () => {},
      fill: () => {},
      fillText: () => {},
      arc: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      drawImage: () => {},
      roundRect: () => {},
    }) as unknown as CanvasRenderingContext2D,
});
