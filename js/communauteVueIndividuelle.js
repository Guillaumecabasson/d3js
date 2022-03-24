var width = 1000, height = 800;
d3.csv("data/messages3.csv").then((data12) => {
    d3.csv("data/partages.csv").then((data) => {

        var elements = data12.sort(function(a, b) {
            return  a.id - b.id;
          });


	    var selectedItem = elements[0];

        var colorScale = ['orange', 'lightblue', '#B19CD9'];
        var xCenter = [400, 100, 500];

        var userId = selectedItem.id;

        var dataBis = [];

        data.forEach(element => {
            if(element.t_id == userId){
                dataBis.push({id : element.rt_id, nb : element.nbpartages});
            }
        });


        var max = d3.max(dataBis, d => Number(d.nb));

        console.log(max);

        console.log(dataBis);

        var data1 = d3.range(dataBis.length).map(function(d, i) {
            console.log(dataBis[i]);
            return {
                id : dataBis[i].id, 
                nb : dataBis[i].nb,
                radius : ((Number(dataBis[i].nb)/max)*10)
            }
        });

        console.log(data1);

        var simulation = d3.forceSimulation(data1)
            .force('charge', d3.forceManyBody().strength(5))
            .force('center', d3.forceCenter(xCenter[0], xCenter[1]))
            .force('collision', d3.forceCollide().radius(function(d) {
                return d.radius;
            }))
            .on('tick', ticked);

        function ticked() {
            var u = d3.select('svg g')
                .selectAll('circle')
                .data(data1)
                .join('circle')
                .attr('r', function(d) {
                    return d.radius;
                })
                .style('fill', function(d) {
                    return colorScale[1];
                })
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                });
        }

        var selector = d3.select("#select2")
            .append("select")
            .attr("id","dropdown2")
            .on("change", function(d){
                var selectedElement = document.getElementById("dropdown2").value;
                console.log(selectedElement);
                userId = selectedElement;
                dataBis.length = 0;

                data.forEach(element => {
                    if(element.t_id == userId){
                        dataBis.push({id : element.rt_id, nb : element.nbpartages});
                        console.log(element.rt_id);
                    }
                });

                max = d3.max(dataBis, d => Number(d.nb));
                console.log(max);
console.log(dataBis);
                data1 = d3.range(dataBis.length).map(function(d, i) {
                    console.log(dataBis[i]);
                    return {
                        id : dataBis[i].id, 
                        nb : dataBis[i].nb,
                        radius : Number(dataBis[i].nb)* 10
                    }
                });
                

                simulation = d3.forceSimulation(data1)
                    .force('charge', d3.forceManyBody().strength(15))
                    .force('center', d3.forceCenter(xCenter[0], xCenter[1]))
                    .force('collision', d3.forceCollide().radius(function(d) {
                        return d.radius;
                    }))
                    .on('tick', ticked);
        
            });
        
            console.log(elements);
        // création des option du select avec les en-têtes des entreprises
        selector.selectAll("option")
        .data(elements)
        .enter().append("option")
        .attr("value", function(d){
            return d.id;
        })
        .text(function(d){
            return d.id;
        });
    });
});
