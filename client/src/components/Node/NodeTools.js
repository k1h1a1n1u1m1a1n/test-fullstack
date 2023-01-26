import {useCallback, useEffect} from "react";

const NodeTools = (props) => {
    const handleUserKeyPress = useCallback(event => {
        if(!props.isEdit) return ;
        const {keyCode} = event;
        if (keyCode === 27) {
            // Escape press
            event.preventDefault();
            return props.exciteEdit(false);
        }
        if (keyCode === 13) {
            // Enter press
            event.preventDefault();
            return props.exciteEdit(true);
        }
    }, [props.isEdit]);

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => window.removeEventListener("keydown", handleUserKeyPress);
    }, [handleUserKeyPress]);


    return (
        <div className="node-tools flex align-center" onClick={e => e.stopPropagation()}>
            {
                !props.isEdit ?
                    <>
                        <button className="add-node" title="Add node" onClick={props.startAddNode}>
                            <i className="icon-add"/>
                        </button>
                        <button className="edit-node" title="Edit node" onClick={props.startEdit}>
                            <i className="icon-edit"/>
                        </button>
                        <button className="remove-node" title="Remove node" onClick={props.startRemoving}>
                            <i className="icon-trash"/>
                        </button>
                    </> :
                    <button className="save-node" title="Save node" onClick={() => props.exciteEdit(true)}>
                        <i className="icon-check"/>
                    </button>
            }
        </div>
    )
};

export default NodeTools;