/* 判断是否为对象
 *
 * @param obj
 * @returns {boolean}
 */
const isObject = obj => {
    const isObject = Object.prototype.toString.call(obj) === '[object Object]'
    if (isObject) {
        return Object.keys(obj).length > 0
    }

    return isObject
}

/**
 * 判断是否为数组
 * @param arr
 * @returns {boolean}
 */
const isArray = arr => {
    const isArray = Object.prototype.toString.call(arr) === '[object Array]'
    if (isArray) {
        return arr.length > 0
    }

    return isArray
}

/**
 * 转换一下日期
 * @param dateStr
 *
 * @returns 月-日
 */
const getMonthDate = dateStr => {
    // 转换为年月日，2023-02-10
    const d = new Date(dateStr)

    let month = d.getMonth() + 1
    if (month < 10) {
        month = `0${month}`
    }
    const date = d.getDate()

    return `${month}-${date}`
}

/**
 * 转换一下日期
 * @param dateStr
 *
 * @returns 年月-日
 */
const getDate = dateStr => {
    // 转换为年月日，2023-02-10
    const d = new Date(dateStr)

    let year = d.getFullYear()

    let month = d.getMonth() + 1
    if (month < 10) {
        month = `0${month}`
    }
    const date = d.getDate()

    return `${year}-${month}-${date}`
}

// 节流
const throttle = (fn, delay) => {
    let last = 0
    let timer = null

    return function () {
        let context = this
        let args = arguments
        let now = +new Date()

        if (now - last < delay) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                fn.apply(context, args)
            }, delay)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}


/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '')
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

/**
 * 日期偏移格式化 offsetVal 正数往前偏移  负数往后偏移
 * @param dateStr
 * @param offsetVal
 */
export function dateOffsetFormat(dateStr, offsetVal, pattern) {
    let offset = 0
    let date = new Date()
    if (dateStr) {
        //将字符串时间转成时间格式
        dateStr = dateStr.replace(/-/g, '/')
        date = new Date(dateStr)
    }
    if (offsetVal) {
        offset = offsetVal
    }
    //将时间进行偏移
    let newDate = new Date(date.getTime() - 24 * 60 * 60 * 1000 * offset)
    // 如果 pattern 不存在
    return parseTime(newDate, pattern)
}

// 拿到当天的最好 23.99.99
export function getDayStartAndEnd(startDate, endDate) {

    // 获取当天开始时间
    // let startOfDay = new Date(startDate);
    // startOfDay.setHours(0);
    // startOfDay.setMinutes(0);
    // startOfDay.setSeconds(0);
    // startOfDay.setMilliseconds(0);
    // 获取当天快结束时间
    console.log(endDate)
    let endOfDay = new Date(endDate)
    endOfDay.setHours(23)
    endOfDay.setMinutes(59)
    endOfDay.setSeconds(59)
    endOfDay.setMilliseconds(999)

    return [
        startDate,
        endOfDay
    ]
}

/**
 * 日期选项参数
 */
export function pickerOptions() {
    let pickerOptions = {
        shortcuts: [
            {
                text: '最近一天',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)

                    picker.$emit('pick', [].concat(getDayStartAndEnd(start, end)))
                }
            },
            {
                text: '最近二天',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    // 重新将事件对象 赋值
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
                    console.log(getDayStartAndEnd(start, end))
                    picker.$emit('pick', [].concat(getDayStartAndEnd(start, end)))
                }
            },
            {
                text: '最近三天',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
                    picker.$emit('pick', [].concat(getDayStartAndEnd(start, end)))
                }
            },
            {
                text: '最近四天',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 4)
                    picker.$emit('pick', [].concat(getDayStartAndEnd(start, end)))
                }
            },
            {
                text: '最近五天',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 5)
                    picker.$emit('pick', [].concat(getDayStartAndEnd(start, end)))
                }
            },
            {
                text: '最近六天',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
                    picker.$emit('pick', [].concat(getDayStartAndEnd(start, end)))
                }
            },
            {
                text: '最近一周',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                    picker.$emit('pick', [].concat(getDayStartAndEnd(start, end)))
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                    picker.$emit('pick', [].concat(getDayStartAndEnd(start, end)))
                }
            }
        ]
    }
    return pickerOptions
}

