export async function activate(api) {
  // Language intelligence for vue-craft
  api.completions.register('html', [
    {
        label: "vbase",
        insertText: "<template>\n  <div>\n\n  </div>\n</template>\n\n<script setup>\n\n</script>\n\n<style scoped>\n\n</style>",
        detail: "Vue SFC Base"
    },
    {
        label: "vfor",
        insertText: "v-for=\"(${1:item}, ${2:index}) in ${3:items}\" :key=\"${2:index}\"",
        detail: "Vue v-for directive"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for vue-craft environment...');
  });
}