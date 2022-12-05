d3.json('https://raw.githubusercontent.com/JamieTheKey/Interactive-Data-Story-China-s-Migrant-Children/main/data/together_data.json',function(error,data){
    if (error) {
        console.log('error');
        throw error
    }
})
.then(data=>{

    const  margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select(".together-index-chart")
    .append("svg")
    .attr("width", '100%')
    .attr("height", height + margin.top + margin.bottom)
    .attr('display','block')
    .attr('viewBox','0 0 460 400')
    .attr('preserveAspectRatio','xMidYMid meet')
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    const xScale = d3.scaleLinear()
        .domain([2010,2020])
        .range([0,width])
    svg.append('g')
        .attr('transform','translate(0,'+height+')')
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))

    const yScale = d3.scaleLinear()
        .domain([0,1])
        .range([height,0])
    svg.append('g')
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")))
    svg.append('path')
        .datum(data)
        .attr('fill',function(d){
            return 'none';
        })
        .attr('stroke','black')
        .attr('d',d3.line()
            .x(function(d){return xScale(d.year)})
            .y(function(d){return yScale(d.index)})
            )
})

d3.json('https://raw.githubusercontent.com/JamieTheKey/Interactive-Data-Story-China-s-Migrant-Children/main/data/difficult_data.json',function(error,data){
    if (error) {
        throw error
    }
})
.then(data=>{

    const  margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select(".difficult-index-chart")
    .append("svg")
        .attr("width", '100%')
        .attr("height", height + margin.top + margin.bottom)
        .attr('display','block')
        .attr('viewBox','0 0 460 400')
        .attr('preserveAspectRatio','xMidYMid meet')
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    const xScale = d3.scaleLinear()
        .domain([2016,2020])
        .range([0,width])
    svg.append('g')
        .attr('transform','translate(0,'+height+')')
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))

    const yScale = d3.scaleLinear()
        .domain([0,1])
        .range([height,0])
    svg.append('g')
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")))
    svg.append('path')
        .datum(data)
        .attr('fill',function(d){

            return 'none';
        })
        .attr('stroke','#38533D')
        .attr('d',d3.line()
            .x(function(d){return xScale(d.year)})
            .y(function(d){return yScale(d.index)})
            )
})

d3.json('https://raw.githubusercontent.com/JamieTheKey/Interactive-Data-Story-China-s-Migrant-Children/main/data/attendance_data.json',function (error,data) {
    if(error){
        throw error;
    }
})
.then(data=>{
    const year = data.map(function(item){
        return item.year;
    })
    const precentForm =Intl.NumberFormat('en-US',{
        style:'percent'
    })

    const  margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

    const svg = d3.select('.attendance-chart')
        .append('svg')
            .attr("width", '100%')
            .attr("height", height + margin.top + margin.bottom)
            .attr('display','block')
            .attr('viewBox','0 0 460 400')
            .attr('preserveAspectRatio','xMidYMid meet')
        .append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')'); 
    const tooltip = d3.select('.attendance-chart')
        .append("div")
        .style("opacity",0)
        .attr("id","tooltip")
        .style('position','absolute')
        .style('padding','5px')
        .style("background-color", "white")
        .style("border","solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style('pointer-events','none'); 
    const xScale = d3.scaleBand()
        .domain(year)
        .range([0,width])
    svg.append('g')
        .attr('transform','translate(0,'+height+')')
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
    const bandWidth = width/5 -10;
    const yScale = d3.scaleLinear()
        .domain([0,1])
        .range([height,0])
    svg.append('g')
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")))
    
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
            .attr('height',function(d){ return height-yScale(d.rate)})
            .attr('width',bandWidth)
            .attr('y',function(d){ return yScale(d.rate)})
            .attr('x',function(d){return xScale(d.year)+5})
            .attr('fill','#FFF899')
            .on('mouseover', function (event, d) { 
                d3.select(this).style('fill','#FFD9CA')
                tooltip.style('opacity', 0.85)
                tooltip
                .html(
                    '年份：'+d.year+
                    '<br>有效样本数量：'+d.effective_sample_size+
                    '<br>当年入学人数：'+d.school_attendance+
                    '<br>在学率：'+precentForm.format(d.rate)
                )
                .style('left', event.pageX +5+ 'px') // change the position of the tooltip
                .style('top', event.pageY - 28 + 'px')
            })
            .on('mouseout', function () {
                tooltip.style('opacity', 0);
                d3.select(this).style('fill','#FFF899')
            });

        
    })

d3.json('https://raw.githubusercontent.com/JamieTheKey/Interactive-Data-Story-China-s-Migrant-Children/main/data/high_school_data.json',function (error,data) {
    if(error){
        throw error;
    }
})
.then(data=>{
    const year = data.map(function(item){
        return item.year;
    })

    let bar_data = []
        data.forEach(obj => {
        bar_data.push([obj.normal_high_school_percentage, obj.professional_school_percentage]);
    });
    const precentForm =Intl.NumberFormat('en-US',{
        style:'percent'
    })

    const  margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

    const svg = d3.select('.school-chart')
        .append('svg')
            .attr("width", '100%')
            .attr("height", height + margin.top + margin.bottom)
            .attr('display','block')
            .attr('viewBox','0 0 460 400')
            .attr('preserveAspectRatio','xMidYMid meet')
        .append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')'); 
    const tooltip = d3.select('.attendance-chart')
        .append("div")
        .style("opacity",0)
        .attr("id","tooltip")
        .style('position','absolute')
        .style('padding','5px')
        .style("background-color", "white")
        .style("border","solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style('pointer-events','none'); 
    const xScale = d3.scaleBand()
        .domain(year)
        .range([0,width])
        .padding([0.2])
    svg.append('g')
        .attr('transform','translate(0,'+height+')')
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
    const bandWidth = width/8 - 10;
    const yScale = d3.scaleLinear()
        .domain([0,0.5])
        .range([height,0])
    svg.append('g')
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")))

    const color = ["#FFD9CA","#FFF899"];
    // 增加group区域
    const group = svg.append('g')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
            .attr('class','barContainer')
            .attr('transform',function(d){ 
                    return 'translate('+xScale(d.year)+',0)';
                })
            .attr('index',function(d,i){return i})
            .on('mouseover', function (event, d) {
                tooltip.style('opacity', 0.85)
                tooltip
                .html(
                    '年份：'+d.year+
                    '<br>普高学生人数：'+d.normal_high_school_num+
                    '<br>职校学生人数：'+d.professional_school_num+
                    '<br>总人数：'+d.total_num
                )
                .style('left', event.pageX +5+ 'px') // change the position of the tooltip
                .style('top', event.pageY - 28 + 'px')
            })
            .on('mouseout', function () {
                tooltip.style('opacity', 0);
            })
            .selectAll('rect')
                .data(function(){
                    const index = parseInt(this.getAttribute('index'));
                    return bar_data[index];
                })
                .enter()
                .append('rect')
                    // .html(precentForm.format(d))
                    .attr('width',bandWidth)
                    .attr('height',function(d){
                        return height - yScale(d);
                    })
                    .style('fill',function(d,i){return color[i]})
                    .attr('y',function(d){ return yScale(d)})
                    .attr('x',function(d,i){ return bandWidth*i})


        
    })