import HostForm from '@/app/components/HostForm'

async function getHost(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hosts/${id}`, {
    cache: 'no-store', // Desactiva caché para datos grandes
    next: { tags: ['hosts'] }
  })

  if (!res.ok) throw new Error('Failed to fetch host')
  return res.json()
}

export default async function EditHostPage({ params }) {
  const { id } = await params
  const host = await getHost(id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Editar Anfitrión</h1>
      <HostForm
        initialData={host}
        isEdit
      />
    </div>
  )
}
