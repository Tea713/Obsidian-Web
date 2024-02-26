<template>
  <div class="about">
    <h1>About Obsidian Web Viewer</h1>
    <p>
      Obsidian Web Viewer is a web application that allows users to view their
      Obsidian notes in a web browser. The source code is available on GitHub at
      https://github.com/Tea713/Obsidian-Web <br />1. Vue.js Framework:
      The user interface of this web application is built using Vue.js, a
      progressive JavaScript framework. Vue.js allows for the creation of
      dynamic and responsive user interfaces, enhancing the overall user
      experience.<br />2. Firebase Integration: Firebase, a cloud-based
      platform, is employed for database management and user authentication. The
      integration of Firebase ensures real-time synchronization of notes and
      provides a secure and scalable backend for the application.<br />3. GitHub Sync:
      Leveraging the GitHub API, this demo enables users to sync their notes
      with a GitHub repository. The synchronization process ensures that the
      notes are version-controlled and can be accessed across different devices.
      Markdown Rendering: Notes are written in Markdown, a lightweight markup
      language. The application uses the markdown-it library for rendering
      Markdown content, providing a familiar and versatile writing experience.
      <br />5. Obsidian-like Experience: Inspired by Obsidian.md, the demo aims to
      replicate the bidirectional linking and note organization features. Users
      can create, edit, and link notes seamlessly within the application.
    </p>
  </div>
  <p></p>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: aliceblue;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
  color: aliceblue;
}
</style>
