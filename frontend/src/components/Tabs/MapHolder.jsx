import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import '../Styles/MapHolder.css';
import mapData from '/src/maps/demo_parking_mapv3.svg'


const MapHolder = () => {
  const width = 1500;
  const height = 1500;
  const mapRef = useRef(null);
  const initializedRef = useRef(false);
 

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const zoom = d3.zoom()
      .scaleExtent([1, 5])
      .on("zoom", zoomed);

    const svg = d3.select(mapRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("style", "display: block;")
      .on("click", reset);

    const g = svg.append("g");

    d3.xml(mapData).then(data => {
      const svgNode = data.documentElement;
      svgNode.setAttribute("width", width);
      svgNode.setAttribute("height", height);

      g.node().appendChild(svgNode);

      renderSVGElements(svgNode, g);
    });

    function renderSVGElements(svgNode, g) {
      const rectsData = Array.from(svgNode.querySelectorAll('rect')).map(rect => ({
        id: rect.getAttribute('id'),
        x: rect.getAttribute('x'),
        y: rect.getAttribute('y'),
        width: rect.getAttribute('width'),
        height: rect.getAttribute('height'),
        fill: rect.getAttribute('fill'),
        stroke: rect.getAttribute('stroke'),
        strokeWidth: rect.getAttribute('stroke-width')
      }));

      const linesData = Array.from(svgNode.querySelectorAll('line')).map(line => ({
        x1: line.getAttribute('x1'),
        y1: line.getAttribute('y1'),
        x2: line.getAttribute('x2'),
        y2: line.getAttribute('y2'),
        stroke: line.getAttribute('stroke'),
        strokeWidth: line.getAttribute('stroke-width'),
        transform: line.getAttribute('transform')
      }));

      const pathsData = Array.from(svgNode.querySelectorAll('path')).map(path => ({
        id: path.getAttribute('id'),
        d: path.getAttribute('d'),
        fill: path.getAttribute('fill'),
        stroke: path.getAttribute('stroke'),
        strokeWidth: path.getAttribute('stroke-width'),
        transform: path.getAttribute('transform')
      }));

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

      const rects = g.selectAll("rect")
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

      const lines = g.selectAll("line")
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

      let currentPopover = null;
      const paths = g.selectAll("path")
        .data(pathsData)
        .attr("cursor", "pointer")
        .join("path")
        .attr("id", d => d.id)
        .attr("d", d => d.d)
        .attr("fill", d => d.fill)
        .attr("stroke", d => d.stroke)
        .attr("stroke-width", d => d.strokeWidth)
        .attr("transform", d => d.transform)
        .on("click", function (event, d) {
          if (d.id.startsWith("slot_")) {
            if (currentPopover) {
              $(currentPopover).popover('dispose');
            }


            $(this).popover({
              title: d.id,
              content: `Details for slot ${d.slot_id}`,
              trigger: 'manual',
              placement: 'auto',
            });

            
            currentPopover = this;
            $(this).popover('toggle');
          }
        })
        .enter()


      const texts = g.selectAll("text")
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

      // console.log(pathsData);
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
    <>
      <div className='svg-map-holder'>
        <svg ref={mapRef}></svg>
      </div>
    </>
  );
};

export default MapHolder;