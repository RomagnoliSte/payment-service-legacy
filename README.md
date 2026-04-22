# 💳 Payment Service (Estudo de SOLID)

## 📌 Objetivo

Este projeto foi criado com o objetivo de estudar os princípios SOLID na prática.

A primeira versão foi desenvolvida propositalmente sem aplicar boas práticas de arquitetura, com foco em identificar problemas comuns em código acoplado.

---

## ⚙️ Funcionalidades

- Criar pagamentos (PIX, Cartão, Boleto)
- Listar pagamentos
- Validação básica de dados
- Simulação de processamento

---

## 🧱 Estrutura atual

Nesta versão inicial:

- Existe uma única classe (`PaymentService`) responsável por:
  - validação
  - processamento
  - cálculo de taxas
  - persistência
  - logs
  - notificações

---

## ⚠️ Problemas identificados

Esta versão apresenta diversas limitações:

- Violação do princípio **SRP (Single Responsibility Principle)**
- Uso de múltiplos `if/else` para controle de fluxo
- Alto acoplamento
- Baixa escalabilidade
- Difícil manutenção e testabilidade

---

## 🚀 Próximos passos

Este projeto será refatorado progressivamente aplicando os princípios SOLID:

- [✅] SRP — Separação de responsabilidades
- [✅] OCP — Extensibilidade sem modificação
- [✅] DIP — Inversão de dependência
- [✅] Padronização de respostas da API

---

## 🛠️ Tecnologias

- Node.js
- TypeScript
- Express

---

## 📚 Contexto

Este projeto faz parte de um estudo prático de arquitetura de software, com foco em evolução de código e boas práticas.

## Etapa 1 — Refatoração com SRP

Nesta etapa, o projeto foi refatorado com foco no princípio da Responsabilidade Única (SRP).

### Alterações realizadas

- Extração da validação para `PaymentValidatorService`
- Extração do cálculo de taxas para `PaymentFeeCalculatorService`
- Extração da persistência para `PaymentRepository`

### Benefícios

- Melhor separação de responsabilidades
- Código mais legível
- Base mais preparada para novas refatorações

## Etapa 2 — Refatoração com OCP

Nesta etapa, o projeto foi evoluído com foco no princípio Open/Closed.

### Alterações realizadas

- Criação de estratégias específicas para cada método de pagamento
- Separação da lógica de processamento por tipo
- Redução do acoplamento dentro do `PaymentService`

### Benefícios

- Código mais extensível
- Regras de cada pagamento isoladas
- Menor impacto para adicionar novos métodos

## Etapa 3 — Refatoração com DIP

Nesta etapa, o projeto foi refatorado com foco no princípio da Inversão de Dependência.

### Alterações realizadas

- Criação de contratos para repositório, validação e cálculo de taxa
- Injeção de dependências no `PaymentService`
- Remoção de dependências concretas dentro do serviço principal

### Benefícios

- Menor acoplamento
- Maior flexibilidade para troca de implementações
- Código mais testável
- Arquitetura mais próxima de cenários reais

## Etapa 4 — Padronização das respostas da API

Nesta etapa, a API passou a responder com um formato padronizado para sucesso e erro.

### Alterações realizadas

- Criação da classe `AppError` para erros de negócio
- Criação de helpers para respostas de sucesso e erro
- Ajuste dos controllers para padronização de retorno

### Benefícios

- Respostas mais consistentes
- Melhor experiência para consumo da API
- Separação mais clara entre regra de negócio e camada HTTP
