import './node.scss'
import {useRef, useEffect} from "react";
import Popup from "../Popup/Popup";
import NodeTools from './NodeTools';
import {useDelete} from "../../hooks/useDelete";
import {useEdit} from "../../hooks/useEdit";
import {useInsert} from "../../hooks/useInsert";
import {useAccordion} from "../../hooks/useAccordion";

const Node = (props) => {
    const tree = props.tree;
    const has_children = tree.children;

    const nestedList = useRef(null);
    const editInput = useRef(null);

    const {isEdit, setIsEdit, exciteEdit} = useEdit(tree, editInput);
    const {isRemoving, setIsRemoving, exciteRemoving} = useDelete(tree);
    const {isAddingNew, setIsAddingNew, exciteAdding} = useInsert(tree);
    const {nestedOpened, toggleNested} = useAccordion(has_children, nestedList)

    useEffect(() => {
        if (isEdit) editInput.current.focus();
    }, [isEdit]);

    let title_classname = "node-title" + (has_children ? ' node-parent' : '') + (has_children && !nestedOpened ? ' closed' : '');

    if (!has_children && tree.parent_id === null) {
        title_classname += ' singleton';
    }
    return (
        <li>
            <div className={title_classname} onClick={toggleNested}>
                <div className="flex align-center">
                    <i className={has_children ? "icon-folder" : "icon-file"}/>
                    {isEdit
                        ? <input ref={editInput} className="node-edit" type="text" defaultValue={tree.title}
                                 onBlur={() => exciteEdit(true)} onClick={e => e.stopPropagation()}/>
                        : <span>{tree.title}</span>
                    }
                    {has_children && !isEdit && <i className="icon-arrow-right"/>}
                </div>
                <NodeTools
                    isEdit={isEdit} startEdit={() => setIsEdit(true)} exciteEdit={exciteEdit}
                    startAddNode={() => setIsAddingNew(true)}
                    startRemoving={() => setIsRemoving(true)}
                />
            </div>

            {has_children &&
            <ul className={'nested' + (!nestedOpened ? ' closed' : '')} ref={nestedList}>
                {tree.children.map(node => <Node key={node.id} tree={node}/>)}
            </ul>
            }
            {isAddingNew && <Popup title="Add new node" onSubmit={exciteAdding}/>}
            {isRemoving && <Popup title="Remove node" mode='remove' remove={exciteRemoving}/>}
        </li>
    );
};

export default Node;
