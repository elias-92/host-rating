import mongoose from 'mongoose'

const hostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder los 500 caracteres']
  },
  photo: {
    type: String,
    default: ''
  },
  foodRating: {
    type: Number,
    min: [0, 'La calificación mínima es 0'],
    max: [5, 'La calificación máxima es 5'],
    default: 0
  },
  ambianceRating: {
    type: Number,
    min: [0, 'La calificación mínima es 0'],
    max: [5, 'La calificación máxima es 5'],
    default: 0
  },
  serviceRating: {
    type: Number,
    min: [0, 'La calificación mínima es 0'],
    max: [5, 'La calificación máxima es 5'],
    default: 0
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Índices para mejor performance
hostSchema.index({ name: 'text' })
hostSchema.index({ averageRating: -1 })
hostSchema.index({ createdAt: -1 })

// Middleware para calcular el promedio antes de guardar
hostSchema.pre('save', function (next) {
  const ratings = [this.foodRating, this.ambianceRating, this.serviceRating].filter((r) => r > 0)

  this.averageRating =
    ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0

  next()
})

export default mongoose.models.Host || mongoose.model('Host', hostSchema)
