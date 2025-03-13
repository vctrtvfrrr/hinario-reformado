interface PaginationProps {
  currentPage: number
  totalPages: number
  handlePrevPage: () => void
  handleNextPage: () => void
  setCurrentPage: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  setCurrentPage,
}: Readonly<PaginationProps>) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="text-sm text-slate-500">
        Exibindo{' '}
        <b>
          {(currentPage - 1) * 50 + 1}-{Math.min(currentPage * 50, totalPages * 50)}
        </b>{' '}
        de {totalPages * 50}
      </div>
      <div className="flex space-x-1">
        <button
          className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`ease min-h-9 min-w-9 rounded border px-3 py-1 text-sm font-normal transition duration-200 ${currentPage === index + 1 ? 'border-slate-800 bg-slate-800 text-white hover:border-slate-600 hover:bg-slate-600' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:bg-slate-50'}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
