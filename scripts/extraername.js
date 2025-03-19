function extractQuestionNames() {
    // Selecciona todas las preguntas que tienen el atributo name
    const questions = document.querySelectorAll('.faq-question[name]');
    const extractedData = [];
  
    // Recorre cada pregunta y extrae su nombre
    questions.forEach(question => {
      const nameAttr = question.getAttribute('name');
      if (nameAttr) {
        // Divide el nombre por el carácter "_"
        const nameParts = nameAttr.split('_');
        
        // Guarda la información
        extractedData.push({
          fullName: nameAttr,
          parts: nameParts,
          questionText: question.textContent.trim()
        });
      }
    });
  
    return extractedData;
  }