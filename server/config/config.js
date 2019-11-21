// Puertos
// ============================================
process.env.PORT = process.env.PORT || 3000;

// Entornos
// ============================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento token
// ============================================
process.env.CADUCIDAD_TOKEN = 60 * 60* 24 * 30; // seg, min, dia mes


// Seed de Autenticacion
// ============================================
process.env.SEED = process.env.SEED  || 'seed';

// Base de Datos
// ============================================
let urlDB

if(process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


// Google Client ID
// =============================================
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '569558999396-jda044giih2v8l40np1l5d1g0fug99rg.apps.googleusercontent.com';