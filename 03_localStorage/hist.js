$('#generate').click(function() {

    localStorage.removeItem('A');
    localStorage.removeItem('B');

    $('#uniformHistogramA').empty();
    $('#uniformHistogramB').empty();
    $('#normalHistogramA').empty();
    $('#normalHistogramB').empty();

    // Arrays retrieved from localStorage or created as new arrays
    let randArrayA = JSON.parse(localStorage.getItem('A')) || [];
    let randArrayB = JSON.parse(localStorage.getItem('B')) || [];
  
    // Generate 10000 uniform random numbers
    for (let i = 0; i < 10000; i++) {
        let rand1 = Math.random();
        let rand2 = Math.random();

        // Add new random numbers to the arrays
        randArrayA.push(rand1);
        randArrayB.push(rand2);
    }
  
    // Save the updated arrays to localStorage
    localStorage.setItem('A', JSON.stringify(randArrayA));
    localStorage.setItem('B', JSON.stringify(randArrayB));
  
    // Draw uniform random number histograms
    drawUniHist(randArrayA, '#uniformHistogramA');
    drawUniHist(randArrayB, '#uniformHistogramB');
  
    // Arrays for normal distribution
    let zArrayA = [];
    let zArrayB = [];
    
    // Box-Muller transform to generate normal distribution
    for (let i = 0; i < randArrayA.length; i++) {
      let u1 = randArrayA[i];
      let u2 = randArrayB[i];
      let z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      let z2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
      zArrayA.push(z1);
      zArrayB.push(z2);
    }
    drawNormHist(zArrayA, '#normalHistogramA');
    drawNormHist(zArrayB, '#normalHistogramB');  
});

function drawUniHist(data, drawingArea) {
    // SVGのサイズとマージンを定義
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
  
    // X軸のスケールを定義
    const x = d3.scaleLinear()
        .domain([0, 1]) // データは0から1の範囲
        .range([0, width]);
  
    // データをビンに分割
    const histogram = d3.histogram()
        .value(d => d)
        .domain(x.domain())
        .thresholds(x.ticks(40)); // ビンの数を40に設定
  
    const bins = histogram(data);
  
    // Y軸のスケールを定義
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(bins, d => d.length)]); // ビンの最大値に基づいてスケールを定義
    
    // SVG要素を追加する前に既存のSVG要素をクリア
    d3.select(drawingArea).selectAll("svg").remove();
  

    // SVGを選択し、サイズを設定
    const svg = d3.select(drawingArea)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // 既存のビジュアライザー要素をクリア
    svg.selectAll("*").remove();

    // ビンのデータを基にバーを作成し、SVGに追加
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", d => x(d.x0) + 1)
        .attr("transform", d => "translate(0," + y(d.length) + ")")
        .attr("width", d => x(d.x1) - x(d.x0) - 1)
        .attr("height", d => height - y(d.length))
        .style("fill", "#69b3a2");

    // X軸をSVGに追加
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Y軸をSVGに追加
    svg.append("g")
        .call(d3.axisLeft(y));
  }

  function drawNormHist(data, drawingArea) {
    // Define the size and margins of the SVG
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
  
    // Define the scale for the x-axis (fixed range from -4 to 4)
    const x = d3.scaleLinear()
        .domain([-4, 4])
        .range([0, width]);
  
    // Configure the bins
    const histogram = d3.histogram()
        .value(d => d)
        .domain(x.domain())
        .thresholds(x.ticks(40)); // Set the number of bins to 40
  
    const bins = histogram(data);
  
    // Define the scale for the y-axis
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(bins, d => d.length)]); // Scale based on the maximum value in the bins
    
    // Clear any existing SVG elements before adding new ones
    d3.select(drawingArea).selectAll("svg").remove();

    // Select the SVG and set its size
    const svg = d3.select(drawingArea)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Clear any existing visualizer elements
    d3.select(drawingArea).selectAll("svg").remove();
  
    // Create bars based on the bin data and add them to the SVG
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", d => x(d.x0) + 1)
        .attr("transform", d => `translate(0,${y(d.length)})`)
        .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1)) // Prevent negative widths by ensuring a minimum width of 0
        .attr("height", d => height - y(d.length))
        .style("fill", "#69b3a2");
  
    // Add the x-axis to the SVG
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
  
    // Add the y-axis to the SVG
    svg.append("g")
        .call(d3.axisLeft(y));
}

  

  $('#clearStorage').click(function() {
    // Remove the data related to uniform histograms from local storage
    localStorage.clear();

    // Clear the SVG or content within the histogram elements for uniform histograms
    $('#uniformHistogramA').empty();
    $('#uniformHistogramB').empty();
    // Clear the SVG or content within the histogram elements for normal histograms
    $('#normalHistogramA').empty();
    $('#normalHistogramB').empty();
});

