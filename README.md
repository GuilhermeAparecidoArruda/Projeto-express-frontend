# Dashboard de Logs

Frontend desenvolvido com React e Vite para acompanhar a disponibilidade da
API Express do projeto.

- API monitorada: [projeto-express-backend-1.onrender.com](https://projeto-express-backend-1.onrender.com)
- Backend: [Projeto-express-backend](https://github.com/GuilhermeAparecidoArruda/Projeto-express-backend)

## Como funciona

A API possui a rota `GET /`, que retorna uma mensagem de status e a data/hora
do servidor. A cada consulta, o dashboard cria um registro local contendo:

- horário da chamada feita pelo navegador;
- data/hora retornada pela API;
- status da requisição;
- latência medida.

Os registros são armazenados no `localStorage` e permanecem disponíveis após
recarregar a página.

## Funcionalidades

- Indicadores de total de registros, uptime, latência média e último registro.
- Gráfico de latência ao longo do tempo.
- Distribuição de chamadas online e offline.
- Busca e filtro por status na tabela de logs.
- Exportação dos registros em CSV.
- Registro manual ou automático a cada 10, 30 ou 60 segundos.
- Limpeza do histórico local.

## Tecnologias

- React 19
- Vite 8
- Recharts
- Oxlint

## Pré-requisitos

- Node.js 20.19 ou superior;
- npm instalado com o Node.js.

## Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/GuilhermeAparecidoArruda/Projeto-express-frontend.git
cd Projeto-express-frontend
```

Instale as dependências:

```bash
npm install
```

## Desenvolvimento

Inicie o servidor local:

```bash
npm run dev
```

Depois, acesse [http://localhost:5173](http://localhost:5173). Para encerrar
o servidor, pressione `Ctrl+C` no terminal.

Se a porta `5173` estiver ocupada, o Vite informará outra porta disponível.

## Validação e produção

Verifique o código com o lint:

```bash
npm run lint
```

Gere a versão de produção:

```bash
npm run build
```

Visualize o build localmente:

```bash
npm run preview
```

## Estrutura principal

```text
src/
├── App.jsx                     # layout principal
├── App.css                     # estilos do dashboard
├── index.css                   # estilos globais
├── components/                 # componentes visuais
├── hooks/                      # logs e atualização automática
└── lib/                        # configuração e estatísticas
```

## Próximos passos

Caso o backend passe a oferecer um endpoint dedicado de logs, a lógica de
`src/hooks/useApiLogger.js` poderá ser adaptada para consumir esses dados. Os
componentes de indicadores, gráfico e tabela já estão separados dessa origem.
