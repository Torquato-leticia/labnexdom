describe("GitHub API - Criar Repositório", () => {
  const repoName = "repositorio-teste-leticiatorquato";
  const githubToken = Cypress.env("GITHUB_TOKEN");

  before(() => {
    if (!githubToken) {
      throw new Error(
        "❌ ERRO: GITHUB_TOKEN não encontrado! Configure corretamente no arquivo cypress.env.json."
      );
    }
  });

  it("Deve criar um novo repositório com sucesso", () => {
    cy.log(`📦 Iniciando criação do repositório **${repoName}**...`);

    cy.request({
      method: "POST",
      url: "https://api.github.com/user/repos",
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      body: {
        name: repoName,
        description: "Repositório criado via Cypress API test",
        private: false,
      },
      failOnStatusCode: false, // evita interrupção inesperada
    }).then((response) => {
      
      cy.log(`📡 Status HTTP: **${response.status}**`);
      cy.log(`⏱ Tempo de resposta: **${response.duration}ms**`);

      // Status esperado 201 = Created
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", repoName);
      expect(response.body).to.have.property("private", false);
      expect(response.body).to.have.property("owner");
      expect(response.body).to.have.property("html_url");

      cy.log("🎉 Repositório criado com sucesso!");
      cy.log(`🔗 URL: ${response.body.html_url}`);

      // Log detalhado no console para debugging
      console.log("📌 Dados completos do repositório criado:", response.body);
    });
  });
});
