const localStorageKeyName = 'tagsList'
const tagsList = [
    {
        id: 0,
        name: "餐饮",
        iconName: "food",
        tagType: "食物"
    },
    {
        id: 1,
        name: "外卖",
        iconName: "takeOutFood",
        tagType: "食物"
    },
    {
        id: 2,
        name: "医疗",
        iconName: "medicalCare",
        tagType: "日常"
    },
    {
        id: 3,
        name: "交通",
        iconName: "traffic",
        tagType: "日常"
    },
    {
        id: 4,
        name: "add",
        iconName: "add",
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