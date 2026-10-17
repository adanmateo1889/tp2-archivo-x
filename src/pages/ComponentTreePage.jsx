import { useMemo, useState } from 'react'
import componentTree from '../data/componentTree.js'

const kindLabels = {
  application: 'Aplicación',
  context: 'Context',
  contextResource: 'Recurso Context',
  framework: 'Infraestructura',
  group: 'Estructura',
  hook: 'Hook',
  layout: 'Layout',
  page: 'Página',
  referenceGroup: 'Referencia',
  reusable: 'Reutilizable',
}

const kindClasses = {
  application: 'component-kind-application',
  context: 'component-kind-context',
  contextResource: 'component-kind-context',
  framework: 'component-kind-framework',
  group: 'component-kind-group',
  hook: 'component-kind-context',
  layout: 'component-kind-layout',
  page: 'component-kind-page',
  referenceGroup: 'component-kind-reference',
  reusable: 'component-kind-reusable',
}

function flattenNodes(node, nodes = []) {
  nodes.push(node)
  node.children?.forEach((child) => flattenNodes(child, nodes))
  return nodes
}

function getExpandableIds(node, ids = []) {
  if (node.children?.length) {
    ids.push(node.id)
    node.children.forEach((child) => getExpandableIds(child, ids))
  }
  return ids
}

const allNodes = flattenNodes(componentTree)
const expandableIds = getExpandableIds(componentTree)
const componentCount = allNodes.filter((node) =>
  ['application', 'context', 'layout', 'page', 'reusable'].includes(node.kind),
).length

