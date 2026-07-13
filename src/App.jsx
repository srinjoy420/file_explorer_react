import React, { useState } from 'react'
import explorer from './data/folderData.js'
import Folder from './components/Folder.jsx'
import useTraverseTree from './hooks/UseTraverse.js'



const App = () => {
  const [explorerData, setExplorerData] = useState(explorer)
  const { insertNode } = useTraverseTree()

  const handelInsertNode = (folderId, item, isFolder) => {
    if (!item || !item.trim()) return

    const finalTree=insertNode(explorerData,folderId,item,isFolder)
    setExplorerData(finalTree)
  }

  return (
    <div>
      <Folder handelInsertNode={handelInsertNode} explorer={explorerData} />
    </div>
  )
}

export default App