import { songsTable } from '@/drizzle/schema'
import { format } from 'date-fns'

type Song = typeof songsTable.$inferSelect

interface MusicTableProps {
  songs: Song[]
}

export default function MusicTable({ songs }: Readonly<MusicTableProps>) {
  return (
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
            <p className="text-sm leading-none font-normal text-slate-500">Última vez cantada</p>
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
              <p className="text-sm text-slate-500">
                {song.lastTimeSung ? format(song.lastTimeSung, 'dd/MM/yyyy') : 'nunca'}
              </p>
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
  )
}
