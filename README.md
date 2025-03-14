## Tecnologías

- **React 18**
- **Next.js 14**
- **TypeScript**
- **TanStack Query**
- **ShadCN**

## Rutas

**Users**
- /users
- /users/:id

**Posts**
- /posts
- /posts/:id
- /posts/:id/comments

## Cómo inicializar el proyecto

Para ejecutar el proyecto de manera local, seguir los pasos:

1. Clonar el repositorio:
```bash
git clone <URL_REPOSITORIO>
```

2. Acceder al directorio del proyecto a través de la terminal:
```bash
cd nombre-del-proyecto
```

3. Instalar las dependencias necesarias:
```bash
npm install
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Acceder al proyecto en su navegador de preferencia a través de la URL: http://localhost:3000

## Desiciones arquitectónicas del proyecto

Se utilizaron Server Components para realizar las llamadas a la API de JSONPlaceholder, mejorando el rendimiento y el SEO al renderizar los datos en el servidor.

Para manejar el estado y la actualización eficiente de datos, se implementó TanStack Query en Client Components, permitiendo el cacheo automático de datos y evitando recargas innecesarias de la API.

En la carpeta /app, se establecieron las rutas /users y /posts cuyos correspondientes archivos page.tsx se definieron como Server Components. Los Client Components se centralizaron en la carpeta /components, a la misma altura de la carpeta /app.