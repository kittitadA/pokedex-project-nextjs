import { useState, useRef, useEffect } from "react"
import { connect } from "react-redux"
import { useRouter } from "next/router"
import Image from "next/image"
import classes from "./home_page.module.css"

import Pagination from "./pagination"

import {
    setPokemonList,
    setCurrentPagePokemon,
    setScrollHomePage,
} from "../../actions/pokemon_action"

function HomePage({
    pokemon,
    setPokemonList,
    setCurrentPagePokemon,
    setScrollHomePage,
}) {
    const topPagination = useRef(null)
    const timer = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [searchData, setSearchData] = useState([])
    const [searchText, setSearchText] = useState("")

    const router = useRouter()
    const count = pokemon.allPage
    const numAllPage = Math.ceil(count / 20)
    const { currentPage } = pokemon
    const pokemonData = isSearching
        ? searchData
        : pokemon.allPokemon[currentPage]

    function setDefaultScroll() {
        if (pokemon.scrollHomePage && window) {
            window.scrollTo({ top: pokemon.scrollHomePage })
        }
    }

    useEffect(() => {
        setDefaultScroll()
    }, [])

    function onChangePage(page) {
        if (currentPage !== page && !isLoading) {
            if (topPagination.current) {
                topPagination.current.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                })
            }
            if (pokemon.allPokemon[page]) {
                setCurrentPagePokemon(page)
            } else {
                setIsLoading(true)
                setCurrentPagePokemon(page)
                fetch(
                    `https://pokeapi.co/api/v2/pokemon/?offset=${
                        (page - 1) * 20
                    }&limit=20`,
                    { method: "GET" }
                )
                    .then((res) => res.json())
                    .then(async (response) => {
                        const pokemonResult = response.results
                        const requestPokemon = pokemonResult.map((item) =>
                            fetch(item.url, { method: "GET" }).catch(
                                (err) => {}
                            )
                        )

                        Promise.all(requestPokemon)
                            .then((rsponse) =>
                                Promise.all(rsponse.map((res) => res.json()))
                            )
                            .then((item) => {
                                const data = []
                                for (let i = 0; i < item.length; i++) {
                                    data.push({
                                        id: item[i]?.id ?? item[i].name,
                                        name: item[i].name,
                                        image: item[i].sprites.other.dream_world
                                            .front_default,
                                    })
                                }

                                setPokemonList(data, page)
                                setIsLoading(false)
                            })
                            .catch((err) => {
                                setPokemonList([], page)
                                setIsLoading(false)
                            })
                    })
                    .catch((err) => {
                        setPokemonList([], page)
                        setIsLoading(false)
                    })
            }
        }
    }

    function goToDetailPage(name) {
        setScrollHomePage(window.scrollY)
        router.push(`/${name}`)
    }

    async function searchPokemon(e) {
        const { value } = e.target
        setSearchText(e.target.value)
        clearTimeout(timer.current)
        if (value.trim().length > 1) {
            setIsLoading(true)
            setIsSearching(true)
            timer.current = setTimeout(async () => {
                try {
                    const getPokemonList = await fetch(
                        `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`,
                        { method: "GET" }
                    ).then((res) => res.json())
                    const data = [
                        {
                            id: getPokemonList.id,
                            name: getPokemonList.name,
                            image: getPokemonList.sprites.other.dream_world
                                .front_default,
                        },
                    ]
                    setSearchData(data)
                    setIsLoading(false)
                } catch (error) {
                    setIsLoading(false)
                }
            }, 2500)
        } else {
            setSearchData([])
            setIsLoading(false)
            setIsSearching(false)
        }
    }

    return (
        <section className="container max-w-screen-lg mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold">Pokédex</h1>
            <h4 className="text-xl">
                The Pokédex section has a wealth of information on all the
                Pokémon creatures. On the main list pages you can see the
                various stats of each Pokémon. Click a Pokémon's name to see a
                detailed page with Pokédex data
            </h4>
            <div
                ref={topPagination}
                className="flex items-center max-w-xl pt-8 mb-10 mx-auto"
            >
                <label
                    htmlFor="simple-search"
                    className="sr-only"
                >
                    Search
                </label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-xl text-gray-400">
                        <ion-icon name="search" />
                    </div>
                    <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-700 focus:border-blue-700 focus:outline-blue-600 block w-full pl-10 p-2.5"
                        placeholder="Pikachu"
                        value={searchText}
                        onChange={searchPokemon}
                    />
                </div>
            </div>
            {isLoading && <LoadingBox />}
            {!isLoading &&
                (!pokemonData ||
                    (pokemonData?.constructor?.name === "Array" &&
                        pokemonData.length === 0)) && (
                    <div
                        className="flex flex-col justify-center items-center mt-7"
                        style={{ minHeight: "75vh" }}
                    >
                        <Image
                            className="aspect-square mx-auto"
                            src="/pikachu_surprise.png"
                            alt="no-item"
                            width={250}
                            height={250}
                        />
                        <p className="text-2xl font-bold mt-4">
                            No data available
                        </p>
                    </div>
                )}
            {!isLoading &&
                pokemonData?.constructor?.name === "Array" &&
                pokemonData.length > 0 && (
                    <div
                        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-7 ${classes.min_height_grid}`}
                    >
                        {pokemonData.map((pokemon) => (
                            <div
                                className="cursor-pointer"
                                key={pokemon.id}
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
                        ))}
                    </div>
                )}
            {!isSearching && (
                <Pagination
                    pageLength={numAllPage}
                    currentPage={currentPage}
                    setCurrentPage={onChangePage}
                />
            )}
        </section>
    )
}

function LoadingBox() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-7">
            {Array(20)
                .fill(null)
                .map((data, idx) => (
                    <div
                        className="cursor-pointer animate-pulse"
                        key={`loading_home_${idx}`}
                    >
                        <div className="relative w-full pt-full overflow-hidden rounded-xl bg-zinc-200" />
                        <div className="mb-4">
                            <p className="capitalize text-base mt-1 text-transparent bg-gray-200 rounded-xl animate-pulse">
                                Loading
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        pokemon: state.pokemon,
    }
}

export default connect(mapStateToProps, {
    setPokemonList,
    setCurrentPagePokemon,
    setScrollHomePage,
})(HomePage)
