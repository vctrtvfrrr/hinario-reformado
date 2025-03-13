interface SearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function Search({ searchQuery, setSearchQuery }: Readonly<SearchProps>) {
  return (
    <div className="ml-3">
      <div className="relative w-full max-w-sm min-w-[200px]">
        <div className="relative">
          <input
            className="ease h-10 w-full rounded border border-slate-200 bg-white py-2 pr-11 pl-3 text-sm text-slate-700 shadow-sm transition duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-400 focus:shadow-md focus:outline-none"
            placeholder="Buscar música..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute top-1 right-1 my-auto flex h-8 w-8 items-center rounded bg-white px-2"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="h-8 w-8 text-slate-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
