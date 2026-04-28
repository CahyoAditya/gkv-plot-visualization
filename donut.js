var DONUT = document.getElementById('donutplot');

// Data diurutkan berdasarkan persentase yang ada pada gambar
var data = [{
    labels: [
        'Sports', 'Action', 'Shooter', 'Misc', 'Racing', 'Role-Playing',
        'Platform', 'Fighting', 'Adventure', 'Simulation', 'Action-Adventure',
        'Puzzle', 'Strategy', 'Music', 'MMO', 'Party', 'Visual Novel',
        'Sandbox', 'Education', 'Board Game'
    ],
    values: [
        18, 17, 15.1, 8.45, 7.93, 6.45,
        5.29, 5.16, 4.93, 4.55, 2.25,
        1.93, 1.79, 0.784, 0.141, 0.0941, 0.0876,
        0.0286, 0.0147, 0.005
    ],
    type: 'pie',       // Menggunakan tipe pie chart
    hole: 0.4,         // Nilai 0.4 ini yang membuat lubang di tengah (Donut Chart)
    textinfo: 'label+percent',
    textposition: 'inside',
    insidetextorientation: 'horizontal'
}];

var layout = {
    title: 'Market Share of Video Game Sales by Genre',
    font: {
        color: 'white', // Mengubah warna teks menjadi putih
        size: 14
    },
    paper_bgcolor: '#1e1e1e', // Mengubah warna latar belakang canvas menjadi dark grey
    plot_bgcolor: '#1e1e1e',
    showlegend: true,
    legend: {
        x: 1,
        y: 0.8
    }
};

// Agar chart merespon langsung ukuran layar
var config = { responsive: true };

// Method untuk memanggil plot ke dalam elemen HTML
Plotly.newPlot(DONUT, data, layout, config);