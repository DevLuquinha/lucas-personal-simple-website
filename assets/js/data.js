const basePath = window.location.pathname.includes('turma.html')
    ? '../data/data.json'
    : 'assets/data/data.json';

const Data = (() => {
    async function loadItinerary() {
        try {
            const response = await fetch(basePath);
            const data = await response.json();

            const container = document.getElementById('itinerario-container');
            if (!container) {
                return;
            }

            container.innerHTML = '';

            data.itinerario.forEach((disciplina, index) => {
                const generateList = (itens, tipo) => {
                    const cor = tipo === 'pro' ? 'success' : 'danger';
                    const iconeSvg = tipo === 'pro'
                        ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />'
                        : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />';

                    return itens.map(item => `
                    <li class="d-flex align-items-start gap-2 mb-1">
                        <svg class="text-${cor} flex-shrink-0 mt-1" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">${iconeSvg}</svg>
                        ${item}
                    </li>
                `).join('');
                };

                const cardHTML = `
                <div class="col-12 col-md-6 col-lg-4 reveal delay-${(index % 3 + 1) * 100}">
                    <div class="card h-100 border-light shadow-sm card-hover rounded-4 border-1" style="background-color: #f8fafc;">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center gap-3 mb-4">
                                <div class="d-flex align-items-center justify-content-center bg-${disciplina.corTema} bg-opacity-10 rounded-3" style="width: 48px; height: 48px;">
                                    <svg class="text-${disciplina.corTema}" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        ${disciplina.svgIcon}
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="fw-bold text-dark fs-6 mb-0">${disciplina.titulo}</h3>
                                    <span class="text-secondary" style="font-size: 0.75rem;">${disciplina.periodo}</span>
                                </div>
                            </div>
                            <p class="text-secondary mb-4" style="font-size: 0.875rem;">${disciplina.descricao}</p>
                            
                            <div class="mb-3">
                                <h4 class="text-success text-uppercase fw-semibold mb-2" style="font-size: 0.7rem; letter-spacing: 1px;">Pontos Positivos</h4>
                                <ul class="list-unstyled text-secondary" style="font-size: 0.875rem;">
                                    ${generateList(disciplina.pontosPositivos, 'pro')}
                                </ul>
                            </div>
                            
                            <div>
                                <h4 class="text-danger text-uppercase fw-semibold mb-2" style="font-size: 0.7rem; letter-spacing: 1px;">Pontos Negativos</h4>
                                <ul class="list-unstyled text-secondary" style="font-size: 0.875rem;">
                                    ${generateList(disciplina.pontosNegativos, 'con')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;

                container.innerHTML += cardHTML;
            });
        } catch (error) {
            console.error("Erro ao carregar o JSON:", error);
        }
    }

    async function loadExperience() {
        try {
            const response = await fetch(basePath);
            const data = await response.json();

            const xpContainer = document.getElementById('experiencia-container');
            const intContainer = document.getElementById('interesses-container');

            if (xpContainer && data.experiencia) {
                xpContainer.innerHTML = '';
                data.experiencia.forEach(item => {
                    const badgesHTML = item.tecnologias.map(tech =>
                        `<span class="badge bg-secondary bg-opacity-10 text-dark border me-1 mb-1 fw-normal">${tech}</span>`
                    ).join('');

                    xpContainer.innerHTML += `
                    <div class="position-relative mb-4">
                        <div class="position-absolute bg-white border border-3 border-${item.corBg} rounded-circle" style="width: 14px; height: 14px; left: -31px; top: 6px;"></div>
                        
                        <div class="card border-light shadow-sm rounded-4 card-hover">
                            <div class="card-body p-4">
                                <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                                    <span class="badge bg-${item.corBg} bg-opacity-10 text-${item.corTexto} rounded-pill">${item.tipo}</span>
                                    <span class="text-secondary" style="font-size: 0.75rem;">${item.periodo}</span>
                                </div>
                                <h4 class="fw-bold text-dark fs-5 mb-1">${item.cargo}</h4>
                                <p class="text-primary fw-medium mb-3" style="font-size: 0.875rem;">${item.local}</p>
                                <p class="text-secondary" style="font-size: 0.875rem;">${item.descricao}</p>
                                <div class="mt-2">
                                    ${badgesHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                });
            }

            if (intContainer && data.interesses) {
                intContainer.innerHTML = '';
                data.interesses.forEach(interesse => {
                    intContainer.innerHTML += `
                    <div class="card border-light shadow-sm rounded-4 card-hover">
                        <div class="card-body p-4 d-flex align-items-start gap-3">
                            <div class="d-flex align-items-center justify-content-center bg-${interesse.cor} bg-opacity-10 rounded-3 shrink-0" style="width: 48px; height: 48px;">
                                <svg class="text-${interesse.cor}" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    ${interesse.icone}
                                </svg>
                            </div>
                            <div>
                                <h4 class="fw-bold text-dark fs-6 mb-1">${interesse.titulo}</h4>
                                <p class="text-secondary mb-0" style="font-size: 0.875rem;">${interesse.descricao}</p>
                            </div>
                        </div>
                    </div>
                `;
                });
            }

        } catch (error) {
            console.error("Erro ao carregar os dados de atuação:", error);
        }
    }

    async function loadProjects() {
        try {
            const response = await fetch(basePath);
            const data = await response.json();

            const container = document.getElementById('projetos-container');
            if (!container || !data.projetos) return;

            container.innerHTML = '';

            data.projetos.forEach((projeto, index) => {
                // Map the tags (like "Profissional", "Concluído")
                const tagsHTML = projeto.tags.map(tag =>
                    `<span class="badge bg-${tag.cor} bg-opacity-10 text-${tag.cor === 'warning' ? 'dark' : tag.cor} border border-${tag.cor} border-opacity-25 rounded-pill px-3 py-1 me-2 mb-2">${tag.nome}</span>`
                ).join('');

                // Map the technology pills
                const techHTML = projeto.tecnologias.map(tech =>
                    `<span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-3 py-1 me-2 mb-2">${tech}</span>`
                ).join('');

                // Build the Bootstrap Card
                const cardHTML = `
                <div class="col-12 col-md-6 col-lg-4 reveal delay-${(index % 3 + 1) * 100}">
                    <div class="card h-100 border-light shadow-sm rounded-4 overflow-hidden card-hover">
                        
                        <div class="d-flex align-items-center justify-content-center" style="height: 192px; background: ${projeto.gradient};">
                            <svg width="64" height="64" fill="none" stroke="${projeto.svgColor}" viewBox="0 0 24 24">
                                ${projeto.svgIcon}
                            </svg>
                        </div>
                        
                        <div class="card-body p-4 d-flex flex-column">
                            <div class="d-flex flex-wrap mb-2">
                                ${tagsHTML}
                            </div>
                            
                            <h3 class="fw-bold text-dark fs-5 mb-3">${projeto.titulo}</h3>
                            
                            <p class="text-secondary mb-4 flex-grow-1" style="font-size: 0.875rem; line-height: 1.6;">
                                ${projeto.descricao}
                            </p>
                            
                            <div class="mt-auto border-top pt-3">
                                ${techHTML}
                            </div>
                        </div>
                        
                    </div>
                </div>
            `;

                container.innerHTML += cardHTML;
            });

        } catch (error) {
            console.error("Error fetching projects data:", error);
        }
    }

    async function loadStudents() {
        try {
            const tabela = document.getElementById('tabela-alunos');
            if (!tabela) {
                return;
            }

            const response = await fetch(basePath);
            const data = await response.json();

            if (data.alunos) {
                tabela.innerHTML = '';

                data.alunos.forEach((aluno, index) => {
                    tabela.innerHTML += `
                    <tr>
                        <th scope="row" class="px-4 text-secondary">${index + 1}</th>
                        <td class="fw-medium text-dark">${aluno.nome}</td>
                        <td><a href="mailto:${aluno.email}" class="text-decoration-none">${aluno.email}</a></td>
                    </tr>
                `;
                });
            }

        } catch (error) {
            console.error("Erro ao carregar a lista de alunos:", error);
            const tabela = document.getElementById('tabela-alunos');
            if (tabela) {
                tabela.innerHTML = `<tr><td colspan="3" class="text-center text-danger py-4">Erro ao carregar os dados. Verifique o caminho do data.json.</td></tr>`;
            }
        }
    }

    async function init() {
        await loadItinerary();
        await loadExperience();
        await loadProjects();
        await loadStudents();
    }

    return { init };
})();