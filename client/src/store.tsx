import React, {createContext, ReactNode, useContext} from "react";
import {useLocalObservable} from "mobx-react-lite";
import rootStore, {RootStore} from "./stores/rootStore";

const storeContext = createContext<RootStore | null>(null)

export const StoreProvider = ({children}: { children: ReactNode }) => {
    const store = useLocalObservable(() => rootStore);
    return <storeContext.Provider
        value={store}
    >
        {children}
    </storeContext.Provider>
}

export const useStore = () => {
    const store = useContext(storeContext);
    if(!store){
        throw new Error("useStore must be used within a StoreProvider.")
    }
    return store;
}