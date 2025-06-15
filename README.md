# Aplicación de Usuarios - React Native

Esta es una aplicación móvil desarrollada en React Native que muestra una lista de usuarios y sus detalles, consumiendo la API de JSONPlaceholder.

## Características

- Lista de usuarios con búsqueda en tiempo real
- Detalles del usuario
- Navegación entre pantallas
- Manejo de estado global con Redux
- Estilos con Tailwind CSS
- Pruebas unitarias con Jest y React Testing Library
- Manejo de errores y estados de carga
- Soporte para modo oscuro

## Tecnologías Utilizadas

- React Native con TypeScript
- Redux Toolkit para el manejo del estado
- React Navigation para la navegación
- Tailwind CSS para los estilos
- Jest y React Testing Library para pruebas
- JSONPlaceholder API para datos de usuarios

## Estructura del Proyecto

```
src/
  ├── models/         # Interfaces y tipos
  ├── services/       # Servicios y llamadas a API
  ├── store/          # Configuración de Redux
  ├── views/          # Componentes de vista
  ├── navigation/     # Configuración de navegación
  └── __tests__/      # Pruebas unitarias
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npx expo start
   ```

## Pruebas

Para ejecutar las pruebas:
```bash
npm test
```

## Consideraciones sobre Expo vs React Native CLI

### Cuándo usar Expo:
- Proyectos rápidos y prototipos
- Aplicaciones que no requieren módulos nativos personalizados
- Equipos pequeños o desarrolladores individuales
- Cuando se necesita un proceso de desarrollo más rápido

### Cuándo usar React Native CLI:
- Proyectos que requieren módulos nativos personalizados
- Aplicaciones que necesitan acceso a características específicas del dispositivo
- Proyectos empresariales con requisitos específicos
- Cuando se necesita más control sobre la configuración nativa


