'use client'

import { useMap } from '@y-sweet/react'
import { useEffect, useState } from 'react'
import Title from '@/components/Title'

const GRID_SIZE = 10
const COLORS = ['#500724', '#831843', '#9d174d', '#be185d', '#db2777', '#f472b6', '#f9a8d4', null]
const DEFAULT_COLOR = 'white'
const CELL_SIZE_CLASSES = 'w-8 h-8 lg:w-10 lg:h-10'

export function ColorGrid() {
  const items = useMap<string>('colorgrid')
  const sceneMap = useMap<any>('sceneMap')
  const [color, setColor] = useState<string | null>(COLORS[0])

  useEffect(() => {
    ;(async () => {
      const obj = await (await fetch('./data.json')).json()
      for (const key in obj) {
        sceneMap.set(key, obj[key])
      }
    })()
  }, [])

  return (
    <div className="space-y-3 p-4 lg:p-8">
      <Title>Color Grid</Title>
      <div className="space-x-2 flex flex-row">
        {COLORS.map((c) => (
          <div
            key={c}
            className={`${CELL_SIZE_CLASSES} cursor-pointer ring-2 ring-offset-1 ${
              c === color ? 'ring-pink-800' : 'ring-transparent'
            }`}
            style={{ backgroundColor: c ?? DEFAULT_COLOR }}
            onClick={() => setColor(c)}
          ></div>
        ))}
      </div>
      <table>
        <tbody>
          {Array.from({ length: GRID_SIZE }, (x, i) => (
            <tr key={i}>
              {Array.from({ length: GRID_SIZE }, (x, j) => {
                const key = `${i},${j}`
                const item = items!.get(key)
                return (
                  <td key={key}>
                    <div
                      className={`${CELL_SIZE_CLASSES} cursor-pointer`}
                      style={{ backgroundColor: item || DEFAULT_COLOR }}
                      onClick={() => {
                        if (color === null) {
                          items!.delete(key)
                        } else {
                          items!.set(key, color)
                        }
                      }}
                    ></div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
