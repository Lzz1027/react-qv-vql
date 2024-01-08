import React from 'react'
import NodeComponent from './NodeComponent'
import { Graph } from '@antv/x6'
import { register } from '@antv/x6-react-shape'
import { Progress } from 'antd'
import './Previewer.css'

register({
  shape: 'custom-react-node',
  width: 100,
  height: 100,
  effect: ['data'],
  component: NodeComponent,
})

export default class Example extends React.Component {
  private container: HTMLDivElement | undefined

  componentDidMount() {
    const graph = new Graph({
      container: this.container,

      autoResize: true,
      background: {
        color: '#F2F7FA',
      },
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
      panning: true,
      mousewheel: true
    })

    const nodes = [
      {
        shape: 'custom-react-node',
        x: 100,
        y: 100,
        data: {
          nodeId: 1,
          nodeName: 'Keenu',
          nodeLabels: [
            {
              id: '1',
              value: "Person"
            }
          ],
          nodeProps: [
            {
              id: 1,
              propKey: "name",
              propOp: ":",
              propValue: "Keenu Reeves"
            }
          ]
        },
      },
      {
        shape: 'custom-react-node',
        x: 300,
        y: 100,
        data: {
          nodeId: 2,
          nodeName: 'Movie1',
          nodeLabels: [
            {
              id: '1',
              value: "Movie"
            }
          ],
          nodeProps: []
        },
      }
    ]

    nodes.forEach(node => {
      graph.addNode(node)
    });
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  render() {
    return (
      <div className="Previewer">
        <div className='Previewer-container'>
          <div className="X6Graph" ref={this.refContainer} />
        </div>
      </div>
    )
  }
}