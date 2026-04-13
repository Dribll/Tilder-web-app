export async function activate(api) {
  // Language intelligence for next-craft
  api.completions.register('javascript', [
    {
        label: "getServerSideProps",
        insertText: "export async function getServerSideProps(context) {\n  return {\n    props: {}, // will be passed to the page component as props\n  }\n}",
        detail: "Next.js SSR"
    },
    {
        label: "getStaticProps",
        insertText: "export async function getStaticProps(context) {\n  return {\n    props: {}, // will be passed to the page component as props\n  }\n}",
        detail: "Next.js SSG"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for next-craft environment...');
  });
}