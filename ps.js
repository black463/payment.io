 const descriptionContent = document.getElementById('description-content');
        const toggleButton = document.getElementById('toggle-description');
        const readMoreButton = document.getElementById('read-more-button');
        let isExpanded = false;

        toggleButton.addEventListener('click', toggleDescription);

        function toggleDescription() {
            if (isExpanded) {
                // Kecilkan
                descriptionContent.style.maxHeight = '80px';
                toggleButton.innerHTML = '<i class="fas fa-chevron-right text-sm"></i>';
                readMoreButton.classList.add('hidden');
            } else {
                // Perluas
                descriptionContent.style.maxHeight = descriptionContent.scrollHeight + 'px';
                toggleButton.innerHTML = '<i class="fas fa-chevron-down text-sm"></i>';
                readMoreButton.classList.remove('hidden');
            }
            isExpanded = !isExpanded;
        }

        // Periksa apakah konten melebihi batas, jika ya, tampilkan tombol "Baca lebih banyak"
        window.addEventListener('load', () => {
            if (descriptionContent.scrollHeight > 80) {
                readMoreButton.innerHTML = '<button onclick="toggleDescription()" class="text-green-600 font-medium">Baca lebih banyak</button>';
                readMoreButton.classList.remove('hidden');
            } else {
                toggleButton.style.display = 'none';
            }
        });
