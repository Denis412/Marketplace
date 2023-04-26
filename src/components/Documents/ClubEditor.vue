<template>
    <div class="q-pa-md q-gutter-sm">
      <q-editor
        v-model="editor"
        ref="edit"
        square
        flat
        :toolbar="[
          ['undo','redo'],
            [
              {
                label:$q.lang.editor.fontSize,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-6',
                  'size-5',
                  'size-4'
                ]
              },
            ],
          ['token'],
          ['underline','strike','bold', 'italic'],
          [
            {
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify']
            },
            'outdent', 'indent', 'ordered', 'unordered'
          ],
          ['removeFormat','link','hr'],
          ['print']
        ]" >
        <template v-slot:token>
        <q-btn-dropdown dense no-caps ref="token" no-wrap unelevated   label="Цвет текста" size="sm">
          <q-list dense>
            <q-item tag="label" clickable @click="color('backColor', highlight)">
              <q-item-section side>
                <q-icon name="highlight" />
              </q-item-section>

              <q-item-section>
                <q-color v-model="highlight"
                  default-view="palette"
                  no-header
                  no-footer
                  :palette="lightPalette"
                  class="my-picker" />
              </q-item-section>
            </q-item>
            <q-item tag="label" clickable @click="color('foreColor', foreColor)">
              <q-item-section side>
                <q-icon name="format_paint" />
              </q-item-section>

              <q-item-section>
                <q-color v-model="foreColor"
                  no-header
                  no-header-tabs
                  no-footer
                  default-view="palette"
                  :palette="textPalette"
                  class="my-picker" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        </template>

      </q-editor>
    </div>
  </template>

<script setup>
import { ref } from 'vue'
  
const lightPalette = [
  '#ffccccaa', '#ffe6ccaa', '#ffffccaa', '#ccffccaa',
  '#ccffe6aa', '#ccffffaa', '#cce6ffaa', '#ccccffaa', 
  '#e6ccffaa', '#ffccffaa', '#ffffffaa', '#00ff00aa',
  '#ff0000aa', '#ff8000aa', '#00ff80aa', '#00ffffaa',
  '#0080ffaa', '#0000ffaa', '#8000ffaa', '#ff00ffaa'
]
  const textPalette = [
  '#ff0000', '#ff8000', '#ffff00', '#000000', '#00ff80',
  '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff'
]
const edit = ref(null)
const editor = ref("")
const token = ref(null)

const foreColor = ref('#000000')
const highlight = ref('#ffff00aa')

const color = (cmd, name) => {
  token._value.hide()
  edit._value.caret.restore()
  edit._value.runCmd(cmd, name)
  edit._value.focus()
}
</script>