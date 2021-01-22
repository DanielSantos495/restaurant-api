components/
   controller: llamamos los métodos de la BD
   route: métodos http
routes/
   enrutador de la app //Patrón de inversión de control
store/
   conexión a la BD
index.js - entry de la app, donde levantamos el server

# Restaurant

Una app para gestionar el menú de un restaurante:
   - Tiene el dominio: www.ejemplomenu.com para el usuario final (comensal)
   - Tiene dominio: www.ejemplomenu.com/admin/login:
      - Nos permite agregar, editar y eliminar productos del menú
      - Hay una cuenta administrador:
      Nombre de usuario: Admin
      Contraseña: 123456

      Puedes entrar y probar

## Tecnologías

Frontend:
   - NextJs
   - Babel
   - Styled Components

Backend:
   - NodeJs
   - Express
   - JWT
   - Mongo
