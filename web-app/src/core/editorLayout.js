/**
 * VS Code–style editor layout: nested horizontal / vertical splits with leaf editor groups.
 * @typedef {{ type: 'group', id: string }} GroupNode
 * @typedef {{ type: 'split', id: string, direction: 'horizontal' | 'vertical', children: LayoutNode[], sizes: number[] }} SplitNode
 * @typedef {GroupNode | SplitNode} LayoutNode
 */

export const MAIN_EDITOR_GROUP_ID = 'group-main';

export function isGroupNode(node) {
  return Boolean(node && node.type === 'group');
}

export function isSplitNode(node) {
  return Boolean(node && node.type === 'split');
}

/** @param {LayoutNode | null | undefined} node */
export function countLeafGroups(node) {
  if (!node) return 0;
  if (isGroupNode(node)) return 1;
  return node.children.reduce((sum, c) => sum + countLeafGroups(c), 0);
}

/** Depth-first visual order: row = left→right, column = top→bottom */
export function leafGroupIdsInOrder(node) {
  if (!node) return [];
  if (isGroupNode(node)) return [node.id];
  return node.children.flatMap((c) => leafGroupIdsInOrder(c));
}

export function layoutHasMultipleGroups(node) {
  return countLeafGroups(node) > 1;
}

let splitCounter = 0;
function nextSplitId() {
  splitCounter += 1;
  return `split-${Date.now()}-${splitCounter}`;
}

/**
 * Replace the group leaf `targetGroupId` with a split:
 * [ original group | new empty group ] (same for vertical).
 * @param {LayoutNode} layout
 * @param {string} targetGroupId
 * @param {string} newGroupId
 * @param {'horizontal' | 'vertical'} direction
 */
export function splitLeafWithNewGroup(layout, targetGroupId, newGroupId, direction) {
  const splitId = nextSplitId();

  function walk(n) {
    if (isGroupNode(n)) {
      if (n.id === targetGroupId) {
        return {
          type: 'split',
          id: splitId,
          direction,
          sizes: [1, 1],
          children: [
            { type: 'group', id: targetGroupId },
            { type: 'group', id: newGroupId },
          ],
        };
      }
      return n;
    }
    return {
      ...n,
      children: n.children.map(walk),
    };
  }

  return walk(layout);
}

/**
 * Remove a group leaf and collapse splits with a single child.
 * @param {LayoutNode} layout
 * @param {string} groupId
 */
export function removeGroupLeaf(layout, groupId) {
  function walk(n) {
    if (isGroupNode(n)) {
      if (n.id === groupId) return null;
      return n;
    }
    const mapped = n.children.map(walk);
    const nextChildren = mapped.filter(Boolean);
    if (nextChildren.length === 0) return null;
    if (nextChildren.length === 1) {
      return nextChildren[0];
    }
    const sizes = normalizeSizes(n.sizes, nextChildren.length);
    return { ...n, children: nextChildren, sizes };
  }

  const result = walk(layout);
  return result || { type: 'group', id: MAIN_EDITOR_GROUP_ID };
}

/**
 * @param {number[]} sizes
 * @param {number} len
 */
function normalizeSizes(sizes, len) {
  const base = sizes && sizes.length ? [...sizes] : Array(len).fill(1);
  while (base.length < len) base.push(1);
  if (base.length > len) base.length = len;
  const sum = base.reduce((a, b) => a + b, 0) || 1;
  return base.map((s) => (s / sum) * len);
}

/**
 * Update flex sizes when dragging a resizer between childIndex and childIndex+1.
 * @param {LayoutNode} layout
 * @param {string} splitId
 * @param {number} childIndex left index of the gap
 * @param {number} deltaPx pointer delta (horizontal split uses clientX delta; vertical uses clientY)
 * @param {'horizontal' | 'vertical'} orientation
 */
export function adjustSplitSizes(layout, splitId, childIndex, deltaPx, orientation) {
  const sens = 0.004;

  function walk(n) {
    if (isGroupNode(n)) return n;
    if (n.id === splitId) {
      const sizes = [...n.sizes];
      if (childIndex < 0 || childIndex >= sizes.length - 1) return n;
      const dir = n.direction;
      const useDelta =
        (dir === 'horizontal' && orientation === 'horizontal') ||
        (dir === 'vertical' && orientation === 'vertical')
          ? deltaPx
          : 0;
      const adjust = useDelta * sens;
      const left = Math.max(0.2, sizes[childIndex] + adjust);
      const right = Math.max(0.2, sizes[childIndex + 1] - adjust);
      sizes[childIndex] = left;
      sizes[childIndex + 1] = right;
      return { ...n, sizes };
    }
    return { ...n, children: n.children.map(walk) };
  }

  return walk(layout);
}

/**
 * Find parent split + index of a group (for moving editors).
 * @returns {{ split: SplitNode, index: number, parentPath: LayoutNode[] } | null}
 */
export function findGroupParent(layout, groupId, ancestors = []) {
  if (isGroupNode(layout)) return null;
  for (let i = 0; i < layout.children.length; i += 1) {
    const ch = layout.children[i];
    if (isGroupNode(ch) && ch.id === groupId) {
      return { split: layout, index: i, parentPath: ancestors };
    }
    if (isSplitNode(ch)) {
      const found = findGroupParent(ch, groupId, [...ancestors, layout]);
      if (found) return found;
    }
  }
  return null;
}

/** Next / previous group id in visual order for focus cycling */
export function adjacentGroupId(layout, focusedGroupId, direction) {
  const order = leafGroupIdsInOrder(layout);
  const idx = order.indexOf(focusedGroupId);
  if (idx < 0) return order[0] || MAIN_EDITOR_GROUP_ID;
  if (direction === 'next') {
    return order[(idx + 1) % order.length];
  }
  return order[(idx - 1 + order.length) % order.length];
}
