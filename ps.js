// Fungsi untuk menampilkan kotak pesan custom
        function showMessageBox(message) {
            document.getElementById('messageText').innerText = message;
            document.getElementById('messageBox').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }
        
        // Fungsi untuk menutup kotak pesan
        function closeMessageBox() {
            document.getElementById('messageBox').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

        // Teks untuk deskripsi yang bisa diperluas
        const descriptionContent = document.getElementById('description-content');
        const toggleButton = document.getElementById('toggle-description');
        const readMoreButton = document.getElementById('read-more-button');
        let isExpanded = false;

        function toggleDescription() {
            isExpanded = !isExpanded;
            if (isExpanded) {
                descriptionContent.style.maxHeight = descriptionContent.scrollHeight + 'px';
                toggleButton.innerHTML = `<i class="fas fa-chevron-up text-sm"></i>`;
                readMoreButton.style.display = 'block';
            } else {
                descriptionContent.style.maxHeight = '80px';
                toggleButton.innerHTML = `<i class="fas fa-chevron-right text-sm"></i>`;
                readMoreButton.style.display = 'none';
            }
        }

        // Event listener untuk tombol toggle
        toggleButton.addEventListener('click', toggleDescription);

        // Menambahkan fungsionalitas anti-copy yang lebih ramah
        (function(){
            // Cegah klik kanan
            document.addEventListener('contextmenu', e => {
                e.preventDefault();
                showMessageBox('Akses klik kanan diblokir.');
            });
            
            // Cegah shortcut view source & inspect
            document.onkeydown = e => {
                if (e.keyCode == 123 || // F12
                    (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || // Ctrl+Shift+I/J
                    (e.ctrlKey && (e.keyCode == 85 || e.keyCode == 83))) { // Ctrl+U/S
                    e.preventDefault();
                    showMessageBox('Akses kode diblokir!');
                    return false;
                }
            };
        })();
