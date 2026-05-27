# CineSol Cinema - Frontend (PS 2026.1)

Aplicacao desenvolvida como Trainee do Processo Seletivo 2026.1 (PS 2026.1) para novos membros da Loading Jr.

## Trainees

1. Antonio Breno Oliveira Magalhaes
2. Joao Pedro Aragao Regino Tabosa

## Sobre o projeto

O objetivo deste projeto e desenvolver, em ambiente web, a aplicacao do **CineSol Cinema**, sistema digital de bilheteria e bomboniere.

A proposta busca simular um ciclo real de desenvolvimento frontend moderno, com foco em entregar um produto polido utilizando **Next.js** como tecnologia principal.

## Design (Figma)

Link do prototipo:

https://www.figma.com/design/wACGXjewuSWZQ74bWN4xqr/PS-Loading?node-id=22-2&p=f&t=SSHySPv8FgGEGOkZ-0

> OBS: Sintam-se a vontade para atualizar o design do website :)

## Stack principal (sugerida)

- **Next.js com TypeScript**: base da aplicação, com App Router e tipagem estática.
- **Tailwind CSS**: estilzacao utility-first para agilidade e consistencia visual.
- **React Hook Form**: gerenciamento de formularios com boa performance.
- **Zod**: validacao de dados integrada ao TypeScript.
- **TanStack Query (React Query)**: gestao de estado do servidor, cache e sincronizacao de dados.
- **Axios / Fetch API**: comunicacao com backend.

> Observacao: a stack acima e um norte inicial. O time pode propor outras tecnologias com bom embasamento tecnico.

## Arquitetura sugerida

Padrao: **Component-Based + Custom Hooks**

- **Components / UI**: elementos visuais reutilizaveis e passivos.
- **Pages (App Router)**: composicao de layout e estrutura por rota.
- **Hooks**: regras de negocio, estado e integracao com API.

## Escopo de desenvolvimento

### Paginas

1. Filme (Homepage)
2. Combos (estatica)
3. Precos (estatica)
4. Visualizacao detalhada do filme
5. Registro
6. Login
7. Escolha de poltronas (com modal 1)
8. Combos (fluxo de compra)
9. Confirmacao de compra (com modais 2 e 3)

### Modais

1. Escolha entre Login ou Registro
2. Forma de pagamento (debito, credito ou pix)
3. Compra confirmada

## Objetivo final

Entregar uma aplicacao frontend escalavel, organizada e com boa experiencia de usuario, refletindo um fluxo de compra real no contexto do CineSol Cinema.
