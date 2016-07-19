// Set the dimensions of the canvas / graph
var city = ["beijing", "shanghai", "chengdu", "shenyang", "guangzhou", "jakata_central", "jakata_south", "haoni", "dhaka","HoChiMinhCity","NewDelhi","Ulaanbaatar"]

var city_beijing = {Name:"beijing", country:"China", latlon:[39.916667,116.383333]};
var city_shanghai = {Name:"shanghai", country:"China",latlon:[31.228611,121.474722]};
var city_chengdu = {Name:"chengdu", country:"China",latlon:[30.658611,104.064722]};
var city_shenyang = {Name:"shenyang", country:"China",latlon:[[41.8056990, 123.4314720]]};
var city_guangzhou = {Name:"guangzhou", country:"China",latlon:[23.133333,113.266667]};
var city_jakata_central = {Name:"jakarta_central", country:"Indonesia", latlon:[-6.2087630,106.8455990]};
var city_jakata_south = {Name:"jakarta_south", country:"Indonesia", latlon:[-6.268611,106.806111]};
var city_haoni = {Name:"haoni", country:"Vietnam",latlon:[21.028472,105.854167]};
var city_dhaka = {Name:"dhaka", country:"Bangladesh",latlon:[23.7,90.366667]};
var city_HoChiMinhCity = {Name:"HoChiMinhCity",country:"Vietnam", latlon:[10.776889,106.700806]};
var city_NewDelhi = {Name:"NewDelhi", country:"India", latlon:[28.613889,77.208889]};
var city_Ulaanbaatar = {Name:"Ulaanbaatar", country:"Mongolia", latlon:[47.92,106.92]};



function draw(datapath){
	var	margin = {top: 30, right: 20, bottom: 30, left: 50},
		width = 600 - margin.left - margin.right,
		height = 270 - margin.top - margin.bottom;

	// Parse the date / time
	var	parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
	var formatTime = d3.time.format("%eth%B %I%p");// Format tooltip date / time

	// Set the ranges
	var	x = d3.time.scale().range([0, width]);
	var	y = d3.scale.linear().range([height, 0]);

	// Define the axes
	var	xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(5)
		.tickFormat(d3.time.format("%m-%d %I%p"));;

	var	yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(6);

	// Define the line
	var	valueline = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.concentration); });

	// Define 'div' for tooltips
		var div = d3.select("body")
		.append("div")  // declare the tooltip div 
		.attr("class", "tooltip")              // apply the 'tooltip' class
		.style("opacity", 0);                  // set the opacity to nil

	// Adds the svg canvas
	var	svg = d3.select("#info")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", 
			      "translate(" + margin.left + "," + margin.top + ")");

	// Get the data
	d3.csv(datapath, function(error, data) {
		data.forEach(function(d) {
			d.date = parseDate(d.date);
			d.concentration = +d.concentration;
		});

		// Scale the range of the data
		x.domain(d3.extent(data, function(d) { return d.date; }));
		y.domain([0, d3.max(data, function(d) { return d.concentration; })]);

		// Add the valueline path.
		svg.append("path")		
			.attr("class", "line")
			.attr("d", valueline(data));

		// draw the scatterplot
		svg.selectAll("dot")									
			.data(data)											
		.enter().append("circle")								
			.attr("r", 5)	
			.attr("cx", function(d) { return x(d.date); })		 
			.attr("cy", function(d) { return y(d.concentration); })
		// Tooltip stuff after this
		    .on("mouseover", function(d) {		
	            div.transition()
					.duration(500)	
					.style("opacity", 0);
				div.transition()
					.duration(200)	
					.style("opacity", .9);	
				div	.html(
					'<a>' + // The first <a> tag
					formatTime(d.date) +
					"</a>" +                        // closing </a> tag
					"<br/>"  + d.concentration + "ug/m3")	 
					.style("left", (d3.event.pageX) + "px")			 
					.style("top", (d3.event.pageY - 28) + "px");
				})
		     .on('mouseout', function() {
     		 div
      		.transition()
        	.delay(100)
        	.duration(600)
        	.style("opacity",0)
        	.style('pointer-events', 'none')
     		});

		// Add the X Axis
		svg.append("g")	
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		// Add the Y Axis
		svg.append("g")	
			.attr("class", "y axis")
			.call(yAxis);

		svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Pm2.5 concentration(ug/m3) vs Time");


	});
	

}

function haoni() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/haoni.csv";
	draw(datapath);
	marker_haoni.bindPopup("<b>Haoni</b><br>Vietnam").openPopup();
}

