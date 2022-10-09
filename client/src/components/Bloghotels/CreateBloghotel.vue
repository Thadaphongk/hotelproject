<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-left">
        <b-col></b-col>
        <b-col cols="10" class="bg1">
          <center>
            <h1><b>Hotel Bangkok</b></h1>
            <h5>กรอกข้อมูลเพื่อใช้ในการจองโรงแรม</h5></center>
          <hr/>
          <form class="box1" v-on:submit.prevent="createBloghotel">
            <p> ชื่อ : <input type="text" class="form-control" v-model="bloghotel.firstname" /> </p>
            <p> นามสกุล : <input type="text" class="form-control" v-model="bloghotel.lastname" /> </p>
            <p> เบอร์โทรศัพท์ : <input type="tel" class="form-control" required v-model="bloghotel.tel" /></p>
            <p> เลขที่ห้อง : <input type="tel" class="form-control" required v-model=" bloghotel.other" /></p>
            <p> ระดับการให้บริการ :
              <select required class="form-control"  v-model="bloghotel.nroom">
                      <option selected>1 ดาว</option>
                      <option>2 ดาว</option>
                      <option>3 ดาว</option>
                      <option>4 ดาว</option>
                      <option>5 ดาว</option>
              </select>
            </p>
            
                  
            <p> จำนวนคนเข้าพัก : <input type="number" class="form-control" required v-model="bloghotel.pnum" /></p>
            <p> วันที่ Check in : <input type="date" required class="form-control" v-model="bloghotel.dates" /></p>
            <p> วันที่ Check out : <input type="date" required class="form-control" v-model="bloghotel.datee" /></p>
            
            <hr>
            <p>
              <b-button variant="success" type="submit"><i class="fa fa-check-square-o">ยืนยันการจอง</i></b-button
              >
              <b-button variant="danger" type="reset"><i class="fa fa-refresh"> รีเซ็ต</i></b-button>
              <b-button variant="secondary" v-on:click="navigateTo('/bloghotels')"><i class="fa fa-arrow-left">ย้อนกลับ</i></b-button>
            </p>
          </form>
        </b-col>
        <b-col> </b-col>
      </b-row>
    </b-container>
  </div>
</template>



<script>
import BloghotelService from "@/services/BloghotelsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";
import App from "../../App.vue";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],

      pictures: [],
      pictureIndex: 0,

      bloghotel: {
        title: "",
        thumbnail: "null",
        pictues: "null",
        content: "",
        category: "",
        status: ""
      },
      config: {
        height: 300
      }
    };
  },
  methods: {
    async createBloghotel() {
      this.bloghotel.pictures = JSON.stringify(this.pictures); 
      try {
        await BloghotelService.post(this.bloghotel);
        this.$router.push({
          name: "bloghotels"
        });
      } catch (err) {
        console.log(err);
      }
    },
    onBlur(editor) {
      console.log(editor);
    },
    onfocus(editor) {
      console.log(editor);
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return x => {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      
      this.currentStatus = STATUS_INITIAL;
      
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
     
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        
        let pictureJSON = [];
        this.uploadedFileNames.forEach(uploadFilename => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }

          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename
            };
            this.pictures.push(pictureJSON);
          }
        });

        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(filedName, fileList) {
      
      const formData = new FormData();

      if (!fileList.length) return;

      
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

      
      this.save(formData);
    },
    clearUploadResult: function() {
      setTimeout(() => this.reset(), 5000);
    },

    
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name
        };

        await UploadService.delete(dataJSON);

        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },

   
    useThumbnail(filename) {
      console.log(filename);
      this.blog.thumbnail = filename;
    }
  },

  created() {
    this.reset();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    issaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  components: {
    VueCkeditor
  }
};
</script>
<style scoped>
.dropbox {
  outline: 2px dashed gray;
  outline-offset: -10px;
  background: #fec3df;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; 
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; 
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #fceebe;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}

.thumbnail-pic img {
  width: 200px;
}

input,select {
      width: 450px;
    }
</style>
