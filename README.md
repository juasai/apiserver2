# API Server - Gestor de Productos y Carritos

## Instalación

```bash
npm install
npm start
```

Servidor: **http://localhost:8080**

---

## Endpoints

### Vistas Web
| Ruta | Descripción |
|------|-------------|
| `/` | Inicio - Lista de endpoints |
| `/home` | Lista de productos |
| `/realtimeproducts` | Productos en tiempo real (WebSockets) |

### API REST
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Listar productos |
| GET | `/api/products/:pid` | Producto por ID |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |
| GET | `/api/carts` | Listar carritos |
| GET | `/api/carts/:cid` | Carrito por ID |
| POST | `/api/carts` | Crear carrito |
| POST | `/api/carts/:cid/product/:pid` | Agregar producto al carrito |

---

## Cómo Probar

### 1. Vista Web (Home)
```
http://localhost:8080/home
```
Lista todos los productos.

### 2. Productos en Tiempo Real
```
http://localhost:8080/realtimeproducts
```
- Formulario para agregar productos (envía por WebSocket)
- Lista que se actualiza automáticamente
- Botón eliminar por producto

### 3. API REST
```bash
# Crear producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Producto","description":"Descripción","price":100,"code":"PROD1","stock":10,"category":"Test"}'

# Listar productos
curl http://localhost:8080/api/products
```

---

## Tecnologías
- Express.js
- Socket.io (WebSockets)
- Handlebars (Plantillas)
- Persistencia en JSON
