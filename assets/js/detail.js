document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const novelId = urlParams.get('novel');

    if (!novelId) {
        window.location.href = 'index.html';
        return;
    }

    fetch(`data/novels/${novelId}.json`)
        .then(response => response.json())
        .then(data => {
            document.title = `${data.title} - Detail Novel`;
            document.getElementById('novel-title').textContent = data.title;
            document.getElementById('novel-display-title').textContent = data.title;
            document.getElementById('novel-author').textContent = `Penulis: ${data.author}`;
            document.getElementById('novel-description').textContent = data.description;
            document.getElementById('novel-cover').src = data.cover;
            document.getElementById('chapter-count').textContent = `${data.chapters.length} Bab`;
            document.getElementById('novel-status').textContent = `Status: ${data.status}`;
            document.getElementById('footer-author').textContent = data.author;

            const chapterList = document.getElementById('chapter-list');
            chapterList.innerHTML = '';

            data.chapters.forEach((chapter, index) => {
                const chapterLink = document.createElement('a');
                chapterLink.href = `read.html?novel=${novelId}&id=${chapter.id}`;
                chapterLink.className = 'chapter-item';
                chapterLink.innerHTML = `<strong>Bab ${index + 1}</strong><br>${chapter.title}`;
                chapterList.appendChild(chapterLink);
            });
        })
        .catch(error => {
            console.error('Error loading novel detail:', error);
            document.getElementById('chapter-list').innerHTML = `<p>Gagal memuat detail novel. Pastikan file data/novels/${novelId}.json sudah ada.</p>`;
        });
});
