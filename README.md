# Frontend de Coin Collector App

Este es el frontend de la aplicación Coin Collector, que permite a los usuarios explorar habitaciones y recolectar monedas únicas en espacios generados aleatoriamente.
Cuando se colecten todas las monedas, el programa volverá a generar aleatoriamente monedas en el espacio luego de una hora.

## Tecnologías Utilizadas

- Vue.js
- Vuex
- Vue Router
- Socket.IO Client

## Características

- Exploración de habitaciones
- Recolectar monedas en tiempo real
- Interfaz de usuario intuitiva

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/agustinboasso/legendaryum-frontend
   ```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

#### Configuración


## Asegúrate de configurar la URL del servidor Socket.IO en el archivo de configuración si es necesario.

- // En el archivo de configuración

const socket = io('http://localhost:3000');

##### Estructura del Proyecto

.
├── src/ # Código fuente del frontend
│ ├── components/ # Componentes reutilizables
│ ├── views/ # Vistas principales
│ ├── store/ # Estado global (Vuex)
│ ├── router/ # Configuración de las rutas (Vue Router)
│ ├── assets/ # Recursos estáticos
│ └── App.vue # Componente principal
├── public/ # Archivos públicos
├── package.json
├── README.md # Este archivo
└── ...
