<template>
  <div class="changelog">
    <h1>Changelog: Version 3-1-2024</h1>
    <h2>Features:</h2>
    <ul>
      <li>Basic user interface</li>
      <li>Markdown rendering</li>
      <li>Firebase authentication with GitHub login</li>
      <li>GitHub API to retrieve notes from repository</li>
    </ul>
    <h2>Fixes: </h2>
    <ul>
      <li>None for now</li>
    </ul>
    <h2>To be added:</h2>
    <ul>
      <li>Search function</li>
      <li>Bidiretional note linking</li>
      <li>Other file types support such as .pdf</li>
    </ul>
  </div>
  <p></p>
</template>

<style scoped>
.changelog {
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: flex-start;
  padding: 20px;
  text-align: left;
}

h1, h2 {
  margin: 20px 0px 10px 0px;
  color: aliceblue;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
  color: aliceblue;
}

li {
  color: aliceblue;
}
</style>
