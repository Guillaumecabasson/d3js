
d3.csv("data/user_profil.csv", function(error, data) {
    
    var marge = {haut: 20, droite:30, bas:20, gauche: 30};
    var hauteur = 500;
    var largeur = 1100;
    var xScale = d3.scaleLinear().domain([0, 171196]).range([marge.gauche, largeur -marge.droite]);
    var yScale = d3.scaleLinear().domain([0, 42850]).range([hauteur - marge.bas, marge.haut]);

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



    var xScale1 = d3.scaleLinear().domain([0, d3.max(data, d => d.nbtweets)]).range([marge.gauche, largeur -marge.droite]);
    var yScale1 = d3.scaleLinear().domain([0, d3.max(data, d => d.nbsuiveurs)]).range([hauteur - marge.bas, marge.haut]);

    var xAxis1 = g => g
        .attr("transform", `translate(0,${hauteur-marge.bas})`)
        .call(d3.axisBottom(xScale1).tickSizeOuter(0));
    var yAxis1 = g => g
        .attr("transform", `translate(${marge.gauche} ,0)`)
        .call(d3.axisLeft(yScale1));

    d3.select('#svg4')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style("fill", "blue")
        .style("stroke", "white")
        .attr("cx", function(d) {
            return xScale1(d.nbtweets);
        })
        .attr("cy", function(d, i) {
            return yScale1(d.nbsuiveurs);
        })
        .attr("r", 5)
        .attr("aux", function(d, i) {
            return d.id;
        });

    d3.select('#svg4').append("text")             
		.attr("transform", `translate(${largeur}, ${hauteur+marge.haut+15})`)
		.style("text-anchor", "end")
		.text("Nombre de tweets");
	
    d3.select('#svg4').append("text")	
		.attr("y", marge.haut-3)
		.attr("x", marge.gauche*5)
		.style("text-anchor", "end")
		.text("Nombre de suiveurs");
        
    d3.select('#svg4').append("g").call(xAxis1);
    d3.select('#svg4').append("g").call(yAxis1);


});


