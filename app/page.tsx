'use client'

import { songsTable } from '@/drizzle/schema'
import { useEffect, useState } from 'react'
import MusicTable from './_components/MusicTable'
import Pagination from './_components/Pagination'
import Search from './_components/Search'
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
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="relative flex h-full w-full flex-col overflow-scroll rounded-lg bg-white bg-clip-border text-gray-700 shadow-md">
        <MusicTable songs={songs} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  )
}
