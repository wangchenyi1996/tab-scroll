/*
 * @Description: mock.js--使用mockjs提供mock数据接口
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-06-17 11:16:19
 * @LastEditors: 王强
 * @LastEditTime: 2020-06-17 11:29:42
 */ 

import Mock from 'mockjs'
import data1 from './datas/categroy.json'
import data2 from './datas/cityData.json'
import data3 from './datas/countryAreaCode.json'

// 返回城市列表的接口
Mock.mock('/cityList','get', {code: 0, data: data2})
// 返回商品分类的接口
Mock.mock('/categroy','post', {code: 0, data: data1})
// 返回所有国家区号
Mock.mock('/getCountryCode','post', {code: 0, data: data3})

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可