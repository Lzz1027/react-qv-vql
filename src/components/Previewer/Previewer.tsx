import React, { useEffect, useState } from "react";
import "./Previewer.css";
import G6 from "@antv/g6";

// G6.registerNode(
//   'rect-jsx',
//   (cfg:any) => `
//     <group>
//       <circle style={{
//         stroke: ${cfg.color},
//         r: ${cfg.size[0]},
//         fill: '#bca',
//         cursor: 'pointer',
//         marginLeft: 75
//       }>
//         <text style={{
//           marginTop: ${cfg.size[0]},
//           textAlign: 'center',
//           fontWeight: 'bold',
//           marginLeft: ${cfg.size[0]},
//           fill: '#fff',
//           marginLeft: 4
//         }}>

//         </text>
//       </circle>
//     </group>`,
// );

// 注册vql节点
G6.registerNode("vql-node", {
  draw: (cfg: any, group: any) => {
    console.log(Object.keys(cfg.data));
    const stroke = cfg.style ? cfg.style.stroke || "#5B8FF9" : "#5B8FF9";

    // 添加节点圆形
    const shape = group.addShape("circle", {
      attrs: {
        x: 0,
        y: 0,
        r: cfg.size[0] / 1.5,
        fill: "#cba",
        stroke: "#bca",

        cursor: "pointer",
      },
      name: "main-circle",
      draggable: true,
    });

    group.addShape("text", {
      attrs: {
        textBaseline: "middle",
        x: 0,
        y: 0,
        lineHeight: cfg.size[0],
        text: cfg.label,
        textAlign: "center",
        fill: "#fff",
        fontSize: cfg.size[0] / 5,
      },
      name: "main-name",
    });

    const keyOpValueRate = [4, 2, 4];
    const sumOfKeyOpValueRate = 10;
    for (let index = 0; index < Object.keys(cfg.data).length; index++) {
      group.addShape("rect", {
        attrs: {
          x: -cfg.size[0],
          y: (cfg.size[0] / 2) * (index + 1),
          width: cfg.size[0] * (keyOpValueRate[0] / sumOfKeyOpValueRate) * 2,
          height: cfg.size[0] / 2,
          fill: "#aaa",
        },
        name: "prop-list-key",
      });

      group.addShape("text", {
        attrs: {
          textBaseline: "middle",
          x:
            -cfg.size[0] +
            cfg.size[0] * (keyOpValueRate[0] / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1) + cfg.size[0] / 4,
          text: Object.keys(cfg.data)[index],
          fill: "#000",
          textAlign: "center",
          fontSize: cfg.size[0] / 7,
        },
        name: "prop-text-key",
      });

      group.addShape("rect", {
        attrs: {
          x:
            -cfg.size[0] +
            cfg.size[0] * 2 * (keyOpValueRate[0] / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1),
          width: cfg.size[0] * (keyOpValueRate[1] / sumOfKeyOpValueRate) * 2,
          height: cfg.size[0] / 2,
          fill: "#bbb",
        },
        name: "prop-list-op",
      });

      group.addShape("text", {
        attrs: {
          textBaseline: "middle",
          x:
            -cfg.size[0] +
            cfg.size[0] * 2 * (keyOpValueRate[0] / sumOfKeyOpValueRate) +
            cfg.size[0] * (keyOpValueRate[1] / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1) + cfg.size[0] / 4,
          text: " : ",
          fill: "#000",
          textAlign: "center",
          fontSize: cfg.size[0] / 7,
        },
        name: "prop-text-op",
      });

      group.addShape("rect", {
        attrs: {
          x:
            -cfg.size[0] +
            cfg.size[0] *
              2 *
              ((keyOpValueRate[0] + keyOpValueRate[1]) / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1),
          width: cfg.size[0] * (keyOpValueRate[2] / sumOfKeyOpValueRate) * 2,
          height: cfg.size[0] / 2,
          fill: "#aaa",
        },
        name: "prop-list-value",
      });

      group.addShape("text", {
        attrs: {
          textBaseline: "middle",
          x:
            -cfg.size[0] +
            cfg.size[0] *
              2 *
              ((keyOpValueRate[0] + keyOpValueRate[1]) / sumOfKeyOpValueRate) +
            cfg.size[0] * (keyOpValueRate[2] / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1) + cfg.size[0] / 4,
          text: cfg.data[Object.keys(cfg.data)[index]],
          fill: "#000",
          textAlign: "center",
          fontSize: cfg.size[0] / 7,
        },
        name: "prop-text-value",
      });
    }

    return shape;
  },
});

