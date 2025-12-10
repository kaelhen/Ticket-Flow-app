// === SECCIÓN 1: TICKETS A LA VENTA (Lo que ya tenías) ===
export const mockTicketsOnSale = [
    {
        id: 1,
        name: "Lollapalooza Chile 2025",
        location: "Parque Bicentenario",
        date: "20/03/2025",
        price: 150000,
        image: 'https://i.abcnewsfe.com/a/0cd142be-398e-421b-adb0-459c958b0eaf/Lollapalooza-1-gty-gmh-250801_1754065202381_hpMain.jpg'
    },
    {
        id: 2,
        name: "Metallica World Tour",
        location: "Estadio Nacional",
        date: "15/04/2025",
        price: 95000,
        image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 3,
        name: "Tech Conference 2025",
        location: "Espacio Riesco",
        date: "10/06/2025",
        price: 45000,
        image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop'
    }
];

// === SECCIÓN 2: PRÓXIMOS EVENTOS (Solo informativos) ===
export const mockUpcomingEvents = [
    { id: 101, name: "Rock in Rio 2026", date: "Octubre 2026" },
    { id: 102, name: "Tomorrowland Brasil", date: "Noviembre 2026" },
    { id: 103, name: "Coldplay: Music of Spheres II", date: "Diciembre 2026" }
];

// === SECCIÓN 3: GALERÍA DE EVENTOS PASADOS ===
export const mockPastPhotos = [
    { id: 201, title: "La energía del público en Lolla '24", url: "https://placehold.co/200x200?text=Crowd+Lolla24" },
    { id: 202, title: "Cierre pirotécnico", url: "https://placehold.co/200x200?text=Fireworks" },
    { id: 203, title: "Escenario principal de noche", url: "https://placehold.co/200x200?text=Main+Stage+Night" },
    { id: 204, title: "Zona de comida y descanso", url: "https://placehold.co/200x200?text=Food+Area" }
];


// Servicios
export const mockAIRecommendation = "Basado en tus gustos, te recomendamos el evento de Metallica.";
