class Usuario {
  constructor(id, username, nombre, apellido, email, password, tipo, status) {
    this.id = id;
    this.username = username;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.tipo = tipo;
    this.status = status;
  }
}
module.exports = Usuario;
