
# 📂 Recursive File Explorer (System Design)

A highly optimized, recursive file system UI built with **React** and **TypeScript**, designed to handle deeply nested directory structures with high performance. 

This project demonstrates the implementation of the **Recursive Component Pattern** commonly used in IDEs like VS Code.

## 📸 Demo

![File Explorer UI](./screenshot.png)
*(A visual representation of the N-depth nested structure with indentation guides)*

## 🚀 Key Engineering Features

### 1. Recursive Component Architecture
Instead of flattening the data, this implementation uses a **self-referencing component strategy**.
- **The Logic:** The `Folder` component checks if a node has children. If yes, it renders itself again inside the children container.
- **The Benefit:** Supports **infinite nesting depth (N-depth)** without writing repetitive code or hardcoding levels.

### 2. Performance Optimization (`React.memo`)
Rendering large trees can be expensive. If a user expands a folder at `Level 10`, we must ensure that `Level 1` or sibling folders do not re-render.
- **Implementation:** Every `Folder` node is wrapped in `React.memo`.
- **Result:** State updates (Open/Close) are isolated to the specific node and its immediate children, preventing a "Render Cascade" across the entire tree.

### 3. Clean UX & Indentation
- **Visual Hierarchy:** Implemented dynamic left-borders (`border-l`) to create visual indentation guides, making deep nesting readable.
- **Click Targets:** Optimized hit-areas so users can click anywhere on the row to toggle folders, not just the tiny arrow icon.

## 🛠 Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite

## 🧬 Data Structure

The system relies on a strictly typed Tree structure:

```typescript
export interface TExplorerNode {
  id: string;
  name: string;
  isFolder: boolean;
  children?: TExplorerNode[];
}