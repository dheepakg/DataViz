// create svg element:
var svg = d3.select(".canvas").append("svg").attr("width", 600).attr("height", 600)

center = {'x1': 300, 'y1':300}
radius  = 200
offset = 50
no_of_lines = 60
marker_lines = 12
indefinite_rotation = true
// indefinite_rotation = false

// Marker circle - holds 12 lines in the watchface
svg.append('circle')
    .attr('cx', center.x1)
    .attr('cy', center.y1)
    .attr('r', radius * 1.15)
    .attr('stroke', 'black')
    .attr('fill', 'blue')
    .attr('opacity', 0.05)


// Creates 12 lines on watch face

for (let i = 0; i <= marker_lines ; i++) {


        var x_calc = center.x1 + (radius * 1.15) * Math.cos(2* Math.PI * ( i) / marker_lines);

        var y_calc = center.x1 + (radius * 1.15) * Math.sin(2*  Math.PI * ( i) / marker_lines);

        // Marker line along radius
        svg.append('line')
            .attr('x1', center.x1)
            .attr('y1', center.y1)
            .attr('x2', x_calc)
            .attr('y2', y_calc )
            .attr('stroke', 'green')
            .attr('stroke-width',2)
            .attr("class", "line_marker")

    }





// Bigger circle
svg.append('circle')
    .attr('cx', center.x1)
    .attr('cy', center.y1)
    .attr('r', radius)
    // .attr('stroke', 'blue')
    .attr('fill', '#eadbcb');

// Centre point
svg.append('circle')
    .attr('cx', center.x1)
    .attr('cy', center.y1)
    .attr('r', radius/100)
    .attr('stroke', 'black')
    .attr('fill', 'blue')






    // Vertical line
svg.append('line')
    .attr('x1', center.x1)
    .attr('y1', center.x1 + center.y1 - offset)
    .attr('x2', center.x1 )
    .attr('y2', center.x1 - center.y1 + offset )
    .attr('stroke', 'grey')
    .attr('opacity',0.1);

    // Horizontal line
svg.append('line')
    .attr('x1', center.x1 + center.y1 - offset)
    .attr('y1', center.y1)
    .attr('x2', center.x1 - center.y1 + offset )
    .attr('y2', center.y1 )
    .attr('stroke', 'grey')
    .attr('opacity',0.1);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


var date = new Date();
secs = date.getSeconds();



async function angle_for_radius() {
    for (let j = 46; j <= no_of_lines ; j++) {
        // j = 46; to sync the seconds hand with the 90degree.
        // Do not modify
        i = j + secs;
        // secs = 0;


        var x_calc = center.x1 + radius * Math.cos(2* Math.PI * ( i) / no_of_lines);

        var y_calc = center.x1 + radius * Math.sin(2*  Math.PI * ( i) / no_of_lines);

        console.log('angle',i, ( i), 2*Math.PI * ( i)/no_of_lines)

        await sleep(1000);

        // To remove the radius from prev position
        d3.select(".line").remove();
        d3.select(".time_secs").remove();

        svg.append('text')
            .attr('x', 500)
            .attr('y', 120)
            .text(function(d) {
                    var d = new Date();
                    return String(d.getMinutes()).padStart(2,'0') + ':'+ String(d.getSeconds()).padStart(2,'0'); })
            .attr("class", "time_secs");

        console.log(x_calc, y_calc)

            // Rotating radius
        svg.append('line')
            .attr('x1', center.x1)
            .attr('y1', center.y1)
            .attr('x2', x_calc)
            .attr('y2', y_calc )
            .attr('stroke', 'red')
            .attr('stroke-width',2)
            .attr("class", "line")

        // To have the radius rotates indefinitely
        if (j == no_of_lines && indefinite_rotation == true)  {
            j = 0;
        }

    }

    }


angle_for_radius()

