export const getAccessTokenFromLocalStorage = () => {
    let localdata = localStorage.getItem('accessToken');
    return localdata = JSON.parse(localdata);
}

export const setAccesTokenStorage = (data) => {
    localStorage.setItem('accessToken', JSON.stringify(data))
}