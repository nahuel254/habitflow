import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js'; 

class AuthService {
    
    //ayuda para generar el JWT
    generateToken(userId) {
        // Usa el JWT_SECRET de .env
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '7d', 
        });
    }

    // registrO un nuevo usuario
    async registerUser({ name, email, password }) {
        // Verificar si el usuario ya existe
        let user = await UserRepository.findByEmail(email);
        if (user) {
            throw new Error('El email ya está registrado.');
        }

        //Hashing de la contraseña (REQUISITO CLAVE)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Crear el usuario en la base de datos
        user = await UserRepository.createUser({
            name,
            email,
            password: hashedPassword,
        });

        //Generar el token y devolver el usuario
        const token = this.generateToken(user._id);
        
        return { 
            id: user._id, 
            name: user.name, 
            email: user.email, 
            isVerified: user.isVerified,
            token 
        };
    }

    //iniciar sesión
    async loginUser(email, password) {
        // Buscar al usuario por email 
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new Error('Credenciales inválidas o usuario no encontrado.');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Credenciales inválidas o usuario no encontrado.');
        }

        //Si las credenciales son correctas, generar el JWT
        const token = this.generateToken(user._id);

        //Devolver los datos del usuario y el token
        return { 
            id: user._id, 
            name: user.name, 
            email: user.email, 
            isVerified: user.isVerified,
            token 
        };
    }
}

export default new AuthService();