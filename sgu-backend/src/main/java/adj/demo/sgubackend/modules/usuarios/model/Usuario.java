package adj.demo.sgubackend.modules.usuarios.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Usuario {
    @Id
    private Long id;
    @Column(unique=true,length=50)
    private String nombre;
    @Column(unique=true,length=20)
    private String correo;
    @Column(unique=true,length=10)
    private String numero;

    public Usuario() {

    }

    public Usuario(Long id, String nombre, String correo, String numero) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.numero = numero;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
