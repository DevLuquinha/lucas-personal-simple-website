const Data = (() => {
    async function loadItinerary() {
        try {
            const response = await fetch('assets/data/data.json');
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

    async function init() {
        await loadItinerary();
    }

    return { init };
})();