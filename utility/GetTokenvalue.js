function getTknValue(req) {
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        return authorizationHeader.slice(7); // Remueve el prefijo 'Bearer ' para obtener solo el token
    }
    return null; // Retorna null si no se encuentra el token
}
