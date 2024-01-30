<template>
  <div v-if="isLoggedIn">
    <div class="note-view">
      <div v-if="getCurrentNote">
        <h1 class="note-title">{{ getCurrentNote.name }}</h1>
        <div v-if="getCurrentNote.isImage">
          <img class="img-file" v-if="getCurrentNote.content" :src="getCurrentNote.content" />
        </div>
        <div v-else>
          <p class="property-head">Properties:</p>
          <div v-if="frontMatter">
            <div v-for="(value, key) in frontMatter" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </div>
          </div>
          <div v-html="markdownContent"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="no-note">Nothing to see here, log in to use.</h1>
  </div>
</template>

<script>
import { useNotesStore } from "@/stores/notes";
import { useAuthStore } from "@/stores/auth";
import { mapState } from "pinia";
import renderMarkdown from "/src/mdconfig/markdownConfig.js";

export default {
  data() {
    return {
      frontMatter: null,
    };
  },
  computed: {
    ...mapState(useNotesStore, ["getDecodedContent", "getCurrentNote"]),
    ...mapState(useAuthStore, ["isLoggedIn"]),
    markdownContent() {
      const { html, frontMatter } = renderMarkdown(
        this.getCurrentNote ? this.getCurrentNote.content : ""
      );
      this.frontMatter = frontMatter;
      return html;
    },
  },
  methods: {},
};
</script>

<style scoped>
</style>