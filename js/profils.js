
d3.csv("data/user_profil.csv", function(error, data) {
    var marge = {haut: 20, droite:30, bas:20, gauche: 30};
    var hauteur = 500;
    var largeur = d3.max(data, d => d.nbsuiveurs);
    var xScale = d3.scaleBand().domain(data.map(d => d.nbtweets)).range([marge.gauche, largeur]);
    var yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.nbsuiveurs)]).range([hauteur - marge.bas, marge.haut]);

    var xAxis = g => g
        .attr("transform", `translate(0,${hauteur-marge.bas})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0));
    var yAxis = g => g
        .attr("transform", `translate(${marge.gauche} ,0)`)
        .call(d3.axisLeft(yScale));

    d3.select('#svg3')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style("fill", "steelblue")
        .style("stroke", "white")
        .attr("cx", function(d) {
            return xScale(d.nbtweets);
        })
        .attr("cy", function(d, i) {
            return yScale(d.nbsuiveurs);
        })
        .attr("r", 5)
        .attr("aux", function(d, i) {
            return d.id;
        });

    d3.select('#svg3').append("text")             
		.attr("transform", `translate(${largeur}, ${hauteur+marge.haut+15})`)
		.style("text-anchor", "end")
		.text("Nombre de tweets");
	
    d3.select('#svg3').append("text")	
		.attr("y", marge.haut-3)
		.attr("x", marge.gauche*5)
		.style("text-anchor", "end")
		.text("Nombre de suiveurs");
        
    d3.select('#svg3').append("g").call(xAxis);
    d3.select('#svg3').append("g").call(yAxis);


});