function ComponentTreeNode({ node, expandedIds, selectedId, onToggle, onSelect }) {
  const hasChildren = Boolean(node.children?.length)
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedId === node.id
  const groupId = `component-children-${node.id}`

  return (
    <li className="component-tree-list-item" role="none">
      <div className="component-tree-node-wrap">
        <button
          aria-controls={hasChildren ? groupId : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={isSelected}
          className={`component-tree-node ${kindClasses[node.kind] ?? ''}${isSelected ? ' component-tree-node-selected' : ''}`}
          onClick={() => {
            onSelect(node)
            if (hasChildren) onToggle(node.id)
          }}
          role="treeitem"
          type="button"
        >
          <span className="component-tree-chevron" aria-hidden="true">
            {hasChildren ? (isExpanded ? '−' : '+') : '·'}
          </span>
          <span className="component-tree-node-copy">
            <strong>{node.label}</strong>
            <small>{kindLabels[node.kind] ?? 'Componente'}</small>
          </span>
          {node.routes?.length > 0 && (
            <span className="component-tree-route-count">
              {node.routes.length} {node.routes.length === 1 ? 'ruta' : 'rutas'}
            </span>
          )}
        </button>
      </div>
      {hasChildren && (
        <ul
          className="component-tree-children"
          hidden={!isExpanded}
          id={groupId}
          role="group"
        >
          {node.children.map((child) => (
            <ComponentTreeNode
              expandedIds={expandedIds}
              key={child.id}
              node={child}
              onSelect={onSelect}
              onToggle={onToggle}
              selectedId={selectedId}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function ComponentTreePage() {
  const initialExpandedIds = useMemo(() => new Set(expandableIds), [])
  const [expandedIds, setExpandedIds] = useState(initialExpandedIds)
  const [selectedNode, setSelectedNode] = useState(componentTree)
  const isFullyExpanded = expandedIds.size === expandableIds.length

  function toggleNode(nodeId) {
    setExpandedIds((currentIds) => {
      const nextIds = new Set(currentIds)
      if (nextIds.has(nodeId)) {
        nextIds.delete(nodeId)
      } else {
        nextIds.add(nodeId)
      }
      return nextIds
    })
  }

  function toggleAll() {
    setExpandedIds(
      isFullyExpanded ? new Set() : new Set(expandableIds),
    )
  }

  const relatedNodes = selectedNode.relatedNodes
    ?.map((nodeId) => allNodes.find((node) => node.id === nodeId))
    .filter(Boolean)

  return (
    <section className="placeholder-page component-tree-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        MAPA DE COMPONENTES · ESTRUCTURA DE REACT
      </div>
      <p className="section-kicker">EXPEDIENTE TÉCNICO · ARQUITECTURA REAL</p>
      <h1>Árbol de componentes</h1>
      <p className="placeholder-description">
        Explorá cómo se compone la aplicación a partir del código actual. Las
        ramas muestran relaciones de renderizado; las referencias al Context se
        identifican aparte para no confundir dependencias con componentes hijos.
      </p>

      <section className="component-tree-workbench" aria-label="Explorador de componentes">
        <header className="component-tree-header">
          <div>
            <span>ARCHIVO X · DIAGRAMA DE IMPLEMENTACIÓN</span>
            <h2>Estructura del proyecto</h2>
          </div>
          <div className="component-tree-summary" aria-live="polite">
            <strong>{componentCount}</strong>
            <span>COMPONENTES PROPIOS</span>
          </div>
        </header>

        <div className="component-tree-legend" aria-label="Tipos de elemento">
          {[
            ['layout', 'Layout'],
            ['page', 'Página'],
            ['reusable', 'Reutilizable'],
            ['context', 'Context'],
            ['framework', 'Infraestructura'],
          ].map(([kind, label]) => (
            <span className="component-legend-item" key={kind}>
              <i className={kindClasses[kind]} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        <div className="component-tree-toolbar">
          <span>NAVEGÁ CON TAB Y ACTIVÁ LAS RAMAS CON ENTER O ESPACIO</span>
          <button type="button" onClick={toggleAll}>
            {isFullyExpanded ? 'Contraer todo' : 'Expandir todo'}
          </button>
        </div>

        <div className="component-tree-layout">
          <div className="component-tree-panel">
            <ul aria-label="Jerarquía real de componentes" className="component-tree" role="tree">
              <ComponentTreeNode
                expandedIds={expandedIds}
                node={componentTree}
                onSelect={setSelectedNode}
                onToggle={toggleNode}
                selectedId={selectedNode.id}
              />
            </ul>
          </div>

          <aside
            aria-live="polite"
            className="component-inspector"
            aria-labelledby="component-inspector-heading"
          >
            <div className="component-inspector-tab">FICHA DEL COMPONENTE</div>
            <span
              className={`component-kind-badge ${kindClasses[selectedNode.kind] ?? ''}`}
            >
              {kindLabels[selectedNode.kind] ?? 'Componente'}
            </span>
            <h3 id="component-inspector-heading">{selectedNode.label}</h3>
            <p>{selectedNode.description}</p>
            {selectedNode.source && (
              <div className="component-inspector-field">
                <span>UBICACIÓN EN EL PROYECTO</span>
                <code>{selectedNode.source}</code>
              </div>
            )}
            {selectedNode.routes?.length > 0 && (
              <div className="component-inspector-field">
                <span>RUTAS QUE LO UTILIZAN</span>
                <ul>
                  {selectedNode.routes.map((route) => (
                    <li key={route}>
                      <code>{route}</code>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedNode.contexts?.length > 0 && (
              <div className="component-inspector-field">
                <span>ESTADO COMPARTIDO</span>
                <p>{selectedNode.contexts.join(', ')} mediante useInvestigation.</p>
              </div>
            )}
            {relatedNodes?.length > 0 && (
              <div className="component-inspector-field">
                <span>CONSUMIDORES / RELACIONES</span>
                <ul>
                  {relatedNodes.map((node) => (
                    <li key={node.id}>{node.label}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedNode.usageNote && (
              <div className="component-inspector-note">
                <span>NOTA DE IMPLEMENTACIÓN</span>
                <p>{selectedNode.usageNote}</p>
              </div>
            )}
            <div className="component-inspector-status">
              <span className="component-status-dot" />
              DATOS BASADOS EN EL CÓDIGO ACTUAL
            </div>
          </aside>
        </div>
      </section>
      <p className="component-tree-footnote">
        El total cuenta componentes definidos en el proyecto una sola vez. Los
        elementos de React Router, el Context y el hook se muestran para explicar
        la arquitectura, pero no se suman como componentes propios.
      </p>
    </section>
  )
}

export default ComponentTreePage
