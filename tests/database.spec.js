import { test, expect, beforeAll, vi } from "vitest"
import { initializeDatabase, getRandomChampions } from "../src/database"

import { readFile } from "fs/promises"
import { resolve } from "path"

function toArrayBuffer(buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length)
    const view = new Uint8Array(arrayBuffer)
    for (let i = 0; i < buffer.length; ++i) view[i] = buffer[i]

    return arrayBuffer
}
class ResponseFake {
    constructor(buffer) {
        this.buffer = buffer
    }

    async json() {
        return JSON.parse(this.buffer.toString())
    }
    async text() {
        return this.buffer.toString()
    }
    async arrayBuffer() {
        return toArrayBuffer(this.buffer)
    }
}

beforeAll(async () => {
    vi.spyOn(global, "fetch").mockImplementation((url) => {
        return readFile(resolve(url)).then((buffer) => new ResponseFake(buffer))
    })
    await initializeDatabase()
})

test("Getting 10 random champions", () => {
    const championsArray = getRandomChampions(10)

    expect(championsArray.length).toBe(10)
})

test("Getting all champions", () => {
    const championsArray = getRandomChampions(170)

    const championSet = new Set()
    for (const champion of championsArray) {
        championSet.add(champion.id)
    }
    expect(championSet.size).toBe(championsArray.length)
})
