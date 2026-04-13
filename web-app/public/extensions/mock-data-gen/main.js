export async function activate(api) {
  api.completions.register('javascript', [
  {
    "label": "mock-users",
    "insertText": "[\n  { id: 1, name: \"Alice\", email: \"alice@example.com\" },\n  { id: 2, name: \"Bob\", email: \"bob@example.com\" },\n  { id: 3, name: \"Charlie\", email: \"charlie@example.com\" }\n]",
    "detail": "Array of 3 mock users",
    "kind": "snippet"
  },
  {
    "label": "mock-products",
    "insertText": "[\n  { id: 101, title: \"Laptop XYZ\", price: 999.99, stock: 15 },\n  { id: 102, title: \"Wireless Mouse\", price: 25.50, stock: 120 }\n]",
    "detail": "Array of mock products",
    "kind": "snippet"
  },
  {
    "label": "mock-uuid",
    "insertText": "\"${1:123e4567-e89b-12d3-a456-426614174000}\"",
    "detail": "Mock UUID v4 string",
    "kind": "snippet"
  }
]);
  api.completions.register('typescript', [
  {
    "label": "mock-users",
    "insertText": "[\n  { id: 1, name: \"Alice\", email: \"alice@example.com\" },\n  { id: 2, name: \"Bob\", email: \"bob@example.com\" },\n  { id: 3, name: \"Charlie\", email: \"charlie@example.com\" }\n]",
    "detail": "Array of 3 mock users",
    "kind": "snippet"
  },
  {
    "label": "mock-products",
    "insertText": "[\n  { id: 101, title: \"Laptop XYZ\", price: 999.99, stock: 15 },\n  { id: 102, title: \"Wireless Mouse\", price: 25.50, stock: 120 }\n]",
    "detail": "Array of mock products",
    "kind": "snippet"
  },
  {
    "label": "mock-uuid",
    "insertText": "\"${1:123e4567-e89b-12d3-a456-426614174000}\"",
    "detail": "Mock UUID v4 string",
    "kind": "snippet"
  }
]);
  api.completions.register('json', [
  {
    "label": "mock-users",
    "insertText": "[\n  { id: 1, name: \"Alice\", email: \"alice@example.com\" },\n  { id: 2, name: \"Bob\", email: \"bob@example.com\" },\n  { id: 3, name: \"Charlie\", email: \"charlie@example.com\" }\n]",
    "detail": "Array of 3 mock users",
    "kind": "snippet"
  },
  {
    "label": "mock-products",
    "insertText": "[\n  { id: 101, title: \"Laptop XYZ\", price: 999.99, stock: 15 },\n  { id: 102, title: \"Wireless Mouse\", price: 25.50, stock: 120 }\n]",
    "detail": "Array of mock products",
    "kind": "snippet"
  },
  {
    "label": "mock-uuid",
    "insertText": "\"${1:123e4567-e89b-12d3-a456-426614174000}\"",
    "detail": "Mock UUID v4 string",
    "kind": "snippet"
  }
]);
  api.notifications.info('Mock Data Gen is ready.');
}