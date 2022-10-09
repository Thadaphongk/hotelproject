import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/CreateUser'
import UserEdit from '@/components/Users/EditUser'
import UserShow from '@/components/Users/ShowUser'
import Login from '@/components/Login'


import BloghotelIndex from '@/components/Bloghotels/Index'
import BloghotelCreate from '@/components/Bloghotels/CreateBloghotel'
import BloghotelEdit from '@/components/Bloghotels/EditBloghotel'
import BloghotelShow from '@/components/Bloghotels/ShowBloghotel'


import HotelIndex from '@/components/Hotels/Index'
import HotelCreate from '@/components/Hotels/CreateHotel'
import HotelEdit from '@/components/Hotels/EditHotel'
import HotelShow from '@/components/Hotels/ShowHotel'










import Upload from '@/components/Utils/Upload'

Vue.use(Router)

export default new Router({
  mode:'history',
  
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },


    {
      path: '/bloghotels',
      name: 'bloghotels',
      component: BloghotelIndex
    },
    {
      path: '/bloghotel/create',
      name: 'bloghotel-create',
      component: BloghotelCreate
    },
    {
      path: '/bloghotel/edit/:bloghotelId',
      name: 'bloghotel-edit',
      component: BloghotelEdit
    },
    {
      path: '/bloghotel/:bloghotelId',
      name: 'bloghotel',
      component: BloghotelShow
    },


    {
      path: '/hotels',
      name: 'hotels',
      component: HotelIndex
    },
    {
      path: '/hotel/create',
      name: 'hotel-create',
      component: HotelCreate
    },
    {
      path: '/hotel/edit/:hotelId',
      name: 'hotel-edit',
      component: HotelEdit
    },
    {
      path: '/hotel/:hotelId',
      name: 'hotel',
      component: HotelShow
    },

    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },

  ]
})
