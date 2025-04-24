(function() {
  // Inicializar EmailJS
  emailjs.init("h3s8bfVnJALGAwmS4");
})();

// Modificar la función convertirImagenABase64 para comprimir la imagen
function convertirImagenABase64(file, callback) {
  if (!file) {
    callback('');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calcular nuevas dimensiones manteniendo la proporción
      let width = img.width;
      let height = img.height;
      const maxSize = 800; // Tamaño máximo para cualquier dimensión
      
      if (width > height && width > maxSize) {
        height = (height * maxSize) / width;
        width = maxSize;
      } else if (height > maxSize) {
        width = (width * maxSize) / height;
        height = maxSize;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convertir a base64 con calidad reducida
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
      callback(compressedBase64);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Modificar la función enviarFormulario
function enviarFormulario(e) {
  e.preventDefault();
  
  const plataforma = document.getElementById('plataforma');
  const modulo = document.getElementById('modulo');
  
  if (!plataforma.value) plataforma.value = "No especificada";
  if (!modulo.value) modulo.value = "No especificado";
  
  const file = document.getElementById('error-screenshot').files[0];
  const botonEnviar = document.querySelector('button[type="submit"]');
  botonEnviar.disabled = true;
  botonEnviar.textContent = 'Enviando...';
  
  convertirImagenABase64(file, function(base64Image) {
    const parametros = {
      nombre: document.getElementById('nombre_completo').value,
      tipoid: document.getElementById('tipo_identificacion').value,
      identificacion: document.getElementById('identificación').value,
      correo: document.getElementById('Correo').value,
      contrato: document.getElementById('CTO').value,
      plataforma: plataforma.value,
      modulo: modulo.value,
      descripcion: document.getElementById('Descripción').value,
      screenshot: base64Image ? `<img src="${base64Image}" style="max-width: 100%; height: auto;">` : 'No se adjuntó imagen'
    };
    
    emailjs.send('service_iuk8vcu', 'template_70z6lln', parametros)
      .then(function(response) {
        alert('¡Formulario enviado correctamente!');
        document.getElementById('formulario').reset();
        document.getElementById('image-preview').style.display = 'none';
        botonEnviar.disabled = false;
        botonEnviar.textContent = 'Enviar';
      }, function(error) {
        console.error('Error al enviar:', error);
        alert('Error al enviar el formulario. Por favor, intenta de nuevo.');
        botonEnviar.disabled = false;
        botonEnviar.textContent = 'Enviar';
      });
  });
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Agregar evento al formulario
  document.getElementById('formulario').addEventListener('submit', enviarFormulario);
  
  // Agregar vista previa de imagen
  document.getElementById('error-screenshot').addEventListener('change', function() {
    mostrarVistaPreviaImagen(this);
  });
});
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
