const localStorageKeyName = 'recordList'
const data = {
    fetch() { 
        return JSON.parse(window.localStorage.getItem(localStorageKeyName))
    },
    save(value){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(value))
    }
}

export default data