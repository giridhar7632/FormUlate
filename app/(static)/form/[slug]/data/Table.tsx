import { getDataFromTable } from '@/app/actions'

const Table = async ({ table }: { table: string }) => {
  const data = await getDataFromTable(table)
  const columnNames =
    data.length &&
    Object.keys(data[0]).filter((key) => key !== 'id' && key !== 'xata')

  return columnNames ? (
    <div className="container mx-auto overflow-x-auto">
      <table className="w-full table-auto shadow-md">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            {columnNames.map((columnName: string) => (
              <th key={columnName} className="py-3 px-4 text-left font-medium">
                {columnName.toLocaleUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row: any) => (
            <tr key={row.id} className="border-b border-gray-200">
              {columnNames.map((columnName: any) => (
                <td key={columnName} className="py-4 px-4">
                  {row[columnName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-gray-500">
      No submissions yet! Share the form with your friends to get started.
    </p>
  )
}

export default Table
