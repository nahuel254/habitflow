import User from '../models/User.js'; 

class UserRepository {

    // crear un nuevo usuario
    async createUser(userData) {
        return User.create(userData);
    }

    // buscar un usuario por email 
    async findByEmail(email) {
        return User.findOne({ email }).select('+password');
    }

    // buscar un usuario por ID (usado en el authMiddleware)
    async findById(id) {
        return User.findById(id);
    }
}

export default new UserRepository();