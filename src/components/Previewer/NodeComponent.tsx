import React from 'react'
import type { MenuProps } from 'antd';
import { Node } from '@antv/x6'
import { Progress, Dropdown } from 'antd'
import './NodeComponent.css'

const NodeComponent = ({ node }: { node: Node }) => {
  const nodeData: any = node.getData();
  console.log(nodeData.nodeProps);

  // labels 列表
  const LabelsList = nodeData.nodeLabels.map(
    (label:object) => <li className='node-label-item' key={label.id}>{label.value}</li>
  );

  // Props 列表
  const PropsList = nodeData.nodeProps.map(
    (prop:object) =>
      <li className='node-props-item' key={prop.id}>
        <span className='node-props-key'>{prop.propKey}</span>
        <span className='node-props-op'>{prop.propOp}</span>
        <span className='node-props-value'>{prop.propValue}</span>
      </li>

  )


  console.log(PropsList);
  // 设置添加按钮的内容和事件
  const items = [{ key: 1, label: 'Label' }, { key: 2, label: 'Prop' }]
  const onMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e.key);
  };

  return (
    <div className="react-node">
      {/* 节点-名称 */}
      <div className='node-circle'>
        <div className='node-circle-text'></div>
        <div>{nodeData.nodeName}</div>
      </div>
      <div className='node-info'>
        {/* 节点类别 */}
        <ul className='node-label'>
          {LabelsList}
        </ul>
        {/* 节点属性 */}
        <ul className='node-props'>
          {PropsList}
        </ul>
      </div>

      {/* 添加类别或属性限制 */}
      <Dropdown.Button className='node-add-button' menu={{ items, onClick: onMenuClick }}>Add</Dropdown.Button>
    </div>
  )
}

export default NodeComponent