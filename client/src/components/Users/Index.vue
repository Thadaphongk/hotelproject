<template>
 <div>   
    <b-container class="bv-example-row">
        <b-row class="text-left">
            <b-col></b-col>
            <b-col cols="10" class="bg">
                <h6 align = 'right'><a><a v-on:click.prevent="logout" v-on:click="navigateTo('/login')"><i class="fa fa-sign-out" aria-hidden="true"></i><b> ออกจากระบบ</b></a></a></h6>
                <center>
               
                <h1><b> ผู้ใช้งานระบบ </b></h1>
                <h5>จำนวนผู้ใช้งาน {{ users.length }} คน</h5>
                
                <hr>
            </center>
            <div class="d-grid gap-2 col-6 mx-auto">
                <center><b-button variant="btn btn-success" v-on:click="navigateTo('/user/create/')"><i class='fa fa-user-plus'></i> สร้างผู้ใช้ </b-button></center>
            
            </div>
            <br>
        <div class="box" v-for="user in users" v-bind:key="user.id">
            <h4><p><b>User ที่ :</b> {{ user.id }}</p></h4>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Name :</b> {{ user.name }}</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Lastname :</b> {{ user.lastname }}</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Username :</b> {{ user.email }}</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>password :</b>xxxxxxxxx</p>
            <hr>
            <center>
                <p><b-button variant="btn btn-primary" v-on:click="navigateTo('/user/'+ user.id)"><i class="fa fa-search">ดูข้อมูลผู้ใช้ </i> </b-button>
                <b-button variant="btn btn-warning" v-on:click="navigateTo('/user/edit/'+ user.id)"><i class="fa fa-check-square-o">แก้ไขข้อมูล</i>  </b-button> 
                <b-button variant="btn btn-danger" v-on:click="deleteUser(user)"> <i class="fa fa-times">ลบข้อมูล</i> </b-button> 
               
                
            </p></center>
          
        </div>
       
    </b-col>
    
    <b-col> 
        
    </b-col>
    
</b-row>

</b-container>
 
</div>   

</template>
<script>

import UsersService from '@/services/UsersService'

    export default {
        data () {
            return {
                users : []
            }
        },
       async created (){
           this.users = (await UsersService.index()).data
           console.log(results)
        },
        methods: {
            navigateTo (route){
                this.$router.push(route)
             
        },
        async deleteUser(user) {
            let result = confirm("คุณต้องการลบ ผู้ใช้นี้ใช่ไหม?")
               if(result) { 
                   try {
                    await UsersService.delete(user)
                    this.refreshData()
            } catch (error){
            console.log(error)
          }
        }
         },
         async refreshData() {
             this.users = (await UsersService.index()).data
         },
    }
}


</script>
<style scoped>


</style>
