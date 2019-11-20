// Puertos
// ============================================
process.env.PORT = process.env.PORT || 3000;

// Entornos
// ============================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


// Base de Datos
// ============================================
let urlDB

if(process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://lucasdb:lucasdb@cluster0-rpsop.mongodb.net/cafe'
}

process.env.URLDB = urlDB;