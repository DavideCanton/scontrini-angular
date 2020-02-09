declare namespace fx {
    interface FxStatic {
        canvas(): FxCanvas;
    }

    interface FxCanvas extends HTMLCanvasElement {
        update(): void;
        unsharpMask(unsharpRadius: number, unsharpStrength: number): FxCanvas;
        denoise(denoise: number): FxCanvas;
        hueSaturation(hue: number, saturation: number): FxCanvas;
        brightnessContrast(brightness: number, contrast: number): FxCanvas;
        draw(texture: FxTexture): FxCanvas;

        texture(video: HTMLVideoElement): FxTexture;
    }

    interface FxTexture {
        loadContentsOf(video: HTMLVideoElement): void;
    }
}

declare global {
    const fx: fx.FxStatic;
}

export = fx;
export as namespace fx;