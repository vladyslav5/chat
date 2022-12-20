import userStore, {UserStore} from "./userStore";
import chatStore, {ChatStore} from "./chatStore";
import messageStore, {MessageStore} from "./messageStore";

export type RootStore = {
    userStore: UserStore
    chatStore:ChatStore
    messageStore:MessageStore
}
const rootStore: RootStore = {
    userStore: userStore,
    chatStore:chatStore,
    messageStore:messageStore
}

export default rootStore