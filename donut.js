var DONUT = document.getElementById('donutplot');
var CORRELATION = document.getElementById('correlationplot');

var colors = [
    '#6ee7ff', '#7c9cff', '#8b7bff', '#4dd4ac', '#f9a8d4', '#fbbf24',
    '#fb7185', '#22c55e', '#38bdf8', '#a78bfa', '#f97316', '#e879f9',
    '#60a5fa', '#c084fc', '#fda4af', '#fde68a', '#34d399', '#93c5fd',
    '#f59e0b', '#94a3b8'
];

var genres = [
    'Sports', 'Action', 'Shooter', 'Misc', 'Racing', 'Role-Playing',
    'Platform', 'Fighting', 'Adventure', 'Simulation', 'Action-Adventure',
    'Puzzle', 'Strategy', 'Music', 'MMO', 'Party', 'Visual Novel',
    'Sandbox', 'Education', 'Board Game'
];

var totalSales = [
    1186.77, 1124.95, 995.47, 557.55, 523.51, 425.88,
    349.15, 340.39, 325.09, 300.48, 148.52,
    127.06, 118.26, 51.75, 9.31, 6.21, 5.78,
    1.89, 0.97, 0.33
];

var avgCriticScores = [
    7.327276, 7.144212, 7.269595, 7.244517, 7.263502, 7.327242,
    7.167756, 7.285121, 7.264725, 7.231720, 7.349621,
    7.271071, 7.313325, 7.359184, 7.306667, 6.817241, 7.307798,
    9.2, 7.525, 6.633333
];

var gameCounts = [
    2581, 2825, 1480, 1988, 1422, 1483,
    949, 867, 1888, 1116, 264,
    719, 818, 147, 30, 29, 218,
    1, 4, 3
];

var outlierGenres = ['Sandbox', 'Sports', 'Action', 'Shooter', 'Board Game'];
var outlierIndices = outlierGenres.map(function (genre) {
    return genres.indexOf(genre);
});

var outlierGenresText = outlierIndices.map(function (index) {
    return genres[index];
});

var outlierSales = outlierIndices.map(function (index) {
    return totalSales[index];
});

var outlierScores = outlierIndices.map(function (index) {
    return avgCriticScores[index];
});

var outlierCounts = outlierIndices.map(function (index) {
    return gameCounts[index];
});

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

var correlationData = [{
    x: avgCriticScores,
    y: totalSales,
    text: genres,
    customdata: gameCounts,
    type: 'scatter',
    mode: 'markers',
    hovertemplate: '<b>%{text}</b><br>Avg critic score: %{x:.2f}<br>Total sales: %{y:.2f}M<br>Games: %{customdata}<extra></extra>',
    marker: {
        size: gameCounts.map(function (count) {
            return Math.max(10, count / 55);
        }),
        color: colors,
        opacity: 0.9,
        line: {
            color: 'rgba(255,255,255,0.3)',
            width: 1.2
        }
    }
}, {
    x: outlierScores,
    y: outlierSales,
    customdata: outlierCounts,
    type: 'scatter',
    mode: 'markers',
    hovertemplate: '<b>%{text}</b><br>Avg critic score: %{x:.2f}<br>Total sales: %{y:.2f}M<br>Games: %{customdata}<extra></extra>',
    text: outlierGenresText,
    marker: {
        size: outlierCounts.map(function (count) {
            return Math.max(14, count / 42);
        }),
        color: outlierGenres.map(function (genre) {
            return colors[genres.indexOf(genre) % colors.length];
        }),
        opacity: 1,
        line: {
            color: 'rgba(255,255,255,0.95)',
            width: 2
        }
    },
    showlegend: false
}];

var correlationLayout = {
    title: {
        text: 'Critic Score vs Total Sales by Genre',
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
        l: 70,
        r: 30,
        t: 90,
        b: 70
    },
    showlegend: false,
    hovermode: 'closest',
    xaxis: {
        title: 'Average critic score',
        gridcolor: 'rgba(132, 155, 255, 0.12)',
        zeroline: false,
        range: [6.5, 9.5]
    },
    yaxis: {
        title: 'Total sales (million units)',
        gridcolor: 'rgba(132, 155, 255, 0.12)',
        zeroline: false
    },
    annotations: [
        {
            x: 7.327276,
            y: 1186.77,
            xref: 'x',
            yref: 'y',
            text: 'Sports',
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 1,
            arrowcolor: 'rgba(247, 249, 255, 0.72)',
            ax: -18,
            ay: -58,
            xanchor: 'left',
            yanchor: 'bottom',
            bgcolor: 'rgba(8, 12, 24, 0.85)',
            bordercolor: 'rgba(132, 155, 255, 0.45)',
            borderpad: 4,
            font: {
                color: '#f7f9ff',
                size: 13,
                family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }
        },
        {
            x: 7.144212,
            y: 1124.95,
            xref: 'x',
            yref: 'y',
            text: 'Action',
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 1,
            arrowcolor: 'rgba(247, 249, 255, 0.72)',
            ax: 12,
            ay: -52,
            xanchor: 'left',
            yanchor: 'bottom',
            bgcolor: 'rgba(8, 12, 24, 0.85)',
            bordercolor: 'rgba(132, 155, 255, 0.45)',
            borderpad: 4,
            font: {
                color: '#f7f9ff',
                size: 13,
                family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }
        },
        {
            x: 7.269595,
            y: 995.47,
            xref: 'x',
            yref: 'y',
            text: 'Shooter',
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 1,
            arrowcolor: 'rgba(247, 249, 255, 0.72)',
            ax: 38,
            ay: 42,
            xanchor: 'left',
            yanchor: 'bottom',
            bgcolor: 'rgba(8, 12, 24, 0.85)',
            bordercolor: 'rgba(132, 155, 255, 0.45)',
            borderpad: 4,
            font: {
                color: '#f7f9ff',
                size: 13,
                family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }
        },
        {
            x: 9.2,
            y: 1.89,
            xref: 'x',
            yref: 'y',
            text: 'Sandbox',
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 1,
            arrowcolor: 'rgba(247, 249, 255, 0.72)',
            ax: 56,
            ay: -10,
            xanchor: 'left',
            yanchor: 'middle',
            bgcolor: 'rgba(8, 12, 24, 0.85)',
            bordercolor: 'rgba(132, 155, 255, 0.45)',
            borderpad: 4,
            font: {
                color: '#f7f9ff',
                size: 13,
                family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }
        },
        {
            x: 6.633333,
            y: 0.33,
            xref: 'x',
            yref: 'y',
            text: 'Board Game',
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 1,
            arrowcolor: 'rgba(247, 249, 255, 0.72)',
            ax: 60,
            ay: -18,
            xanchor: 'left',
            yanchor: 'middle',
            bgcolor: 'rgba(8, 12, 24, 0.85)',
            bordercolor: 'rgba(132, 155, 255, 0.45)',
            borderpad: 4,
            font: {
                color: '#f7f9ff',
                size: 13,
                family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }
        }
    ],
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
Plotly.newPlot(CORRELATION, correlationData, correlationLayout, config);
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