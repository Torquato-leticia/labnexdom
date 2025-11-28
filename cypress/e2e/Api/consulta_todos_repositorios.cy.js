describe("GitHub API - Consultar Repositórios de um Usuário", () => {
  const githubToken = Cypress.env("GITHUB_TOKEN");
  const githubUsername = "torquato-leticia";

  before(() => {
    if (!githubToken) {
      throw new Error(
        "❌ ERRO: GITHUB_TOKEN não encontrado! Configure no arquivo cypress.env.json."
      );
    }
  });

  it("Deve listar todos os repositórios públicos do usuário", () => {
    cy.log(`🔍 Consultando repositórios públicos do usuário **${githubUsername}**...`);

    cy.request({
      method: "GET",
      url: `https://api.github.com/users/${githubUsername}/repos`,
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      
      cy.log(`📡 Status HTTP: **${response.status}**`);
      cy.log(`⏱ Tempo de resposta: **${response.duration}ms**`);

      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");

      const nomesRepos = response.body.map((repo) => repo.name);

      cy.log(`📂 Total de repositórios encontrados: **${nomesRepos.length}**`);
      cy.log(`📦 Lista de repositórios:`);
      nomesRepos.forEach((nome, index) => {
        cy.log(`   ${index + 1}. ${nome}`);
      });

      // Log completo no console (útil para debugging)
      console.log("📌 Repositórios completos retornados:", response.body);
    });
  });
});
