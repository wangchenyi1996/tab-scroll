export default{
    namespaced: true,
    state:{
        userinfo:{
            name:'张三',
            age:18
        },
        count:0,
        //测试的
        testData:['aaa','bbbbb','cccc']
    },
    getters:{
        getCountValue(state){
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
            console.log(state,data)
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
            console.log('data', data)
            state.testData = data
        }
    }
};