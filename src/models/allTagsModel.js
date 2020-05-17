import userTagsModels from '@/models/userTagsModel.js'
const localStorageKeyName = 'allTagsList'
const allTagsList = {
    foods: [
        {
            id: 0,
            name: "餐饮",
            iconName: "money",
            tagType: "食物"
        },
        {
            id: 1,
            name: "水果",
            iconName: "money",
            tagType: "食物"

        },
        {
            id: 2,
            name: "酒水",
            iconName: "money",
            tagType: "食物"

        },
        {
            id: 3,
            name: "零食",
            iconName: "money",
            tagType: "食物"

        },
        {
            id: 4,
            name: "买菜",
            iconName: "money",
            tagType: "食物"

        },
        {
            id: 5,
            name: "外卖",
            iconName: "money",
            tagType: "食物"

        },
        {
            id: 6,
            name: "奶茶",
            iconName: "money",
            tagType: "食物"

        },
        {
            id: 8,
            name: "医疗",
            iconName: "money",
            tagType: "食物"

        }
    ],
    life: [
        {
            id: 0,
            name: "房租",
            iconName: "money",
            tagType: "日常"
        },
        {
            id: 1,
            name: "水电",
            iconName: "money",
            tagType: "日常"

        },
        {
            id: 2,
            name: "话费",
            iconName: "money",
            tagType: "日常"

        },
        {
            id: 3,
            name: "维护",
            iconName: "money",
            tagType: "日常"

        },
        {
            id: 4,
            name: "医疗",
            iconName: "money",
            tagType: "日常"
        }
    ],
    play: [
        {
            id: 0,
            name: "电商",
            iconName: "money",
            tagType: "娱乐"
        },
        {
            id: 1,
            name: "游戏",
            iconName: "money",
            tagType: "娱乐"

        },
        {
            id: 2,
            name: "宠物",
            iconName: "money",
            tagType: "娱乐"

        },
        {
            id: 3,
            name: "彩票",
            iconName: "money",
            tagType: "娱乐"
        }
    ]


}
const defalutTag = xx()
function xx() {
    for (let i in userTagsModels.fetch()) {
        return userTagsModels.fetch()[i]
    }
}

console.log(defalutTag)


const model = {
    defalutTag,
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