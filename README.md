<div align="center">

# Dashboard de Logs da API

**Monitoramento visual, simples e persistente para uma API Express.**

[**Acessar o dashboard publicado**](https://projeto-express-frontend.vercel.app/)

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3-22b5bf)](https://recharts.org/)
[![License](https://img.shields.io/badge/license-private-lightgrey)](#)

</div>

## Visão geral

Este projeto é o frontend do Projeto Express. Ele consulta a API, mede o
tempo de resposta e transforma cada verificação em um registro visual para
acompanhar a saúde do serviço em tempo real.

> A API monitorada está hospedada em
> [projeto-express-backend-1.onrender.com](https://projeto-express-backend-1.onrender.com).

## O que você pode acompanhar

| Recurso | Descrição |
| --- | --- |
| Indicadores | Total de registros, uptime, latência média e última verificação |
| Latência | Gráfico com a evolução do tempo de resposta |
| Status | Distribuição entre chamadas online e offline |
| Histórico | Tabela com busca e filtro por status |
| Exportação | Download dos registros em formato CSV |
| Automação | Verificações manuais ou a cada 10, 30 ou 60 segundos |
| Persistência | Histórico salvo no `localStorage` do navegador |

## Como os registros são gerados

A API disponibiliza a rota `GET /`, que retorna uma mensagem de status e a
data/hora do servidor. O dashboard registra, no navegador:

- o horário em que a chamada foi realizada;
- a data/hora retornada pela API;
- o resultado da requisição;
- a latência medida.

O histórico é construído no lado do cliente porque o backend ainda não possui
um endpoint dedicado de logs.

## Stack

- **React 19** para a interface;
- **Vite 8** para desenvolvimento e build;
- **Recharts** para visualização de dados;
- **Oxlint** para análise estática do código.

## Começando

### Deploy

A versão publicada está disponível na Vercel:

**[https://projeto-express-frontend.vercel.app/](https://projeto-express-frontend.vercel.app/)**

O deploy é servido como uma aplicação frontend estática. Para publicar uma
nova versão na Vercel, faça o push das alterações para o repositório conectado
ao projeto.

### Pré-requisitos

- Node.js `20.19` ou superior;
- npm, instalado junto com o Node.js.

### Instalação

```bash
git clone https://github.com/GuilhermeAparecidoArruda/Projeto-express-frontend.git
cd Projeto-express-frontend
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador. Se essa
porta estiver ocupada, o Vite informará automaticamente outra porta disponível.

Para encerrar o servidor, pressione `Ctrl+C` no terminal.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run lint` | Verifica problemas de lint |
| `npm run build` | Gera o build otimizado em `dist/` |
| `npm run preview` | Executa localmente o build de produção |

## Estrutura do projeto

```text
src/
├── App.jsx                     # composição principal do dashboard
├── App.css                     # estilos da aplicação
├── index.css                   # estilos globais
├── components/                 # gráficos, tabela, indicadores e barra superior
├── hooks/                      # chamadas à API e atualização automática
└── lib/                        # configuração e cálculo das estatísticas
```

## Backend relacionado

O código da API Express está disponível no repositório
[Projeto-express-backend](https://github.com/GuilhermeAparecidoArruda/Projeto-express-backend).

## Próximas evoluções

Quando o backend disponibilizar um endpoint dedicado de logs, a origem dos
dados poderá ser alterada em `src/hooks/useApiLogger.js`. Os componentes de
indicadores, gráfico e tabela já estão desacoplados dessa implementação.
