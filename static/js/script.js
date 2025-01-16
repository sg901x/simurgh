function togglePart(partId) {
    const part = document.getElementById(partId);
    const formContent = part.querySelector('.form-content');
    
    if (formContent.style.display === 'block') {
        formContent.style.display = 'none';
        part.classList.remove('open');
    } else {
        formContent.style.display = 'block';
        part.classList.add('open');
    }
}

// Optional: Close dropdowns if clicked outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.form-part')) {
        document.querySelectorAll('.form-content').forEach(function(menu) {
            menu.style.display = 'none';
        });
        document.querySelectorAll('.form-part').forEach(function(dropdown) {
            dropdown.classList.remove('open');
        });
    }
});


  $(document).ready(function() {
    $("#tanggal").datepicker({
      dateFormat: "dd MM yy", // Format: 01 Januari 2025
      regional: "id" // Mengatur bahasa Indonesia
    });
  });

