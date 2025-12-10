import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';

// Middleware para verificar el token JWT 
const protect = async (req, res, next) => {
    let token;

    // Verifica si el token existe en el encabezado 'Authorization'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') 
    ) {
        try {
            // Extraer el token (Quitar 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            //  Verificar el token usando la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Obtener el usuario del token (sin la contraseña)
            // inyectamos el objeto user en el request para que los controladores lo puedan usar
            req.user = await UserRepository.findById(decoded.id);

            //  Continuar con la siguiente funcion (el controlador)
            next();

        } catch (error) {
            console.error(error);
            // Error si el token es inválido o vencio
            return res.status(401).json({ message: 'No autorizado, token inválido o vencido.' });
        }
    }

    if (!token) {
        // Error si no se encuentra el token
        return res.status(401).json({ message: 'No autorizado, no se proporcionó token.' });
    }
};

export default protect;