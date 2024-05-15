function saveToLocalStorage(key: string, value: any) {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
}

function getFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export { saveToLocalStorage, getFromLocalStorage };
