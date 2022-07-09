export default class User {
    constructor(name,lastname, dni, email, password,dni_type,phone,os) {
      this.name = name;
      this.lastname = lastname;
      this.dni = dni;
      this.email = email
      this.password = password;
      this.dni_type = dni_type,
      this.role_id = 4
      this.phone = phone
      this.os = os
    }
  }