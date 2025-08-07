# Mail-Box 📮

> **Enterprise Angular Template** - Un cascarón arquitectural escalable y reutilizable para proyectos Angular modernos

Este proyecto es un **template base** diseñado para ser reutilizado como punto de partida en múltiples proyectos empresariales. No es una aplicación funcional por sí misma, sino una **arquitectura sólida** con las mejores prácticas implementadas.

## 🚀 Características Principales

- **Angular 20** con standalone components
- **Signals** para manejo de estado reactivo
- **Arquitectura modular** (Core/Shared/Pages)
- **Backend fake** con Express.js para desarrollo
- **HTTP Interceptors** completos (auth, loading, errors)
- **SCSS organizado** con metodología ITCSS
- **TypeScript** con tipado fuerte
- **Path aliases** configurados
- **Lazy loading** implementado
- **Testing setup** con Karma/Jasmine

## 🏗️ Arquitectura del Proyecto

### Frontend Structure
```
src/app/
├── core/                   # 🔧 LÓGICA DE NEGOCIO Y SINGLETON
│   ├── guards/            # Guards de protección (auth, roles, permisos)
│   ├── interceptors/      # HTTP interceptors globales
│   └── services/          # Servicios singleton con estado de aplicación
├── pages/                  # 📄 Páginas/rutas principales de la aplicación
│   └── [feature]/         # Cada feature como módulo independiente
├── shared/                 # 🔄 RECURSOS REUTILIZABLES SIN LÓGICA DE NEGOCIO
│   ├── components/        # Componentes UI puros y reutilizables
│   ├── constants/         # Constantes y configuraciones
│   ├── directives/        # Directivas genéricas
│   ├── enums/            # Enumeraciones y tipos auxiliares
│   ├── models/           # Interfaces y tipos de datos
│   ├── pipes/            # Pipes de transformación de datos
│   ├── services/         # Servicios auxiliares sin estado
│   └── utils/            # Funciones puras y helpers
```

#### 🎯 **Core vs Shared - Diferencias Clave**

**📍 CORE** - *Lógica de Negocio y Estado Global*
- **Servicios con Estado**: Mantienen datos globales de la aplicación
- **Lógica de Negocio**: Reglas específicas del dominio y flujos complejos
- **Singleton**: Una sola instancia por aplicación (`providedIn: 'root'`)
- **Guards e Interceptors**: Protección y procesamiento automático
- **Gestión de Datos**: APIs, autenticación, configuración global
- **Efectos Secundarios**: Pueden modificar el estado de la aplicación

**📍 SHARED** - *Recursos Reutilizables y Funciones Puras*
- **Servicios de Utilidades**: Solo funciones reutilizables sin estado
- **Componentes UI**: Presentacionales sin lógica de negocio
- **Funciones Puras**: Sin efectos secundarios, misma entrada = misma salida
- **Tipos y Modelos**: Definiciones de datos compartidas
- **Pipes y Directivas**: Transformaciones genéricas
- **Helpers y Utils**: Funciones auxiliares reutilizables en cualquier contexto

### Backend Structure (Fake API)
```
api/
├── controllers/           # 🎮 Lógica de los endpoints
├── mocks/                # 📊 Datos simulados para desarrollo
├── routes/               # 🛣️ Definición de rutas
├── public/               # 📁 Archivos estáticos
├── config.js             # ⚙️ Configuración del servidor
└── index.js              # 🚀 Punto de entrada del servidor
```

### Styles Architecture (SCSS)
```
src/styles/
├── _imports.scss         # 📥 Imports comunes (variables, mixins)
├── app.scss             # 🎨 Punto de entrada principal
├── base/                # 🏗️ Estilos base y fundacionales
│   ├── _normalize.scss   # Reset CSS
│   ├── _variables.scss   # Variables globales
│   └── _globals.scss     # Estilos globales
├── ui/                  # 🧩 Componentes de interfaz
│   ├── _grid.scss       # Sistema de grid
│   ├── _icons.scss      # Iconografía
│   ├── _layouts.scss    # Layouts principales
│   └── _texts.scss      # Tipografía
└── utils/               # 🛠️ Utilidades y herramientas
    ├── _functions.scss   # Funciones SCSS
    └── _mixins.scss     # Mixins reutilizables
```

## 🛠️ Configuración y Desarrollo

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Angular CLI 20+

### Instalación y Ejecución
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (frontend + backend fake)
npm start

# Solo frontend
ng serve

# Solo backend fake
npm run api

# Tests
npm test

