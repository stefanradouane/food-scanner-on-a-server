# Food Specialist On A Server

<!-- Image O.I.D -->

Gemaakt door Stefan Radouane

Minor Web design and Development - 2022/2023

De demo is te bekijken via deze [link](http://localhost:4000).

## Inhoudsopgave

- [Over dit project](#ℹ️-over-dit-project)
- [Project installatie](#📥-project-installatie)
- [Criteria](#criteria)

## ℹ️ Over dit project

Dit project is gemaakt voor het vak Progressive Web Apps. De code van het project is gebasseerd op de code van [Food Specialist](https://github.com/stefanradouane/food-specialist). Het is nu alleen de bedoeling geweest om de app nu te verplaatsen naar een Node.js server. De app moet dezelfde functionaliteiten hebben, alleen moet de app nu server-side gerendered worden in plaats van volledig client-side. Het uiteindelijke doel hiervan is de performance van de website omhoog halen en de tijdsduur van het critical rendering path verlagen.

## 📥 Project installatie

Om dit project lokaal te runnen is moet je de volgende stappen achter elkaar uitvoeren in de terminal.

1. Clone repository met `git clone <repo-url>`
2. Navigeer naar de juiste map `cd food-specialist-on-a-server`
3. Installeer dependencies met `npm install`
4. Bouw de bestanden en start de server met `npm run start`

### 🚧 Onderhoud

Om dit project te kunnen onderhouden is het de bedoeling dat je de bestanden opnieuw bouwt met het volgende command `npm run build`.

Je moet de bestanden opnieuw bouwen om ervoor te zorgen dat de bestaande cache van de service-worker wordt geleegt.

## 🧠 Server-side rendering

Uitleg wat server side rendering is.

## 👷 Service worker

Uitleg wat een service worker is.

## 🚑 Critical render path

uitleg wat de critical render path is.

### Runtime

Uitleg wat runtime is

Ik zorg ervoor dat de critical rendering path verbeterd op de runtime door de volgende dingen toe te passen in mijn PWA.

1. Caching
2. Minifying files
3. Convert images to webp

#### Caching

Uitleg hoe ik cache on the runtime.

### Percieved performance

Uitleg wat is percieved performance

Ik zorg ervoor dat de critical rendering path verbeterd door percieved performance de volgende dingen toe te passen in mijn PWA.

#### View Transition API

Uitleg van de view transition api en hoe deze ervoor zorgt dat de percieved performance omhoog gaat

## Criteria

    Project Your app is published and can be accessed using the browser. Your project is thoroughly documented in the README.md file in your repository. Included are an explanation of client- server rendering, an activity diagram including the Service Worker and a list of enhancements to optimize the critical render path implemented your app.

>

    Serverside rendering You’ve implemented serverside rendering and have articulated how it works and why you should want it.

>

    Service Worker You’ve implemented a usefull Service Worker and show it’s working in an activity diagram.

>

    Critical render path You’ve enhanced the critical render path for a better runtime or percieved performance in multiple ways and have described how you managed to do this.
