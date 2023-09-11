import { RemoveFromLocalStorage } from ".";

export const logOut = () => {
    RemoveFromLocalStorage();
    window.location.href = '/';
}