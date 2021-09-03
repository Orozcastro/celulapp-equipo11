
# Api para celulares E-Commerce 

Api para alta, baja y cambio de catálogos de celulares.


## Integrantes

- María Fernanda Orozco Castro [@Orozcastro](https://www.github.com/Orozcastro)

- Luis Daniel Ramirez Guerra [@DanyGuerra](https://www.github.com/DanyGuerra)

- Luis Felipe Carillo Alvarado [@carrillodev](https://www.github.com/carrillodev)

- Victor Alberto Díaz Sánchez [@vads26](https://www.github.com/vads26)

  # 🚀 api

[![npm](https://img.shields.io/npm/v/api)]()
## Instalación

Instalación del proyecto con npm

```bash
    npm install --save
```

Ejecutar proyecto con npm

```bash
    npm run start
```
## Entidades API

#### Usuarios

| Campo | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | Identificar del celular |
| `username` | `string` | Usuario de acceso |
| `nombre` | `string` | Nombre de usuario |
| `apellido` | `string` | Apellido de usuario |
| `email` | `string` | Correo electrónico |
| `password` | `string` | Contraseña de acceso |
| `tipo` | `string` | Tipo de perfil: Administrador, Comprador y Ventas |
| `status` | `boolean` | Alta o baja de usuario |

#### Celulares

| Campo | Tipo     | Descripción                |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

  
## Referencias API

#### Obtener todos los usuarios

```http
  GET /v1/usuarios/ObtenerUsuarios
```

#### Crear usuario

```http
  POST /v1/usuarios/crearUsuario

  BODY {
        "id": 1,
        "username": "XXX",
        "nombre": "XXX",
        "apellido": "xxx",
        "email": "XX@XX.COM",
        "password": "XXXX",
        "tipo": "Administrador",
        "status": "1"
    }
```

#### Modificar usuario

```http
  PUT /v1/usuarios/modificarUsuario${id}

  BODY {
        "username": "XXX",
        "nombre": "XXX",
        "apellido": "xxx",
        "email": "XX@XX.COM",
        "password": "XXXX",
        "tipo": "Administrador",
        "status": "1"
    }
```  

#### Eliminar usuario

```http
  DELETE /v1/usuarios/eliminarUsuario${id}

  BODY {
        "username": "XXX",
        "nombre": "XXX",
        "apellido": "xxx",
        "email": "XX@XX.COM",
        "password": "XXXX",
        "tipo": "Administrador",
        "status": "1"
    }  
```