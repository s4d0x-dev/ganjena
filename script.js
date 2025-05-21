let dictionary = {};
let deferredPrompt = null;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/ganjena/sw.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(err => console.error('Service Worker Registration Failed:', err));
}

fetch('/ganjena/data/dictionary.json')
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

// PWA Install Prompt
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

if (isMobile) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent default browser prompt
    deferredPrompt = e; // Store the event for later use

    // Show custom install pop-up
    const installPopup = document.createElement('div');
    installPopup.id = 'install-popup';
    installPopup.innerHTML = `
      <div class="popup-content">
        <h3>نصب برنامه</h3>
        <p>برای تجربه بهتر، فرهنگ واژگان گنجینه را به صفحه اصلی خود اضافه کنید!</p>
        <button id="install-btn">نصب</button>
        <button id="dismiss-btn">بعدا</button>
      </div>
    `;
    document.body.appendChild(installPopup);

    // Handle install button click
    document.getElementById('install-btn').addEventListener('click', () => {
      installPopup.remove();
      deferredPrompt.prompt(); // Show the native install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });

    // Handle dismiss button click
    document.getElementById('dismiss-btn').addEventListener('click', () => {
      installPopup.remove();
      deferredPrompt = null;
    });
  });
}

if (!localStorage.getItem('installPromptDismissed')) {
  // Show pop-up and set localStorage on dismiss
  document.getElementById('dismiss-btn').addEventListener('click', () => {
    installPopup.remove();
    deferredPrompt = null;
    localStorage.setItem('installPromptDismissed', 'true');
  });
}