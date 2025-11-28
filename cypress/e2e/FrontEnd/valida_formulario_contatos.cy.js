describe('Teste de formulário de contato Nexdom', () => {

  it('Valida se a página está OK e envia o formulário', () => {
    // Valida se a página retorna status 200
    cy.request({
      url: 'https://nexdom.tec.br/contato/',
      failOnStatusCode: false // evita falha automática no Cypress
    }).then((response) => {
      if (response.status === 200) {
        cy.log('Página carregou com sucesso! Status 200');

        // Acessa a página
        cy.visit('https://nexdom.tec.br/contato/');

        // Preenche os campos do formulário
        cy.get('#form-field-name').type('leticia torquato');
        cy.get('#form-field-email').type('lety1224@gmail.com');
        cy.get('#form-field-message').type('Nexdom');
        cy.get('#form-field-field_67e0483').type('Analista de QA');
        cy.get('#form-field-field_5778e7b').type('(41) 999297511');
        cy.get('#form-field-field_f77a763').type('Solicitação de contato');
        cy.get('#form-field-field_7651528').check();

        // Envia o formulário
        cy.get('button.elementor-button').click();

        // Aqui você pode adicionar validação do envio
      } else {
        cy.log(`Erro: página não carregou corretamente! Status: ${response.status}`);
        // Se quiser, pode forçar o teste a falhar
        throw new Error(`Página indisponível. Status: ${response.status}`);
      }
    });
  });
});
