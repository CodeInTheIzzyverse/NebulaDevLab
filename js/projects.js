export async function projectsCards(lang) {
    const cardsContainer = document.getElementById('projects_grid');
    const filtersContainer = document.getElementById('projects_filters');

    try {
        const response = await fetch("data/projects.json");
        const json = await response.json();
        const projects = await lang == "en" ? json.en : json.es;
        let filters = new Set([]);
        filters.add(`<button data-btn="projectTag" data-tag="All">${lang === "en" ? "All" : "Todos"}</button>`);

        let htmlCards = "";
        let htmlFilters = "";

        projects.forEach(project => {
            const htmlCard = projectCard(project, lang);
            htmlCards += `${htmlCard}\n`;
            project.tags.forEach(tag => {
                filters.add(`<button data-btn="projectTag" data-tag="${tag}">${tag}</button>`);
            });
        });

        for(const filter of filters) {
            htmlFilters += `${filter}\n`;
        }

        cardsContainer.innerHTML = htmlCards;
        filtersContainer.innerHTML = htmlFilters;

        cardsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.open_modal_btn');
            if (btn) {
                const id = btn.dataset.id;
                showModal(id, json, lang);
            }
        });

        filtersContainer.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('button');
            if (filterBtn) {
                const tag = filterBtn.dataset.tag;
                filterProjects(tag);
                filterBtn.classList.add('active');
                const allFilterBtn = filtersContainer.querySelectorAll('button[data-btn="projectTag"]');
                allFilterBtn.forEach(btn => {
                    if (btn.dataset.tag !== tag) {
                        btn.classList.remove('active');
                    }
                });
            }
        });

        const allFilterBtn = filtersContainer.querySelector('button[data-tag="All"]');
        if (allFilterBtn) {
            allFilterBtn.classList.add('active');
        }
    } catch (error) {
        console.log("Error cargando proyectos", error);
    }
}

function projectCard(project, lang) {
    const {id, imgSrc, imgAlt, title, tags, shortDescription } = project;
    const btnText = lang === "en" ? "View Details" : "Ver Detalles";
    const haveTags = tags.length > 0;

    let htmlTags = "";

    if (haveTags) {
        tags.forEach(tag => {
            htmlTags += `<span>${tag}</span>`;
        })
    }

    let htmlCard = `
        <div class="project_card">
            <img src="${imgSrc}" alt="${imgAlt}">

            <div class="project_card_text">
                ${haveTags ? 
                    `
                    <div class="project_card_tags">
                    ${htmlTags}
                    </div>
                    `
                    :
                    null
                }
                <h3>${title}</h3>
                <p>${shortDescription}</p>
                <button class="open_modal_btn" data-id="${id}">
                    <span>${btnText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"/></svg>
                </button>
            </div>
        </div>
    `;
    return htmlCard;
}

async function projectModal(project, lang) {
    const {id, title, imgSrc, imgAlt, tags, modalTitle, description, details, link } = await project;
    const btnText = lang === "en" ? "Preview" : "Ver";
    const durationTitle = lang === "en" ? "Duration" : "Duración";
    const techTitle = lang === "en" ? "Technology" : "Tecnología";

    let htmlTags = "";

    if (tags.length > 0) {
        await tags.forEach(tag => {
            htmlTags += `<span>${tag}</span>`;
            console.log(tag)
        })
    }

    let htmlModal = `
        <article class="project_modal modal" id="${id}_modal">
            <div class="modal_header">
                <h4>${title}</h4>
                <button class="close_modal_btn" data-id="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z"/></svg>
                </button>
            </div>

            <div class="modal_content">
                <img src="${imgSrc}" alt="${imgAlt}">
                ${tags.length > 0 ? 
                    `
                    <div class="project_card_tags">
                    ${htmlTags}
                    </div>
                    `
                    :
                    null
                }
                <h3>${modalTitle}</h3>
                <p>${description}</p>

                <div class="modal_details">
                    <div class="modal_detail">
                        <h4>${durationTitle}</h4>
                        <p class="modal_detail_content">${details.durationInfo}</p>
                    </div>
                    <div class="modal_detail">
                        <h4>${techTitle}</h4>
                        <p class="modal_detail_content">${details.techInfo}</p>
                    </div>
                </div>

                <a href="${link}" target="_blank">
                    <button data-btn="primary">
                        <span>${btnText}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"/></svg>
                    </button>
                </a>
            </div>
        </article>
    `;

    return htmlModal;
}

async function showModal(id, data, lang) {
    const projects = await lang == "en" ? data.en : data.es;
    const project = await projects.filter(s => s.id = id)[0];
    const modalsContainer = document.getElementById('modals');
    const htmlModal = await projectModal(project, lang);
    console.log(project)

    if (project) {
        if (htmlModal) {
            modalsContainer.innerHTML = htmlModal;
            modalsContainer.classList = "modals active";
            const body = document.querySelector('body');

            body.style.overflowY = 'hidden';

            modalsContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.close_modal_btn');
                if (btn) {
                    modalsContainer.innerHTML = "";
                    modalsContainer.classList = "modals";
                    body.style.overflowY = 'visible';
                }
            });
        }
    } else {
        console.error("No se encontró el modal con ID:", modalId);
    }
}

async function filterProjects(tag) {
    const cardsContainer = document.getElementById('projects_grid');
    const allCards = cardsContainer.querySelectorAll('.project_card');
    allCards.forEach(card => {
        const cardTags = card.querySelectorAll('.project_card_tags span');
        const tagsArray = Array.from(cardTags).map(span => span.textContent);
        if (tagsArray.includes(tag)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    if (tag === "All" || tag === "Todos") {
        allCards.forEach(card => {
            card.style.display = "block";
        });
    }
}