# backend-nodejs-mongodb-hbp

## Nodepop

Este repositorio contiene 'nodepop' una aplicación web Node.js la cual se inspira en funcionalidades del portal web de venta de productos de segunda mano referencia, WallaPop.

## Requerimientos cumplidos

Se han completado todos los requerimientos obligatorios de una manera consciente y acorde a lo visto en clase. Se ha pretendido ser fiel en todo momento en cuánto a estructuras, estilo de programación y principios de diseño con respecto a los códigos realizados en las últimas semanas.

Estos requerimientos obligatorios completados han sido:

- [x] Listado de productos
- [x] Vista de producto
- [x] Creación de productos
- [x] Borrado de productos
- [x] Gestión de usuarios

así como las implicaciones de cada una de las funcionalidades.

En cuánto a los requerimientos opcionales (filtrado de productos - paginación) no ha sido posible su implementación por el momento, se ha dado prioridad a desarrollar un frontend agradable.

Sin duda en un futuro próximo, seguiré desarrollando este proyecto tan interesante y con posibilidad para seguir desarrollando mis conocimientos con Node.js

## Instrucciones de uso

Los pasos para probar la app en funcionamiento son los siguientes (probado en sistema Linux. Es posible que en Windows no sea exactamente igual)

1. 	`git clone https://github.com/kc-proyects/backend-nodejs-mongodb-hbp`
2. 	`cd backend-nodejs-mongodb-hbp`
3. 	`cd nodeapp`
4. 	`npm i`
5. 	`systemctl start mongodb` Poner en marcha el proceso de MongoDB para que el siguiente script se ejecute con éxito.
6. 	`npm run initDB`
7. 	`npm run dev`
8. 	Acceder mediante un navegador a http://localhost:3001

También se puede arrancar la aplicación con `npm run start` pero para esta primera beta me gistaría que todo el que pruebe la app sea con todos los logs disponibles y que así sea más fácil detectar errores y planificar mejoras.

