import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel';
  
    const textTitle = document.createElement('span');
    textTitle.textContent = 'Customers Stories';
    carouselContainer.appendChild(textTitle);

    // Example: Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next Story';
    nextButton.addEventListener('click', () => moveCarousel(1));
  
    // Append next button to the carousel container
    carouselContainer.appendChild(nextButton);
  
    const ul = document.createElement('ul');
    ul.className = 'carousel-list';
  
    // Copy children to an array for manipulation
    const rows = [...block.children];
  
    // Create a circular linked list to represent the carousel
    rows.forEach((row, index) => {
      const li = document.createElement('li');
      li.className = 'carousel-item';
  
      // Move elements to the li
      while (row.firstElementChild) {
        li.appendChild(row.firstElementChild);
      }
  
      ul.appendChild(li);
  
      // Add class to first item for initial display
      if (index === 0) {
        li.classList.add('active');
      }
    });

    ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
    carouselContainer.appendChild(ul);
    block.textContent = '';
    block.appendChild(carouselContainer);
  
    let currentSlide = 0;
  
  
    // Function to move the carousel to the next or previous item
    function moveCarousel(direction) {
      const items = document.querySelectorAll('.carousel-item');
  
      // Hide the current item
      items[currentSlide].classList.remove('active');
  
      // Move to the next or previous item
      currentSlide = (currentSlide + direction + items.length) % items.length;
  
      // Display the new current item
      items[currentSlide].classList.add('active');
    }
  }
  
  
