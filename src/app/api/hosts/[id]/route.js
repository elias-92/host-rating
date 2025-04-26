import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Host from '@/models/Host'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    await dbConnect()

    if (!id) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const host = await Host.findById(id).lean()

    if (!host) {
      return NextResponse.json({ error: 'Anfitrión no encontrado' }, { status: 404 })
    }

    return NextResponse.json({
      ...host,
      _id: host._id.toString()
    })
  } catch (error) {
    console.error('Error fetching host:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    await dbConnect()
    const body = await request.json()

    const updatedHost = await Host.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    }).lean()

    return NextResponse.json({
      ...updatedHost,
      _id: updatedHost._id.toString()
    })
  } catch (error) {
    console.error('Error updating host:', error)
    return NextResponse.json(
      { error: 'Error al actualizar', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await dbConnect()

    // Verifica que el ID sea válido
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const deletedHost = await Host.findByIdAndDelete(id)

    if (!deletedHost) {
      return NextResponse.json({ error: 'Anfitrión no encontrado' }, { status: 404 })
    }

    // Configura headers CORS
    const headers = new Headers()
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'DELETE')

    return new NextResponse(JSON.stringify({ success: true, message: 'Anfitrión eliminado' }), {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('Error deleting host:', error)
    return NextResponse.json(
      { error: 'Error al eliminar', details: error.message },
      { status: 500 }
    )
  }
}
