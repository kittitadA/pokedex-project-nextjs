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
        const requestPokemon = pokemonResult.map((item) =>
            fetch(item.url, { method: "GET" }).catch((err) => {})
        )

        await Promise.all(requestPokemon)
            .then((rsponse) => Promise.all(rsponse.map((res) => res.json())))
            .then((item) => {
                const data = []
                for (let i = 0; i < item.length; i++) {
                    data.push({
                        id: item[i]?.id ?? item[i].name,
                        name: item[i].name,
                        image: item[i].sprites.other.dream_world.front_default,
                    })
                }

                store.dispatch(setPokemonList(data, 1, count))
                return { props: {}, revalidate: 180 }
            })
            .catch((err) => {
                return { notFound: true }
            })
    } catch (error) {
        return { notFound: true }
    }
})
