import userTagsModels from '@/models/userTagsModel.js'
function getDefaultTag() {
    for (const i in userTagsModels.fetch()) {
        return userTagsModels.fetch()[i]
    }
}
const localStorageKeyName = 'allTagsList'
const allTagsList = {
    foods: [
        {
            id: 0,
            name: "餐饮",
            iconName: "food",
            tagType: "食物"
        },
        {
            id: 1,
            name: "水果",
            iconName: "fruits",
            tagType: "食物"

        },
        {
            id: 2,
            name: "酒水",
            iconName: "drinks",
            tagType: "食物"

        },
        {
            id: 3,
            name: "零食",
            iconName: "snacks",
            tagType: "食物"

        },
        {
            id: 4,
            name: "买菜",
            iconName: "buyVegetables",
            tagType: "食物"

        },
        {
            id: 5,
            name: "外卖",
            iconName: "takeOutFood",
            tagType: "食物"

        },
        {
            id: 6,
            name: "奶茶",
            iconName: "teaWithMilk",
            tagType: "食物"

        }
    ],
    life: [
        {
            id: 0,
            name: "房租",
            iconName: "rent",
            tagType: "日常"
        },
        {
            id: 1,
            name: "水电",
            iconName: "hydropower",
            tagType: "日常"

        },
        {
            id: 2,
            name: "话费",
            iconName: "telephoneBill",
            tagType: "日常"

        },
        {
            id: 3,
            name: "维护",
            iconName: "lottery",
            tagType: "日常"

        },
        {
            id: 4,
            name: "医疗",
            iconName: "medicalCare",
            tagType: "日常"
        },
        {
            id: 5,
            name: "交通",
            iconName: "traffic",
            tagType: "日常"
        }
    ],
    play: [
        {
            id: 0,
            name: "电商",
            iconName: "onlineShopping",
            tagType: "娱乐"
        },
        {
            id: 1,
            name: "游戏",
            iconName: "game",
            tagType: "娱乐"

        },
        {
            id: 2,
            name: "宠物",
            iconName: "pets",
            tagType: "娱乐"

        },
        {
            id: 3,
            name: "彩票",
            iconName: "lottery",
            tagType: "娱乐"
        }
    ]


}
const defalutTag = getDefaultTag()

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