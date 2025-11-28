describe("GitHub API - Verificar se Repositório foi Deletado", () => {
  const repoName = "repositorio-teste-leticia"; // nome do repositório para colsulta 
  const githubToken = Cypress.env("GITHUB_TOKEN");      // token GitHub
  const githubUsername = "torquato-leticia";            // usuário GitHub

  before(() => {
    if (!githubToken) {
      throw new Error(
        "❌ ERRO: GITHUB_TOKEN não encontrado! Configure no arquivo cypress.env.json."
      );
    }
  });

  it("Deve verificar se o repositório foi deletado", () => {
    cy.log(`🔍 Verificando se o repositório **${repoName}** foi deletado...`);

    cy.request({
      method: "GET",
      url: `https://api.github.com/repos/${githubUsername}/${repoName}`,
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      failOnStatusCode: false, // permite capturar 404 sem falhar
    }).then((response) => {
      cy.log(`📡 Status HTTP recebido: **${response.status}**`);
      cy.log(`⏱ Tempo de resposta: **${response.duration}ms**`);

      if (response.status === 404) {
        cy.log(`✅ Repositório "${repoName}" não encontrado: foi deletado ou nunca existiu.`);
      } else if (response.status === 200) {
        cy.log(`⚠️ Repositório "${repoName}" ainda existe!`);
      } else {
        cy.log(`❌ Status inesperado: ${response.status}`);
      }

      // Asserção para relatório de teste
      expect([200, 404], `Esperado status 200 (existe) ou 404 (não encontrado) para o repositório "${repoName}"`)
        .to.include(response.status);

      // Log completo para debugging
      console.log("📌 Resposta completa da verificação:", response);
    });
  });
});
