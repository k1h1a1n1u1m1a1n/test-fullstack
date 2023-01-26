import Node from '../Node/Node';
import {useContext} from "react";
import {TreesContext} from "../../context";
import nodeService from "../../services";

const Trees = () => {
    let {trees, setTrees} = useContext(TreesContext);
    const createRoot = async () => {
        const updated_trees = await nodeService.insertNode('Root', null, structuredClone(trees));
        setTrees(updated_trees);
    };
    return (
        <div className="trees">
            <button onClick={createRoot} className="btn">Add root</button>
            <div className="flex align-start flex-wrap">
                {
                    trees.length ? trees.map(tree =>
                        <ul key={tree.id || 0} className="tree">
                            <Node tree={tree}/>
                        </ul>
                    ) : ''
                }
            </div>
        </div>

    )
}

export default Trees;
