const DATA_KEY = "fin-term";
export const saveToLocalStorage = (data) => {
  window.localStorage.setItem(DATA_KEY, JSON.stringify(data));
};
export const getFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem(DATA_KEY));
};
