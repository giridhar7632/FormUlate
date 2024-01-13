const Table = async ({ data }: { data: any }) => {
  return (
    <div className="mx-auto rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            {Object.keys(data[0]).map((columnName: string) => (
              <th key={columnName} className="py-3 px-4 text-left font-medium">
                {columnName.toLocaleUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row: any, idx: number) => (
            <tr key={idx} className="border-b border-gray-100">
              {Object.keys(data[0]).map((columnName: any) => (
                <td key={columnName} className="py-4 px-4">
                  {row[columnName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
