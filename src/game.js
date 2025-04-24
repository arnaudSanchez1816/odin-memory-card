import { getChampionImageName, getRandomChampions } from "./database"
import { randomRange } from "./utils"

export function createGame(nbChampions) {
    const champions = getRandomChampions(nbChampions)
    const championsPool = []
    for (const champion of champions) {
        const randomSkinIndex = Math.floor(
            Math.random() * champion.skins.length
        )
        const skinImageName = getChampionImageName(champion, randomSkinIndex)
        championsPool.push({
            id: champion.key,
            name: champion.name,
            image: skinImageName,
        })
    }

    function getChampionsToDisplay(nb) {
        if (nb < 0 || nb >= this.championsPool) {
            throw new Error("Out of bounds")
        }

        let eligibleChampions = [...this.championsPool]
        let remainingPool = [...this.remainingValidChoices]
        let toAdd = nb
        const champsToDisplay = []
        const nbValidChamps = randomRange(
            1,
            Math.min(nb, this.remainingValidChoices.length)
        )

        for (let i = 0; i < nbValidChamps; i++) {
            const index = Math.floor(Math.random() * remainingPool.length)
            const championId = remainingPool[index]
            remainingPool = remainingPool.filter((item) => item !== championId)

            const eligibleChampIndex = eligibleChampions.findIndex(
                (item) => item.id === championId
            )
            champsToDisplay.push(eligibleChampions[eligibleChampIndex])
            eligibleChampions.splice(eligibleChampIndex, 1)
            toAdd -= 1
        }

        if (toAdd > 0) {
            for (let i = 0; i < toAdd; i++) {
                const index = Math.floor(
                    Math.random() * eligibleChampions.length
                )
                const randomChampion = eligibleChampions[index]
                champsToDisplay.push(randomChampion)
                eligibleChampions = eligibleChampions.filter(
                    (item) => item.id !== randomChampion.id
                )
            }
        }

        return champsToDisplay
    }

    return {
        currentScore: 0,
        championsPool: championsPool,
        remainingValidChoices: championsPool.map((c) => c.id),
        getChampionsToDisplay: getChampionsToDisplay,
    }
}
