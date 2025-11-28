const token = Cypress.env("GITHUB_TOKEN"); // Token configurado no cypress.env.json

describe("GitHub API - Usuário Autenticado", () => {

  before(() => {
    if (!token) {
      throw new Error(
        "❌ GITHUB_TOKEN não encontrado! Configure no arquivo cypress.env.json"
      );
    }
  });

  it("Deve buscar dados do usuário autenticado com sucesso", () => {
    cy.log("🔍 Iniciando requisição para obter dados do usuário autenticado...");

    cy.request({
      method: "GET",
      url: "https://api.github.com/user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false, // evita quebra em erros inesperados
    }).then((response) => {

      // Logs visuais
      cy.log(
        `📡 Status da requisição: **${response.status}**`
      );
      cy.log(
        `⏱ Tempo de resposta: **${response.duration}ms**`
      );

      // Validações principais
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("login");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("html_url");

      // Log do usuário retornado
      cy.log(`👤 Usuário autenticado: **${response.body.login}**`);
      cy.log(`🔗 Perfil: ${response.body.html_url}`);

      // Logs adicionais no console (mais detalhados)
      console.log("📌 Dados completos do usuário:", response.body);
    });
  });
});
