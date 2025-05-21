let dictionary = {};

fetch('data/dictionary.json')
  .then(res => res.json())
  .then(data => {
    dictionary = data;
  });

const search = document.getElementById('search');
const suggestions = document.getElementById('suggestions');
const definition = document.getElementById('definition');

search.addEventListener('input', () => {
  const term = search.value.trim();
  suggestions.innerHTML = '';
  definition.innerHTML = '';

  if (term.length === 0) return;

  const matches = Object.keys(dictionary)
    .filter(word => word.startsWith(term))
    .slice(0, 5);

  matches.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    li.onclick = () => {
      search.value = word;
      suggestions.innerHTML = '';
      definition.innerHTML = '<span class="label">برابر پارسی: </span>' + dictionary[word];
    };
    suggestions.appendChild(li);
  });

  if (dictionary[term]) {
    definition.innerHTML = '<span class="label">برابر پارسی: </span>' + dictionary[term];
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Registered'));
}