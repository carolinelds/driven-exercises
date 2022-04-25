# cronometro

Crie um servidor que tenha internamente duas variáveis como abaixo:

```jsx
//...
let tempo = 0;
let idIntervalo;
//...
```

Utilize-as para criar um cronômetro com as seguintes rotas e retornos:

1. **POST** `/iniciar` que inicia um **intervalo** para incrementar `tempo` de 1 em 1 a cada segundo e retorna o texto abaixo:

```json
"Cronômetro iniciado"
```

2. **POST** `/parar` que para o **intervalo**, responde um JSON com o `tempo` atual como abaixo e reseta o `tempo` para 0.

```json
{ "tempo": 30 }
```

Utilize a porta `5000` para subir seu servidor e teste o exercício com o **ThunderClient** ou algum outro **API Client** (Postman, Insomnia, etc)
