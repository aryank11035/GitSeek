import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import dagre from 'dagre'
import { source } from 'framer-motion/client';
export default function NodeSection(){
    const {selectedRepo,username} = useContext(UserContext)

    const [nodes,setNodes] = useState([])
    const [edges,setEdges] = useState([])
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        if(!selectedRepo || !username) return 

        const fetchTree = async () => {
            setLoading(true)
            setError(null)

            try{
                const token = import.meta.env.VITE_GITHUB_TOKEN;
                const res = await fetch(`https://api.github.com/repos/${username}/${selectedRepo.name}/git/trees/${selectedRepo.default_branch}?recursive=1`, {
                                    headers: {
                                        Authorization : `token ${token}`,
                                        Accept: "application/vnd.github.v3+json",
                                    },
                                })
                if(!res.ok) throw new Error('failed to fetch repos')
                
                const data = await res.json()

                const rootNode = {
                    id : 'root',
                    data: {
                        label: (
                        <div className="flex items-center gap-2 font-bold text-blue-600">
                            <i className="fa-brands fa-github"></i>
                            <span>{selectedRepo.name}</span>
                        </div>
                        ),
                    },
                    type: "default",
                }

                const nodesData = data.tree.map((item,index) => ({
                    id: String(index),
                    data: { label: 
                        (
                            <div className='flex items-center gap-2 font-bold'>
                                {item.type  === 'tree'  ? <i class="fa-solid fa-folder-open text-yellow-300"></i>  : <i class="fa-solid fa-file text-gray-400"></i>} <span>{item.path.split('/').pop()}</span>
                            </div>
                        ),
                    },
                    type: "default",
                }))

                const edgesData = [];
                data.tree.forEach((item, index) => {
                const parts = item.path.split("/");

                if (parts.length > 1) {
                    // child of folder
                    const parentPath = parts.slice(0, -1).join("/");
                    const parentIndex = data.tree.findIndex((n) => n.path === parentPath);

                    if (parentIndex !== -1) {
                    edgesData.push({
                        id: `e${parentIndex}-${index}`,
                        source: String(parentIndex),
                        target: String(index),
                        
                    });
                    }
                } else {
                    // top-level → connect to root
                    edgesData.push({
                    id: `e-root-${index}`,
                    source: "root",
                    target: String(index),
                    
                    });
                }
                });

                const finalNodes = [rootNode, ...nodesData];

                const dagreGraph = new dagre.graphlib.Graph();
                dagreGraph.setDefaultEdgeLabel(() => ({}));
                dagreGraph.setGraph({
                rankdir: "TB", // TB = top-bottom, LR = left-right
                nodesep: 80,   // horizontal spacing
                ranksep: 120,  // vertical spacing
                });

                // include ALL nodes (root + children)
                finalNodes.forEach((node) => {
                dagreGraph.setNode(node.id, { width: 160, height: 50 });
                });

                edgesData.forEach((edge) => {
                dagreGraph.setEdge(edge.source, edge.target);
                });

                dagre.layout(dagreGraph);

                const positionedNodes = finalNodes.map((node) => {
                const pos = dagreGraph.node(node.id);
                return {
                    ...node,
                    position: pos
                    ? { x: pos.x - 80, y: pos.y - 25 } // center align
                    : { x: 0, y: 0 },
                };
                });


                setNodes(positionedNodes)
                setEdges(edgesData)
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }

        fetchTree()
    },[selectedRepo,username])

    return(
        <> 

            <div className="flex border border-[rgba(255,255,255,0.1)] rounded-xs 780:flex-2 w-full 780:h-full  h-[500px]">
                {selectedRepo ? (

                    loading ? (
                        <div className=" w-full h-full flex items-center justify-center text-xl font-bold text-[rgba(255,255,255,0.1)] text-wrap  flex-col gap-3 ">
                                <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    ) : error ? (
                        <div className="text-xl font-bold text-[rgba(255,255,255,0.1)] text-wrap  gap-3 w-full h-full flex items-center justify-center ">
                            <p><i className="fa-solid fa-circle-xmark mr-2"></i> Error</p>
                        </div>
                    ) : (
                        <div className='w-full h-full bg-[#f1f1f1] text-black rounded-xs'>
                            <ReactFlow
                                nodes={nodes} 
                                edges={edges} 
                                fitView
                                style={{ width: '100%', height: '100%' }}
                            >   
                                <Background 
                                    variant="dots" // or "lines"
                                    gap={20}       // distance between lines/dots
                                    size={1}       // dot size or line thickness
                                    color="#242424"   // grid color
                                    attributionPosition="bottom-right"
                                    attribution={<div className="text-sm text-gray-500"></div>}
                                  />
                                <Controls />
                            </ReactFlow>
                        </div>
                    )
                )   :   (
                        <div className="text-xl font-bold text-[rgba(255,255,255,0.1)] text-wrap  gap-3 w-full h-full flex items-center justify-center ">
                            <p>Select a Repository</p>
                        </div> 
                    )
            }
                 

        
            </div>
        </>
    )
}   