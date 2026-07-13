const useTraverseTree=()=>{
    function insertNode(tree,folderId,item,isFolder){
        if(tree.id===folderId && tree.isFolder){
            tree.items.unshift({
                id:Date.now(),
                name:item,
                isFolder,
                items:[]
            })
            return {...tree}
        }
        tree.items=tree.items.map((child)=>{
            return insertNode(child,folderId,item,isFolder)
        })
        return {...tree}
    }
    return {insertNode}
}

export default useTraverseTree