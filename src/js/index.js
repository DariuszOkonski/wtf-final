import '../scss/main.scss';

console.log("Hi, I am Dariusz - Nice to meet you 👍");

fetch('https://api.github.com/users/DariuszOkonski/repos?sort=created&direction=asc')
.then(res => {
    if(res.status === 200)
        return res.json();
    throw new Error('Some problem with connection to github');
})
.then(res => {
        const container = document.querySelector('.projects-grid--js');
        container.innerHTML = '';
        
        res.forEach(repo => {     
            const {name, description, homepage, html_url} = repo;

            const singleProject = `
            <article class="project">
                <div class="project__window">
                <span class="project__circle"></span>
                <span class="project__circle"></span>
                <span class="project__circle"></span>
                </div>

                <div class="project__content">
                <img src="icons/github-icon.svg" alt="github icon">
                <h3 class="project__grid project__title"><span class="project__label">project:</span> <span>${name}</span></h3>
                <p class="project__grid project__grid--description">
                    <span class="project__label">description:</span>
                    <span>${description}</span>
                </p>
                <p class="project__grid">
                    <span class="project__label">demo:</span>
                    <span>&lt;<a class="project__link" href="${homepage}" rel="noopener noreferrer" target="_blank" title="${name} - demo">see_here</a>&gt;</span>
                </p>
                <p class="project__grid">
                    <span class="project__label">github:</span>
                    <span>&lt;<a class="project__link" href="${html_url}" rel="noopener noreferrer" target="_blank" title="${name} - code">source_code</a>&gt;</span>
                </p>
                </div>
            </article>`;
            
            if(description) {
                container.innerHTML += singleProject;
            }
        });

    })
    .catch(err => console.log(err));