'use client'

import { songsTable } from '@/drizzle/schema'
import { useEffect, useState } from 'react'
import { countSongs, getSongs } from './_repositories/songs'

type Song = typeof songsTable.$inferSelect

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([])
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const itemsPerPage = 50

  async function fetchAndCountSongs(page: number, query: string = '') {
    const songs = await getSongs(page, itemsPerPage, query)
    setSongs(songs)
    const count = await countSongs(query)
    setCount(count)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  useEffect(() => {
    fetchAndCountSongs(currentPage, debouncedSearchQuery)
  }, [currentPage, debouncedSearchQuery])

  const totalPages = Math.ceil(count / itemsPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <div className="mt-1 mb-3 flex w-full items-center justify-between pl-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Repertório Musical</h3>
          <p className="text-slate-500">Lorem ipsum dolor sit amet</p>
        </div>
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
      </div>

      <div className="relative flex h-full w-full flex-col overflow-scroll rounded-lg bg-white bg-clip-border text-gray-700 shadow-md">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">Pág.</p>
              </th>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">Música</p>
              </th>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">Tema</p>
              </th>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">Letra</p>
              </th>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">Cifra</p>
              </th>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">
                  Última vez cantada
                </p>
              </th>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">Qnt.</p>
              </th>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">Referência</p>
              </th>
              <th className="border-b border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-none font-normal text-slate-500">Notas</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-4 py-5">
                  <p className="block text-sm font-semibold text-slate-800">{song.page}</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">
                    <strong>{song.title}</strong>
                    <br />
                    <span className="text-xs italic">{song.version}</span>
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">
                    {song.theme} {song.subtheme && `> ${song.subtheme}`}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <span
                    className={`inline-block rounded px-1.5 text-sm text-white ${song.lyrics ? 'bg-green-600' : 'bg-orange-500'}`}
                  >
                    {song.lyrics ? 'sim' : 'não'}
                  </span>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">
                    <span
                      className={`inline-block rounded px-1.5 text-sm text-white ${song.chords ? 'bg-green-600' : 'bg-orange-500'}`}
                    >
                      {song.chords ? 'sim' : 'não'}
                    </span>
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{song.lastTimeSung || 'nunca'}</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{song.timesSung}</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{song.references}</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{song.notes}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm text-slate-500">
            Exibindo{' '}
            <b>
              {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, count)}
            </b>{' '}
            de {count}
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
      </div>
    </>
  )
}
