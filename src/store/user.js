export default{
    namespaced: true,
    state:{
        userinfo:{
            name:'张三',
            age:18
        },
        count:0,
        //测试的
        testData:['aaa','bbbbb','cccc'],
        // 表示页面历史记录
        historyList:[]
    },
    getters:{
        getCountValue(state,getters,rootState, rootGetters){
            // console.log('state:',state) // 本模块的state
            // console.log('getters:',getters) // 本模块的getters
            // console.log('rootState:',rootState) // 本模块的state和根 state
            // console.log('rootGetters:',rootGetters) // 本模块的getters和根 getters
            return state.count
        },
        getUserInfo(state){
            return state.userinfo
        },
        getTestData:(state)=>state.testData
    },
    actions:{
        //模拟异步获取数据
        testAction ({ state,commit},data) {
            // console.log(state,data)
            commit('upActionData',data)
        }
    },
    mutations:{
        addCount(state, count) {
            state.count += count
        },
        updateUser(state,userinfo){
            state.userinfo = userinfo
        },
        upActionData(state,data){
            // console.log('data', data)
            state.testData = data
        },
        // 添加历史记录
        addHistory(state,data){
           state.historyList.push(data)
            // console.log(state.historyList)
        }

    }
};