d3.csv("data/paratge.csv", function(error, data) {
   
    var hauteur = 500;
    var largeur = 1100;
    var marge = {haut: 20, droite:30, bas:20, gauche: 30};

    var graphe = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(-200))
        .force("charge", d3.forceLink().id(function(d){return /*noeuds*/d.t_id;}).distance(40))
        .force("x", d3.forceX(largeur/ 2)).force("y", d3.forceY(hauteur / 2))
        .on("tick",ticked);

    var lien = d3.select("#svg1")
        .selectAll(".link");
    var noeud = d3.select("#svg1")
        .selectAll(".node");

    graphe.nodes(/*tableau noeuds*/);
    graphe.force("link").links(data);

    lien = lien.data(data)
        .enter()
        .append("line")
        .style("stroke", "grey")
        .style("stroke-opacity", 0.5)
        .attr("class", "link").style("stroke-width", d => d.nbpartages);

    noeud = lien.data(/*tableau noeuds*/)
        .enter()
        .append("circle")
        .style("stroke", "black")
        .style("fill", "blue")
        .attr("class", "node")
        .attr("r", 5).style("stroke-width", 1.5);

    function ticked(){
        lien.attr("x1", function(d){return d.t_id.x;})
        .attr("y1", function(d){return d.t_id.y;})
        .attr("x2", function(d){return d.rt_id.x;})
        .attr("y2", function(d){return d.rt_id.y;});

        noeud.attr("cx", function(d){return d.x;})
        .attr("cy", function(d){return d.y;});
    }
});