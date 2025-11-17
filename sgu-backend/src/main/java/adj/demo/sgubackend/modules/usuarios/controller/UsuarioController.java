package adj.demo.sgubackend.modules.usuarios.controller;

import adj.demo.sgubackend.modules.usuarios.model.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sgu/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getUsuarios() {
        return new ResponseEntity<>(usuarioService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> createUsuario(@RequestBody Usuario usuario) {
        Usuario nuevo = usuarioService.save(usuario);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario actualizado = usuarioService.update(id, usuario);
        if (actualizado == null) {
            return new ResponseEntity<>("No encontrado", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Editado: "+actualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        boolean eliminado = usuarioService.delete(id);
        if (!eliminado) {
            return new ResponseEntity<>("No encontrado", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Eliminado", HttpStatus.OK);
    }
}

