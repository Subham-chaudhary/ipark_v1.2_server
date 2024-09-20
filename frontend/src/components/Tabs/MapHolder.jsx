import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import '../Styles/MapHolder.css';
import mapData from '/src/maps/demo_map.svg'

const MapHolder = () => {
  const width = 1500;  //975
  const height = 1600;  //610
  const mapRef = useRef(null);
  const initializedRef = useRef(false);


  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

    const svg = d3.select(mapRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("style", "display: block;")
      .on("click", reset);

    const g = svg.append("g");

    // Load and parse the SVG file
    d3.xml(mapData).then(data => {
      const svgNode = data.documentElement;
      svgNode.setAttribute("width", width);
      svgNode.setAttribute("height", height);
      
      // Append the SVG content to the D3 group
      g.node().appendChild(svgNode);

      // Extract and render elements from the SVG
      renderSVGElements(svgNode, g);
    });

    function renderSVGElements(svgNode, g) {
      // Extract rectangles
      const rectsData = Array.from(svgNode.querySelectorAll('rect')).map(rect => ({
        x: rect.getAttribute('x'),
        y: rect.getAttribute('y'),
        width: rect.getAttribute('width'),
        height: rect.getAttribute('height'),
        fill: rect.getAttribute('fill'),
        stroke: rect.getAttribute('stroke'),
        strokeWidth: rect.getAttribute('stroke-width')
      }));

      // Extract lines
      const linesData = Array.from(svgNode.querySelectorAll('line')).map(line => ({
        x1: line.getAttribute('x1'),
        y1: line.getAttribute('y1'),
        x2: line.getAttribute('x2'),
        y2: line.getAttribute('y2'),
        stroke: line.getAttribute('stroke'),
        strokeWidth: line.getAttribute('stroke-width'),
        transform: line.getAttribute('transform')
      }));

      // Extract paths
      const pathsData = Array.from(svgNode.querySelectorAll('path')).map(path => ({
        d: path.getAttribute('d'),
        fill: path.getAttribute('fill'),
        stroke: path.getAttribute('stroke'),
        strokeWidth: path.getAttribute('stroke-width'),
        transform: path.getAttribute('transform')
      }));

      // Extract texts
      const textsData = Array.from(svgNode.querySelectorAll('text')).map(text => ({
        x: text.getAttribute('x'),
        y: text.getAttribute('y'),
        fill: text.getAttribute('fill'),
        fontSize: text.getAttribute('font-size'),
        fontFamily: text.getAttribute('font-family'),
        fontWeight: text.getAttribute('font-weight'),
        fontStyle: text.getAttribute('font-style'),
        stroke: text.getAttribute('stroke'),
        strokeWidth: text.getAttribute('stroke-width'),
        transform: text.getAttribute('transform'),
        textContent: text.textContent
      }));

      // Draw rectangles
      g.selectAll("rect")
        .data(rectsData)
        .enter()
        .append("rect")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", d => d.width)
        .attr("height", d => d.height)
        .attr("fill", d => d.fill)
        .attr("stroke", d => d.stroke)
        .attr("stroke-width", d => d.strokeWidth);

      // Draw lines
      g.selectAll("line")
        .data(linesData)
        .enter()
        .append("line")
        .attr("x1", d => d.x1)
        .attr("y1", d => d.y1)
        .attr("x2", d => d.x2)
        .attr("y2", d => d.y2)
        .attr("stroke", d => d.stroke)
        .attr("stroke-width", d => d.strokeWidth)
        .attr("transform", d => d.transform);

      // Draw paths
      g.selectAll("path")
        .data(pathsData)
        .enter()
        .append("path")
        .attr("d", d => d.d)
        .attr("fill", d => d.fill)
        .attr("stroke", d => d.stroke)
        .attr("stroke-width", d => d.strokeWidth)
        .attr("transform", d => d.transform);

      // Draw texts
      g.selectAll("text")
        .data(textsData)
        .enter()
        .append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("fill", d => d.fill)
        .attr("font-size", d => d.fontSize)
        .attr("font-family", d => d.fontFamily)
        .attr("font-weight", d => d.fontWeight)
        .attr("font-style", d => d.fontStyle)
        .attr("stroke", d => d.stroke)
        .attr("stroke-width", d => d.strokeWidth)
        .attr("transform", d => d.transform)
        .text(d => d.textContent);
    }

    svg.call(zoom);

    function reset() {
      g.transition().style("fill", null);
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
    }

    function zoomed(event) {
      const { transform } = event;
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
    }

    return () => {
      svg.selectAll("*").remove();
      initializedRef.current = false;
    };
  }, []);

  return (
    <div className='svg-map-holder'>
      <svg ref={mapRef}></svg>
    </div>
  );
};

export default MapHolder;