Aquí tienes un **README.md** detallado para el proyecto basado en la prueba técnica **ZARA CHALLENGE**:

---

# 📱 Zara Web Challenge - Catálogo de Móviles

Este proyecto es una aplicación web para la **visualización, búsqueda y gestión** de un catálogo de teléfonos móviles. Permite a los usuarios consultar detalles específicos de cada dispositivo y gestionar un carrito de compras.

## 🚀 Tecnologías Utilizadas

- **Frontend:** React (>=17), TypeScript, CSS (SASS o Styled Components)
- **Gestión de Estado:** React Context API
- **Autenticación:** Manejo de `x-api-key` en las peticiones
- **Backend:** API REST proporcionada
- **Testing:** Vitest y React Testing Library
- **Herramientas adicionales:** ESLint, Prettier

## 📂 Estructura del Proyecto

```
📦 ZARA-CHALLENGE-MOBILE-SHOP   # Directorio raíz del proyecto
├── 📂 node_modules             # Dependencias de npm (ignorado en Git)
├── 📂 public                   # Archivos estáticos públicos
│   ├── index.html              # Archivo base HTML
├── 📂 src                      # Código fuente de la aplicación
│   ├── 📂 api                  # Llamadas a la API
│   │   ├── 📂 __tests__        # Pruebas de la API
│   │   ├── getPhone.ts
│   │   ├── getPhones.ts
│   ├── 📂 assets               # Recursos estáticos (íconos, imágenes, etc.)
│   │   ├── favicon.svg
│   ├── 📂 components           # Componentes reutilizables
│   │   ├── 📂 __tests__        # Pruebas unitarias de componentes
│   │   ├── 📂 layouts          # Componentes de estructura (Header, Footer)
│   │   │   ├── Header.tsx
│   │   ├── PhoneCard.tsx       # Componente de tarjeta de teléfono
│   ├── 📂 context              # Gestión de estado con Context API
│   │   ├── 📂 __tests__        # Pruebas unitarias de contextos
│   │   ├── PhoneContext.tsx
│   ├── 📂 locales              # Configuración de traducción i18n
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── i18n.ts
│   ├── 📂 pages                # Páginas principales de la aplicación
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   ├── Product.tsx
│   ├── 📂 styles               # Estilos globales y específicos
│   │   ├── main.css            # Estilos globales
│   │   ├── 📂 components       # Estilos específicos de componentes
│   │   ├── 📂 pages            # Estilos específicos de cada página
│   ├── App.tsx                 # Configuración de rutas y estructura principal
│   ├── main.tsx                # Punto de entrada de la app
│   ├── setupTests.ts           # Configuración de testing con Vitest
│   ├── vite-env.d.ts           # Definiciones de tipos para Vite
├── .env.development            # Variables de entorno para desarrollo
├── .env.example                # Plantilla de variables de entorno
├── .env.test                   # Variables de entorno para pruebas
├── .gitignore                  # Archivos ignorados en Git
├── eslint.config.js            # Configuración de ESLint
├── package-lock.json           # Bloqueo de dependencias de npm
├── package.json                # Dependencias y scripts del proyecto
├── README.md                   # Documentación del proyecto
├── tsconfig.app.json            # Configuración de TypeScript para la app
├── tsconfig.json                # Configuración global de TypeScript
├── tsconfig.node.json           # Configuración de TypeScript para Node.js
├── vite.config.ts               # Configuración de Vite
├── vitest-setup.ts              # Configuración inicial para Vitest
└── vitest.config.ts             # Configuración de pruebas con Vitest
```

---

## 🌍 **Demo y Diseño**

