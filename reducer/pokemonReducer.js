import update from "react-addons-update"
import { HYDRATE } from "next-redux-wrapper"

import {
    SET_POKEMON_LIST,
    SET_CURRENT_PAGE_POKEMON,
    SET_SCROLL_HOME_PAGE,
} from "../actions/pokemon_action"

const defaultState = {
    allPage: 1,
    currentPage: 1,
    allPokemon: [],
    scrollHomePage: 0,
}

function pokemonReducer(state = defaultState, action) {
    switch (action.type) {
        case HYDRATE:
            if (
                action?.payload?.pokemon?.allPokemon?.constructor.name ===
                "Array"
            ) {
                if (
                    action.payload.pokemon.allPokemon.length > 0 &&
                    state.allPokemon.length === 0
                ) {
                    return action.payload.pokemon
                }
            }
            return state

        case SET_POKEMON_LIST:
            return update(state, {
                allPage: {
                    $apply: (p) => (action.count !== null ? action.count : p),
                },
                currentPage: { $set: action.page },
                allPokemon: {
                    [action.page]: { $set: action.data },
                },
            })

        case SET_CURRENT_PAGE_POKEMON:
            return update(state, {
                currentPage: { $set: action.page },
            })

        case SET_SCROLL_HOME_PAGE:
            return update(state, {
                scrollHomePage: { $set: action.scroll },
            })

        default:
            return state
    }
}

export default pokemonReducer
