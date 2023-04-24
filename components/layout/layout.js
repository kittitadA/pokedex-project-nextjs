import Link from "next/link"
import { Roboto } from "next/font/google"
import classes from "./layout.module.css"

const source_Sans_Pro = Roboto({
    subsets: ["latin"],
    variable: "--Source-Sans-Pro-font",
    weight: ["300", "400", "500", "700"],
})

function Layout({ children }) {
    return (
        <div
            className={`flex flex-col w-full m-0 p-0 min-h-screen ${source_Sans_Pro.variable}`}
            style={{ fontFamily: "var(--Source-Sans-Pro-font)" }}
        >
            <div className={`${classes.top_bar} bg-orange-400`}>
                <Link
                    href="/"
                    className={classes.logo_top_bar}
                    scroll={false}
                >
                    Pokédex
                </Link>
            </div>

            <main className="flex-1">{children}</main>

            <Footer />
        </div>
    )
}

function Footer() {
    return (
        <footer className="bg-orange-400 py-10">
            <div className="flex flex-row flex-wrap justify-center sm:justify-between">
                <div className="py-2 px-6 text-white">
                    <p className="text-lg font-bold text-center sm:text-left">
                        Tools
                    </p>
                    <div className="hover:opacity-70">
                        -{" "}
                        <a
                            target="_blank"
                            href="https://nextjs.org/"
                            className="text-white"
                        >
                            Nextjs
                        </a>
                    </div>
                    <div className="hover:opacity-70">
                        -{" "}
                        <a
                            target="_blank"
                            href="https://tailwindcss.com/"
                            className="text-white"
                        >
                            Tailwindcss
                        </a>
                    </div>
                </div>
                <div className="py-2 px-6 text-white">
                    <p className="text-lg font-bold text-center sm:text-left">
                        Pokémon Database
                    </p>
                    <div className="hover:opacity-70">
                        -{" "}
                        <a
                            target="_blank"
                            href="https://pokeapi.co/docs/v2#pokemon"
                            className="text-white"
                        >
                            PokeAPI
                        </a>
                    </div>
                </div>
                <div className="py-2 px-6">
                    <p className="text-lg font-bold text-white text-center sm:text-left">
                        Contact
                    </p>
                    <div className="flex flex-row flex-wrap items-center justify-center sm:justify-start">
                        <a
                            target="_blank"
                            href="https://github.com/kittitadA"
                            className="p-2 mr-1 mt-2 w-10 h-10 bg-white rounded-lg hover:opacity-75 cursor-pointer text-orange-500"
                        >
                            <ion-icon
                                name="logo-github"
                                class="w-6 h-6"
                             />
                        </a>
                        <div className="p-2 mr-1 mt-2 w-10 h-10 bg-white rounded-lg hover:opacity-75 text-orange-500">
                            <ion-icon
                                name="logo-facebook"
                                class="w-6 h-6"
                             />
                        </div>
                        <div className="p-2 mr-1 mt-2 w-10 h-10 bg-white rounded-lg hover:opacity-75 text-orange-500">
                            <ion-icon
                                name="logo-twitter"
                                class="w-6 h-6"
                             />
                        </div>
                        <div className="p-2 mr-1 mt-2 w-10 h-10 bg-white rounded-lg hover:opacity-75 text-orange-500">
                            <ion-icon
                                name="logo-linkedin"
                                class="w-6 h-6"
                             />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Layout
