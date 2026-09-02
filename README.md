# Dashboard de logs

Dashboard frontend desenvolvido com React e Vite para acompanhar as
verificações de disponibilidade da API Express .

Dashboard em React (Vite) para acompanhar, em forma de log, as verificações
feitas na API Express hospedada em
[`projeto-express-backend-1.onrender.com`](https://projeto-express-backend-1.onrender.com)
([repositório do backend](https://github.com/GuilhermeAparecidoArruda/Projeto-express-backend)).

## Sobre os "logs"

A API expõe uma única rota, `GET /`, que devolve a data/hora do servidor e uma
mensagem de status — não existe um endpoint de logs dedicado. Este dashboard
constrói o histórico do lado do cliente: cada vez que o front consulta a API,
essa verificação vira uma linha de log, com:

- horário em que o cliente fez a chamada
- data/hora que a própria API devolveu no corpo da resposta
- se a chamada teve sucesso ou falhou
- a latência da chamada

Os registros ficam salvos no `localStorage` do navegador, então continuam lá
se você recarregar a página.

## Funcionalidades

- KPIs no topo: total de registros, uptime, latência média, último registro
- Gráfico de latência ao longo do tempo (recharts)
- Distribuição online x offline
- Tabela de registros com busca e filtro por status
- Exportação dos logs em CSV
- Registro manual ("Novo registro") ou automático (10s / 30s / 60s)
- Botão para limpar o histórico

## Estrutura

```
src/
├─ App.jsx                     # monta o layout do dashboard
├─ App.css                     # estilos do dashboard
├─ index.css                   # estilos globais / fontes
├─ hooks/
│  ├─ useApiLogger.js          # ping na API, geração e persistência dos logs
│  └─ useAutoRefresh.js        # registro automático em intervalo configurável
├─ components/
│  ├─ Topbar.jsx                # título, status ao vivo, ações (registrar/exportar/limpar)
│  ├─ StatsRow.jsx              # cartões de KPI
│  ├─ LatencyChart.jsx          # gráfico de latência (recharts)
│  ├─ StatusBreakdown.jsx       # barra online x offline
│  └─ LogTable.jsx              # tabela com busca e filtro
└─ lib/
   ├─ config.js                 # URL da API e constantes
   └─ stats.js                  # cálculo de métricas, dados do gráfico e CSV
```

## Pré-requisitos

- Node.js 20.19 ou superior
- npm instalado com o Node.js

## Instalação e execução

No terminal, dentro da pasta do projeto:

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador. O servidor permanece ativo enquanto
o comando `npm run dev` estiver rodando; para encerrá-lo, pressione `Ctrl+C`.

Se a porta `5173` já estiver ocupada, o Vite exibirá outra porta disponível no
terminal. Use o endereço informado pelo Vite.

## Build de produção

```bash
npm run build
npm run preview
```

O comando `npm run build` gera a versão otimizada em `dist/`. Para conferir
erros de lint, execute:

```bash
npm run lint
```

## Extensão futura

Se o backend ganhar um endpoint de logs de verdade (ex.: `GET /logs`), basta
trocar a lógica de `useApiLogger.js` para consumir esse endpoint em vez de
gerar os registros a partir dos pings — o restante do dashboard (gráfico,
tabela, KPIs) já está desacoplado dessa fonte de dados.
