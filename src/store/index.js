import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTagsList:{
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
                name: "日用",
                iconName: "dailyExpenses",
                tagType: "日常"

            },
            {
                id: 3,
                name: "维护",
                iconName: "maintain",
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
            },
            {
                id: 5,
                name: "工资",
                iconName: "wages",
                tagType: "日常"
            },
            {
                id: 6,
                name: "社交",
                iconName: "socialContact",
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
        ],
        
    },
    userSelectedTag:[{
        id:0,
        name: "外卖",
        iconName: "takeOutFood",
        tagType: "食物"
    },
    {
        id: 1,
        name: "交通",
        iconName: "traffic",
        tagType: "日常"
    },
    {
        id: 2,
        name: "游戏",
        iconName: "game",
        tagType: "娱乐"

    },
    {
        id:3,
         name: "工资",
        iconName: "wages",
        tagType: "日常"
    },
    {
        id:4,
        tagType:'add',
        name:'添加',
        iconName:'add'
    }],
    defaultSelectedTag:[
        {
            id: 0,
            name: "外卖",
            iconName: "takeOutFood",
            tagType: "食物"
        }
    ],
    recordList:[]
  },
  mutations: {
    initUserTagList(state){
        const isLocal = window.localStorage.getItem('userSelectedTag')
        if (!isLocal) {
            window.localStorage.setItem('userSelectedTag', JSON.stringify(state.userSelectedTag))
        }else{
            state.userSelectedTag = JSON.parse(isLocal)
        }
    },
    initRecordList(state){
        const isLocal = window.localStorage.getItem('recordList')
        if (!isLocal) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
        }else{
            state.recordList = JSON.parse(isLocal)
        }
    },
    saveSelectedTag(state,tag){ //tags触发
        state.defaultSelectedTag=[]
        state.defaultSelectedTag.push(tag)
    },
    saveUserSelectedTag(state,data){ //labels触发
        const userSelectedTag = state.userSelectedTag;
        const index = state.userSelectedTag.length;
        userSelectedTag[index - 1].id++
        userSelectedTag.splice(index-1,0,data)
        window.localStorage.setItem('userSelectedTag', JSON.stringify(userSelectedTag))
    },
    saveRecordList(state,data){
        state.recordList.push(data[0])
        window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    }
    // save
  },
  actions: {
  },
  modules: {
  }
})
