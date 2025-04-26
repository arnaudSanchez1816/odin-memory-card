export function getChampionImagePath(imageName, tileVersion = false) {
    if (tileVersion) {
        return `champions/tiles/${imageName}`
    }

    return `champions/${imageName}`
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

export function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms))
}

export function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffle(array) {
    const shuffledArray = [...array]

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let k = shuffledArray[i]
        shuffledArray[i] = shuffledArray[j]
        shuffledArray[j] = k
    }

    return shuffledArray
}
