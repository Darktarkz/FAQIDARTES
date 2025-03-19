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

  // Función para extraer parámetros de la URL
  function getURLParameters() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    for (let i = 0; i < pairs.length; i++) {
      if (pairs[i]) {
        const pair = pairs[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }
    }
    
    return params;
  }

  // Función para rellenar el formulario con los datos recibidos
  function fillFormWithQuestionData() {
    const params = getURLParameters();
    
    // Si recibimos un nombre de pregunta en la URL
    if (params.questionName) {
      // Mostrar el campo pregunta si está oculto
      const preguntaField = document.getElementById('pregunta');
      if (preguntaField) {
        preguntaField.style.display = 'block';
      }
      
      // Dividir el nombre por el carácter "_"
      const nameParts = params.questionName.split('_');
      
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
          // Si hay más de dos partes, usamos la segunda parte
          // Si solo hay dos partes, usamos la segunda
          moduloField.value = nameParts[1];
        }
        
        // Rellenar el campo pregunta con el texto de la pregunta (si está disponible)
        if (params.questionText && preguntaField) {
          preguntaField.value = params.questionText;
        }
      }
    }
  }

  // Ejecutar la función al cargar la página
  fillFormWithQuestionData();
});