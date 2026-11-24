# StockFlow – Grupo 08

Sistema de controle de estoque com **API REST (Java Spring Boot + H2)**, **frontend web (Angular)** e **app mobile (Expo / React Native)**, todos consumindo a mesma API.

## 👥 Integrantes

| Nome | GitHub | Responsabilidade |
|------|--------|------------------|
| Carlos | [@c4rluxo136](https://github.com/c4rluxo136) | API Spring Boot (#1, #2) |
| Emerson | [@emersonlsb](https://github.com/emersonlsb) | Frontend web Angular (#3, #4) |
| Pedro | [@pedrogeballi2](https://github.com/pedrogeballi2) | App mobile Expo (#5, #6) |

## 📁 Estrutura do repositório

```
hackathon-stockflow-grupo-08/
├── backend/           # API REST - Java 17 + Spring Boot + H2
├── frontend-web/      # Angular
└── frontend-mobile/   # Expo (React Native)
```

## 🌐 URL da API

```
http://localhost:8080/api/produtos
```

Console do banco H2: http://localhost:8080/h2-console
(JDBC URL: `jdbc:h2:mem:stockflow`, usuário `sa`, senha em branco)

## ▶️ Como rodar

> Ordem recomendada: **1) backend**, depois **2) web** e **3) mobile**.

### 1. Backend (API)

Pré-requisito: Java 17 ou superior.

```bash
cd backend
mvnw spring-boot:run        # cmd do Windows
./mvnw spring-boot:run      # PowerShell / Linux / Mac
```

A API sobe na porta **8080**. O CORS está liberado para o Angular e o Expo.

### 2. Frontend web (Angular)

```bash
cd frontend-web
npm install
npx ng serve
```

Abra http://localhost:4200

### 3. Frontend mobile (Expo)

```bash
cd frontend-mobile
npm install
npx expo start          # celular: leia o QR Code com o Expo Go
npx expo start --web    # roda no navegador do PC
```

## 📱 Configurando o IP do PC para o celular

No celular, `localhost` aponta para o próprio celular. Por isso o app precisa do **IP do computador** que roda a API.

1. No PC, abra o **cmd** e digite `ipconfig`.
2. Copie o **Endereço IPv4** (ex.: `192.168.0.15`).
3. Em `frontend-mobile/src/config/api.js`, troque o valor de `IP_DO_PC`:
   ```js
   const IP_DO_PC = '192.168.0.15';
   ```
4. PC e celular precisam estar **na mesma rede Wi-Fi**.

No navegador (`npx expo start --web`), o app usa `localhost` e não precisa dessa troca.

## 🔗 Endpoints

| Método | Rota | Descrição | Respostas |
|--------|------|-----------|-----------|
| GET | `/api/produtos` | Lista os produtos | 200 |
| GET | `/api/produtos/{id}` | Busca um produto | 200, 404 |
| POST | `/api/produtos` | Cadastra um produto | 201, 400 |
| PUT | `/api/produtos/{id}` | Atualiza um produto | 200, 400, 404 |
| DELETE | `/api/produtos/{id}` | Exclui um produto | 204, 404 |
| PATCH | `/api/produtos/{id}/movimentacao` | Entrada ou saída de estoque | 200, 400, 404 |

**Movimentação (JSON):**
```json
{ "tipo": "SAIDA", "quantidade": 8 }
```
Uma saída maior que o saldo retorna **400** (estoque insuficiente).

## 🎬 Roteiro da demonstração

1. **Angular:** cadastrar o **Caderno** com quantidade **10** e estoque mínimo **3**.
2. **Expo:** abrir o Caderno nos detalhes.
3. **Expo:** registrar **saída de 8**. O saldo vai para **2**.
4. **Angular:** atualizar a página e mostrar o saldo **2** com **estoque baixo**.
5. **Expo:** tentar **saída de 3**. A API recusa por estoque insuficiente.
