// data/products.js
const products = [
    {
        category: "Dorilocos & Maiz",
        image: "./img/producto/doriloco.jpg", 
        items: [
            { id: 1, name: "Dorichon", desc: "Doritos, Lechona, Maiz, Queso, Pico de gallo, Arepa", price: 16000 },
            { id: 2, name: "Cerdorito", desc: "Doritos, Carne de cerdo, Chorizo, Pollo, Queso, Pico de gallo, Maiz", price: 16000 },
            { id: 3, name: "Mixto Familiar", desc: "Dorichon y Cerdorito en porciones familiares", price: 39000 }
        ]
    },
    {
        category: "Hamburguesas",
        image: "./img/producto/hamburguesa.jpg",
        items: [
            { id: 4, name: "Cochinita Sencilla", desc: "Pan, Carne de res, Queso, Vegetales, Sal al gusto", price: 13000 },
            { id: 5, name: "Cerdita Especial", desc: "Pan, Carne de res, Queso, Jamón, Pollo, Maíz tierno, Pico de gallo, Salsas", price: 16000 },
            { id: 6, name: "Marranita 3 Carnes", desc: "Pan, Carne de res, Chorizo, Tocineta, Jamón, Pico de gallo, Salsas", price: 20000 },
            { id: 7, name: "Hambuchona", desc: "Pan, Carne de res, Lechona, Tocineta, Jamón, Queso, Maiz, Pico de gallo", price: 22000 } // Precio estimado, no visible en foto
        ]
    },
    {
        category: "Perros Calientes (Marranitos)",
        image: "./img/producto/perro.png",
        items: [
            { id: 8, name: "Marranito Sencillo", desc: "Salchicha americana, papita, salsas", price: 8000 },
            { id: 9, name: "Marranito Especial", desc: "Salchicha, queso, tocineta, maíz", price: 12000 },
            { id: 10, name: "Marralechonado", desc: "El rey de la casa con lechona", price: 15000 }
        ]
    },
    {
        category: "Salchipapas Chingonas",
        image: "./img/producto/salchipapa.jpg",
        items: [
            { id: 11, name: "Chingona L", desc: "Papa francesa, salchicha americana, lechona, pollo, carne desmechada, maiz, queso", price: 16000 },
            { id: 12, name: "Chingona XL", desc: "Versión gigante para compartir con más carne y lechona", price: 27000 }
        ]
    }
];

// Noticias / Promos basadas en tus volantes
const news = [
    { 
        id: "combo1", // <--- NUEVO: ID único
        title: "¡PROMO SEMANAL!", 
        image: "./img/promo/promoHamburguesa.jpeg", 
        desc: "2 Hamburguesas + Papa + Gaseosa por solo 30K. (Mar-Mié-Jue)",
        price: 30000  // <--- NUEVO: Precio numérico para el carrito
    },
    { 
        id: "combo2", // <--- NUEVO: ID único
        title: "COMBOS HOT DOG", 
        image: "./img/promo/promoPerro.jpeg", 
        desc: "2 Marralechonados + Papas + Gaseosa por 30K.",
        price: 30000  // <--- NUEVO: Precio numérico 
    }
];

module.exports = { products, news };