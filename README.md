# API Server - Gestor de Productos y Carritos

Aplicación e-commerce backend con Express.js, MongoDB y WebSockets.

---

## Levantar el proyecto

### Con Docker Compose (recomendado)

Levanta la aplicación y MongoDB con un solo comando:

```bash
docker compose up --build
```

Esto inicia:
- **apiserver-app** en `http://localhost:8080`
- **apiserver-mongo** (MongoDB) en `localhost:27017`

Para detener:

```bash
docker compose down
```

Para detener y eliminar los datos de la base de datos:

```bash
docker compose down -v
```

### Sin Docker

Requiere tener MongoDB corriendo localmente o una URI de MongoDB Atlas.

```bash
npm install
```

Crear un archivo `.env` basado en `.env.example`:

```
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/apiserver
```

```bash
npm start        # producción
npm run dev      # desarrollo (nodemon)
```

---

## Vistas Web

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio - Documentación de endpoints |
| `/products` | Lista de productos con paginación y filtros |
| `/products/:pid` | Detalle de un producto con botón agregar al carrito |
| `/carts/:cid` | Vista del carrito con productos populados |
| `/realtimeproducts` | Productos en tiempo real (WebSockets) |

---

## API REST - Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Listar productos (con paginación, filtros y ordenamiento) |
| GET | `/api/products/:pid` | Obtener producto por ID |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |

### Query params de GET /api/products

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `limit` | number | 10 | Cantidad de productos por página |
| `page` | number | 1 | Número de página |
| `sort` | string | - | Ordenar por precio: `asc` o `desc` |
| `query` | string | - | Filtrar por categoría (ej: `Electronics`) o disponibilidad (`true`/`false`) |

### Formato de respuesta

```json
{
  "status": "success",
  "payload": [],
  "totalPages": 1,
  "prevPage": null,
  "nextPage": 2,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevLink": null,
  "nextLink": "http://localhost:8080/api/products?page=2&limit=10"
}
```

### Estructura del producto

```json
{
  "title": "Laptop",
  "description": "Laptop gaming",
  "price": 1500,
  "code": "LAP001",
  "stock": 10,
  "category": "Electronics",
  "status": true,
  "thumbnails": []
}
```

Campos requeridos: `title`, `description`, `price`, `code` (único), `stock`, `category`.

---

## API REST - Carritos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/carts` | Listar todos los carritos |
| GET | `/api/carts/:cid` | Obtener carrito por ID (con populate de productos) |
| POST | `/api/carts` | Crear carrito vacío |
| POST | `/api/carts/:cid/product/:pid` | Agregar producto al carrito (incrementa cantidad si ya existe) |
| PUT | `/api/carts/:cid` | Actualizar todos los productos del carrito |
| PUT | `/api/carts/:cid/products/:pid` | Actualizar cantidad de un producto en el carrito |
| DELETE | `/api/carts/:cid/products/:pid` | Eliminar un producto del carrito |
| DELETE | `/api/carts/:cid` | Vaciar el carrito (elimina todos los productos, no el carrito) |

### Ejemplos

```bash
# Crear carrito
curl -X POST http://localhost:8080/api/carts

# Agregar producto al carrito
curl -X POST http://localhost:8080/api/carts/{cartId}/product/{productId}

# Actualizar cantidad de un producto
curl -X PUT http://localhost:8080/api/carts/{cartId}/products/{productId} \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'

# Reemplazar todos los productos del carrito
curl -X PUT http://localhost:8080/api/carts/{cartId} \
  -H "Content-Type: application/json" \
  -d '{"products": [{"product": "{productId}", "quantity": 2}]}'

# Eliminar un producto del carrito
curl -X DELETE http://localhost:8080/api/carts/{cartId}/products/{productId}

# Vaciar carrito
curl -X DELETE http://localhost:8080/api/carts/{cartId}
```

---

## Utilitarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servidor |

---

## Tecnologías

- Express.js 5
- MongoDB + Mongoose
- mongoose-paginate-v2
- Socket.io (WebSockets)
- Handlebars (Plantillas)
- Docker + Docker Compose
