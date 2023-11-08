export default function decorate(block) {
  const accordion = [...block.firstElementChild.children];
  block.classList.add('accordion');

  // Create a new ul element to structure the accordion
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('h3')) {
        li.className = 'title';

        // Add a click event listener to "title" elements
        li.addEventListener('click', () => {
          // Toggle the class 'open' on the title element
          li.classList.toggle('open');

          // Toggle the aria-expanded attribute
          const isExpanded = div.classList.contains('open');
          li.setAttribute('aria-expanded', isExpanded);
        });
      } else {
        li.className = 'content';
      }
    });

    ul.append(li);
  });

  // Clear the block and append the ul
  block.textContent = '';
  block.append(ul);
}
