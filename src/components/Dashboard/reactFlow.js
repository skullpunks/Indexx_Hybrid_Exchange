import ReactFlow, { Controls, MiniMap, addEdge } from 'react-flow';
// import 'reactflow/dist/style.css';
import { users } from "./userData";
const usersData = users;

const FlowDiagram = () => {
  const nodes = [{}];
  const edges = [{}];

  // Create nodes and edges for each user
  for (const userKey in usersData) {
    const user = usersData[userKey];

    nodes.push({
      id: userKey,
      type: 'default',
      data: { label: userKey },
    });

    user?.relationships?.forEach((relationship) => {
        console.log("relations", relationship)
      edges.push(addEdge({ source: userKey, target: relationship?.honeybeeEmail }));
    });

    user?.children?.forEach((child, index) => {
      const childKey = `${userKey}-Child${index + 1}`;
      nodes.push({
        id: childKey,
        type: 'default',
        data: { label: childKey },
      });
      edges.push(addEdge({ source: userKey, target: childKey }));
    });
  }

  const layout = {
    width: 800,
    height: 600,
  };

  return (
    <div style={{ height: '600px' }}>
      <ReactFlow
        elements={nodes.concat(edges)}
        nodesConnectable={false}
        elementsSelectable={false}
        nodeTypes={{
          default: 'default',
        }}
        snapToGrid={true}
        layout={layout}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
