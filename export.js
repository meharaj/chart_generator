FusionCharts && FusionCharts.addEventListener("ready", function () {
    var win = window,
        doc = win.document,
        FusionCharts = this,
        
        // We create a new FusionCharts and render it at a specified container element.
        chart = new FusionCharts({
            renderAt: "chart-container",
            width: 500,
            height: 350,
            type: "doughnut3d",
            dataSource: {
                "chart": {
                    "caption": "Industrial Growth Rate",
                    "subcaption": "(Country)",
                    "decimals": "0",
                    "startingangle": "70"
                },
                "data": [
                    { "label": "France", "value": "17" },
                    { "label": "India", "value": "12" },
                    { "label": "Brazil", "value": "18" },
                    { "label": "USA", "value": "8", "issliced": "1" },
                    { "label": "Australia", "value": "10", "issliced": "1" },
                    { "label": "Japan", "value": "16", "issliced": "1" }, 
                    { "label": "England", "value": "11" },
                    { "label": "Nigeria", "value": "12" },
                    { "label": "Italy", "value": "8" },
                    { "label": "China", "value": "10" },
                    { "label": "Canada", "value": "19" },
                    { "label": "Germany", "value": "15" }
                ]
            }
        }).render();

    chart.addEventListener("rendered", function (e) {
        var exportbtn = doc.getElementById('export-canvas'),
            savebtn = doc.getElementById('export-image'),
            canvascard = doc.getElementById("canvascard"),
            canvas = doc.getElementById("chart-canvas"),
            chart = e.sender;
        
        canvas.setAttribute("width", chart.width + "px");
        canvas.setAttribute("height", chart.height + "px");
        canvas.style.display = "block";
        
        exportbtn.removeAttribute('disabled');
        exportbtn.onclick = function () {
            parent.document.getElementById('3541-export').style.height = '800px';
            // Show canvas area that was initially hidden
            canvascard.style.display = "inline-block";
            
            // All the magic happens within canvg where we pass the SVG string of the chart by using the
            // 'getSVGString' function on the chart.
            canvg(canvas, chart.getSVGString(), { 
                ignoreMouse: true, 
                ignoreAnimation: true 
            });
            
            savebtn.removeAttribute('disabled');
            exportbtn.innerHTML = "Redraw to Canvas";
        };
        
        savebtn.onclick = function () {
            win.location.href = canvas.toDataURL().replace("image/png", 
                "image/octet-stream;content-disposition:attachment; filename=fusioncharts");
        };
    });
    
});