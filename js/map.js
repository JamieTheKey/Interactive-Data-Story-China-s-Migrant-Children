// 人口地图
const floatingMapContainer = d3.select('.f-population-map')
// 定义画布大小
const width = 700;
const height = 525;
// 定义projector
const projection = d3.geoMercator()
    .center([115,40])
    .scale(600)
const path = d3.geoPath().projection(projection);

const svg = floatingMapContainer.append('svg')
    .attr('display','block')
    .attr('margin','0 auto')
    .attr('width','100%')
    .attr('height',height)
    .attr('viewBox','0 0 800 600')
    .attr('preserveAspectRatio','xMidYMid meet')
    .style('overflow-y','hidden')
// define the color scale
const colors = ["#40004b","#762a83","#9970ab","#c2a5cf","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"]
const colorScale = d3.scaleThreshold()
    .domain(d3.range(-1500,3000,500))
    .range(colors);
const makeGraph = function(geoData,population){
    const tooltip = d3.select('.f-population-map')
    .append('div')
    .style('opacity',0)
    .attr('id','tooltip')
    .style('position','absolute')
    .style('background-color','white')
    .style('padding','5px')
    .style('border','solid')
    .style('border-width','1px')
    .style('border-radius','5px')
    .style('pointer-events','none');
    svg
        .selectAll('path')
        .data(geoData.features)
        .enter()
        .append('path')
        .attr('d',path)
        .attr('fill',function(d) {
            let result = population.filter(function(obj){
                return obj.province === d.properties.name;
            })
            if(result[0]){
                return colorScale(parseInt(result[0].net_inflow));
            }
            return 'white';
        })
        .attr('net_inflow',function(d){
            let result = population.filter(function(obj){
                return obj.province === d.properties.name;
            })
            if(result[0]){
                return result[0].net_inflow;
            }
        })
        .attr('stroke','white')
        .on('mouseover',function(event,d){
            d3.select(this).style('stroke','#FFF899')
            tooltip.style('opacity',0.9)
                .html(function () {
                    let result = population.filter(function (obj) {
                        return obj.province === d.properties.name;
                    });
                    if (result[0]) {
                        return (
                        '地区:'+result[0].province +
                        '<br>净流入人口: ' +result[0].net_inflow +'万'+
                        '<br>本地人口: ' +result[0].permanent_residents+'万'+
                        '<br>移入人口: ' +result[0].migrant_population+'万'+
                        '<br>流出人口: ' +result[0].permanent_residents+'万'
                        );}
                    return 0;})
                .style('left', event.pageX +5+ 'px') // change the position of the tooltip
                .style('top', event.pageY - 28 + 'px')
        })
        .on('mouseout', function () {
            tooltip.style('opacity', 0)
            d3.select(this).style('stroke','white')
      });
}
// 数据链接
const geoUrl = 'https://geojson.cn/api/data/china.json';
const populationUrl = 'https://raw.githubusercontent.com/JamieTheKey/Interactive-Data-Story-China-s-Migrant-Children/main/data/floating_population_position_data.CSV';
// 读取数据 画图
Promise.all([d3.json(geoUrl),d3.csv(populationUrl)])
    .then(data=>makeGraph(data[0],data[1]))
    .catch(err=>console.log(err))

