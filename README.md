# Testes E2E - Automation Exercise

Projeto de automação E2E com Cypress para exercitar cadastro, login, logout e validações de conta no site [Automation Exercise](https://www.automationexercise.com/).

## Os três specs

### 1. Spec básico com seletores CSS

Arquivo: `cypress/e2e/1-getting-started/automation-exercise.cy.js`

É a versão inicial dos cenários. Localiza elementos com os comandos CSS nativos do Cypress, principalmente `cy.get()` e `cy.contains()`. Os seletores usam atributos `data-qa` e IDs, por exemplo:

```js
cy.get('[data-qa="login-email"]')
cy.get('#id_gender2')
```

O arquivo cobre cadastro, login válido, login inválido, logout e tentativa de cadastro com e-mail já existente. A suíte desativa o isolamento entre testes e reaproveita o e-mail criado pelo primeiro caso; por isso, rode o spec completo e mantenha a ordem dos casos.

### 2. Spec com seletores XPath

Arquivo: `cypress/e2e/1-getting-started/automation-exercise-xpath.cy.js`

Exercita os mesmos fluxos usando `cy.xpath()` no lugar de `cy.get()` para localizar elementos. Por exemplo:

```js
cy.xpath('//*[@data-qa="login-email"]')
cy.xpath('//a[contains(@href, "login")]')
```

As ações repetidas estão agrupadas em funções auxiliares, como `openLoginPage`, `registerUser`, `loginUser`, `logoutUser` e `deleteAccount`. Cada caso que precisa de uma conta cria seu próprio e-mail e remove a conta ao final, reduzindo a dependência de dados deixados por outros casos. A navegação é feita novamente quando cada fluxo precisa voltar à página de login.

### 3. Spec modularizado com seletores CSS

Arquivo: `cypress/e2e/1-getting-started/automation-exercise-modular.cy.js`

Mantém os seletores CSS da versão básica, mas extrai ações comuns para funções reutilizáveis: `submitLogin`, `submitSignup`, `fillAccountDetails` e `logout`. A suíte também desativa o isolamento entre testes e faz uma única visita inicial. Os testes compartilham a conta criada no primeiro caso e dependem de serem executados na ordem do arquivo.

## Diferenças principais

| Spec | Seletores | Organização | Isolamento e dados |
|---|---|---|---|
| Básico | CSS (`cy.get`) | Ações escritas diretamente nos casos | Compartilha a conta e a página entre casos |
| XPath | XPath (`cy.xpath`) | Funções para navegação e fluxos de conta | Cria e remove contas por cenário, quando aplicável |
| Modularizado | CSS (`cy.get`) | Funções para reaproveitar ações | Compartilha conta e estado; depende da ordem |

## Bibliotecas e ferramentas

- **Cypress** (`cypress`): framework e executor dos testes E2E.
- **cypress-xpath** (`cypress-xpath`): adiciona o comando `cy.xpath()`. O plugin é carregado globalmente em `cypress/support/e2e.js`.
- **cypress-mochawesome-reporter**: gera o relatório HTML dos resultados. A configuração está em `cypress.config.js`; gráficos e vídeos estão desativados.
- **browserstack-cypress-cli**: ferramenta opcional para executar os testes no BrowserStack, configurada pelo `browserstack.json`.

## Instalação

Requer Node.js e npm instalados. Na raiz do projeto, instale as dependências declaradas:

```bash
npm install
```

## Executar os testes

Abrir o Cypress em modo interativo:

```bash
npx cypress open --e2e
```

Executar todos os specs encontrados em `cypress/e2e`:

```bash
npx cypress run
```

Executar um spec específico:

```bash
npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise.cy.js"
npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise-xpath.cy.js"
npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise-modular.cy.js"
```

## Relatórios e observações

O reporter Mochawesome grava o relatório HTML em `cypress/reports/html/index.html`. A gravação de vídeo está desativada na configuração atual.

Os testes de cadastro, login e exclusão interagem com o site público e podem criar ou remover contas. É necessário ter acesso à internet; indisponibilidade ou mudanças no site podem afetar os resultados. Os specs básico e modularizado compartilham estado, portanto devem ser executados completos e na ordem definida. O spec XPath cria dados próprios em cada cenário.

## Executar os testes no BrowserStack

O projeto já declara `browserstack-cypress-cli` como dependência. Instale as dependências na raiz do projeto:

```bash
npm install
```

Se estiver adicionando o CLI a outro projeto, instale-o como dependência de desenvolvimento:

```bash
npm install --save-dev browserstack-cypress-cli
```

O arquivo `browserstack.json` configura uma única plataforma: Chrome `latest` no Windows 10. Antes de executar, configure as credenciais da sua conta BrowserStack como variáveis de ambiente. O CLI lê `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY`.

No PowerShell, para uma execução local:

```powershell
$env:BROWSERSTACK_USERNAME = "seu-username"
$env:BROWSERSTACK_ACCESS_KEY = "sua-access-key"
npx browserstack-cypress run
```

Não substitua os placeholders de `browserstack.json` por credenciais reais nem envie chaves em comandos, logs, README ou commits.

### Configurar credenciais e executar pelo GitHub Actions

As credenciais devem ficar em GitHub Actions Secrets; não as salve no Git, no `browserstack.json` ou em arquivos versionados.

1. No repositório GitHub, acesse **Settings → Secrets and variables → Actions**.
2. Selecione **New repository secret** e crie estes dois secrets:
   - `BROWSERSTACK_USERNAME`: username da conta BrowserStack.
   - `BROWSERSTACK_ACCESS_KEY`: access key da conta BrowserStack.
3. Envie o projeto para a branch `main`. O workflow versionado em `.github/workflows/browserstack.yml` será iniciado automaticamente após cada push nessa branch. Para iniciar manualmente, abra a aba **Actions**, escolha **Cypress no BrowserStack** e selecione **Run workflow**.

O workflow instala as dependências com `npm ci` e executa `npx browserstack-cypress run`. As credenciais são fornecidas ao comando pelo ambiente do GitHub Actions e não devem ser impressas nos logs. Para usar outra branch como padrão, atualize a lista de branches no workflow.

Se alguma credencial já tiver sido commitada ou compartilhada, revogue-a no BrowserStack e crie uma nova antes de continuar.

## Executar Cypress pelo GitHub Actions sem BrowserStack

O workflow `.github/workflows/cypress.yml` executa os testes com o Cypress padrão no runner Linux do GitHub Actions, sem usar BrowserStack ou credenciais externas. Ele roda em cada push e pull request direcionado à branch `main`, e também pode ser iniciado manualmente pela aba **Actions**.

O workflow instala as dependências com `npm ci`, executa todos os specs com `npx cypress run` e publica o relatório Mochawesome como artefato da execução, quando gerado. Para abrir o relatório, acesse a execução na aba **Actions** e baixe o artefato `relatorio-cypress`.
