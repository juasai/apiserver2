# Instrucciones de Ejecución del Proyecto
## Requisitos del Sistema

Antes de comenzar, asegúrate de tener instalado:

### Node.js (v22 o superior)
1. Visita https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Instala siguiendo las instrucciones del instalador

### Verificar instalación
Abre una terminal y ejecuta:

```bash
node --version
# Debería mostrar: v22.x.x o superior

npm --version
# Debería mostrar: 10.x.x o superior
```

---

## Instalación Paso a Paso

### 2. Navegar al Directorio del Proyecto

```bash
cd /ruta/al/proyecto/apiserver2
```

### 3. Instalar Dependencias

```bash
npm install
```

Esto instalará todos los paquetes necesarios listados en `package.json`:
- Express.js (framework web)
- dotenv (manejo de variables de entorno)
- nodemon (recarga automática en desarrollo)
- Y todas sus dependencias

---

## Configuración

### Variables de Entorno (Opcional)

El proyecto funciona sin configuración adicional, pero puedes personalizar:

#### 1. Crear archivo de configuración

# En Mac/Linux
```bash
cp .env.example .env
```

#### 2. Editar configuración (opcional)

Abre el archivo `.env` con cualquier editor de texto y modifica:

```env
PORT=8080              # Puerto donde correrá el servidor
NODE_ENV=development   # Entorno (development o production)
DATA_PATH=./data       # Ruta donde se guardarán los archivos JSON
```

**Nota:** Si no creas el archivo `.env`, el proyecto usará los valores por defecto.

---

## Ejecución del Servidor

### Modo Desarrollo (Recomendado)

Este modo reinicia automáticamente el servidor cuando modificas código:

```bash
npm run dev
```

### Modo Producción

Para ejecutar sin recarga automática:

```bash
npm start
```

### Salida Esperada

Deberías ver algo como:

```
========================================
🚀 Server is running!
========================================
Environment: development
Port: 8080
URL: http://localhost:8080
API: http://localhost:8080/api
========================================
```

### Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo.

---

## Pruebas de la API

### Método 1: Usando el Navegador Web

Abre tu navegador (Chrome, Firefox, Edge, etc.) y visita:

1. **Página principal:**
   ```
   http://localhost:8080
   ```
   Verás información sobre la API

2. **Health Check:**
   ```
   http://localhost:8080/api/health
   ```
   Verifica que el servidor esté funcionando

3. **Ver todos los productos:**
   ```
   http://localhost:8080/api/products
   ```
   Inicialmente verás un array vacío: `[]`

4. **Ver todos los carritos:**
   ```
   http://localhost:8080/api/carts
   ```

### Método 2: Usando cURL (Terminal)

Si tienes cURL instalado (viene por defecto en Mac/Linux):

#### Verificar el servidor
```bash
curl http://localhost:8080/api/health
```

#### Crear un producto
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Laptop\",\"description\":\"Laptop HP\",\"price\":1200,\"code\":\"LAP001\",\"stock\":10,\"category\":\"Computadoras\"}"
```

#### Ver todos los productos
```bash
curl http://localhost:8080/api/products
```

#### Crear un carrito
```bash
curl -X POST http://localhost:8080/api/carts
```

#### Agregar producto al carrito
```bash
curl -X POST http://localhost:8080/api/carts/1/product/1
```

---

## Estructura del Proyecto

```
apiserver2/
│
├── src/                          # Código fuente
│   ├── config/                   # Configuración
│   │   └── config.js            # Variables de configuración
│   │
│   ├── controllers/              # Controladores (lógica HTTP)
│   │   ├── productController.js # Controlador de productos
│   │   └── cartController.js    # Controlador de carritos
│   │
│   ├── services/                 # Lógica de negocio
│   │   ├── productService.js    # Servicios de productos
│   │   └── cartService.js       # Servicios de carritos
│   │
│   ├── models/                   # Modelos de datos
│   │   ├── Product.js           # Modelo de producto
│   │   └── Cart.js              # Modelo de carrito
│   │
│   ├── routes/                   # Definición de rutas
│   │   ├── index.js             # Router principal
│   │   ├── productRoutes.js     # Rutas de productos
│   │   └── cartRoutes.js        # Rutas de carritos
│   │
│   ├── middlewares/              # Middlewares personalizados
│   │   ├── errorHandler.js      # Manejo de errores
│   │   ├── logger.js            # Logger de peticiones
│   │   └── notFound.js          # Manejo de 404
│   │
│   ├── app.js                   # Configuración de Express
│   ├── server.js                # Punto de entrada
│   └── endpoints.http           # Ejemplos de endpoints
│
├── data/                         # Almacenamiento de datos
│   ├── products.json            # (Se crea automáticamente)
│   └── carts.json               # (Se crea automáticamente)
│
├── .env.example                 # Ejemplo de variables de entorno
├── .gitignore                   # Archivos ignorados por Git
├── package.json                 # Dependencias y scripts
├── README.md                    # Documentación completa (inglés)
```



