import "./scss/index.scss";
import Trees from "./components/Trees/Trees";
import {TreesContext} from "./context";
import {useEffect, useState} from 'react';
import nodeService from './services'

function App() {
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        const fetch = async () => setTrees(await nodeService.getNodes());
        fetch();
    }, []);

    return (
        <div className="App">
            <TreesContext.Provider value={{trees, setTrees}}>
                <Trees/>
            </TreesContext.Provider>
        </div>
    );
}

export default App;
