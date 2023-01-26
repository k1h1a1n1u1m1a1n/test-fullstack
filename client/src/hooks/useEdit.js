import {useContext, useState} from "react";
import nodeService from "../services";
import {TreesContext} from "../context";

export const useEdit = (tree, editInput) => {
    const {trees, setTrees} = useContext(TreesContext);
    const [isEdit, setIsEdit] = useState(false)

    const exciteEdit = async (save) => {
        if (!save) {
            return setIsEdit(false);
        }
        const input = editInput.current;
        if (!input) return;
        const updated_trees = await nodeService.updateNode(tree.id, input.value, trees);
        setIsEdit(false);
        setTrees(updated_trees);
    };

    return {
        isEdit,
        setIsEdit,
        exciteEdit
    }
};