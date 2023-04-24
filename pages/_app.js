import "@/styles/globals.css"
import Head from "next/head"

import { applyMiddleware, createStore, compose } from "redux"
import { createWrapper } from "next-redux-wrapper"
import thunkMiddleware from "redux-thunk"

import rootReducer from "../reducer/rootReducer"
import Layout from "../components/layout/layout"

// Redux
const composeWithDevTools =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose
const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composedEnhancers = composeWithDevTools(middlewareEnhancer)
const store = () => createStore(rootReducer, composedEnhancers)
export const wrapper = createWrapper(store, { debug: false })

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Pokédex BETA</title>
                <meta
                    name="description"
                    content="Pokédex BETA"
                />
                <link
                    rel="icon"
                    href="/Pokeball.png"
                />
                <script
                    type="module"
                    src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
                />
                <script
                    nomodule
                    src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

export default wrapper.withRedux(App)
