import Api from '@/services/Api'

export default {
  index () {
    return Api().get('hotels')
  },
  show (hotelId) {
    return Api().get('hotel/'+hotelId)
  },
  post (hotel) {
    return Api().post('hotel',hotel)
  },
  put (hotel) {
    return Api().put('hotel/'+hotel.id, hotel)
  },
  delete (hotel) {
    return Api().delete('hotel/'+hotel.id, hotel)
  },
}