import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Host from '@/models/Host'

export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    await dbConnect()

    const hosts = await Host.find({})
      .sort({ createdAt: -1 }) // Ordenar por más recientes primero
      .lean() // Convertir a objetos planos
    console.log('Hosts encontrados:', hosts)
    // Convertir ObjectId a string y asegurar averageRating
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
    await dbConnect()
    const body = await request.json()

    // Validación básica
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const newHost = await Host.create({
      name: body.name,
      description: body.description || '',
      photo: body.photo || '',
      foodRating: body.foodRating || 0,
      ambianceRating: body.ambianceRating || 0,
      serviceRating: body.serviceRating || 0,
      averageRating: calculateAverage(body.foodRating, body.ambianceRating, body.serviceRating)
    })

    return NextResponse.json({ ...newHost._doc, _id: newHost._id.toString() }, { status: 201 })
  } catch (error) {
    console.error('Error detallado:', {
      message: error.message,
      stack: error.stack,
      body: body
    })
    return NextResponse.json(
      { error: 'Error creating host', details: error.message },
      { status: 500 }
    )
  }
}

function calculateAverage(food = 0, ambiance = 0, service = 0) {
  const total = [food, ambiance, service].filter(Boolean)
  if (total.length === 0) return 0
  return total.reduce((sum, val) => sum + val, 0) / total.length
}