// 表单重置
export function resetForm(refName) {
    if (this.$refs[refName]) {
        this.$refs[refName].resetFields()
    }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
    let search = params
    //  校验传过来的表单数据中的params
    search.params = typeof (search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {}
    dateRange = Array.isArray(dateRange) ? dateRange : []
    // 在params中添加beginTime 和endTime 数据 拿穿过来的dateRange
    if (typeof (propName) === 'undefined') {
        search.params['beginTime'] = dateRange[0]
        search.params['endTime'] = dateRange[1]
    } else {
        search.params['begin' + propName] = dateRange[0]
        search.params['end' + propName] = dateRange[1]
    }
    return search
}

// 回显数据字典
export function selectDictLabel(datas, value) {
    // datas为对应的表单数据  value为字典数据中的key
    if (value === undefined) {
        return ''
    }
    var actions = []
    Object.keys(datas).some((key) => {
        // 在值相等的一项中 将对应的一项push到actions中
        /*
        *   示例
        *  datas = [{1:{label:'我',value:'1'}},{2:{label:'你',value:'2'}},{3:{label:'他',value:'3'}}]
        *  value = 1
        * */
        if (datas[key].value == ('' + value)) {
            actions.push(datas[key].label)
            return true
        }
    })
    if (actions.length === 0) {
        actions.push(value)
    }
    return actions.join('')
}

// 回显数据字典（字符串、数组）
export function selectDictLabels(datas, value, separator) {
    // 数据校验
    if (value === undefined || value.length === 0) {
        return ''
    }
    // 数据处理
    if (Array.isArray(value)) {
        value = value.join(',')
    }
    var actions = []
    // 分隔符 默认为,
    var currentSeparator = undefined === separator ? ',' : separator
    var temp = value.split(currentSeparator)
    //
    Object.keys(value.split(currentSeparator)).some((val) => {
        var match = false
        Object.keys(datas).some((key) => {
            if (datas[key].value == ('' + temp[val])) {
                actions.push(datas[key].label + currentSeparator)
                match = true
            }
        })
        if (!match) {
            actions.push(temp[val] + currentSeparator)
        }
    })
    return actions.join('').substring(0, actions.join('').length - 1)
}

// 字符串格式化(%s )
export function sprintf(str) {
    var args = arguments, flag = true, i = 1
    str = str.replace(/%s/g, function () {
        var arg = args[i++]
        // 数据校验
        if (typeof arg === 'undefined') {
            flag = false
            return ''
        }
        return arg
    })
    return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
    if (!str || str == 'undefined' || str == 'null') {
        return ''
    }
    return str
}

// 数据合并
export function mergeRecursive(source, target) {
    for (var p in target) {
        try {
            // 通过构造器来进行数据的数据的校验
            if (target[p].constructor == Object) {
                source[p] = mergeRecursive(source[p], target[p])
            } else {
                // 如果不是对象的话直接赋值
                source[p] = target[p]
            }
        } catch (e) {
            // 如果有错误 也是直接赋值
            source[p] = target[p]
        }
    }
    // 返回被合并后的对象
    return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
    // 示例数据结构
    /*
    * data = [{id:'1',parentId:'56'},{id:'2',parentId:'12'},{id:'3',parentId:'34'},{id:'4',parentId:'12'}]
    *
    * */
    // 配置key
    let config = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children'
    }
    // key为父id value为children
    var childrenListMap = {}
    // nodeides的作用 将id做为key  数据结构 为 [1:{id:'1',parentId:'56'},...]
    var nodeIds = {}
    // 最后的结构
    var tree = []

    for (let d of data) {
        // 拿配置的父id 进行数据处理
        let parentId = d[config.parentId]
        // 只要数据不为null 就赋值为数组
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = []
        }
        // 拿 d下面id的value充当nodeIds的key 赋值d
        nodeIds[d[config.id]] = d
        //
        childrenListMap[parentId].push(d)
    }

    for (let d of data) {
        let parentId = d[config.parentId]
        // 将nodeIdes的value数据放到tree中 结构为[{id:'1',parentId:'56'},...]
        if (nodeIds[parentId] == null) {
            tree.push(d)
        }
    }
    // 循环为树结构
    for (let t of tree) {
        adaptToChildrenList(t)
    }

    function adaptToChildrenList(o) {
        // 如果 childrenListMap 存在 直接在对象中添加值
        if (childrenListMap[o[config.id]] !== null) {
            o[config.childrenList] = childrenListMap[o[config.id]]
        }
        // 递归添加 当 没有children这个key就跳出递归
        if (o[config.childrenList]) {
            for (let c of o[config.childrenList]) {
                adaptToChildrenList(c)
            }
        }
    }

    //  返回树结构
    return tree
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName]
        var part = encodeURIComponent(propName) + '='
        if (value !== null && value !== '' && typeof (value) !== 'undefined') {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== '' && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']'
                        var subPart = encodeURIComponent(params) + '='
                        result += subPart + encodeURIComponent(value[key]) + '&'
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + '&'
            }
        }
    }
    return result
}

// 验证是否为blob格式
export function blobValidate(data) {
    return data.type !== 'application/json'
}

// 导出方法

export {
    isArray,
    isObject,
    getMonthDate,
    getDate,
    throttle,
    sprintf,
    addDateRange,
    selectDictLabels,
    dateOffsetFormat,
    parseStrEmpty,
    mergeRecursive,
    handleTree,
    tansParams,
    blobValidate,
    resetForm,
}