# Build para producción
npm run build
```

### URLs de Desarrollo
- **Frontend**: http://localhost:4200
- **Backend Fake**: http://localhost:4000
- **API Endpoints**: http://localhost:4000/api

## 🎯 Funcionalidades del Template

### ✅ Sistema de Autenticación Base
- Estructura para login/logout
- Manejo de tokens JWT
- Refresh token automático
- Guards de protección de rutas
- Interceptor de autenticación

### ✅ Gestión de Estado
- Signals para reactividad
- Servicios singleton para estado global
- Loading states centralizados
- Patrón de estado inmutable

### ✅ Componentes UI Base
- Layout principal (header/footer)
- Sistema de modals genérico
- Loader global configurable
- Manejo de errores con notificaciones

### ✅ Utilidades y Helpers
- Form utilities y validaciones genéricas
- Date utilities
- Error message pipes
- Promise utilities
- Delay utilities para desarrollo

### ✅ Configuración Multi-entorno
- Development, Testing, Production
- Variables de entorno por ambiente
- Build configurations optimizadas

## 📋 Convenciones y Estándares

### Nomenclatura
- **Archivos**: kebab-case (`my-component.ts`)
- **Clases**: PascalCase (`MyComponent`)
- **Variables/métodos**: camelCase (`myVariable`)
- **Constantes**: SCREAMING_SNAKE_CASE (`MY_CONSTANT`)

### Estructura de Archivos
```
feature-name/
├── feature-name.component.html
├── feature-name.component.scss
├── feature-name.component.ts
└── feature-name.component.spec.ts
```

### Path Aliases Configurados
```typescript
// 🔧 CORE - Servicios con lógica de negocio y estado
import { AuthService } from '@core/services/auth.service';        // Maneja autenticación y estado del usuario
import { DataService } from '@core/services/data.service';        // Gestión de datos de la aplicación
import { ConfigService } from '@core/services/config.service';    // Configuración global singleton

// 🔄 SHARED - Servicios con funciones reutilizables (sin estado)
import { FormService } from '@shared/services/form.service';      // Utilidades para formularios
import { ValidationService } from '@shared/services/validation.service'; // Validadores reutilizables
import { HttpUtilsService } from '@shared/services/http-utils.service';   // Helpers para HTTP

// 🧩 SHARED - Componentes reutilizables (sin lógica de negocio)
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ButtonComponent } from '@shared/components/button/button.component';

// 🛠️ SHARED - Utilidades puras (funciones sin efectos secundarios)
import { dateUtils } from '@shared/utils/dates.utils';
import { stringUtils } from '@shared/utils/string.utils';
```

## 🚀 Cómo Usar Este Template

### 1. Clonar y Personalizar
```bash
git clone [repo-url] my-new-project
cd my-new-project
# Cambiar nombre del proyecto en package.json y angular.json
```

### 2. Configurar Entornos
- Actualizar `src/environments/` con tus URLs de API
- Modificar `api/config.js` según necesidades

### 3. Personalizar para tu Proyecto
- Actualizar estilos en `src/styles/base/_variables.scss`
- Cambiar assets (logo, favicon) en `src/assets/`
- Modificar layout base en componentes shared
- Adaptar la estructura de páginas según tu dominio

### 4. Añadir Nuevas Features
```bash
# Generar nueva página/feature
ng generate component pages/feature-name --standalone

# Generar servicio de negocio (Core)
ng generate service core/services/feature-service

# Generar componente reutilizable (Shared)
ng generate component shared/components/ui-component --standalone

# Generar utilidad pura (Shared)
# Crear manualmente en shared/utils/feature.utils.ts
```

#### 📝 **Guía de Decisión: ¿Core o Shared?**

**➡️ Usar CORE cuando:**
- El servicio mantiene estado de aplicación
- Implementa lógica de negocio específica
- Necesita ser singleton
- Maneja autenticación, permisos, configuración global

**➡️ Usar SHARED cuando:**
- El componente es puramente presentacional
- La utilidad no tiene efectos secundarios
- Se puede reutilizar en múltiples contextos
- No depende de lógica de negocio específica

## 🧪 Testing Strategy

### Unit Tests
```bash
npm test                    # Ejecutar tests
npm run test:watch         # Modo watch
npm run test:coverage      # Con coverage
```

### Estructura de Tests
- **Componentes**: `*.component.spec.ts`
- **Servicios**: `*.service.spec.ts`
- **Pipes**: `*.pipe.spec.ts`
- **Guards**: `*.guard.spec.ts`

## 📦 Dependencias Principales

### Frontend
- **@angular/core**: Framework principal
- **@ngneat/cashew**: HTTP caching
- **ngx-toastr**: Notificaciones toast
- **date-fns**: Utilidades de fechas
- **lodash**: Utilidades de JavaScript

### Development
- **concurrently**: Ejecutar frontend + backend
- **express**: Backend fake
- **prettier**: Formateo de código
- **eslint**: Linting

## 🔮 Roadmap y Extensiones

### Próximas Mejoras
- [ ] Implementar NgRx para estado complejo
- [ ] Añadir componente de tabla reutilizable
- [ ] Sistema de permisos granular
- [ ] PWA configuration
- [ ] Docker setup
- [ ] CI/CD pipelines

### Extensiones Sugeridas
- **Internacionalización**: Angular i18n
- **UI Library**: Angular Material o PrimeNG
- **Charts**: Chart.js o D3.js
- **Maps**: Leaflet o Google Maps
- **Rich Text**: Quill o TinyMCE

## 🤝 Contribución

Este template está diseñado para ser:
- **Forkeable**: Crear nuevos proyectos basados en esta estructura
- **Extensible**: Añadir nuevas features manteniendo la arquitectura
- **Mantenible**: Código limpio y bien documentado
- **Escalable**: Preparado para equipos grandes

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

---

**¿Dudas o sugerencias?** Este template está en constante evolución. ¡Contribuye para mejorarlo! 🚀
