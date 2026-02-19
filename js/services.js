export async function servicesCards(lang) {
	const cardsContainer = document.getElementById("services_cards");

	try {
		const response = await fetch("data/services.json");
		const json = await response.json();
		const services = (await lang) == "en" ? json.en : json.es;

		let htmlCards = "";

		services.forEach((service) => {
			const htmlCard = serviceCard(service, lang);
			htmlCards += `${htmlCard}\n`;
		});

		cardsContainer.innerHTML = htmlCards;

		cardsContainer.addEventListener("click", (e) => {
			const btn = e.target.closest(".open_modal_btn");
			if (btn) {
				const id = btn.dataset.id;
				showModal(id, json, lang);
			}
		});
	} catch (error) {
		console.log("Error cargando servicios", error);
	}
}

function serviceCard(service, lang) {
	const { id, icon, title, shortDescription } = service;
	const btnText = lang === "en" ? "Learn more" : "Saber más";

	let htmlCard = `
        <div class="service_card">
            ${icon}
            <h3>${title}</h3>
            <p>${shortDescription}</p>
            <button class="open_modal_btn" data-id="${id}">
                <span>${btnText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"/></svg>
            </button>
        </div>
    `;
	return htmlCard;
}

async function showModal(id, data, lang) {
	const services = (await lang) == "en" ? data.en : data.es;
	const service = await services.filter((s) => (s.id = id))[0];
	const modalsContainer = document.getElementById("modals");
	const htmlModal = await serviceModal(service, lang);
	console.log(service);

	if (service) {
		if (htmlModal) {
			modalsContainer.innerHTML = htmlModal;
			modalsContainer.classList = "modals active";
			const body = document.querySelector("body");

			body.style.overflowY = "hidden";

			modalsContainer.addEventListener("click", (e) => {
				const btn = e.target.closest(".close_modal_btn");
				if (btn) {
					modalsContainer.innerHTML = "";
					modalsContainer.classList = "modals";
					body.style.overflowY = "visible";
				}
			});
		}
	} else {
		console.error("No se encontró el modal con ID:", modalId);
	}
}

async function serviceModal(service, lang) {
	const { id, icon, title, modalTitle, description, details } = await service;
	const btnText =
		lang === "en"
			? "Request a Free Quote"
			: "Solicitar presupuesto gratuito";

	let htmlModalDetails = "";

	await details.forEach((detail) => {
		htmlModalDetails += `
            <div class="modal_detail">
                <div class="modal_detail_header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 12a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8c.76 0 1.5.11 2.2.31l1.57-1.57A9.8 9.8 0 0 0 12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10M7.91 10.08L6.5 11.5L11 16L21 6l-1.41-1.42L11 13.17z"/></svg>
                    <h4>${detail.detailName}</h4>
                </div>
                <p class="modal_detail_content">${detail.detailInfo}</p>
            </div>
        `;
	});

	let htmlModal = `
        <article class="service_modal modal" id="${id}_modal">
            <div class="modal_header">
                <h4>${title}</h4>
                <button class="close_modal_btn" data-id="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z"/></svg>
                </button>
            </div>

            <div class="modal_content">
                ${icon}
                <h3>${modalTitle}</h3>
                <p>${description}</p>

                <div class="modal_details">
                    ${htmlModalDetails}
                </div>

                <a href="#contact"><button data-btn="primary" class="close_modal_btn">${btnText}</button></a>
            </div>
        </article>
    `;
	return htmlModal;
}
