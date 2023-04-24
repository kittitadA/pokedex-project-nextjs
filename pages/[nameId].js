import { useRouter } from "next/router"
import Image from "next/image"
import Head from "next/head"

import LoadingDetail from "../components/detail-page/loading_detail_page"
import EvolutionSection from "../components/detail-page/evolution_section"

const COLOR_TYPE_POKEMON = {
    bug: { color: "#a8b820" },
    dark: { color: "#705848" },
    dragon: { color: "#7038f8" },
    electric: { color: "#f8d030" },
    fairy: { color: "#f8a0e0" },
    fighting: { color: "#903028" },
    fire: { color: "#f05030" },
    flying: { color: "#a890f0" },
    ghost: { color: "#705898" },
    grass: { color: "#78c850" },
    ground: { color: "#e0c068" },
    ice: { color: "#98d8d8" },
    normal: { color: "#a8a878" },
    poison: { color: "#a040a0" },
    psychic: { color: "#f85888" },
    rock: { color: "#b8a038" },
    shadow: { color: "#403246" },
    steel: { color: "#b8b8d0" },
    unknown: { color: "#68a090" },
    water: { color: "#6890f0" },
}

function PokemonDetail({ pokemonData = null }) {
    const router = useRouter()

    if (!pokemonData || router.isFallback) {
        return <LoadingDetail />
    }

    function getTextDescription(flavor_text) {
        let textDescription = "-"
        if (flavor_text.constructor.name === "Array") {
            if (flavor_text.length > 0) {
                const index = flavor_text.findIndex(
                    (data) =>
                        data.version.name === "firered" &&
                        data.language.name === "en"
                )
                if (index > -1) {
                    textDescription = flavor_text[index].flavor_text
                }

                const idx = flavor_text.findIndex(
                    (data) =>
                        data.version.name === "leafgreen" &&
                        data.language.name === "en"
                )

                if (idx > -1) {
                    textDescription = `${textDescription} ${flavor_text[idx].flavor_text}`
                }
            }
        }

        return textDescription
    }

    const title = pokemonData.name
    const titleCapitalize = title.charAt(0).toUpperCase() + title.slice(1)

    return (
        <>
            <Head>
                <title class="capitalize">{titleCapitalize}</title>
            </Head>
            <section className="container max-w-screen-lg mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                        <Image
                            className="aspect-square mx-auto animation-fadeIn"
                            src={
                                pokemonData?.sprites?.other?.dream_world
                                    ?.front_default ?? "/unknow.png"
                            }
                            alt={pokemonData.name}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div>
                        <h3 className="text-4xl text-center capitalize">
                            <span className="font-bold">
                                {pokemonData.name}{" "}
                            </span>
                            <span className="text-2xl text-neutral-400 font-medium">
                                {`#${pokemonData.id}`}
                            </span>
                        </h3>

                        {pokemonData.types.length > 0 && (
                            <div className="flex flex-row flex-wrap items-center mt-4 mb-2">
                                {pokemonData.types.map((dataType) => {
                                    if (
                                        dataType?.type?.name &&
                                        COLOR_TYPE_POKEMON[dataType.type.name]
                                    ) {
                                        return (
                                            <div
                                                className="py-1 px-2 rounded-lg mr-1"
                                                key={`type_${pokemonData.id}_${dataType.type.name}`}
                                                style={{
                                                    backgroundColor:
                                                        COLOR_TYPE_POKEMON[
                                                            dataType.type.name
                                                        ].color,
                                                }}
                                            >
                                                <p className="text-white text-sm drop-shadow-sm capitalize">
                                                    {dataType.type.name}
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        )}

                        <p className="text-xl mt-1">
                            {getTextDescription(
                                pokemonData?.species?.flavor_text_entries ?? []
                            )}
                        </p>
                        <div className="max-w-lg mx-auto mt-6">
                            {pokemonData.stats.map((data, index) => (
                                <div
                                    className="grid grid-cols-10 gap-4 items-center mt-4"
                                    key={`state_${pokemonData.name}_${data.stat.name}`}
                                >
                                    <div className="col-span-3">
                                        <div className="text-base font-medium dark:text-white capitalize truncate text-neutral-500">
                                            {data.stat.name}
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <p className="font-medium">
                                            {data.base_stat}
                                        </p>
                                    </div>
                                    <div className="col-span-6">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mu-auto dark:bg-gray-700">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                                                style={{
                                                    width: `${
                                                        (data.base_stat / 255) *
                                                        100
                                                    }%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <EvolutionSection species={pokemonData.species} />
            </section>
        </>
    )
}

export async function getStaticProps(context) {
    try {
        const { nameId } = context.params
        const pokemonResult = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nameId}`,
            { method: "GET" }
        ).then((res) => res.json())
        const specieData = await fetch(pokemonResult.species.url, {
            method: "GET",
        }).then((res) => res.json())
        pokemonResult.species = { ...pokemonResult.species, ...specieData }
        return {
            props: { pokemonData: pokemonResult },
            revalidate: 60,
        }
    } catch (error) {
        return { notFound: true }
    }
}

export async function getStaticPaths() {
    try {
        const getPokemonList = await fetch(
            "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5",
            { method: "GET" }
        ).then((res) => res.json())
        const pokemonResult = getPokemonList.results
        return {
            paths: pokemonResult.map((slug) => ({
                params: { nameId: slug.name },
            })),
            fallback: true,
        }
    } catch (error) {
        return {
            paths: [],
            fallback: true,
        }
    }
}

export default PokemonDetail
