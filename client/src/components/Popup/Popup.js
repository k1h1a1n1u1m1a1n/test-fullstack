import './popup.scss';
import {useState, useEffect, useRef} from 'react';

const Popup = (props) => {
    const [counter, setCounter] = useState(20);
    const addNewInput = useRef(null);

    useEffect(() => {
        if (props.mode !== 'remove') return;
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (!counter) props.remove(false);
        return () => clearInterval(timer);
    }, [counter]);

    const closePopup = () => {
        if (props.mode === 'remove') {
            return props.remove(false);
        }
        props.onSubmit(null);
    }

    useEffect(() => {
        if(addNewInput.current) {
            addNewInput.current.focus();
        }
    },[props.mode]);

    return (
        <div className="popup-wrp" onClick={() => props.onSubmit(null)}>
            <div className="popup" onClick={e => e.stopPropagation()}>
                <div className="popup-header flex justify-between align-center">
                    <div className="popup-title">{props.title}</div>
                    <div className="popup-close" onClick={closePopup}><i className="icon-add"/></div>
                </div>
                <div className="popup-body">
                    {props.mode !== 'remove'
                        ?
                        <form onSubmit={props.onSubmit} autoComplete="off">
                            <label htmlFor="new-node-name">Name of new node:</label>
                            <input ref={addNewInput} id="new-node-name" required="required" type="text" placeholder="Type here..."/>
                            <button className="btn">Add</button>
                        </form>
                        :
                        <div>
                            This is very dengerous, you shouldn't do it! Are you really sure?
                            <div className="flex justify-between popup-buttons align-center">
                                <div className="popup-counter">{counter}</div>
                                <div className="flex">
                                    <button className="btn" onClick={() => props.remove(true)}>Yes I am</button>
                                    <button className="btn" onClick={() => props.remove(false)}>No</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Popup;