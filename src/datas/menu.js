export const menus = {
	data: [{
			"createTime": 1553604292000,
			"label": "系统配置",
			"icon": "el-icon-reading",
			"id": 3,
			"updateTime": 1601196655000,
			"level": 3,
			"childList": [{
					"createTime": 1553604292000,
					"label": "用户管理",
					"id": 1,
					"updateTime": 1560215482000,
					"level": 2,
					"parentId": 3,
					"status": 1,
					"type": 0,
					"pathUrl": "/system/user"
				},
				{
					"createTime": 1553604292000,
					"label": "角色管理",
					"id": 2,
					"updateTime": 1553868206000,
					"level": 2,
					"parentId": 3,
					"status": 1,
					"type": 0,
					"pathUrl": "/system/role"
				},
				{
					"createTime": 1553604293000,
					"label": "数据字典",
					"id": 4,
					"updateTime": 1560170450000,
					"level": 2,
					"parentId": 3,
					"status": 1,
					"type": 0,
					"pathUrl": "/system/dictionary"
				},
				{
					"createTime": 1553604293000,
					"label": "菜单管理",
					"id": 5,
					"updateTime": 1553868293000,
					"level": 2,
					"parentId": 3,
					"status": 1,
					"type": 0,
					"pathUrl": "/system/menu"
				}
			],
			"parentId": 0,
			"status": 1,
			"type": 0,
			"pathUrl": "/system"
		},
		{
			"createTime": 1556336431000,
			"label": "产品管理",
			"icon": "el-icon-film",
			"id": 4,
			"updateTime": 1574046350000,
			"level": 1,
			"childList": [{
					"createTime": 1608884725000,
					"label": "产品查询",
					"id": 401,
					"updateTime": 1608884725000,
					"level": 1,
					"parentId": 4,
					"status": 1,
					"type": 0,
					"pathUrl": "/good/search/list"
				},
				{
					"createTime": 1556336463000,
					"label": "成本管理",
					"id": 402,
					"updateTime": 1583462034000,
					"level": 1,
					"parentId": 4,
					"status": 1,
					"type": 0,
					"pathUrl": "/good/expense"
				},
				{
					"createTime": 1587635890000,
					"label": "生产管理",
					"id": 403,
					"updateTime": 1589874475000,
					"level": 1,
					"parentId": 4,
					"status": 1,
					"type": 0,
					"pathUrl": "/good/task"
				}
			],
			"parentId": 0,
			"status": 1,
			"type": 0,
			"pathUrl": "/good"
		},
		{
			"createTime": 1556336380000,
			"label": "客户管理",
			"icon": "el-icon-suitcase",
			"id": 5,
			"updateTime": 1572248213000,
			"level": 1,
			"childList": [
				{
					"createTime": 1606184613000,
					"label": "客户列表",
					"id": 501,
					"updateTime": 1606184613000,
					"level": 1,
					"parentId": 5,
					"status": 1,
					"type": 0,
					"pathUrl": "/customer/list"
				},
				{
					"createTime": 1606184560000,
					"label": "客户类别",
					"id": 502,
					"updateTime": 1606184560000,
					"level": 1,
					"parentId": 5,
					"status": 1,
					"type": 0,
					"pathUrl": "/customer/type"
				}
			],
			"parentId": 0,
			"status": 1,
			"type": 0,
			"pathUrl": "/customer"
		},
		{
			"createTime": 1553859345000,
			"label": "基础管理",
			"icon": "el-icon-coin",
			"id": 6,
			"updateTime": 1572247784000,
			"level": 2,
			"childList": [{
					"createTime": 1553859366000,
					"label": "币种设置",
					"id": 601,
					"updateTime": 1553868235000,
					"level": 1,
					"parentId": 6,
					"status": 1,
					"type": 1,
					"pathUrl": "/base/currency"
				},
				{
					"createTime": 1553859379000,
					"label": "国家设置",
					"id": 602,
					"updateTime": 1553868230000,
					"level": 1,
					"parentId": 6,
					"status": 1,
					"type": 0,
					"pathUrl": "/base/countries"
				},
				{
					"createTime": 1559291488000,
					"label": "部门设置",
					"id": 603,
					"updateTime": 1559291488000,
					"level": 2,
					"parentId": 6,
					"status": 1,
					"type": 0,
					"pathUrl": "/base/department"
				},
				{
					"createTime": 1584772848000,
					"label": "地址设置",
					"id": 604,
					"updateTime": 1584772848000,
					"level": 3,
					"parentId": 6,
					"status": 1,
					"type": 0,
					"pathUrl": "/base/address"
				}
			],
			"parentId": 0,
			"status": 1,
			"type": 0,
			"pathUrl": "/base"
		}
	]
}
