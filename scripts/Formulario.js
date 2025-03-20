document.addEventListener('DOMContentLoaded', function() {
  // Código existente para la vista previa de imágenes
  const fileInput = document.getElementById('error-screenshot');
  const imagePreview = document.getElementById('image-preview');
  const previewImage = document.getElementById('preview-image');
  
  if (fileInput) {
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
  }

  // Función para rellenar el formulario con los datos guardados en localStorage
  function fillFormWithQuestionData() {
    // Recuperar datos del localStorage en lugar de la URL
    const questionName = localStorage.getItem("ticketQuestionName");
    
    // Si tenemos un nombre de pregunta
    if (questionName) {
      // Dividir el nombre por el carácter "_"
      const nameParts = questionName.split('_');
      
      // Si hay al menos dos partes (plataforma y módulo)
      if (nameParts.length >= 2) {
        // Rellenar el campo plataforma con la primera parte
        const plataformaField = document.getElementById('plataforma');
        if (plataformaField) {
          plataformaField.value = nameParts[0];
        }
        
        // Rellenar el campo módulo con la segunda parte
        const moduloField = document.getElementById('modulo');
        if (moduloField) {
          moduloField.value = nameParts[1];
        }
      }
      
      // Limpiar los datos almacenados después de usarlos
      localStorage.removeItem("ticketQuestionName");
      localStorage.removeItem("ticketQuestionText");
    }
  }

  // Ejecutar la función al cargar la página
  fillFormWithQuestionData();
});