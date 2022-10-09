<template>
  <div>
  <b-container class="bv-example-row">
    <b-row class="text-left">
         <b-col></b-col>
         <b-col cols="10" class="bg3">
          <center>
            <h1><b>รายการที่พักโรงแรม</b></h1>
            <h5>รายการที่พักโรงแรม ที่ {{ hotel.id }}</h5>
          </center>
          <hr>
          <form class="box3" v-on:submit.prevent="editHotel">
            <p><b><h5><strong> ห้องเลขที่  </strong></h5></b><input type="text" class="form-control" v-model="hotel.title" /></p>
            <p><b><h5><strong> ประเภทที่พัก  </strong></h5></b> <input type="text" class="form-control" v-model="hotel.catagori" /></p>
            <p><b><h5><strong> ราคาที่พัก  </strong></h5></b> <input type="text" class="form-control" v-model="hotel.price" /></p>
            <p><b><h5><strong> เลือกรูปภาพที่จะแก้ไข </strong></h5></b></p>
            <transition name="fade"> 
              <div class="thumbnail-pic" v-if="hotel.thumbnail != 'null'">
                <img :src="BASE_URL+hotel.thumbnail" alt="thumbnail">
              </div>
            </transition>
        <form enctype="multipart/form-data" novalidate>
          <div class="dropbox">
            <input
              type="file"
              multiple
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="
                filesChange($event.target.name, $event.target.files);
                fileCount = $event.target.files.length;
              "
              accept="image/*"
              class="input-file"
            />
            <p v-if="isInitial">
                  <b>ลากไฟล์ของคุณมาที่นี่ <br />
                  หรือคลิกเพื่อเรียกดู</b>
                </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">อัพโหลดรูปเรียบร้อยแล้ว!.</p>
          <p v-if="isFailed">อัพโหลดรูปไม่สำเร็จ</p>
        </div>
        <div>
          <ul class="pictures">
            <li v-for="picture in pictures" v-bind:key="picture.id">
              <img
                style="margin-bottom: 5px"
                :src="BASE_URL + picture.name"
                alt="picture image"
              />
              <hr>
              <button v-on:click.prevent="useThumbnail(picture.name)">เลือกรูปภาพนี้</button>
              <button v-on:click.prevent="delFile(picture)"> ลบรูปภาพ </button>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
      </form>
      <p><b><h5><strong>เนื้อหาหรือรายละเอียด </strong></h5></b></p>
      <p>
        <vue-ckeditor
          v-model.lazy="hotel.content"
          :config="config"
          @blur="onBlur($event)"
          @focus="onFocus($ecent)"
        />
      </p>
      <hr>
      <p>
        <b-button variant="warning"  type="submit"><i class="fa fa-check-square-o">แก้ไขรายการ</i></b-button>
        <b-button variant="secondary" v-on:click="navigateTo('/hotels')"><i class="fa fa-arrow-circle-left">ย้อนกลับ</i></b-button>
        <br>
      </p>
    </form>
    </b-col>
    <b-col> </b-col>
  </b-row>
</b-container>


  </div>
</template>
<script>

import HotelService from "@/services/HotelsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";

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


      hotel: {
        title: "",
        thumbnail: "null",
        pictues: "null", 
        content: "",
        catagori:"",
        price:"",
        category: "",
        status: "",
      },
      config: {
        height: 300,
      },
    };
  },
  methods: {
    async editHotel() {
      try {
        await HotelService.put(this.hotel);
        this.$router.push({
          name: "hotels",
        });
      } catch (err) {
        console.log(err);
      }
    },

    onBlur (editor) {
          console.log(editor);
       },
          onFocus (editor) {
            console.log(editor);
          },

 created () {
      this.config.toolbar = [
        {
          name: "document",
          items: [
            "Source",
            "-",
            "Save",
            "NewPage",
            "Preview",
            "Print",
            "-",
            "Templates"
          ]
        },
        {
          name: "clipboard",
          items: [
            "Cut",
            "Copy",
            "Paste",
            "PasteText",
            "PasteFrromWord",
            "-",
            "Undo",
            "Redo"
          ]
        },
        {
          name: "editing",
          items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
          },
        {
        name: "forms",
        items: [
          "From",
          "Checkbox",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField"
        ]
    },
    "/",
    {
        name: "basicstyles",
        items: [
          "Bold",
          "Itatic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat"
        ]
    },
    {
      name: "paragaph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "-",
        "BidiLtr",
        "BidiRtl",
        "Language"
      ]
    },
    { name: "Links", items: ["Link", "Unlink", "Anchor"] },
    {
      name:"insert",
      items: [
        "Image",
        "Flash",
        "Table",
        "HorizontaRule",
        "Smiley",
        "PageBreak",
        "Iframe",
        "InsertPre"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"]},
    { name: "colors", items: ["TextColor", "BGColor"]},
    { name: "tools", items: ["Maximize", "ShowBlocks"]},
    { name: "about", items: ["About"]}

      ]
    },
    
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
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
        this.uploadedFileNames.forEach((uploadFilename) => {
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
              name: uploadFilename,
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

    
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

    
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },

   
    async delFile (material){
      let result = confirm("คุณแน่ใจนะที่จะลบรีวิวนี้?")
      if (result) {
        let dataJSON = {
          "filename":material.name
        }

        await UploadService.delete(dataJSON)

        for (var i=0; i<this.pictures.length; i++){
          if(this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1)
            this.materialIndex--
            break
          }
        }
      }
    },

   
    useThumbnail (filename) {
      console.log(filename)
      this.hotel.thumbnail = filename
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
    },

  },

  
  components: {
    VueCkeditor
  },

  async created() {
    try {
      let hotelId = this.$route.params.hotelId;
      this.hotel = (await HotelService.show(hotelId)).data;


    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
    .dropbox {
      outline: 2px dashed gray; 
      outline-offset: -10px;
      background: #f5fdaa;
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
   
    .thumbnail-pic img{
      width: 200px;
    }
    input {
      width: 450px;
}

</style>