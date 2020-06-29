const token = 'user';

export const getUser = () => {
    try {
        let userData = JSON.parse(localStorage.getItem(token));
        return userData;
    } catch (e) {
        return null;
      }
}
export const setUser = (user) => {
   return localStorage.setItem(token, JSON.stringify(user));

}

export const removeUser = () => {
    return localStorage.removeItem(token);
 
 }