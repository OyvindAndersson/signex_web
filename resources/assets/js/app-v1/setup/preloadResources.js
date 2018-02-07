import { loadUsersAction } from "../users/actions"


export function preloadResources(store) {
    store.dispatch(loadUsersAction())
}