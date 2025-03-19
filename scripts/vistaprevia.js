document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('error-screenshot');
    const imagePreview = document.getElementById('image-preview');
    const previewImage = document.getElementById('preview-image');
    
    fileInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          previewImage.src = e.target.result;
          imagePreview.style.display = 'block';
        };
        
        reader.readAsDataURL(this.files[0]);
      } else {
        imagePreview.style.display = 'none';
      }
    });
  });