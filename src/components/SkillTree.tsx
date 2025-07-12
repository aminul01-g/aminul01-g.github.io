import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

// Type for skill tree node
interface SkillNode {
  id: string;
  label: string;
  category: string;
  children?: SkillNode[];
}

// Example skill tree data
const skillTreeData: SkillNode[] = [
  {
    id: 'python',
    label: 'Python',
    category: 'Programming',
    children: [
      {
        id: 'ml',
        label: 'Machine Learning',
        category: 'AI',
        children: [
          { id: 'pytorch', label: 'PyTorch', category: 'AI' },
          { id: 'sklearn', label: 'Scikit-learn', category: 'AI' },
        ]
      },
      {
        id: 'web',
        label: 'Web Development',
        category: 'Web',
        children: [
          { id: 'django', label: 'Django', category: 'Web' },
          { id: 'flask', label: 'Flask', category: 'Web' },
        ]
      },
    ]
  },
  {
    id: 'cpp',
    label: 'C++',
    category: 'Programming',
    children: [
      { id: 'cp', label: 'Competitive Programming', category: 'Algorithms' },
    ]
  },
];

// Helper to flatten tree into nodes/edges for React Flow
function flattenTree(
  tree: SkillNode[],
  parentId: string | null = null,
  nodes: Node[] = [],
  edges: Edge[] = [],
  depth = 0,
  x = 0,
  y = 0
): { nodes: Node[]; edges: Edge[] } {
  tree.forEach((item: SkillNode, i: number) => {
    const nodeId = item.id;
    nodes.push({
      id: nodeId,
      data: { label: item.label, category: item.category },
      position: { x: x + i * 200, y: y + depth * 120 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: { borderRadius: 12, padding: 8, border: '2px solid #a5b4fc', background: '#fff' },
      type: undefined,
    } as Node);
    if (parentId) {
      edges.push({ id: `${parentId}-${nodeId}`, source: parentId, target: nodeId } as Edge);
    }
    if (item.children) {
      flattenTree(item.children, nodeId, nodes, edges, depth + 1, x + i * 200, y + 120);
    }
  });
  return { nodes, edges };
}

const { nodes: initialNodes, edges: initialEdges } = flattenTree(skillTreeData);

const SkillTree: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-right"
      >
        <MiniMap />
        <Controls />
        <Background color="#f3f4f6" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default SkillTree; 