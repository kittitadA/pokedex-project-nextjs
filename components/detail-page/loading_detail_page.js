import { LoadingBox } from "./evolution_section"

function LoadingDetail() {
    const progressData = [
        { stat: { name: "Hp", base_stat: 0 } },
        { stat: { name: "Attack", base_stat: 0 } },
        { stat: { name: "Defense", base_stat: 0 } },
        { stat: { name: "Special-Attack", base_stat: 0 } },
        { stat: { name: "Special-Defense", base_stat: 0 } },
        { stat: { name: "Speed", base_stat: 0 } },
    ]

    return (
        <section className="container max-w-screen-lg mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div
                    className="w-full aspect-square mx-auto bg-gray-100 rounded-lg animate-pulse"
                    style={{ maxWidth: 300, maxHeight: 300 }}
                />
                <div>
                    <h3 className="text-4xl font-bold text-center capitalize text-transparent bg-gray-200 rounded-xl animate-pulse">
                        <span>Loading</span>
                    </h3>
                    <div className="flex flex-row flex-wrap items-center mt-4 mb-2">
                        <div className="py-1 px-2 rounded-lg mr-1 bg-gray-200 animate-pulse">
                            <p className="text-xs text-transparent">Loading</p>
                        </div>
                    </div>
                    <p className="text-sm mt-1 text-transparent bg-gray-200 rounded-xl animate-pulse max-w-sm">
                        Loading
                    </p>
                    <p className="text-sm mt-1 text-transparent bg-gray-200 rounded-xl animate-pulse">
                        Loading
                    </p>
                    <p className="text-sm mt-1 text-transparent bg-gray-200 rounded-xl animate-pulse">
                        Loading
                    </p>
                    <div className="max-w-lg mx-auto mt-6">
                        {progressData.map((data) => (
                            <div
                                className="grid grid-cols-10 gap-4 items-center mt-4 animate-pulse"
                                key={`state_loading_${data.stat.name}`}
                            >
                                <div className="col-span-3">
                                    <div className="text-base font-medium capitalize truncate text-neutral-300">
                                        {data.stat.name}
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <p className="font-medium text-gray-400">
                                        -
                                    </p>
                                </div>
                                <div className="col-span-6">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mu-auto">
                                        <div
                                            className="bg-gray-200 h-2.5 rounded-full"
                                            style={{
                                                width: `${
                                                    (data.base_stat / 255) * 100
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

            <h3 className="text-2xl font-bold mt-14 text-gray-200 animate-pulse">
                Evolution
            </h3>
            <LoadingBox />
        </section>
    )
}

export default LoadingDetail
