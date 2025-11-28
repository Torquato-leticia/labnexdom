describe('Validação de status da página Nexdom', () => {
  it('Deve retornar status 200', () => {

    cy.request({
      url: 'https://nexdom.tec.br/',
      failOnStatusCode: false  // permite verificar o status manualmente
    }).then((response) => {

      if (response.status === 200) {
        cy.log('✔ Página respondeu com status 200');
      } else {
        cy.log(`❌ ERRO: Página retornou status ${response.status}`);
        throw new Error(`A página não carregou corretamente. Status retornado: ${response.status}`);
      }

    });
    
  });
});
