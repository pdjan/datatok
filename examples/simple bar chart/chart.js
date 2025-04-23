// set data

const data = [
  { name: "A", value: 30 },
  { name: "B", value: 80 },
  { name: "C", value: 45 },
  { name: "D", value: 60 },
  { name: "E", value: 20 },
  { name: "F", value: 90 },
  { name: "G", value: 55 }
];

// set dimensions and margins

const margin = { top: 30, right: 30, bottom: 40, left: 40 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

const svg = d3.select("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

// create scales

const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, width])
            .padding(0.2);

const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([height, 0]);


// add axes

svg.append("g")
   .attr("transform", `translate(0,${height})`)
   .call(d3.axisBottom(x));

svg.append("g")
   .call(d3.axisLeft(y));

// draw the bars

svg.selectAll(".bar")
   .data(data)
   .enter()
   .append("rect")
   .attr("class", "bar")
   .attr("x", d => x(d.name))
   .attr("y", d => y(d.value))
   .attr("width", x.bandwidth())
   .attr("height", d => height - y(d.value));

// add labels or tooltips (optional)

svg.selectAll(".label")
   .data(data)
   .enter()
   .append("text")
   .attr("x", d => x(d.name) + x.bandwidth() / 2)
   .attr("y", d => y(d.value) - 5)
   .attr("text-anchor", "middle")
   .text(d => d.value);
