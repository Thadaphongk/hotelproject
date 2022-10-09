<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-left">
        <b-col></b-col>
        <b-col cols="10" class="bg1">
        <center>
          <h1><b>hotel Bangkok</b></h1>
          <h5>รายละเอียดการจองที่ {{ bloghotel.id }} </h5><hr>
        </center>
        <div class="box1">
              <h4><b><p>รายการที่ : {{ bloghotel.id }}</p></b></h4>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ชื่อ - นามสกุล</b> : {{ bloghotel.firstname }}  {{ bloghotel.lastname }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>เบอร์โทรศัพท์</b> : {{ bloghotel.tel }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>เลขที่ห้อง</b> : {{ bloghotel.other }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ระดับการให้บริการ</b> : {{ bloghotel.nroom }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>จำนวนคนเข้าพัก</b> : {{ bloghotel.pnum }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>วันที่ Check in</b> : {{ bloghotel.dates }}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>วันที่ Check out</b> : {{ bloghotel.datee }}</p>
             
              <hr>
            <p>
             
              <b-button variant="secondary" v-on:click="navigateTo('/bloghotels')"><i class="fa fa-arrow-circle-left">ย้อนกลับ</i></b-button>
            </p>
        </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BloghotelService from "@/services/BloghotelsService";
export default {
  data() {
    return {
      bloghotel: null,
    };
  },
  async created() {
    try {
      let bloghotelId = this.$route.params.bloghotelId;
      this.bloghotel = (await BloghotelService.show(bloghotelId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>

</style>