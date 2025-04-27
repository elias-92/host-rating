import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Host from '@/models/Host'

export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    await dbConnect()

    const hosts = await Host.find({})
      .sort({ createdAt: -1 })
      .lean() 
    const formattedHosts = hosts.map((host) => ({
      ...host,
      _id: host._id.toString(),
      averageRating: host.averageRating || 0
    }))

    return NextResponse.json(formattedHosts)
  } catch (error) {
    console.error('Error fetching hosts:', error)
    return NextResponse.json({ error: 'Error al obtener los anfitriones' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      const body = await request.json()

      if (!body.name) {
        return NextResponse.json({ error: "El campo 'name' es requerido" }, { status: 400 })
      }

      // procesar JSON normalmente
      await dbConnect()

      const newHost = await Host.create({
        name: body.name,
        description: body.description || '',
        photo: body.photo || '',
        foodRating: body.foodRating || 0,
        ambianceRating: body.ambianceRating || 0,
        serviceRating: body.serviceRating || 0,
        averageRating: calculateAverage(body.foodRating, body.ambianceRating, body.serviceRating)
      })

      return NextResponse.json(
        { ...newHost.toObject(), _id: newHost._id.toString() },
        { status: 201 }
      )
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()

      const name = formData.get('name')
      const description = formData.get('description') || ''
      const photo = formData.get('photo') || ''
      const foodRating = Number(formData.get('foodRating') || 0)
      const ambianceRating = Number(formData.get('ambianceRating') || 0)
      const serviceRating = Number(formData.get('serviceRating') || 0)

      if (!name) {
        return NextResponse.json({ error: "El campo 'name' es requerido" }, { status: 400 })
      }

      await dbConnect()

      const newHost = await Host.create({
        name,
        description,
        photo,
        foodRating,
        ambianceRating,
        serviceRating,
        averageRating: calculateAverage(foodRating, ambianceRating, serviceRating)
      })

      return NextResponse.json(
        { ...newHost.toObject(), _id: newHost._id.toString() },
        { status: 201 }
      )
    } else {
      return NextResponse.json({ error: 'Content-Type no soportado' }, { status: 415 })
    }
  } catch (error) {
    console.error('Error completo:', error)

    return NextResponse.json({ error: 'Error al crear anfitrión' }, { status: 500 })
  }
}

function calculateAverage(food = 0, ambiance = 0, service = 0) {
  const total = [food, ambiance, service].filter(Boolean)
  if (total.length === 0) return 0
  return total.reduce((sum, val) => sum + val, 0) / total.length
}
