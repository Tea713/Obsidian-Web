<template>
  <div class="note-view">
    <div v-if="getCurrentNote">
      <h1 class="note-title">{{ getCurrentNote.name }}</h1>
      <strong> Properties:</strong>
      <div v-if="frontMatter">
        <div v-for="(value, key) in frontMatter" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </div>
      </div>
      <div v-html="markdownContent"></div>
    </div>
  </div>
</template>

<script>
import { useNotesStore } from "@/stores/notes";
import { mapState } from "pinia";
import renderMarkdown from "/src/mdconfig/markdownConfig.js"



export default {
  data() {
    return {
      frontMatter: null,
    };
  },
  computed: {
    ...mapState(useNotesStore, ["getDecodedContent", "getCurrentNote"]),
    markdownContent() {
      const { html, frontMatter } = renderMarkdown(this.getCurrentNote ? this.getCurrentNote.content : "");
      this.frontMatter = frontMatter;
      return html;
    },
  },
  methods: {},
};
</script>

<style scoped>
.note-view {
  padding: 1rem;
  width: 750px;
}

.note-title {
  font-size: xx-large;
  margin-bottom: 1rem;
}
</style>