<template>
  <section class="section-margin" style="width: 100%" :class="sectionClasses">
    <slot name="prepend-header"></slot>

    <header :class="headerClasses">
      <slot name="header">
        <slot name="title">
          <div :class="titleClasses">
            {{ title }}
          </div>
        </slot>

        <slot name="subtitle">
          <div v-if="subtitle" :class="subtitleClasses">
            {{ subtitle }}
          </div>
        </slot>

        <slot name="header-append"></slot>
      </slot>
    </header>

    <main :class="contentClasses">
      <slot name="chapter-content"></slot>
    </main>

    <footer :class="footerClasses">
      <slot name="chapter-footer"></slot>
    </footer>
  </section>
</template>

<script setup>
const {
  title,
  subtitle,
  sectionClasses,
  headerClasses,
  titleClasses,
  subtitleClasses,
  contentClasses,
  footerClasses,
} = defineProps({
  title: String,
  subtitle: String,
  sectionClasses: String,
  headerClasses: String,
  titleClasses: String,
  subtitleClasses: String,
  contentClasses: String,
  footerClasses: String,
});
</script>
