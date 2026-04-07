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

- [ ] SRP — Separação de responsabilidades
- [ ] OCP — Extensibilidade sem modificação
- [ ] DIP — Inversão de dependência
- [ ] Padronização de respostas da API

---

## 🛠️ Tecnologias

- Node.js
- TypeScript
- Express

---

## 📚 Contexto

Este projeto faz parte de um estudo prático de arquitetura de software, com foco em evolução de código e boas práticas.
