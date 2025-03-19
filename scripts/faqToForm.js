
    //script para abrir y cerrar la pregunta y redirigir al formulario
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todas las preguntas
    const questions = document.querySelectorAll(".faq-question");
    
    // Primero, agreguemos la funcionalidad original para expandir/colapsar preguntas
    questions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
  
        // Verifica si hay una respuesta asociada
        if (!answer) {
          console.error("No se encontró un elemento hermano para:", question);
          return;
        }
  
        const isExpanded = question.getAttribute("data-expanded") === "true";
  
        if (isExpanded) {
          // Si la pregunta está abierta, ciérrala
          question.setAttribute("data-expanded", "false");
          answer.style.display = "none";
        } else {
          // Cierra todas las demás preguntas
          questions.forEach((otherQuestion) => {
            const otherAnswer = otherQuestion.nextElementSibling;
            otherQuestion.setAttribute("data-expanded", "false");
            if (otherAnswer) {
              otherAnswer.style.display = "none";
            }
          });
  
          // Abre la pregunta seleccionada
          question.setAttribute("data-expanded", "true");
          answer.style.display = "block";
        }
      });
    });
  
    // Ahora modificamos los botones existentes para que envíen información al formulario
    const ticketButtons = document.querySelectorAll(".button");
    
    ticketButtons.forEach((button) => {
      // Guardamos la URL original
      const originalUrl = button.getAttribute("onclick")?.toString() || "";
      
      // Eliminamos el onclick original
      button.removeAttribute("onclick");
      
      // Agregamos nuestro propio evento click
      button.addEventListener("click", (event) => {
        event.preventDefault();
        
        // Encontramos la pregunta relacionada con este botón
        // (subimos al faq-answer y luego al faq-question)
        const answer = button.closest(".faq-answer");
        const question = answer?.previousElementSibling;
        
        if (question && question.classList.contains("faq-question")) {
          // Obtenemos el name de la pregunta (o creamos uno si no existe)
          let questionName = question.getAttribute("name");
          if (!questionName) {
            // Si no tiene name, usamos el texto como base para crear uno
            const questionText = question.textContent.trim();
            // Eliminamos el número y el punto inicial
            const cleanText = questionText.replace(/^\d+\.?\s*/, '').replace(/[^a-zA-Z0-9\s]/g, '');
            // Creamos un nombre básico utilizando "Pandora" como plataforma
            questionName = `Pandora_${cleanText.replace(/\s+/g, '_').substring(0, 30)}`;
          }
          
          // Obtenemos el texto de la pregunta
          const questionText = question.textContent.trim();
          
          // Redirigimos al formulario con los parámetros
          window.location.href = "../../../Formulario/Formulario.html" + 
                                "?questionName=" + encodeURIComponent(questionName) + 
                                "&questionText=" + encodeURIComponent(questionText);
        } else {
          // Si no podemos encontrar la pregunta, usamos la URL original
          window.location.href = "../../../Formulario/Formulario.html";
        }
      });
    });
  });

 