    // JavaScript to handle multi-step navigation and progress bar
    let currentStep = 0;
    const steps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progress-bar');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    function updateForm() {
      steps.forEach((step, index) => {
        step.classList.remove('active');
        if (index === currentStep) {
          step.classList.add('active');
        }
      });
    
      // Update the progress bar
      const progress = ((currentStep + 1) / steps.length) * 100;``
      progressBar.style.width = `${progress}%`;
    
      // Toggle the visibility of next and previous buttons
      if (currentStep === 0) {
        prevBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'inline-block';
      }
    
      if (currentStep === steps.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
      } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
      }
    }
    
    // Event listener for the Next button
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateForm();
      }
    });
    
    // Event listener for the Previous button
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateForm();
      }
    });
    
    // Initialize form
    updateForm();