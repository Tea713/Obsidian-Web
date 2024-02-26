<template>
  <div class="home">
    <h1>Welcome to Obsidian Web</h1>
    <p>Obsidian is a powerful knowledge base that works on top of a local folder of plain text Markdown files.</p>
    <p>Login and choose your repositories containing your markdown files above.</p>
    <button @click="startUsingApp">Start Using Obsidian Web</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter();

    const startUsingApp = () => {
      router.push('/notes');
    };

    return {
      startUsingApp
    };
  },
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
}

h1, p {
  color: aliceblue;
}
</style>