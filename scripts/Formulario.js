
(function() {
  // Inicializar EmailJS
  emailjs.init("h3s8bfVnJALGAwmS4");
})();

// Función para convertir imagen a base64
function convertirImagenABase64(file, callback) {
  if (!file) {
    callback('');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

// Función para mostrar vista previa de la imagen
function mostrarVistaPreviaImagen(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview-image').src = e.target.result;
      document.getElementById('image-preview').style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// Función para enviar el formulario
function enviarFormulario(e) {
  e.preventDefault();
  
  // Verificar campos readonly
  const plataforma = document.getElementById('plataforma');
  const modulo = document.getElementById('modulo');
  
  // Establecer valores por defecto si están vacíos
  if (!plataforma.value) plataforma.value = "No especificada";
  if (!modulo.value) modulo.value = "No especificado";
  
  // Obtener el archivo
  const file = document.getElementById('error-screenshot').files[0];
  
  // Deshabilitar el botón mientras se envía
  const botonEnviar = document.querySelector('button[type="submit"]');
  botonEnviar.disabled = true;
  botonEnviar.textContent = 'Enviando...';
  
  // Convertir imagen a base64 y enviar
  convertirImagenABase64(file, function(base64Image) {
    // Crear objeto de parámetros
    const parametros = {
      nombre: document.getElementById('nombre_completo').value,
      tipoid: document.getElementById('tipo_identificacion').value,
      identificacion: document.getElementById('identificación').value,
      correo: document.getElementById('Correo').value,
      contrato: document.getElementById('CTO').value,
      plataforma: plataforma.value,
      modulo: modulo.value,
      descripcion: document.getElementById('Descripción').value,
      screenshot: base64Image || 'No se adjuntó imagen'
    };
    
    // Enviar correo
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
