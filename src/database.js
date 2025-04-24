import champions from "./assets/data/champion.json"

let databaseLoaded = false
const championsDatabase = []

export async function initializeDatabase() {
    const data = champions.data
    try {
        for (const champion in data) {
            const championData = data[champion]
            const response = await fetch(
                `src/assets/data/champion/${championData.id}.json`
            )

            if (response.ok == false) {
                throw new Error(response.status)
            }
            const championJson = await response.json()
            championsDatabase.push(championJson.data[champion])
        }
        databaseLoaded = true
    } catch (error) {
        console.error(error)
    }
}

export function getRandomChampions(count) {
    if (!databaseLoaded) {
        throw new Error("Database not loaded")
    }

    const databaseCopy = [...championsDatabase]
    const champions = []
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * databaseCopy.length)
        champions.push(databaseCopy[index])
        databaseCopy.splice(index, 1)
    }

    return champions
}

export function getChampionImageName(champion, skinIndex) {
    const skins = champion.skins

    if (skinIndex < 0 || skinIndex >= skins.length) {
        throw new Error("Index out of bound")
    }

    return `${champion.id}_${skins[skinIndex].num}.jpg`
}
