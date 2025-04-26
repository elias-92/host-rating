import { FaStar } from 'react-icons/fa'

const RatingStars = ({ rating, setRating, disabled = false }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => !disabled && setRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer"
              color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
              size={24}
            />
          </label>
        )
      })}
    </div>
  )
}

export default RatingStars
