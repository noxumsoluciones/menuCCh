// server.js
const express = require('express');
const app = express();
const path = require('path');
const { products, news } = require('./data/products');



// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta Principal
app.get('/', (req, res) => {
    res.render('index', { 
        products: products,
        news: news,
        phone: "573192958035" // Tu número de WhatsApp
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor Cerdo Chingón corriendo en http://localhost:${PORT}`);
});