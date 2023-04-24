export const SET_POKEMON_LIST = "SET_POKEMON_LIST"
export const SET_CURRENT_PAGE_POKEMON = "SET_CURRENT_PAGE_POKEMON"
export const SET_SCROLL_HOME_PAGE = "SET_SCROLL_HOME_PAGE"

export function setPokemonList(data, page, count = null) {
    return {
        type: SET_POKEMON_LIST,
        data,
        page,
        count,
    }
}

export function setCurrentPagePokemon(page) {
    return {
        type: SET_CURRENT_PAGE_POKEMON,
        page,
    }
}

export function setScrollHomePage(scroll) {
    return {
        type: SET_SCROLL_HOME_PAGE,
        scroll,
    }
}
