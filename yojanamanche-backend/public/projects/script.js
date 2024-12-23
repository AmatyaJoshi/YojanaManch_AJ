let projects = []; // Global variable to store projects

document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/projects')
        .then(response => response.json())
        .then(data => {
            projects = data; // Store fetched projects in the global variable
            displayProjects(projects); // Display all projects initially
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
        });
});

function displayProjects(filteredProjects) {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = ''; // Clear existing projects

    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="project-details">Location: ${project.location}</p>
            <p class="project-details">Budget: ₹${Math.floor(project.budget).toLocaleString()} Cr</p>
            <p class="project-details">Duration: ${project.duration} Years</p>
        `;
        projectList.appendChild(projectCard);
    });
}

function filterProjects() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterDuration = document.getElementById('filterDuration').value;
    const filterBudget = document.getElementById('filterBudget').value;

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchInput) || 
                              project.city.toLowerCase().includes(searchInput) || 
                              project.location.toLowerCase().includes(searchInput);
        const matchesDuration = filterDuration === 'all' || project.duration <= parseInt(filterDuration);
        const matchesBudget = filterBudget === 'all' || project.budget <= parseInt(filterBudget);

        return matchesSearch && matchesDuration && matchesBudget;
    });

    displayProjects (filteredProjects); // Display the filtered projects
}

// Real-time search filtering
document.getElementById('searchInput').addEventListener('input', filterProjects);

// Clear Search Input
document.getElementById('clearSearch').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    filterProjects(); // Trigger filter to reset the list
});