const localStorageKeyName = 'tagsList'
const tagsList = [
    {
        id: 0,
        name: "餐饮",
        iconName: "money",
        tagType: "食物"
    },
    {
        id: 1,
        name: "外卖",
        iconName: "money",
        tagType: "食物"
    },
    {
        id: 2,
        name: "医疗",
        iconName: "money",
        tagType: "日常"
    },
    {
        id: 3,
        name: "行",
        iconName: "money",
        tagType: "食物"
    },
    {
        id: 4,
        name: "add",
        iconName: "money",
        tagType: "食物"
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