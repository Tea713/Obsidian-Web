<template>
  <div>
    <div v-for="item in sortedItems" :key="item.name">
      <div v-if="item.type === 'dir'" @click="toggle(item)">
        <p> >{{ item.name }}</p>
        <DirectoryViewer v-show="item.isOpen" :items="item.contents" />
      </div>
      <div v-else>
        <p> {{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useNotesStore } from "@/stores/notes";
import { mapState, mapActions } from "pinia";

export default {
  name: "DirectoryViewer",
  props: {
    items: {
      type: Array,
      default: () => [], // default value is an empty array
    },
  },
  computed: {
    ...mapState(useNotesStore, [
      "getNotes",
      "getRepositories",
      "getCurrentRepository",
    ]),
    sortedItems() {
        return [...this.items].sort((a, b) => {
            if (a.type === 'dir' && b.type !== 'dir') {
                return -1;
            }
            if (a.type !== 'dir' && b.type === 'dir') {
                return 1;
            }
            return a.name.localeCompare(b.name);
        });
    },
  },
  methods: {
    ...mapActions(useNotesStore, [
      "fetchNotes",
      "fetchRepositories",
      "setCurrentRepository",
    ]),
    async toggle(item) {
      if (!item.contents) {
        // If the directory is not loaded yet, fetch its contents
        const contents = await this.fetchNotes(
          this.getCurrentRepository,
          item.path
        );
        item.contents = this.getNotes(item.path); // Assign the contents directly to the item object
      }
      // Toggle the isOpen property
      item.isOpen = !item.isOpen;
    },
  },
};
</script>