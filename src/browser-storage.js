const KEY = 'inventory';


export const loadState = () => {
    try {
        const storedState = localStorage.getItem(KEY);
        if(!storedState) return undefined;
        return JSON.parse(storedState);
    } catch (e) {
        return undefined;
    }
}


export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(KEY, serializedState);
    } catch (e) {
        console.error(e);
    }
}