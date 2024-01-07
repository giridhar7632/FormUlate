export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex w-full h-full flex-col items-center justify-between py-24">
      <div className="w-80 md:w-96 flex flex-col border border-gray-200 rounded-2xl p-6 md:p-12">
        {children}
      </div>
    </main>
  )
}
