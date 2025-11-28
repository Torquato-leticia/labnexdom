describe("GitHub API - Consultar Issue", () => {
  const repoName = "repositorio-teste-leticiatorquato";       // Nome do repositório
  const githubToken = Cypress.env("GITHUB_TOKEN");             // Token privado
  const githubUsername = "torquato-leticia";                   // Usuário GitHub
  const issueNumber = 1;                                       // Número da issue para consulta

  before(() => {
    if (!githubToken) {
      throw new Error(
        "❌ ERRO: GITHUB_TOKEN não foi encontrado! Configure corretamente no arquivo cypress.env.json."
      );
    }
  });

  it("Deve consultar a issue pelo número com sucesso", () => {
    cy.log(`🔍 Consultando a Issue **#${issueNumber}** do repositório **${repoName}**...`);

    cy.request({
      method: "GET",
      url: `https://api.github.com/repos/${githubUsername}/${repoName}/issues/${issueNumber}`,
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      failOnStatusCode: false, // evita que erros quebrem o teste antes de validar
    }).then((response) => {
      cy.log(`📡 Status HTTP recebido: **${response.status}**`);
      cy.log(`⏱ Tempo de resposta: **${response.duration}ms**`);

      // Validações
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("number", issueNumber);
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");
      expect(response.body).to.have.property("state");

      // Logs legíveis no Cypress
      cy.log(`📝 Título: **${response.body.title}**`);
      cy.log(`📌 Estado atual: **${response.body.state}**`);
      cy.log(`👤 Criado por: **${response.body.user.login}**`);

      // Log completo no console (fora da UI do Cypress)
      console.log("📌 Dados completos da Issue:", response.body);
    });
  });
});
