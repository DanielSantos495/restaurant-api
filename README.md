# Restaurant
   Api para menú de restaurante con CRUD de productos, con registro e inicio de sesión de usuario admin para gestionar los productos en la carta del menú. **Solo lo métodos GET de productos pueden ser accedidos por cualquiera, los demás deberán tener autorización**

   Documentación completa:
      [Documentación Api Restaurant](http://localhost:3001/api-docs/)

## Formato de carpetas

   components/
      controller: llamamos los métodos de la BD
      route: métodos http
   routes/
      enrutador de la app //Patrón de inversión de control
   store/
      conexión a la BD
   index.js - entry de la app, donde levantamos el server

## Tecnologías

   Frontend:
      - NextJs
      - Babel
      - Styled Components
      [Repostitorio](https://github.com/DanielSantos495/restaurant)

   Backend:
      - NodeJs
      - Express
      - JWT
      - Mongo

## Licencia
   Restaurant API se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).
