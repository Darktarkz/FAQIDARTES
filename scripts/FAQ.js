document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todas las preguntas
  const questions = document.querySelectorAll(".faq-question");
  
  // Funcionalidad para expandir/colapsar preguntas
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

  // Modificación de los botones existentes
  const ticketButtons = document.querySelectorAll(".button");
  
  ticketButtons.forEach((button) => {
    // Eliminamos el onclick original
    button.removeAttribute("onclick");
    
    // Agregamos nuestro propio evento click
    button.addEventListener("click", (event) => {
      event.preventDefault();
      
      // Encontramos la pregunta relacionada con este botón
      const answer = button.closest(".faq-answer");
      const question = answer?.previousElementSibling;
      
      if (question && question.classList.contains("faq-question")) {
        // Obtenemos el name de la pregunta
        const questionName = question.getAttribute("name");
        const questionText = question.textContent.trim();
        
        // En lugar de usar URL, podemos almacenar estos valores en localStorage
        localStorage.setItem("ticketQuestionName", questionName);
        localStorage.setItem("ticketQuestionText", questionText);
        
        // Redirigimos al formulario sin parámetros en la URL
        window.location.href = "D:/FAQ-IDARTES/FAQIDARTES/Formulario/Formulario.html";
      } else {
        // Redirigimos al formulario simple
        window.location.href = "D:/FAQ-IDARTES/FAQIDARTES/Formulario/Formulario.html";
      }
    });
  });
});