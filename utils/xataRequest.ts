export async function dbReq({
  method,
  path,
  body,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  body: any
}) {
  const res = await fetch(
    `https://Giridhar-s-workspace-bc9633.us-east-1.xata.sh/formulate/main${path}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${process.env.XATA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
  const data = await res.json()
  console.log('fata', data)
  return data
}
