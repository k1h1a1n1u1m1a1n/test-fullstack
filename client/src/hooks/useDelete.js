import {useContext, useState} from "react";
import nodeService from "../services";
import {TreesContext} from "../context";

export const useDelete = (tree) => {
    const {trees, setTrees} = useContext(TreesContext);
    const [isRemoving, setIsRemoving] = useState(false)

    const exciteRemoving = async (remove) => {
        if (!remove) return setIsRemoving(false);
        const updated_trees = await nodeService.deleteNode(tree.id, trees);
        setTrees(updated_trees);
        return setIsRemoving(false);
    };

    return {
        isRemoving,
        setIsRemoving,
        exciteRemoving
    }
};