- 📌 **Figma Diseño:**  
  [Ver diseño en Figma](https://www.figma.com/design/Nuic7ePgOfUQ0hcBrUUQrb/Labs-%2F-Zara-Web-Challenge-(Smartphones)?node-id=0-1&m=dev&t=70pTEDeKhVCCV25p-1)  
- 📌 **Figma Prototipo:**  
  [Ver prototipo en Figma](https://www.figma.com/proto/Nuic7ePgOfUQ0hcBrUUQrb/Labs-%2F-Zara-Web-Challenge-(Smartphones)?page-id=1%3A121&node-id=20620-406&node-type=canvas&viewport=-127%2C-2609%2C0.17&t=kBCv81QvTf1Tbzjs-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=20620%3A1497&show-proto-sidebar=1)

---

## 🎯 **Características del Proyecto**

### 📌 **1. Vista Principal - Listado de Teléfonos**
✅ Mostrar una **cuadrícula con tarjetas** de los primeros 20 teléfonos de la API.  
✅ Filtrado en tiempo real por **nombre o marca**.  
✅ Indicador con el **número de resultados encontrados**.  
✅ Barra de navegación con:  
   - 🔗 Icono de inicio  
   - 🛒 Icono de carrito (cantidad de productos en él)  
✅ **Persistencia del carrito** con `localStorage`.  
✅ Click en un teléfono redirige a su **detalle**.

### 📌 **2. Vista Detalle de Teléfono**
✅ **Nombre, marca e imagen** del móvil.  
✅ Imagen **cambia dinámicamente** según el color seleccionado.  
✅ Selectores de **almacenamiento y color**, con actualización del precio.  
✅ Especificaciones detalladas.  
✅ Botón **"Añadir al carrito"** (activo solo si se han seleccionado color y almacenamiento).  
✅ Sección de **"Productos similares"** al final de la página.

### 📌 **3. Vista Carrito**
✅ Lista con:  
   - Imagen  
   - Nombre  
   - Almacenamiento y color seleccionados  
   - Precio  
✅ Botón para **eliminar productos**.  
✅ Mostrar el **precio total** de la compra.  
✅ Botón **"Continuar comprando"** que redirige al listado de móviles.

---

## 🛠 **Instalación y Uso**

### **1️⃣ Clonar el Repositorio**
```sh
git clone https://github.com/tu-usuario/zara-web-challenge.git
cd zara-web-challenge
```

### **2️⃣ Instalar Dependencias**
```sh
npm install
```

### **3️⃣ Configurar Variables de Entorno**
Crear un archivo `.env` en la raíz y añadir:
```
VITE_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
VITE_API_KEY=87909682e6cd74208f41a6ef39fe4191
```

### **4️⃣ Modo Desarrollo**
Ejecuta el servidor en modo desarrollo:
```sh
npm run dev
```
La aplicación se ejecutará en **http://localhost:5173/** (Vite).

### **5️⃣ Modo Producción**
Para generar una versión optimizada:
```sh
npm run build
npm run preview
```

---

## 🔑 **Autenticación en la API**
Para todas las peticiones a la API, se debe incluir en los headers:
```json
{
  "x-api-key": "87909682e6cd74208f41a6ef39fe4191"
}
```
📌 **Documentación de la API:**  
[API Docs](https://prueba-tecnica-api-tienda-moviles.onrender.com/docs/)

---

## 🧪 **Testing**
Para ejecutar las pruebas:
```sh
npm run test
```
📌 **Incluye pruebas para:**  
✅ **Renderizado correcto de componentes**  
✅ **Búsqueda y filtrado de productos**  
✅ **Gestión del carrito**  
✅ **Manejo de estados y contextos**  

---

## 🎨 **Estilos**
- **Tipografía:** `Helvetica, Arial, sans-serif`
- **Diseño responsive** basado en los prototipos de Figma

---

## ✅ **Requisitos Cumplidos**
✔ **Funcionalidades requeridas** (búsqueda, carrito, detalle, filtros)  
✔ **Testing implementado** con Vitest  
✔ **Aplicación responsive** 📱💻  
✔ **Accesibilidad optimizada**  
✔ **Uso de linters y formatters** (ESLint, Prettier)  
✔ **Consola sin errores ni advertencias**  
