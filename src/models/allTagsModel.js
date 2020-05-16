const localStorageKeyName = 'allTagsList'
const allTagsList = {
    food: [
        {
            id: 0,
            name: "衣1",
            iconName: "money",
            tagType: "food"
        },
        {
            id: 1,
            name: "食物",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 2,
            name: "住",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 3,
            name: "行",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 4,
            name: "跑步",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 5,
            name: "餐饮",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 6,
            name: "奶茶",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 7,
            name: "水果",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 8,
            name: "医疗",
            iconName: "money",
            tagType: "food"

        }
    ],
    play: [
        {
            id: 0,
            name: "衣1",
            iconName: "money",
            tagType: "food"
        },
        {
            id: 1,
            name: "食物",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 2,
            name: "住",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 3,
            name: "行",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 4,
            name: "跑步",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 5,
            name: "餐饮",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 6,
            name: "奶茶",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 7,
            name: "水果",
            iconName: "money",
            tagType: "food"

        },
        {
            id: 8,
            name: "医疗",
            iconName: "money",
            tagType: "food"

        }
    ]

}
const model = {
    init() {
        if (!window.localStorage.getItem(localStorageKeyName)) {
            window.localStorage.setItem(localStorageKeyName, JSON.stringify(allTagsList))
        }
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName))
    }
}

export default model