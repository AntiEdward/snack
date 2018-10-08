<template>
    <div class="main-container" v-loading="loading">
        <div class="name">
            <div class="select-group">
                <span class="demonstration">Name：</span>
                <el-input type="text" class="name-input" v-model="name"></el-input>
            </div>
            <!--校验提示-->
            <div class="select-warning" v-show="nameCheckFlag">
                <div class="waring-img"></div>
                <span>不能为空</span>
            </div>
        </div>
        <!--下单-->
        <div class="select">
            <div class="select-cascader">
                <div class="select-group">
                    <span class="demonstration">吃点啥：</span>
                    <el-cascader
                        expand-trigger="hover"
                        :options="menu"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                </div>
            </div>
            
            <div class="select-input">
                <div class="select-group">
                    <span class="sub-title">自己写：</span>
                    <el-autocomplete
                        class="inline-input"
                        v-model="state"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect">
                    </el-autocomplete>
                </div>
                <div class="btn select-input-btn" @click="addOrderList(state)">
                    <span>添加</span>
                </div>
            </div>
        </div>
        <!--购物车-->
        <div class="order">
            <div class="order-title">
                <span>订单列表：</span>
            </div>
            <div class="order-list-group">
                <div class="order-list">
                    <div class="order-list-item" v-for="(item,index) in orderList" :key="index">
                        <div><span>{{item}}</span></div>
                        <div class="btn order-list-item-btn" @click="deleteOrder(index)">
                            <span>删除</span>
                        </div>
                    </div>
                </div>
                <!--校验提示-->
                <div class="select-warning" v-show="selectCheckflag">
                    <div class="waring-img"></div>
                    <span>不能为空</span>
                </div>
            </div>
            
            <div class="order-btn-group">
                <!-- <input type="text" v-model="testInput"> -->
                <div class="btn order-btn" @click="addOrder(orderList)">
                    <span>下单</span>
                </div>
            </div>
        </div>
        <div class="check-orders">
            <div class="check-orders-btn-group">
                <div class="btn check-orders-btn" @click="getOrders">
                    <span>查询</span>
                </div>
            </div>
            <div class="check-orders-list">
                <div v-for="(item,index) in checkOrdersList" :key="index">
                    <span>{{ item.name }} - </span>
                    <span>{{ item.order }} - </span>
                    <span>{{ dateFormat(item.time) }}</span>
                </div>
            </div>
        </div>
        <!-- <div class="">
            <div v-for="(item,index) in testData" :key="index">
                <span>{{item.name}}</span>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            loading: false,
            //菜单
            menu: [],
            //一级菜单
            firstMenu:[],
            //二级菜单
            secondMenu:[],
            options: [
                {
                    value: '饮料',
                    label: '饮料',
                    children: [
                        {
                            value: '咖啡',
                            label: '咖啡',
                            children: [{
                                value: '拿铁',
                                label: '拿铁'
                            }, {
                                value: '香草拿铁',
                                label: '香草拿铁'
                            }, {
                                value: '焦糖玛奇朵',
                                label: '焦糖玛奇朵'
                            }, {
                                value: '香草星冰乐',
                                label: '香草星冰乐'
                            }]
                        }, 
                        {
                            value: '奶茶',
                            label: '奶茶',
                            children: [{
                                value: '黑糖冻奶茶',
                                label: '黑糖冻奶茶'
                            }, {
                                value: '珍珠奶茶',
                                label: '珍珠奶茶'
                            }]
                        }
                    ]
                }, 
                {
                    value: '小食',
                    label: '小食',
                    children: [
                        {
                            value: '炸鸡',
                            label: '炸鸡',
                            children: [{
                                value: '盐酥鸡',
                                label: '盐酥鸡'
                            }, {
                                value: '炸鸡排',
                                label: '炸鸡排'
                            }, {
                                value: '炸鸡柳',
                                label: '炸鸡柳'
                            }]
                        }, {
                            value: '薯条',
                            label: '薯条',
                            children: [{
                                value: '薯条',
                                label: '薯条'
                                },{
                                value: '薯条',
                                label: '薯条'
                            }]
                        }, {
                            value: '烧仙草',
                            label: '烧仙草',
                            children: [{
                                value: '芋圆',
                                label: '芋圆'
                                },{
                                value: '地瓜',
                                label: '地瓜'
                            }]
                        }
                    ]
                }, 
                {
                    value: '套餐',
                    label: '套餐',
                    children: [
                        {
                            value: '拿铁蛋糕套餐',
                            label: '拿铁蛋糕套餐',
                            children: [{
                                value: '拿铁',
                                label: '拿铁'
                                },{
                                value: '蛋糕',
                                label: '蛋糕'
                            }]
                        }, {
                            value: '炸鸡可乐套餐',
                            label: '炸鸡可乐套餐',
                            children: [{
                                value: '炸鸡',
                                label: '炸鸡'
                                },{
                                value: '可乐',
                                label: '可乐'
                            }]
                        }, {
                            value: '炸鸡薯条可乐套餐',
                            label: '炸鸡薯条可乐套餐',
                            children: [{
                                value: '炸鸡',
                                label: '炸鸡'
                                },{
                                value: '薯条',
                                label: '薯条'
                            }]
                        }
                    ]
                }
            ],
            //姓名
            name: '',
            //级联菜单内容
            selectedOptions: [],    
            //自定义联想内容
            restaurants: [],    
            //自定义输入内容
            state: '',          
            //测试查询
            testData: [],       
            //测试插入
            testInput: '',      
            //购物车列表
            orderList: [],
            //查询订单列表
            checkOrdersList: [],

            //订单为空校验提示
            selectCheckflag: false,
            //姓名为空校验提示
            nameCheckFlag: false

        };
    },
    mounted() {
        this.getMenuAll()
        // this.restaurants = this.loadAll();
    },
    methods: {
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //时间格式转换
        dateFormat(data){
            let date = new Date(data)
            let yy = date.getFullYear()
            let mm = date.getMonth() + 1
            let dd = date.getDate()
            let hh = date.getHours()
            let mi = date.getMinutes()
            let ss = date.getSeconds()

            return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss
        },
        //菜单数据去重
        removeDuplicates(data){
            let obj = {}
            for(let i in data){
                obj[data[i].id] = data[i]
            }
            // console.log('obj',obj)
            let arr = []
            for(let i in obj){
                arr.push(obj[i])
            }
            // console.log('arr',arr)
            return arr
        },
        //选择框事件
        handleSelect(item) {
            // console.log(item);
            this.orderList.push(item.value)
            this.state = ''
        },
        //输入框事件
        handleChange(value) {
            // console.log(value);
            this.orderList.push(value[2])
        },
        //添加订单
        addOrderList(data){
            if(data === ''){
                return
            }
            this.orderList.push(data)
            this.state = ''
        },
        //删除订单内容
        deleteOrder(index){
            this.orderList.splice(index,1)
        },
        //测试查询
        getFind(){
            let _this = this
            _this.axios.get('/api/find')
            .then(res=>{
                // console.log(res)
                let data = res.data.data
                _this.testData = data
            })
        },
        //测试添加
        addName(data){
            let _this = this
            let req = {
                name: data
            }
            _this.axios.post('/api/add',req)
            .then(res=>{
                _this.testInput = ''
                // _this.getFind()
            })
        },
        //查询菜单
        getMenuAll(){
           let _this = this
            _this.axios.get('/api/getMenuAll')
            .then(res => {
                //处理一级菜单
                let data = res.data.data
                for(let i in data){
                    let item = {
                        value: '',
                        label: '',
                        id: '',
                        children: []
                    }
                    item.value = data[i].type
                    item.label = data[i].type
                    item.id = data[i].type_id

                    _this.firstMenu.push(item)
                }
                //去重
                _this.menu = _this.removeDuplicates(_this.firstMenu)
                // console.log('menu',_this.menu)
                return res
            })
            .then(res => {
                //处理二级菜单
                let data = res.data.data
                for(let i in data){
                    let item = {
                        value: '',
                        label: '',
                        parentId: '',
                        id: '',
                        children: []
                    }
                    item.value = data[i].sub_type
                    item.label = data[i].sub_type
                    item.id = data[i].sub_type_id
                    item.parentId = data[i].type_id

                    _this.secondMenu.push(item)
                }
                //去重
                _this.secondMenu = _this.removeDuplicates(_this.secondMenu)
                //将二级菜单插入到一级菜单中
                for(let i in _this.secondMenu){
                    for(let j in _this.menu){
                        if(_this.menu[j].id === _this.secondMenu[i].parentId){
                            _this.menu[j].children.push(_this.secondMenu[i])
                        }
                    }
                }
                // console.log('menu',_this.menu)
                return res
            })
            .then(res => {
                //处理三级菜单
                let data = res.data.data
                for(let i in data){
                    let item = {
                        value: '',
                        label: '',
                        parentId: ''
                    }
                    item.value = data[i].name
                    item.label = data[i].name
                    item.parentId = data[i].sub_type_id

                    for(let j in _this.menu){
                        for(let k in _this.menu[j].children){
                            if(_this.menu[j].children[k].id === data[i].sub_type_id){
                                _this.menu[j].children[k].children.push(item)
                            }
                        }
                    }
                    //将三级菜单到数据插入自定义菜单数组中
                    _this.restaurants.push(item)
                }
                console.log('menu',_this.menu)
            })
        },
        //下单
        addOrder(data){
            let _this = this
            //校验姓名
            if(_this.name === ''){
                _this.nameCheckFlag = true
                return
            }else{
                _this.nameCheckFlag = false
            }
            //校验订单
            if(_this.orderList.length === 0){
                _this.selectCheckflag = true
                return
            }else{
                _this.selectCheckflag = false
            }
            let req = {
                name: _this.name,
                order: data,
                time: new Date()
            }
            _this.loading = true
            _this.axios.post('/api/addOrder',req)
            .then(res=>{
                setTimeout(()=>{
                    _this.loading = false
                    _this.$store.dispatch('changeAlertFlag',true)
                },500)
                
            })
        },
        //获取全部订单
        getOrders(){
            let _this = this
            _this.axios.get('/api/getOrders')
            .then(res=>{
                let data = res.data.data
                _this.checkOrdersList = data
            })
        }
    }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "@/assets/common.scss";
    @import "@/assets/hello.scss";
</style>
