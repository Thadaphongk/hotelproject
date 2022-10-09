<template>
  <div>
    <b-container class="bv-example-row">
      <div class="" >
        <b-row class="text-left">
        <b-col></b-col>
          <b-col cols="10" class="bg1">
            <center>
            <h1><b>Hotel Bangkok</b></h1>
            <h5>จำนวนที่จองที่มี {{ bloghotels.length }} รายการ</h5></center>
            <hr>
            <div class="d-grid gap-2 col-6 mx-auto">
               <center> <b-button variant="btn btn-success" v-on:click="navigateTo('/bloghotel/create')"><i class="fa fa-id-card-o">จองที่พักโรงแรม</i>  </b-button>  </center>
            </div>

            <br>
            <div class="box1" v-for="bloghotel in bloghotels" v-bind:key="bloghotel.id">
              <h4><b><p>รายการที่ : {{ bloghotel.id }}</p></b></h4>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>เลขที่ห้อง</b> : {{ bloghotel.other }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>ชื่อ - นามสกุล :</b> {{ bloghotel.firstname }}  {{ bloghotel.lastname }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>เบอร์โทรศัพท์ :</b> {{ bloghotel.tel }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>จำนวนคนเข้าพัก :</b> {{ bloghotel.pnum }} คน</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>ระดับการให้บริการ :</b> {{ bloghotel.nroom }} </p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>วันที่ Check in :</b> {{ bloghotel.dates }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>วันที่ Check out :</b> {{ bloghotel.datee }}</p>
              <hr>
              <p>
                <b-button variant="primary" v-on:click="navigateTo('bloghotel/'+bloghotel.id)"><i class="fa fa-search">ตรวจสอบข้อมูล</i> </b-button>
                <b-button variant="warning" v-on:click="navigateTo('/bloghotel/edit/' + bloghotel.id)"><i class="fa fa-check-square-o">แก้ไขการจองที่พัก</i></b-button>
                <b-button variant="danger" v-on:click="deleteBlog(bloghotel)"> <i class="fa fa-times">ยกเลิกการจอง</i></b-button> 
               
              </p> 
            </div>
    
          </b-col>
        <b-col></b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
import BloghotelService from "@/services/BloghotelsService";
export default {
  data() {
    return {
      bloghotels: [],
    };
  },
  async created() {
    this.bloghotels = (await BloghotelService.index()).data;
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(bloghotel) {
      let result = confirm("ต้องการยกเลิกการจองหอพักนี้ ?");
      if (result) {
        try {
          await BloghotelService.delete(bloghotel);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.bloghotels = (await BloghotelService.index()).data;
    },
  },
};
</script>
<style scoped>

</style>