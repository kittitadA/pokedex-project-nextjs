function ButtonPagination({ number, currentPage, updatePage = () => false }) {
    const active = number === currentPage
    const bgActive = isNaN(number)
        ? "transparent"
        : active
        ? "#3273db"
        : "#dbdbdb"
    const colorActive = isNaN(number) ? "#6f6f6f" : active ? "#fff" : "#000"
    return (
        <div
            className="flex justify-center items-center cursor-pointer mx-1 select-none rounded-xl mt-1"
            onClick={updatePage}
            style={{ width: 38, height: 38, backgroundColor: bgActive }}
        >
            <p
                className="text-center"
                style={{ color: colorActive }}
            >
                {number}
            </p>
        </div>
    )
}

function ButtonIcon({ icon, updatePage = () => false }) {
    return (
        <div
            className="flex justify-center items-center cursor-pointer mx-1 select-none rounded-xl mt-1 text-white text-lg bg-indigo-600"
            onClick={updatePage}
            style={{ width: 38, height: 38 }}
        >
            {icon}
        </div>
    )
}

function Pagination({ pageLength = 10, currentPage = 1, setCurrentPage }) {
    const allBtn =
        pageLength - 3 < 0 ? 0 : pageLength - 4 >= 3 ? 3 : pageLength - 3
    const startIndex =
        currentPage - 1 <= 3
            ? 3
            : currentPage - 1 > pageLength - 4
            ? pageLength - 4
            : currentPage - 1
    const btnCenter = Array(allBtn)
        .fill(null)
        .map((x, i) => i + startIndex)

    return (
        <div className="flex flex-row justify-center items-center flex-wrap">
            {pageLength > 1 && (
                <ButtonIcon
                    icon={<ion-icon name="chevron-back-outline" />}
                    updatePage={() =>
                        setCurrentPage(
                            currentPage - 1 < 1 ? 1 : currentPage - 1
                        )
                    }
                />
            )}
            <ButtonPagination
                number={1}
                currentPage={currentPage}
                updatePage={() => setCurrentPage(1)}
            />
            {currentPage > 4 && pageLength > 7 && (
                <ButtonPagination
                    number="..."
                    currentPage={currentPage}
                />
            )}
            {(currentPage <= 4 || pageLength <= 7) && pageLength > 2 && (
                <ButtonPagination
                    number={2}
                    currentPage={currentPage}
                    updatePage={() => setCurrentPage(2)}
                />
            )}
            {pageLength > 2 && (
                <>
                    {btnCenter.map((data) => (
                        <ButtonPagination
                            number={data}
                            currentPage={currentPage}
                            key={`pagination_btn_${data}`}
                            updatePage={() => setCurrentPage(data)}
                        />
                    ))}
                </>
            )}
            {currentPage < pageLength - 3 && pageLength > 7 && (
                <ButtonPagination
                    number="..."
                    currentPage={currentPage}
                />
            )}
            {(currentPage >= pageLength - 3 || pageLength <= 7) &&
                pageLength > 6 && (
                    <ButtonPagination
                        number={pageLength - 1}
                        currentPage={currentPage}
                        updatePage={() => setCurrentPage(pageLength - 1)}
                    />
                )}
            {pageLength > 1 && (
                <ButtonPagination
                    number={pageLength}
                    currentPage={currentPage}
                    updatePage={() => setCurrentPage(pageLength)}
                />
            )}
            {pageLength > 1 && (
                <ButtonIcon
                    icon={<ion-icon name="chevron-forward-outline" />}
                    updatePage={() =>
                        setCurrentPage(
                            currentPage + 1 > pageLength
                                ? pageLength
                                : currentPage + 1
                        )
                    }
                />
            )}
        </div>
    )
}

export default Pagination
