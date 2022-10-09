<template>
    <div>
            <body>
                <section class="login">
                    <div class="login_box">
                        <div class="left">
                            <div class="contact">
                                <form v-on:submit.prevent="onLogin">
                                    <h3><b>เข้าสู่ระบบ</b></h3>
                                    <input type="text" v-model="email" placeholder="USERNAME">
                                    <input type="password" v-model="password" placeholder="PASSWORD">
                                    <p></p>
                                    <div class="top_link"><a href="http://localhost:8080/user/create/"><i class='fa fa-plus-square-o'>สร้างผู้ใช้งาน</i></a></div>
                                    <br>
                                    <center><dev class = "error" v-if="error">{{error}}</dev></center>
                                    <button class="submit">เข้าสู่ระบบ</button>
                                </form>
                            </div>
                        </div>
                        <div class="right">
                            <p align="right" ><img src="https://ak-d.tripcdn.com/images/0203m1200089zkunhC30B_Z_1080_808_R5_D.jpg" ></p>
                           
                        </div>
                    </div>
                </section>
            </body>
    
    
    
    
    </div>
</template>
<script>
import AuthenService from '@/services/AuthenService'

export default {
    data () {
        return {
            email: '',
            password: ''
        };
    },
    methods:{
        async onLogin () {
            try {
                const response = await AuthenService.login({
                    email: this.email,
                    password: this.password,
                    error: null
                });

                this.$store.dispatch('setToken',response.data.token)
                this.$store.dispatch('setUser',response.data.user)

                this.$router.push({
                   name: 'users'
                 })
                console.log(response)

            } catch (error) {
                console.log(error)
                this.error = error.response.data.error
                this.email = ''
                this.password = ''
            }
        },
        navigateTo(route){
            this.$router.push(route)
        }
    },
}
</script>
<style scoped>
.error{
    color: red;
}

img{
	width: 130%;
}

.login_box {
    width: 920px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 4px 22px -8px rgba(0, 0, 0, 0.651);
    display: flex;
    overflow: hidden;
    margin-left: 120px;
}
.login_box .left{
  width: 45%;
  height: 100%;
  padding: 20px 20px;
}
.login_box .right{
  width: 80%;
  height: 0%  
}
.left .top_link a {
    color: #6d6d6d;
    font-weight: 400;
}
.left .top_link{
  height: 20px;
}

.left .top_link a:hover {
  color: rgb(92, 24, 175);
}

.left .contact{
	display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    height: 100%;
    width: 73%;
    margin: auto;
}
.left h3{
  text-align: center;
  margin-bottom: 25px;
}
.left input {
    border: none;
    width: 80%;
    margin: 15px 0px;
    border-bottom: 1px solid #3067417d;
    padding: 7px 9px;
    width: 100%;
    overflow: hidden;
    background: transparent;
    font-weight: 600;
    font-size: 14px;
}
.left{
	background: linear-gradient(-45deg, #dcd7e0, #fff);
}
.submit {
    border: none;
    padding: 15px 70px;
    border-radius: 8px;
    display: block;
    margin: auto;
    margin-top: 100px;
    background: #FCE205;
    color: rgb(0, 0, 0);
    font-weight: bold;
    -webkit-box-shadow: 0px 9px 15px -11px rgb(71, 114, 54);
    -moz-box-shadow: 0px 9px 15px -11px rgb(54, 114, 79);
    box-shadow: 0px 9px 15px -11px rgb(54, 114, 72);
}

.right {
	background: linear-gradient(212.38deg, rgba(252, 226, 5, 0.212) 0%, rgba(125, 203, 240, 0.377) 100%),url(https://static.seattletimes.com/wp-content/uploads/2019/01/web-typing-ergonomics-1020x680.jpg);
	color: rgb(0, 0, 0);
	position: relative;
}

.right .right-text{
  height: 100%;
  position: relative;
  transform: translate(0%, 40%);
}
.right-text h2{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
}
.right-text h5{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
}

.right .right-inductor{
  position: absolute;
  width: 70px;
  height: 7px;
  background: #fff0;
  left: 50%;
  bottom: 70px;
  transform: translate(-50%, 0%);
}
.top_link img {
    width: 18px;
    padding-right: 7px;
    margin-top: -3px;
    color: #000000;
}

</style>
