const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer'); // <--- NUEVO

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// CONFIGURACIÓN MULTER (SUBIDA DE IMÁGENES)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/promo/') // Carpeta destino
    },
    filename: function (req, file, cb) {
        // Guardamos con el nombre original, reemplazando si existe
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// LEER JSON
function getProducts() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf-8');
        return JSON.parse(data);
    } catch (e) { return []; }
}

// RUTA PRINCIPAL
app.get('/', (req, res) => {
    const allData = getProducts();
    
    // SEPARAR NOTICIAS (Filtrar solo las habilitadas)
    const newsCat = allData.find(cat => cat.category === "Noticias & Promociones");
    let news = [];
    if (newsCat) {
        // FILTRO CRÍTICO: Solo mostramos noticias si available === true
        news = newsCat.items.filter(item => item.available).map(item => ({
            ...item,
            title: item.name,
            // Si subió imagen nueva usa esa, si no, busca una por defecto
            image: item.image || '/img/logo.png' 
        }));
    }

    // EL RESTO DEL MENÚ (Excluyendo noticias)
    const products = allData.filter(cat => cat.category !== "Noticias & Promociones");

    res.render('index', { products, news });
});

// RUTA ADMIN
app.get('/editmenuadvance', (req, res) => {
    res.render('admin', { products: getProducts() });
});

// API GUARDAR (Soporta archivos e inputs)
app.post('/api/update-products', upload.any(), (req, res) => {
    try {
        // El frontend nos enviará un JSON string en un campo llamado 'jsonData'
        // y los archivos aparte. Multer ya guardó los archivos.
        
        let newCategories = JSON.parse(req.body.jsonData);
        
        // Ahora cruzamos la info: Si Multer subió un archivo, actualizamos la ruta en el JSON
        req.files.forEach(file => {
            // El "fieldname" del input file será algo como: "catIndex-itemIndex"
            const [catIdx, itemIdx] = file.fieldname.split('-');
            
            if(newCategories[catIdx] && newCategories[catIdx].items[itemIdx]) {
                // Actualizamos la ruta de la imagen en el JSON
                newCategories[catIdx].items[itemIdx].image = `/img/promo/${file.filename}`;
            }
        });

        // Guardamos el JSON actualizado
        fs.writeFileSync(path.join(__dirname, 'data', 'products.json'), JSON.stringify(newCategories, null, 2), 'utf-8');
        
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server en puerto ${PORT}`));