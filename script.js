// Sekme Geçişi
//Routing yapısına hakim olunmadığından script içersinde yönlenmeler gerçekleştirildi
function showSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => (sec.style.display = 'none')); // Tüm bölümleri gizle

    const activeSection = document.getElementById(`${section}-section`);
    if (activeSection) {
        activeSection.style.display = 'block'; // Seçilen bölümü göster
    }
}

let storedPassword = "test123"; // Geçerli şifr
const fileURL = "./2024-2025guz_lisansfinalprogrami.pdf"; göreceli yolu

// Şifre Doğrulama
function verifyPassword() {
    const enteredPassword = document.getElementById('download-password').value;
    const errorMessage = document.getElementById('error-message');
    const fileDisplay = document.getElementById('file-display');
    const fileLink = document.getElementById('file-link');

    if (enteredPassword === storedPassword) {
        errorMessage.style.display = 'none';
        fileDisplay.style.display = 'block';
        fileLink.href = fileURL; // Dosya bağlantısını ayarla
    } else {
        errorMessage.style.display = 'block';
        fileDisplay.style.display = 'none';
    }
}

// Sürükle ve Bırak İşlemleri (Upload Sekmesi)
const dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.classList.add('dragging');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragging');
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove('dragging');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const fileName = files[0].name;
        showPopup(generatePassword(), fileName);
    }
});

// "Dosya Seçin" butonunu tetikleme
function triggerFileInput() {
    const fileInput = document.getElementById('file-input');
    fileInput.click();
    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        if (files.length > 0) {
            const fileName = files[0].name;
            showPopup(generatePassword(), fileName);
        }
    });
}

// Şifre Üretme
//TODO: Back-End entegrasyonu sırasında JWT-Token ile bağlanacak
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Pop-up Gösterme
function showPopup(password, fileName) {
    const popup = document.getElementById('popup');
    const passwordElement = document.getElementById('generated-password');
    const fileNameElement = document.getElementById('file-name');
    passwordElement.textContent = password;
    fileNameElement.textContent = fileName;
    popup.style.display = 'flex';
}

// Pop-up Kapatma
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// Sayfa yüklendiğinde Welcome Page'i göster
document.addEventListener('DOMContentLoaded', () => {
    showSection('welcome');
});

