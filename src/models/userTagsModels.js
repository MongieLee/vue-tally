const localStorageKeyName = 'tagsList'
const tagsList = [
    {
        id: 0,
        name: "衣",
        iconName: "money"
    },
    {
        id: 1,
        name: "食物",
        iconName: "money"
    },
    {
        id: 2,
        name: "住",
        iconName: "money"
    },
    {
        id: 3,
        name: "行",
        iconName: "money"
    },
    {
        id: 4,
        name: "add",
        iconName: "money"
    }
]
const model = {
    init() {
        if (!window.localStorage.getItem(localStorageKeyName)) {
            window.localStorage.setItem(localStorageKeyName, JSON.stringify(tagsList))
        }
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName))
    },
    save(value) {
        window.localStorage.setItem(localStorageKeyName, value)
    }
}

export default model