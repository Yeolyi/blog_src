// GET
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((x) => x.json()) // HTTP 응답 몸체를 취득하여 역직렬화
  .then(console.log);

// POST
const payload = {
  userId: 1,
  title: 'JavaScript',
  completed: false,
};
fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  headers: { 'content-Type': 'application/json' },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .then(console.log)
  .catch(console.error);

// PATCH
const payload2 = { completed: true };
fetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'PATCH',
  headers: { 'content-Type': 'application/json' },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .then(console.log)
  .catch(console.error);

// DELETE
fetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'DELETE',
})
  .then((response) => response.json())
  .then(console.log)
  .catch(console.error);