G6.registerEdge("vql-edge", {
  draw(cfg: any, group: any) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const stroke:any = (cfg.style && cfg.style.stroke) || this.options.style.stroke;

    const shape = group.addShape("path", {
      attrs: {
        stroke,
        path: [
          ["M", startPoint.x, startPoint.y],
          ["L", endPoint.x, endPoint.y],
        ],
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: "path-shape",
    });

    // 添加节点圆形
    group.addShape("rect", {
      attrs: {
        x: (startPoint.x + endPoint.x)/2-cfg.size[0]/2,
        y: (startPoint.y + endPoint.y)/2-cfg.size[0]/8,
        width: cfg.size[0],
        height:cfg.size[0]/4,
        fill: "#cba",
        stroke: "#bca",
        cursor: "pointer",
      },
      name: "main-rect"
    });

    group.addShape("text", {
      attrs: {
        textBaseline: "middle",
        x: (startPoint.x + endPoint.x)/2,
        y: (startPoint.y + endPoint.y)/2,
        lineHeight: cfg.size[0],
        text: cfg.label,
        textAlign: "center",
        fill: "#fff",
        fontSize: cfg.size[0] / 8,
      },
      name: "main-name",
    });

    const keyOpValueRate = [4, 2, 4];
    const sumOfKeyOpValueRate = 10;
    for (let index = 0; index < Object.keys(cfg.data).length; index++) {
      group.addShape("rect", {
        attrs: {
          x: -cfg.size[0],
          y: (cfg.size[0] / 2) * (index + 1),
          width: cfg.size[0] * (keyOpValueRate[0] / sumOfKeyOpValueRate) * 2,
          height: cfg.size[0] / 2,
          fill: "#aaa",
        },
        name: "prop-list-key",
      });

      group.addShape("text", {
        attrs: {
          textBaseline: "middle",
          x:
            -cfg.size[0] +
            cfg.size[0] * (keyOpValueRate[0] / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1) + cfg.size[0] / 4,
          text: Object.keys(cfg.data)[index],
          fill: "#000",
          textAlign: "center",
          fontSize: cfg.size[0] / 7,
        },
        name: "prop-text-key",
      });

      group.addShape("rect", {
        attrs: {
          x:
            -cfg.size[0] +
            cfg.size[0] * 2 * (keyOpValueRate[0] / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1),
          width: cfg.size[0] * (keyOpValueRate[1] / sumOfKeyOpValueRate) * 2,
          height: cfg.size[0] / 2,
          fill: "#bbb",
        },
        name: "prop-list-op",
      });

      group.addShape("text", {
        attrs: {
          textBaseline: "middle",
          x:
            -cfg.size[0] +
            cfg.size[0] * 2 * (keyOpValueRate[0] / sumOfKeyOpValueRate) +
            cfg.size[0] * (keyOpValueRate[1] / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1) + cfg.size[0] / 4,
          text: " : ",
          fill: "#000",
          textAlign: "center",
          fontSize: cfg.size[0] / 7,
        },
        name: "prop-text-op",
      });

      group.addShape("rect", {
        attrs: {
          x:
            -cfg.size[0] +
            cfg.size[0] *
              2 *
              ((keyOpValueRate[0] + keyOpValueRate[1]) / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1),
          width: cfg.size[0] * (keyOpValueRate[2] / sumOfKeyOpValueRate) * 2,
          height: cfg.size[0] / 2,
          fill: "#aaa",
        },
        name: "prop-list-value",
      });

      group.addShape("text", {
        attrs: {
          textBaseline: "middle",
          x:
            -cfg.size[0] +
            cfg.size[0] *
              2 *
              ((keyOpValueRate[0] + keyOpValueRate[1]) / sumOfKeyOpValueRate) +
            cfg.size[0] * (keyOpValueRate[2] / sumOfKeyOpValueRate),
          y: (cfg.size[0] / 2) * (index + 1) + cfg.size[0] / 4,
          text: cfg.data[Object.keys(cfg.data)[index]],
          fill: "#000",
          textAlign: "center",
          fontSize: cfg.size[0] / 7,
        },
        name: "prop-text-value",
      });
    }

    // return the keyShape
    return shape;
  },
});
export default function () {
  const ref: any = React.useRef(null);
  const data = {
    nodes: [
      {
        id: "1",
        label: "Keanu",
        data: {
          tags: ["Person"],
          name: "Keanu\nReeves",
        },
      },
      {
        id: "2",
        label: "Movie1",
        data: {
          tags: ["Movie"],
        },
      },
      {
        id: "3",
        label: "coActors",
        data: {
          tags: ["Person"],
        },
      },

      {
        id: "4",
        label: "MovieX",
        data: {
          tags: ["Movie"],
        },
      },
      {
        id: "5",
        label: "cocoActors",
        data: {
          tags: ["Person"],
        },
      },

      {
        id: "6",
        label: "Movie2",
        data: {
          tags: ["Movie"],
        },
      },
    ],
    edges: [
      {
        source: "1",
        target: "2",
        label: "Acted_in",
        data: {},
      },
      {
        source: "2",
        target: "3",
        label: "Acted_in",
        data: {},
      },
      {
        source: "3",
        target: "6",
        label: "Acted_in",
        data: {},
      },
      {
        source: "5",
        target: "4",
        label: "Acted_in",
        data: {},
      },
      {
        source: "5",
        target: "6",
        label: "Acted_in",
        data: {},
      },
      {
        source: "1",
        target: "4",
        label: "Acted_in",
        data: {},
      },
    ],
  };

  let graph: any = null;

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ref.current,
        fitView: true,
        modes: {
          default: ["drag-canvas", "drag-node"],
        },
        layout: {
          type: "grid",
          begin: [0, 0], // 可选，
          preventOverlap: true, // 可选，必须配合 nodeSize
          preventOverlapPdding: 20, // 可选
          nodeSize: 30, // 可选
          condense: false, // 可选
          rows: 2, // 可选
          cols: 3, // 可选
          sortBy: "degree", // 可选
        },
        defaultNode: {
          type: "vql-node",
          size: [100],
        },
        defaultEdge: {
          type: "vql-edge",
          
          size: [100],
          style: {
            stroke: "#000",
          },
        },
      });
    }

    graph.data(data);

    graph.render();
  }, []);
  return (
    <div id="Previewer">
      <div className="graph-container" ref={ref}></div>
    </div>
  );
}
