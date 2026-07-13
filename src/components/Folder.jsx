import React, { useState } from 'react'

const Folder = ({ explorer,handelInsertNode }) => {
    console.log(explorer);
    const [expanded, setExpanded] = useState(false)
    const [showInput, setShowInput] = useState({ visible: false, isFolder: false })

    
    const handelNewFolder = (e, isFolder) => {
        e.stopPropagation(); // Prevents the parent folder from closing/opening when clicking buttons
        setExpanded(true);
        
        setShowInput({
            visible: true,
            isFolder: isFolder // Explicitly mapping the passed boolean value
        });
    }

    const onAddFolder = (e) => {
        // e.key is modern practice over e.keyCode
        if (e.key === 'Enter' && e.target.value) {
           handelInsertNode(explorer.id,e.target.value,showInput.isFolder)
            setShowInput({ ...showInput, visible: false });
        }
    }

    if (explorer.isFolder) {
        return (
            <div className="w-full max-w-sm p-2">
                {/* Folder Header Row */}
                <div 
                    className="flex items-center justify-between p-1.5 hover:bg-gray-100 rounded cursor-pointer select-none" 
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{expanded ? "📂" : "📁"}</span>
                        <h3 className="text-base font-semibold text-gray-800">{explorer.name}</h3>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1">
                        <button 
                            className='px-1.5 py-0.5 text-xs border rounded bg-white hover:bg-gray-50' 
                            onClick={(e) => handelNewFolder(e, true)} 
                        >
                            Folder +
                        </button>
                        <button 
                            className='px-1.5 py-0.5 text-xs border rounded bg-white hover:bg-gray-50' 
                            onClick={(e) => handelNewFolder(e, false)} 
                        >
                            File +
                        </button>
                    </div>
                </div>

                {/* Folder Children Container */}
                <div className={`${expanded ? "flex flex-col" : "hidden"} gap-1 pl-6 mt-1 border-l border-gray-200`}>
                    {/* Inline Input Box */}
                    {showInput.visible && (
                        <div className="flex items-center gap-2 p-1.5">
                            <span>{showInput.isFolder ? "📁" : "🗃️"}</span>
                            <input
                                type='text'
                                autoFocus
                                className="border border-blue-400 px-1 rounded text-sm outline-none"
                                onKeyDown={onAddFolder} 
                                onBlur={() => setShowInput({ ...showInput, visible: false })}
                            />
                        </div>
                    )}
                    
                    {/* Recursive Map rendering child nodes */}
                    {explorer.items?.map((exp) => {
                        return (
                            <Folder explorer={exp} key={exp.id} handelInsertNode={handelInsertNode}/>

                        )
                    })}
                </div>
            </div>
        )
    } else {
        /* File Layout Styling */
        return (
            <div className="flex items-center gap-2 p-1.5 text-sm text-gray-600 pl-2">
                <span>🗃️</span>
                <span>{explorer.name}</span>
            </div>
        )
    }
}

export default Folder