function jakata_central() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/jakata_central.csv";
	draw(datapath);
	marker_jakatacen.bindPopup("<b>Central Jakarta</b><br>Indonesia").openPopup();
}

function jakata_south() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/jakata_south.csv";
	draw(datapath);
	marker_jakatasou.bindPopup("<b>South Jakarta</b><br>Indonesia").openPopup();

}

function shenyang() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/shenyang.csv";
	draw(datapath);
	marker_shenyang.bindPopup("<b>Shenyang</b><br>China").openPopup();
}

function beijing() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/beijing.csv";
	draw(datapath);
	marker_beijing.bindPopup("<b>Beijing</b><br>China").openPopup();
}

function shanghai() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/shanghai.csv";
	draw(datapath);
	marker_shanghai.bindPopup("<b>Shanghai</b><br>China").openPopup();

}
function guangzhou() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/guangzhou.csv";
	draw(datapath);
	marker_guangzhou.bindPopup("<b>Guangzhou</b><br>China").openPopup();
}
function chengdu() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/chengdu.csv";
	draw(datapath);
	marker_chengdu.bindPopup("<b>Chengdu</b><br>China").openPopup();
}
function Ulaanbaatar() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/Ulaanbaatar.csv";
	draw(datapath);
	marker_Ulaanbaatar.bindPopup("<b>Ulaanbaatar</b><br>Mongolia").openPopup();
}
function dhaka() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/dhaka.csv";
	draw(datapath);
	marker_dhaka.bindPopup("<b>Dhaka</b><br>Bangladesh").openPopup();
}
function HoChiMinhCity() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/HoChiMinhCity.csv";
	draw(datapath);
	marker_HoChiMinhCity.bindPopup("<b>HoChiMinhCity</b><br>Vietnam").openPopup();
}
function NewDelhi() {
	d3.select("svg").remove();
	console.log("here");
	var datapath = "data/NewDelhi.csv";
	draw(datapath);
	marker_NewDelhi.bindPopup("<b>NewDelhi</b><br>India").openPopup();

}


// var datapath = "data/haoni.csv";
// window.onload = draw(datapath);

d3.select('#haoni')
    .on("mouseover",haoni);

d3.select('#jcentral')
    .on("mouseover",jakata_central);

d3.select('#jsouth')
    .on("mouseover",jakata_south);

d3.select('#shenyang')
    .on("mouseover",shenyang);

d3.select('#Beijing')
    .on("mouseover",beijing);

d3.select('#Shanghai')
    .on("mouseover",shanghai);

d3.select('#Chengdu')
    .on("mouseover",chengdu);
   
d3.select('#Guangzhou')
    .on("mouseover",guangzhou);
   
d3.select('#Ulaanbaatar')
    .on("mouseover",Ulaanbaatar);
   
d3.select('#dhaka')
    .on("mouseover",dhaka);
   
d3.select('#HoChiMinhCity')
    .on("mouseover",HoChiMinhCity);
   
d3.select('#NewDelhi')
    .on("mouseover",NewDelhi);
   


var marker_haoni = L.marker([21.028472,105.854167]).addTo(mymap).on("click",haoni);
var marker_shenyang = L.marker([41.8056990, 123.4314720]).addTo(mymap).on("click",shenyang);
var marker_jakatacen = L.marker([-6.2087630,106.8455990]).addTo(mymap).on("click",jakata_central);
var marker_jakatasou = L.marker([-6.268611,106.806111]).addTo(mymap).on("click",jakata_south);
var marker_guangzhou = L.marker(city_guangzhou.latlon).addTo(mymap).on("click",guangzhou);
var marker_chengdu = L.marker(city_chengdu.latlon).addTo(mymap).on("click",chengdu);
var marker_shanghai = L.marker(city_shanghai.latlon).addTo(mymap).on("click",shanghai);
var marker_beijing = L.marker(city_beijing.latlon).addTo(mymap).on("click",beijing);
var marker_Ulaanbaatar = L.marker(city_Ulaanbaatar.latlon).addTo(mymap).on("click",Ulaanbaatar);
var marker_dhaka = L.marker(city_dhaka.latlon).addTo(mymap).on("click",dhaka);
var marker_NewDelhi = L.marker(city_NewDelhi.latlon).addTo(mymap).on("click",NewDelhi);
var marker_HoChiMinhCity = L.marker(city_HoChiMinhCity.latlon).addTo(mymap).on("click",HoChiMinhCity);













