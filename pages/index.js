import HomePage from "../components/home-page/home_page"
import { wrapper } from "./_app"

import { setPokemonList } from "../actions/pokemon_action"

export default function Home() {
    return <HomePage />
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    try {
        const getPokemonList = await fetch(
            "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
            { method: "GET" }
        ).then((res) => res.json())
        const pokemonResult = getPokemonList?.results ?? []
        const count = getPokemonList?.count ?? 0
        const data = []

        for (let i = 0; i < pokemonResult.length; i++) {
            const pokemonData = await fetch(pokemonResult[i].url, {
                method: "GET",
            }).then((res) => res.json())
            data.push({
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.other.dream_world.front_default,
            })
        }

        store.dispatch(setPokemonList(data, 1, count))

        return { props: {}, revalidate: 180 }
    } catch (error) {
        return { notFound: true }
    }
})
