# Passo a passo do Pedro (Expo, Issues #5 e #6)

1. No PC do laboratório, logado no GitHub com a conta **pedrogeballi2**:
   ```
   git clone https://github.com/c4rluxo136/hackathon-stockflow-grupo-08.git
   cd hackathon-stockflow-grupo-08
   git checkout main
   git pull
   git checkout -b feat/expo-movimentacao
   ```
2. Extraia o zip **dentro** da pasta do repo (deve ficar `hackathon-stockflow-grupo-08/frontend-mobile/`).
3. Instale e teste (a API do Carlos precisa estar rodando na porta 8080):
   ```
   cd frontend-mobile
   npm install
   npx expo start --web
   ```
   Abre no navegador. No celular (Expo Go), troque `IP_DO_PC` em `src/config/api.js` pelo IP do PC (`ipconfig`).
4. Commits (dentro de `frontend-mobile`):
   ```
   git add package.json package-lock.json app.json index.js App.js .gitignore assets
   git commit -m "🎉 chore: cria projeto Expo do app mobile (#5)"

   git add src/config src/services src/components src/screens/ListaProdutosScreen.js
   git commit -m "✨ feat: tela de lista de produtos com saldo e alerta de estoque baixo (#5)"

   git add src/screens/DetalhesProdutoScreen.js
   git commit -m "✨ feat: tela de detalhes e movimentação de entrada/saída (#5, #6)"

   git push -u origin feat/expo-movimentacao
   ```
5. No GitHub, abra o Pull Request de `feat/expo-movimentacao` para `main`:
   - **Título:** `✨ feat: app Expo com lista, detalhes e movimentação de estoque`
   - **Descrição:**
     ```
     ## O que foi feito
     - Projeto Expo em frontend-mobile/ (roda no celular e no navegador com `npx expo start --web`)
     - Tela de lista de produtos com saldo, estoque mínimo e alerta de estoque baixo
     - Tela de detalhes com saldo atual e estoque mínimo, navegação entre as telas
     - Registro de ENTRADA e SAÍDA via PATCH /api/produtos/{id}/movimentacao
     - Mostra a mensagem de erro da API quando a saída é maior que o saldo

     ## Como testar
     1. Rode a API (backend) na porta 8080 e cadastre um produto (ex.: Caderno, quantidade 10)
     2. `cd frontend-mobile && npm install && npx expo start --web`
     3. Abra o Caderno, faça saída de 8 (saldo vai para 2), depois saída de 3: aparece "Estoque insuficiente"

     Closes #5
     Closes #6
     ```
   - Em **Reviewers**, escolha **c4rluxo136** (Carlos) ou **emersonlsb** (Emerson).
6. No board, mova as Issues #5 e #6 para **Concluído** depois do merge.
