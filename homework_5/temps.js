const users = [
  { id: 2, name: "Lika Beridze" },
  { id: 1, name: "John Johnson" },
  { id: 3, name: "Luka shengelia" },
];

const ids = users.map((user) => user.id);
const maxId = Math.max(...ids);
const newId = maxId + 1;
