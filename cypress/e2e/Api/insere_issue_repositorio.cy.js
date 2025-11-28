describe("GitHub API - Criar Issue", () => {
  const repoName = "repositorio-teste-leticiatorquato";       // Nome do repositório
  const githubToken = Cypress.env("GITHUB_TOKEN");             // Token pessoal
  const githubUsername = "torquato-leticia";                   // usuário GitHub

  const issueTitle = "Issue de teste via Cypress";
  const issueBody = "Esta é uma issue criada automaticamente via teste Cypress.";

  before(() => {
    if (!githubToken) {
      throw new Error(
        "❌ ERRO: GITHUB_TOKEN não encontrado! Inclua no arquivo cypress.env.json."
      );
    }
  });

  it("Deve criar uma nova issue com sucesso", () => {
    cy.log(`📝 Criando issue no repositório **${repoName}**...`);

    cy.request({
      method: "POST",
      url: `https://api.github.com/repos/${githubUsername}/${repoName}/issues`,
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      body: {
        title: issueTitle,
        body: issueBody,
      },
      failOnStatusCode: false, // capturar erros sem quebrar abruptamente
    }).then((response) => {

      cy.log(`📡 Status HTTP: **${response.status}**`);
      cy.log(`⏱ Tempo de resposta: **${response.duration}ms**`);

      // Validações principais
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", issueTitle);
      expect(response.body).to.have.property("body", issueBody);
      expect(response.body).to.have.property("number");      // número da issue criada
      expect(response.body).to.have.property("state", "open");

      // Logs amigáveis
      cy.log(`🎉 Issue criada com sucesso!`);
      cy.log(`🔢 Número da issue: **${response.body.number}**`);
      cy.log(`🔗 URL da Issue: ${response.body.html_url}`);

      // Log completo no console (para debugging avançado)
      console.log("📌 Dados completos da issue criada:", response.body);
    });
  });
});
