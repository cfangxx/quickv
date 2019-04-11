<template>
  <div :class="rootClass">
    <ul :class="rootClass + '__wrapper'">

      <li v-for="(dataImage, index) in dataImagesLocal" :key="index"
        :class="rootClass + '__item'">

        <div
          :class="classThumbnail(imgSelected.hash, dataImage.hash)"
          @click="onSelectImage(dataImage)">
          <img :src="dataImage.imgUrl | fullImgUrl"
               :height="h"
               :width="w"
               :class="rootClass + '__img'">

          <label :class="rootClass + '__lbl'">
                {{dataImage.name}}
          </label>
        </div>
      </li>
    </ul>

    <div v-show="imgPreview">
      <label>大屏预览</label>
      <img :src="imgSelected.imgUrl | fullImgUrl"
            :height="h"
            :width="w"
            :class="rootClass + '__img'">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateList',
  filters: {
    fullImgUrl (url) {
      return process.env.BASE_API + url
    }
  },
  props: {
    dataImages: {
      type: Array,
      default: () => []
    },
    rootClass: {
      type: String,
      default: 'template-list'
    },
    activeClass: {
      type: String,
      default: '--selected'
    },
    h: {
      type: String,
      default: 'auto'
    },
    w: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      imgSelected: {
        hash: ''
      },
      imgPreview: false
    }
  },
  computed: {
    dataImagesLocal: function () {
      return this.dataImages || []
    }
  },
  methods: {
    classThumbnail (selectedId, imageId) {
      const baseClass = `${this.rootClass}__thumbnail`
      if (selectedId === imageId) {
        return `${baseClass} ${baseClass}${this.activeClass}`
      }
      return `${baseClass}`
    },
    onSelectImage (objectImage) {
      this.imgPreview = true
      this.imgSelected = Object.assign({}, this.imgSelected, objectImage)
      this.$emit('onselectimage', objectImage)
    },
    removeFromimgSelected () {
      this.imgPreview = false
      this.imgSelected = {}
      this.$emit('onselectimage', {})
    }
  },
  watch: {
    dataImages: function () {
      this.removeFromimgSelected()
    }
  }
}
</script>
<style>
.template-list__wrapper {
  overflow: auto;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}

.template-list__item {
  margin: 0px 12px 12px 0px;
  float: left;
}

.template-list__thumbnail{
  padding: 6px;
  border: 1px solid #dddddd;

  display: block;
  padding: 4px;
  line-height: 20px;
  border: 1px solid #ddd;
  width: 150px;

  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;

  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);

  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.template-list__thumbnail--selected{
  background: #0088cc;
}

.template-list__img{
  -webkit-user-drag: none;
  display: block;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.template-list__lbl{
  line-height: 3;
}

@media only screen and (max-width: 200px) {
  .template-list__item {
    margin-left: 30px;
  }
}
</style>
