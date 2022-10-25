# Api Catanuvem ☁️
> Projeto construído em Node JS/Express.

Api para previsão climática.

Veja a api em funcionamento aqui: https://api-catanuvem.vercel.app

imagem aqui

## Sobre

Api Catanuvem é um projeto pessoal criado a partir de um projeto hobbie que necessitava de dados sobre a condição climática. Apesar de já existir soluções de api's gratuitas para usar, decidi criar uma solução própria com os requisitos ideais para meu projeto. Na qual compreendi melhor os processos e foi de grande aprendizado.

## Features

- Response em formato JSON
- Busca por coordenadas ou nome da cidade
- Previsão do clima hoje
- Previsão do clima próximas 5 horas
- Previsão do clima próximos 5 dias

## Como utilizar?

Para usar a api de previsão climática utilize o path **/weather** em seguida informe o período da consulta:
- **/today**  para hoje
- **/hours** para próximas horas
- **/days** para próximos dias

Depois de inserir o período, informe o método de busca:
#### #Busca por coordenadas
- **/loc/:lat&:lon**

Exemplo de busca por coordenadas:
```
 https://api-catanuvem.vercel.app/weather/today/loc/-15.7801&-47.9292
```
Veja que logo após o **/loc** informamos a latitude **&**(não esqueça esse cara entre eles) longitude

#### #Busca por nome da cidade
- **/city/:name/:state**

Exemplo de busca por nome da cidade:
```
 https://api-catanuvem.vercel.app/weather/today/city/Brasília/DF
```
Veja que logo após o **/city** informamos o nome da cidade e em seguida a sigla do estado.

O resultado de nossa busca retornaria os dados do clima para **hoje** em **Brasília, Distrito Federal** parecido com esse:

```
{
  "location": "Brasília, Distrito Federal",
  "temperature": "26°",
  "condition": "Parcial. nublado",
  "icon": {
    "name": "Partly Cloudy",
    "src": "https://api-catanuvem.vercel.app/icons/Partly%20Cloudy.svg"
  },
  "precipitation": "47%",
  "thermalSensation": "27°",
  "wind": "11 km/h",
  "humidity": "53%",
  "dewPoint": "16°",
  "visibility": "9.66 km",
  "moon": "Lua nova",
  "climateVariation": {
    "max": "28°",
    "min": "18°"
  },
  "airQuality": {
    "score": "59",
    "quality": "Moderada",
    "description": "A qualidade do ar é aceitável; porém, com alguns poluentes pode haver risco de saúde moderado para um número reduzido de pessoas, que são excepcionalmente sensíveis à poluição do ar."
  },
  "sun": {
    "sunrise": "5:38",
    "sunset": "18:13"
  },
  "todayForecast": [
    {
      "period": "Manhã",
      "temperature": "24°",
      "icon": {
        "name": "Partly Cloudy",
        "src": "https://api-catanuvem.vercel.app/icons/Partly%20Cloudy.svg"
      },
      "precipitation": "--"
    },
    {
      "period": "Tarde",
      "temperature": "27°",
      "icon": {
        "name": "Scattered Thunderstorms",
        "src": "https://api-catanuvem.vercel.app/icons/Scattered%20Thunderstorms.svg"
      },
      "precipitation": "35%"
    },
    {
      "period": "Noite",
      "temperature": "22°",
      "icon": {
        "name": "Partly Cloudy Night",
        "src": "https://api-catanuvem.vercel.app/icons/Partly%20Cloudy%20Night.svg"
      },
      "precipitation": "3%"
    },
    {
      "period": "A noite",
      "temperature": "19°",
      "icon": {
        "name": "Mostly Clear Night",
        "src": "https://api-catanuvem.vercel.app/icons/Mostly%20Clear%20Night.svg"
      },
      "precipitation": "5%"
    }
  ]
}
```

**Obs: O nome da cidade passado na url deve ser inserido com espaços normalmente, caso ele conter.

✅ Certo: São Paulo

❌ Errado: SãoPaulo

## Tecnologias

Projeto foi construído com as seguintes tecnologias:

- Javascript
- Node.js
- Express
- Axios
- Cheerio
- MongoDB (Mongoose)
