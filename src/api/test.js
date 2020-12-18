import request from "@/utils/axios"

/**
 * 用户登录
 */
export function login(data) {
  return request.post(
    'http://rap2api.taobao.org/app/mock/233782/api/getcharts',
    data
  )
}

//获取个人信息与系统菜单
export function getMenu(data){
  return request.get(
    'http://rap2api.taobao.org/app/mock/233782/api/roomList',
    data
  );
}