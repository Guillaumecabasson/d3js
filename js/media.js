d3.csv("data/medias.csv", function(error, data1) {

    d3.csv("data/article_profil.csv", function(error, data) {


        data.forEach(element => {
            console.log(data1.find(e => e.nom == element.media));
            console.log(element.jours);
            var nbHeures = Number(data1.find(e => e.nom == element.media).heures);
            data1.find(e => e.nom == element.media).heures = nbHeures + (Number(element.heures) + (Number(element.jours) * 24));
        });

        console.log(data1);
        data1.sort(function(a, b) {
            return - a.heures + b.heures;
          });
        
          var data11 = data1.slice(0,data1.length/2);
          var data12 = data1.slice(data1.length/2, data1.length);
        
        console.log(data11);
        console.log(data12);

        var marge = {haut: 20, droite:30, bas:20, gauche: 50};
        var hauteur = 500;
        var largeur = 1000;


        var xScale = d3.scaleBand().domain(data11.map(d => d.nom)).range([marge.gauche, largeur]);
        var yScale = d3.scaleLinear().domain([0, d3.max(data11, d => d.heures)]).range([hauteur - marge.bas, marge.haut]);

        var xAxis = g => g
            .attr("transform", `translate(0,${hauteur-marge.bas})`)
            .call(d3.axisBottom(xScale).tickSizeOuter(0));
        var yAxis = g => g
            .attr("transform", `translate(${marge.gauche} ,0)`)
            .call(d3.axisLeft(yScale));
            
        d3.select('#svg4').selectAll("rect")
            .data(data11)
            .enter()
            .append("rect")
            .style("fill", "steelblue")
            .style("stroke", "white")
            .attr("y", function(d) {
                return yScale(d.heures)
            })
            .attr("height", function(d) {
                return yScale(0) - yScale(d.heures);
            })
            .attr("width", xScale.bandwidth() - 1)
            .attr("x", function(d, i) {
                return xScale(d.nom);
            });

        d3.select('#svg4').append("text")             
            .attr("transform", `translate(${largeur}, ${hauteur+marge.haut})`)
            .style("text-anchor", "end")
            .text("Nombre d'heures'");
        
        d3.select('#svg4').append("text")	
		    .attr("transform", "rotate(-90)")	
            .attr("y", marge.haut-3)
            .attr("x", marge.gauche*5)
            .style("text-anchor", "end")
            .text("Médias");
            
        d3.select('#svg4').append("g").call(xAxis);
        d3.select('#svg4').append("g").call(yAxis);

        largeur = 1200;

        var xScale = d3.scaleBand().domain(data12.map(d => d.nom)).range([marge.gauche, largeur]);
        var yScale = d3.scaleLinear().domain([0, d3.max(data12, d => d.heures)]).range([hauteur - marge.bas, marge.haut]);

        var xAxis = g => g
            .attr("transform", `translate(0,${hauteur-marge.bas})`)
            .call(d3.axisBottom(xScale).tickSizeOuter(0));
        var yAxis = g => g
            .attr("transform", `translate(${marge.gauche} ,0)`)
            .call(d3.axisLeft(yScale));
            
        d3.select('#svg5').selectAll("rect")
            .data(data12)
            .enter()
            .append("rect")
            .style("fill", "steelblue")
            .style("stroke", "white")
            .attr("y", function(d) {
                return yScale(d.heures)
            })
            .attr("height", function(d) {
                return yScale(0) - yScale(d.heures);
            })
            .attr("width", xScale.bandwidth() - 1)
            .attr("x", function(d, i) {
                return xScale(d.nom);
            });
            
        d3.select('#svg5').append("g").call(xAxis);
        d3.select('#svg5').append("g").call(yAxis);

        d3.select('#svg5').append("text")             
            .attr("transform", `translate(${largeur}, ${hauteur+marge.haut+15})`)
            .style("text-anchor", "end")
            .text("Nombre d'heures'");
        
        d3.select('#svg5').append("text")	
            .attr("y", marge.haut-3)
            .attr("x", marge.gauche*5)
            .style("text-anchor", "end")
            .text("Médias");

    });

});
