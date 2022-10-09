import Api from '@/services/Api'

export default {
  index () {
    return Api().get('bloghotels')
  },
  show (bloghotelId) {
    return Api().get('bloghotel/'+bloghotelId)
  },
  post (bloghotel) {
    return Api().post('bloghotel',bloghotel)
  },
  put (bloghotel) {
    return Api().put('bloghotel/'+bloghotel.id, bloghotel)
  },
  delete (bloghotel) {
    return Api().delete('bloghotel/'+bloghotel.id, bloghotel)
  }
}