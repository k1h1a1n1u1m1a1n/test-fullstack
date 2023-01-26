import {useContext, useState} from "react";
import nodeService from "../services";
import {TreesContext} from "../context";

export const useInsert = (tree) => {
    const {trees, setTrees} = useContext(TreesContext);
    const [isAddingNew, setIsAddingNew] = useState(false)

    const exciteAdding = async (e) => {
        if (!e) return setIsAddingNew(false);
        e.preventDefault();
        const value = e.target.querySelector('#new-node-name').value;
        const updated_trees = await nodeService.insertNode(value, tree.id || null, trees);
        setTrees(updated_trees);
        return setIsAddingNew(false);
    };
    return {
        isAddingNew,
        setIsAddingNew,
        exciteAdding
    }
}