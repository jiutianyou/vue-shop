
// 多表单验证组件
export const validateForm = {
  methods: {
    validateForm (formList, okCall, errCall, noTipMsg) {
      let _this = this
      let formAry = this.dealWithRef(formList)
      // 使用Promise.all去校验结果
      Promise.all(formAry.map(this.getFormPromise)).then(res => {
        const result = res.every(item => !!item)
        if (result) {
          // console.log('多个表单都校验通过')
          if (typeof okCall === 'function') {
            okCall()
          }
        } else {
          if (typeof errCall === 'function') {
            errCall()
          } else {
            if (!noTipMsg) {
              _this.$message.warning('校验不通过，参数必填')
            }
          }
        }
      })
    },
    getFormPromise (form) {
      return new Promise(resolve => {
        form.validate(res => {
          resolve(res)
        })
      })
    },
    // 处理ref
    dealWithRef (formList) {
      // 参数格式 [{ parent: 'parentForm', child: 'childForm' }]
      // [{ parent: 'parentForm', child: ['firstForm', 'twoForm', 'threeForm'] }]
      let _this = this
      formList = Array.isArray(formList) ? formList : [formList]
      let formAry = [] // 获取到组件中的form数组
      formList.forEach(item => {
        let { parent, child } = item
        if (parent) {
          let pRef = _this.$refs[parent]
          if (child) {
            let childs = (typeof child === 'string') ? [child] : child
            for (let k of childs) {
              if (k) {
                pRef = pRef.$refs[k]
              }
            }
          }
          formAry.push(pRef)
        }
      })
      return formAry
    },
    // 重置表单
    resetFormFun (formList) {
      let formAry = this.dealWithRef(formList)
      for (let item of formAry) {
        if (typeof item.resetFields === 'function') {
          item.resetFields()
        }
      }
    }
  }
}
