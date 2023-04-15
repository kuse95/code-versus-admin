export function buildTree(nodes) {
  const map = {}
  const roots = []

  // First pass: create a map of each node to its children
  nodes.forEach((node) => {
    map[node.id] = node
    node.children = []
  })

  // Second pass: build the tree by attaching children to their parent
  nodes.forEach((node) => {
    const parent = map[node.pid]
    if (parent) {
      parent.children.push(node)
    } else {
      roots.push(node)
    }
  })

  return roots
}
