export async function activate(api) {
  api.completions.register('plaintext', [
  {
    "label": "lorem-short",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "detail": "Short Lorem",
    "kind": "snippet"
  },
  {
    "label": "lorem-medium",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    "detail": "Medium Lorem",
    "kind": "snippet"
  },
  {
    "label": "lorem-long",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.",
    "detail": "Long Lorem",
    "kind": "snippet"
  }
]);
  api.completions.register('markdown', [
  {
    "label": "lorem-short",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "detail": "Short Lorem",
    "kind": "snippet"
  },
  {
    "label": "lorem-medium",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    "detail": "Medium Lorem",
    "kind": "snippet"
  },
  {
    "label": "lorem-long",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.",
    "detail": "Long Lorem",
    "kind": "snippet"
  }
]);
  api.completions.register('html', [
  {
    "label": "lorem-short",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "detail": "Short Lorem",
    "kind": "snippet"
  },
  {
    "label": "lorem-medium",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    "detail": "Medium Lorem",
    "kind": "snippet"
  },
  {
    "label": "lorem-long",
    "insertText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.",
    "detail": "Long Lorem",
    "kind": "snippet"
  }
]);
  api.notifications.info('Lorem Gen snippets injected.');
}