describe("GitHub API - Deletar Repositório", () => {
  const repoName = "repositorio-teste-leticia";       // Nome do repositório a ser deletado
  const githubToken = Cypress.env("GITHUB_TOKEN");             // Token pessoal
  const githubUsername = "torquato-leticia";                   // GitHub

  before(() => {
    if (!githubToken) {
      throw new Error(
        "❌ ERRO: GITHUB_TOKEN não encontrado! Configure no arquivo cypress.env.json."
      );
    }
  });

  it("Deve deletar o repositório no GitHub com segurança", () => {
    cy.log(`🗑 Tentando deletar o repositório **${repoName}**...`);

    cy.request({
      method: "DELETE",
      url: `https://api.github.com/repos/${githubUsername}/${repoName}`,
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      failOnStatusCode: false, // trata respostas 404 sem quebrar o teste
    }).then((response) => {
      
      cy.log(`📡 Status HTTP retornado: **${response.status}**`);
      cy.log(`⏱ Tempo de resposta: **${response.duration}ms**`);

      // Validações permitidas:
      // 204 — deletado com sucesso
      // 404 — repositório já não existe
      expect([204, 404]).to.include(response.status);

      if (response.status === 204) {
        cy.log("✅ Repositório deletado com sucesso!");
      } else if (response.status === 404) {
        cy.log("⚠️ O repositório já não existe (404). Nenhuma ação necessária.");
      }

      // Console detalhado para debugar, se necessário
      console.log("📌 Resposta completa da exclusão:", response);
    });
  });
});
