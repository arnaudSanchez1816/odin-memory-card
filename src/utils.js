export function getChampionImagePath(imageName, tileVersion = false) {
    if (tileVersion) {
        return `/src/assets/champions/tiles/${imageName}`
    }

    return `/src/assets/champions/${imageName}`
}

export function lerp(a, b, t) {
    return a * (1 - t) + b * t
}
export function clamp(a, min = 0, max = 1) {
    return Math.min(max, Math.max(min, a))
}
export function inverseLerp(a, b, value) {
    return clamp((value - a) / (b - a))
}
export function range(x1, y1, x2, y2, a) {
    return lerp(x2, y2, inverseLerp(x1, y1, a))
}
