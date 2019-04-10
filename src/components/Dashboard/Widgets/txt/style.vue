<template>
  <div>
    <div v-show="tab === 1">
      <div class="panel-item-new">
        <!--<div class="panel-item-title">基础参数</div>-->
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">宽度</div>
          <div>
            <input
              v-model="activeElement.width"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">高度</div>
          <div>
            <input
              v-model="activeElement.height"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">横坐标</div>
          <div>
            <input
              v-model="activeElement.left"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">纵坐标</div>
          <div>
            <input
              v-model="activeElement.top"
              type="number">
          </div>
        </div>
        <div class="panel-row">
          <vpd-icon name="edit-3" />
          <div class="panel-label">层级</div>
          <div>
            <input
              v-model="activeElement.z"
              type="number">
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="panel-row" flex>
      <vpd-icon name="sliders" />
      <div class="panel-label">行高</div>
      <div class="panel-value">{{ activeElement.lineHeight }}</div>
      <div class="panel-slider-wrap">
        <vpd-slider :max="5" :min="1" v-model="activeElement.lineHeight" />
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="type" />
      <div class="panel-label">字号</div>
      <div class="panel-value">{{ activeElement.fontSize }}px</div>
      <div class="panel-slider-wrap">
        <vpd-slider :step="1" :max="200" :min=".85" v-model="activeElement.fontSize" />
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="edit-3" />
      <div class="panel-label">颜色</div>
      <div class="panel-value">{{ activeElement.color }}</div>
      <div>
        <input type="color" v-model="activeElement.color">
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="bold" />
      <div class="panel-label">加粗</div>
      <div class="panel-value">
        <label class="form-switch">
          <input type="checkbox" v-model="activeElement.fontWeight">
          <i class="form-icon"></i>
        </label>
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="align-justify" />
      <div class="panel-label">对齐</div>
      <div class="panel-value">
        <label class="form-radio tooltip" data-tooltip="左对齐">
          <input type="radio" name="align" value="left" v-model="activeElement.textAlign">
          <i class="form-icon"></i> <vpd-icon name="align-left" />
        </label>
        <label class="form-radio tooltip" data-tooltip="居中">
          <input type="radio" name="align" value="center" v-model="activeElement.textAlign">
          <i class="form-icon"></i> <vpd-icon name="align-center" />
        </label>
        <label class="form-radio tooltip" data-tooltip="右对齐">
          <input type="radio" name="align" value="right" v-model="activeElement.textAlign">
          <i class="form-icon"></i> <vpd-icon name="align-center" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'braid-txt-style',
  props: ['activeElement', 'tab']
}
</script>
