import AuthService from '../services/AuthService.js';

class AuthController {
    
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            
            if (!name || !email || !password) {
                return res.status(400).json({ msg: 'Faltan campos obligatorios: nombre, email y contraseña.' });
            }

            const result = await AuthService.registerUser({ name, email, password });
            
            res.status(201).json({ 
                message: 'Usuario registrado con éxito. Pendiente verificación de email.', 
                data: result 
            });

        } catch (error) {
            if (error.message === 'El email ya está registrado.') {
                return res.status(409).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor durante el registro.' });
        }
    }
    
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ msg: 'Faltan email y/o contraseña.' });
            }

            // Llama a la lógica de negocio (AuthService)
            const result = await AuthService.loginUser(email, password);

            res.status(200).json({ 
                message: 'Inicio de sesión exitoso.', 
                data: result 
            });

        } catch (error) {
            // Manejo de errores de credenciales
            if (error.message.includes('Credenciales inválidas')) {
                return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
            }
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor durante el inicio de sesión.' });
        }
    }
}

export default new AuthController();