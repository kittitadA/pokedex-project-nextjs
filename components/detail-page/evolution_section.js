import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

function EvolutionSection({ species }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [evolutionData, setEvolutionData] = useState([])

    function getNameEvo(data) {
        if (data?.species?.name ?? false) {
            return data.species.name
        }
        return null
    }

    function loopEvo(data) {
        let store = []
        if (data) {
            store.push(getNameEvo(data))
            if (data.hasOwnProperty("evolves_to")) {
                if (data.evolves_to.constructor.name === "Array") {
                    for (let i = 0; i < data.evolves_to.length; i++) {
                        store = [...store, ...loopEvo(data.evolves_to[i])]
                    }
                }
            }
        }

        return store
    }

    async function loadEvolution() {
        if (species?.evolution_chain?.url) {
            const evolution_chain = await fetch(species.evolution_chain.url, {
                method: "GET",
            }).then((res) => res.json())
            const pokemonEvoList = []
            const evo_name = [...loopEvo(evolution_chain?.chain)].filter(
                (data) => data !== null
            )

            for (let i = 0; i < evo_name.length; i++) {
                const pokemonData = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${evo_name[i]}`,
                    { method: "GET" }
                ).then((res) => res.json())
                pokemonEvoList.push({
                    id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.other.dream_world.front_default,
                })
            }

            setEvolutionData(pokemonEvoList)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadEvolution()
    }, [])

    function goToDetailPage(name) {
        router.push(`/${name}`)
    }

    return (
        <>
            <h3 className="text-2xl font-bold mt-14">Evolution</h3>
            {isLoading && <LoadingBox />}
            {!isLoading && evolutionData.length === 0 && (
                <div className="flex flex-col justify-center items-center mt-7">
                    <Image
                        className="aspect-square mx-auto"
                        src="/pikachu_surprise.png"
                        alt="no-item"
                        width={120}
                        height={120}
                    />
                    <p className="text-lg font-bold mt-4">No data available</p>
                </div>
            )}
            {!isLoading && evolutionData.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 mt-5 pr-11">
                    {evolutionData.map((pokemon, idx) => (
                        <div
                            className="relative pl-11"
                            key={pokemon.id}
                        >
                            {idx !== 0 && (
                                <div className="flex items-center absolute left-0 top-0 bottom-7 text-4xl text-blue-400">
                                    <ion-icon name="chevron-forward-circle" />
                                </div>
                            )}
                            <div
                                className="cursor-pointer"
                                onClick={() => goToDetailPage(pokemon.name)}
                            >
                                <div className="relative w-full pt-full overflow-hidden rounded-xl bg-gray-200 hover:bg-gray-300">
                                    <div className="absolute inset-2">
                                        <Image
                                            className="animation-fadeIn aspect-square m-auto h-full"
                                            src={
                                                pokemon?.image ?? "/unknow.png"
                                            }
                                            alt={pokemon.name}
                                            width={160}
                                            height={160}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="capitalize text-lg font-medium truncate">
                                        {pokemon.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export function LoadingBox() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 mt-5">
            {Array(3)
                .fill(null)
                .map((data, idx) => (
                    <div
                        className="relative pl-10 animate-pulse"
                        key={`loading_detail_${idx}`}
                    >
                        {idx !== 0 && (
                            <div className="flex items-center absolute left-0 top-0 bottom-7 text-4xl text-gray-200">
                                <ion-icon name="chevron-forward-circle" />
                            </div>
                        )}
                        <div className="cursor-pointer">
                            <div className="relative w-full pt-full overflow-hidden rounded-xl bg-gray-200 hover:bg-gray-300" />
                            <div className="mb-4">
                                <p className="capitalize text-base mt-1 text-transparent bg-gray-200 rounded-xl">
                                    Loading
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default EvolutionSection
