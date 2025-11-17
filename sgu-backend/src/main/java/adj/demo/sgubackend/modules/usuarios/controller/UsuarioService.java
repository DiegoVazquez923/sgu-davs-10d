package adj.demo.sgubackend.modules.usuarios.controller;

import adj.demo.sgubackend.modules.usuarios.model.Usuario;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UsuarioService {

    private final Map<Long, Usuario> usuarios = new HashMap<>();
    private Long currentId = 1L;

    public List<Usuario> getAll() {
        return new ArrayList<>(usuarios.values());
    }

    public Usuario save(Usuario usuario) {
        usuario.setId(currentId++);
        usuarios.put(usuario.getId(), usuario);
        return usuario;
    }

    public Usuario update(Long id, Usuario usuario) {
        if (!usuarios.containsKey(id)) {
            return null;
        }
        usuario.setId(id);
        usuarios.put(id, usuario);
        return usuario;
    }

    public boolean delete(Long id) {
        return usuarios.remove(id) != null;
    }
}
