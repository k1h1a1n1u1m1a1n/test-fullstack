import {useState} from "react";

export const useAccordion = (has_children,nestedList ) => {
    const [nestedOpened, setNestedOpened] = useState(true);

    const toggleNested = () => {
        if (!has_children) return;
        if (nestedOpened) {
            nestedList.current.style.height = nestedList.current.scrollHeight + 'px';
            setTimeout(() => nestedList.current.style.height = '0px');
        } else {
            nestedList.current.style.height = '0px';
            nestedList.current.style.overflow = 'hidden';
            nestedList.current.style.height = nestedList.current.scrollHeight + 'px';
        }
        setNestedOpened(!nestedOpened);
        setTimeout(() => nestedList.current.style = null, 250);
    };

    return {
        nestedOpened,
        toggleNested
    }
};