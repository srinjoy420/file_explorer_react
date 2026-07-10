import React, { useState } from 'react'
import explorer from './data/folderData.js'
import Folder from './components/Folder.jsx'


const App = () => {
  const[explorerData, setExplorerData] =useState(explorer)
  return (
    <div>
      <Folder explorer={explorerData}/>
    </div>
  )
}

export default App