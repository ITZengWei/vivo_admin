# 接口文档

## 我的区域

### 登录

+ 请求路径：/login
+ 请求方法： POST
+ 请求参数

|  参数名  | 参数说明 | 备注 |
|----------|----------|------|
| username | 用户名   | 非空 |
| password | 用户密码 | 非空 |

+ 响应参数


|  参数名   |      参数说明      | 备注 |
|-----------|--------------------|------|
| id        | 用户 ID            |      |
| username  | 用户名             |      |
| email     | 邮箱               |      |
| token     | 令牌               |      |
| tel       | 手机号             |      |
| introduce | 介绍               |      |
| meta      | 登录信息           |      |
| status    | 状态码   200  成功 |      |
| msg       | 状态信息           |      |

> `token` 令牌 判断是否为正常用户 0 普通 1 会员 -1 黑名单 

+ 响应数据 

```JSON
 {
  data: {
    "id": 500,
    "username": "Bill",
    "email": "123@qq.com",
    "token": 1,
    "tel": "13407943933",
    "introduce": '这家伙很懒什么都没有说明'
  },
  "meta": {
    "status": 200
    "msg": "登录成功"
  } 
 }
```


## 首页 区域

### 获取轮播图和热门产品 接口

+ 请求路径： /get_car_pro
+ 请求方法： GET

+ 响应参数

|  参数名  |   参数说明   | 备注 |
|----------|--------------|------|
| carousel | 轮播图数据   | 数组 |
| product  | 商品数据     | 对象 |
| main     | 主商品数据   | 对象 |
| common   | 普通商品数据 | 数组 |


+ 响应数据 

```JSON
  {
    <!-- 轮播图数据 -->
    carousel: [
       .... 
       'https://shopstatic.vivo.com.cn/vivoshopl.jpg',
    ],
    <!-- 产品数据 -->
    product: {
      <!-- 主要产品 -->
      main: {
        src: 'https://shopstatic.vivo.com.cn/vivosho409434hd_530x530.png',
        title: 'X9Plus 全网通',
        subtitle: '优惠200元|限量促销',
        price: 3183.00
      },

      <!-- 普通产品  -->
      common: [
        {
          src: 'https://shopstatic.vivo.com.cn/vivosho409434hd_530x530.png' 
          title: 'X20Plus 全面屏',
          subtitle: '6.43英寸大屏|0.1s快速解锁',
          price: 3498
        },
        {
          ....
        }
      ]

    }
  }
```

### 选购页面

+ 请求路径： /choose/:name_id
+ 请求方法：GET
+ 请求参数

| 参数名  |  参数说明  |   备注   |
|---------|------------|----------|
| name_id | 选购名字ID  | 不能为空 |

> name_id ： 1、2、3(选购手机、选购配件、选购碎屏宝、定制手机) 

+ 响应参数

|  参数名   |  参数说明  | 备注 |
|-----------|------------|------|
| goodsList | 商品列表   | 数组 |
| id        | 商品 ID    | 数字 |
| type      | 商品 类型  |      |
| src       | 商品图片   |      |
| title     | 商品标题   |      |
| subtitle  | 商品副标题 |      |
| price     | 商品价格   |      |
| total     | 商品库存   |      |


+ 响应数据

```JSON
{
  goodsList: [
    {
      id: 1,
      type: 'Xplay',
      src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
      title: 'X9Plus 全网通',
      subtitle: '优惠200元|限量促销',
      price: '￥2798',
      total: 99,
    },
    {
      id: 1,
      type: 'Xplay',
      src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
      title: 'X9Plus 全网通',
      subtitle: '优惠200元|限量促销',
      price: '￥2798',
      total: 99,
    },
  ]
}
```

### 商品详情页面

+ 请求路径： /goods/:goods_name/:goods_id
+ 请求方法： GET
+ 请求参数

|   参数名   |    参数说明   | 备注 |
|------------|---------------|------|
| goods_name | 商品类名      | 非空 |
| goods_id   | 商品对应的 ID | 非空 |

+ 响应参数

|  参数名  |  参数说明  |   备注   |
|----------|------------|----------|
| images   | 轮播图数据 |          |
| title    | 商品标题   |          |
| subtitle | 商品副标题 |          |
| price    | 商品价格   |          |
| ad       | 商品广告   |          |
| info     | 商品介绍   |          |
| total    | 商品库存   |          |
| explain  | 商品说明   | HTML文本 |

+ 响应数据

```JSON
{
  goods: {
      images: [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/82/1882_1447902810338_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/82/1882_1447902809866_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png'
      ],
      title: 'X9Plus 全网通',
      /* 广告 */
      ad: '【花呗免息，0首付0利率轻松购机】',
      info: ' X9s Plus A 5.85英寸大屏，双引擎闪充，4015mAh大电池，持久续航（注：面部识别需升级到最新系统使用',
      price: 2798,
      /* 库存 */
      total: 1,
      explain: '<div>hello word</div>'
    }
}  
```

### 结算页面

+ 请求路径：/get_user_address/:user_id
+ 请求方法：GET
+ 请求参数

| 参数名  | 参数说明 | 备注 |
|---------|----------|------|
| user_id | 用户 ID  | 非空 |

+ 响应参数 

| 参数名 | 参数说明 |          备注          |
|--------|----------|------------------------|
| status | 状态码   | 200 为成功             |
| msg    | 状态信息 | ok 为成功 error 为失败 |


```JSON
 {
  status: 200,
  msg: 'ok',
  data: {
    "name": 'Bill',
    "tel": "13407943933",
    "address": "江西省抚州市"
  }
 }
```


## 分类 区域

> 因为分类页面 比较大 这里 我们采用 后端 分页

### 商品分类

+ 请求路径： /get_product
+ 请求