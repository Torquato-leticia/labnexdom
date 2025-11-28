describe("GitHub API - Consultar Repositório", () => {
  const repoName = "repositorio-teste-leticiatorquato";        // nome do repositório a consultar
  const githubToken = Cypress.env("GITHUB_TOKEN");              // token do GitHub
  const githubUsername = "torquato-leticia";                    // usuário GitHub

  before(() => {
    if (!githubToken) {
      throw new Error(
        "❌ ERRO: GITHUB_TOKEN não encontrado! Configure no arquivo cypress.env.json."
      );
    }
  });

  it("Deve consultar o repositório no GitHub com sucesso", () => {
    cy.log(`🔍 Consultando repositório **${repoName}** do usuário **${githubUsername}**...`);

    cy.request({
      method: "GET",
      url: `https://api.github.com/repos/${githubUsername}/${repoName}`,
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {

      cy.log(`📡 Status HTTP: **${response.status}**`);
      cy.log(`⏱ Tempo de resposta: **${response.duration}ms**`);

      // Validações principais
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", repoName);
      expect(response.body).to.have.property("private", false);
      expect(response.body).to.have.property("description");
      expect(response.body).to.have.property("owner");
      expect(response.body.owner.login).to.eq(githubUsername);

      // Logs amigáveis
      cy.log("📦 Repositório encontrado com sucesso!");
      cy.log(`📝 Descrição: **${response.body.description || "Nenhuma descrição"}**`);
      cy.log(`🔗 URL: ${response.body.html_url}`);

      // Console detalhado para debugging avançado
      console.log("📌 Dados completos do repositório:", response.body);
    });
  });
});
