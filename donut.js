var DONUT = document.getElementById('donutplot');

var colors = [
    '#6ee7ff', '#7c9cff', '#8b7bff', '#4dd4ac', '#f9a8d4', '#fbbf24',
    '#fb7185', '#22c55e', '#38bdf8', '#a78bfa', '#f97316', '#e879f9',
    '#60a5fa', '#c084fc', '#fda4af', '#fde68a', '#34d399', '#93c5fd',
    '#f59e0b', '#94a3b8'
];

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
    insidetextorientation: 'horizontal',
    sort: false,
    direction: 'clockwise',
    rotation: 90,
    pull: 0,
    hoverinfo: 'label+percent+value',
    hovertemplate: '<b>%{label}</b><br>%{percent}<br>Sales: %{value}<extra></extra>',
    marker: {
        colors: colors,
        line: {
            color: 'rgba(255,255,255,0.16)',
            width: 1
        }
    }
}];

var layout = {
    title: {
        text: 'Market Share of Video Game Sales by Genre',
        font: {
            color: '#f7f9ff',
            size: 28
        },
        x: 0.02,
        xanchor: 'left'
    },
    font: {
        color: '#eef2ff',
        size: 14,
        family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: {
        l: 30,
        r: 30,
        t: 90,
        b: 30
    },
    showlegend: true,
    legend: {
        x: 1.02,
        y: 0.98,
        xanchor: 'left',
        yanchor: 'top',
        font: {
            color: '#dce4ff'
        },
        bgcolor: 'rgba(8, 12, 24, 0.55)',
        bordercolor: 'rgba(132, 155, 255, 0.18)',
        borderwidth: 1
    },
    hoverlabel: {
        bgcolor: 'rgba(10, 16, 34, 0.96)',
        bordercolor: 'rgba(126, 174, 255, 0.9)',
        font: {
            color: '#f8fbff',
            size: 14,
            family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }
    }
};

// Agar chart merespon langsung ukuran layar
var config = { responsive: true };

// Method untuk memanggil plot ke dalam elemen HTML
Plotly.newPlot(DONUT, data, layout, config).then(function () {
    var hoveredIndex = null;
    var glowTarget = null;
    var glowLayer = null;

    function getSliceNode(pointIndex) {
        return DONUT.querySelectorAll('.slice')[pointIndex] || null;
    }

    function getSlicePath(sliceNode) {
        return sliceNode ? sliceNode.querySelector('path.surface') || sliceNode.querySelector('path') : null;
    }

    function removeGlowLayer() {
        if (glowLayer && glowLayer.parentNode) {
            glowLayer.parentNode.removeChild(glowLayer);
        }

        glowLayer = null;
    }

    function buildGlowLayer(sliceNode) {
        var slicePath = getSlicePath(sliceNode);
        if (!sliceNode || !slicePath) {
            return;
        }

        removeGlowLayer();

        var clonePath = slicePath.cloneNode(true);
        clonePath.removeAttribute('class');
        clonePath.setAttribute('aria-hidden', 'true');
        clonePath.style.pointerEvents = 'none';
        clonePath.style.opacity = '0';
        clonePath.style.transition = 'opacity 220ms ease, filter 220ms ease';
        clonePath.style.filter = 'blur(11px) saturate(135%)';
        clonePath.style.transform = 'scale(1.03)';
        clonePath.style.transformOrigin = 'center';
        clonePath.style.fillOpacity = '0.48';
        clonePath.style.stroke = 'rgba(124, 195, 255, 0.5)';
        clonePath.style.strokeWidth = '2';

        sliceNode.insertBefore(clonePath, sliceNode.firstChild);
        glowLayer = clonePath;
    }

    function applySliceStyle(sliceNode, active) {
        if (!sliceNode) {
            return;
        }

        var slicePath = getSlicePath(sliceNode);
        sliceNode.style.transition = 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)';
        sliceNode.style.willChange = 'transform';
        sliceNode.style.transformOrigin = 'center';

        if (slicePath) {
            slicePath.style.transition = 'stroke-width 220ms ease, stroke-opacity 220ms ease, fill-opacity 220ms ease, opacity 220ms ease';
            slicePath.style.willChange = 'stroke-width, stroke-opacity, fill-opacity, opacity';
            slicePath.style.shapeRendering = 'geometricPrecision';
        }

        if (active) {
            sliceNode.style.transform = 'translateY(-10px)';
            if (slicePath) {
                slicePath.style.stroke = 'rgba(255,255,255,0.96)';
                slicePath.style.strokeWidth = '2';
                slicePath.style.fillOpacity = '1';
            }
            if (glowLayer) {
                glowLayer.style.opacity = '0';
            }
            buildGlowLayer(sliceNode);
            if (glowLayer) {
                glowLayer.style.opacity = '0.68';
            }
            return;
        }

        sliceNode.style.transform = '';
        if (slicePath) {
            slicePath.style.stroke = 'rgba(255,255,255,0.16)';
            slicePath.style.strokeWidth = '1';
            slicePath.style.fillOpacity = '1';
        }
        removeGlowLayer();
    }

    function resetSliceState() {
        if (glowTarget) {
            applySliceStyle(glowTarget, false);
            glowTarget = null;
        }

        hoveredIndex = null;
    }

    function highlightSlice(pointIndex) {
        if (pointIndex === hoveredIndex) {
            return;
        }

        hoveredIndex = pointIndex;

        if (glowTarget) {
            applySliceStyle(glowTarget, false);
        }

        var sliceNode = getSliceNode(pointIndex);
        if (sliceNode) {
            applySliceStyle(sliceNode, true);
            glowTarget = sliceNode;
        }
    }

    DONUT.on('plotly_hover', function (eventData) {
        if (!eventData || !eventData.points || !eventData.points.length) {
            return;
        }

        highlightSlice(eventData.points[0].pointNumber);
    });

    DONUT.on('plotly_unhover', function () {
        resetSliceState();
    });
});