import { AuthRestUtil } from '@/util/AuthRestUtil'
import $ from 'jquery'

export class TableUtil {
  // 后台发送数据的key
  public static TABLE_DATA_KEY = 'rows'
  // 后台发送数据条数的key
  public static TOTAL_KEY = 'total'

  // 标识树形表格数据的级别
  public static ROW_TREE_LEVEL = 'tree_level'
  // 数据中存储的tree的样式
  public static ROW_TREE_CLASS = 'treeClass'
  // 树形表格展开、关闭样式
  public static TREE_OPEN_CLASS: string = 'el-tree-node__expand-icon el-icon-caret-right expanded'
  public static TREE_CLOSE_CLASS: string = 'el-tree-node__expand-icon el-icon-caret-right'
  // 节点中存储下级数据
  public static ROW_CHILDREN_DATA = 'tree_children_data'

  private authRestUtil
  // 查询URL
  private queryUrl: string
  // 删除URL
  private deleteUrl: string
  // 页面的vue对象
  private tableModel: any
  // 是否是树形表格
  private isTreeTable = false
  // 标识树形结构上下级关系
  private parentCode: string
  private code: string

  // 页面实体
  private pageModel
  /**
   * 构造函数
   * @param {string} queryUrl
   * @param {string} deleteUrl
   * @param tableModel
   */
  constructor(queryUrl: string, deleteUrl: string, pageModel: any) {
    this.queryUrl = queryUrl
    this.deleteUrl = deleteUrl
    this.pageModel = pageModel
    // rest工具类
    this.authRestUtil = new AuthRestUtil(pageModel)
  }

  /**
   * 加载表格数据
   * @param {{[p: string]: any}} parameters 参数
   */
  public loadTableData(parameters: {[index: string]: any}, success: Function) {
    let $this = this
    this.authRestUtil.authPostAjax(this.queryUrl, parameters, success, null)
  }

  /**
   * 重新加载数据
   * @param {{[p: string]: any}} parameters
   * @param {Function} success
   */
  public reload(parameters: {[index: string]: any}, success: Function): void {
    let $this = this
    this.loadTableData(parameters, successDefault)
    function successDefault(result) {
      let rows: any[] = result['rows']
      // 如果是树形表格对数据进行格式化
      if ($this.isTreeTable) {
        rows = $this.formatTreeLevel(rows, 0)
      }
      // 执行成功回调
      success(result)
    }
  }

  /**
   * 设置是否是树形表格
   * @param {boolean} isTreeTable
   */
  public setIsTreeTable (isTreeTable: boolean, parentCode: string, code: string) {
    this.isTreeTable = isTreeTable
    this.parentCode = parentCode
    this.code = code
  }

  /**
   * 格式化树形数据
   * @param datas
   * @param {number} parentLevel
   * @returns {any}
   */
  public formatTreeLevel(datas: any, parentLevel: number) {
    if (datas) {
      for(let data of datas) {
        data[TableUtil.ROW_TREE_LEVEL] = parentLevel + 1
        data[TableUtil.ROW_TREE_CLASS] = 'close'
      }
    }
    return datas
  }

  /**
   * 格式化树形style
   * 根据级别缩进
   * @param row
   * @returns {string}
   */
  public formatTreeStyle (row: any): string {
    let px = 0
    if (row && row[TableUtil.ROW_TREE_LEVEL]) {
      let level = row[TableUtil.ROW_TREE_LEVEL]
      if (level > 1) {
        px = 18 * (level - 1)
      }
      if (row['isLeaf'] === true) {
        px += 18
      }
    }
    return 'padding-left: ' + px + 'px;'
  }

  /**
   * 格式化树形按钮class
   * @param row
   * @returns {string}
   */
  public formatTreeClass (row: any): string {
    if (row[TableUtil.ROW_TREE_CLASS] === 'open') {
      return TableUtil.TREE_OPEN_CLASS
    } else {
      return TableUtil.TREE_CLOSE_CLASS
    }
  }

  /**
   * 显示隐藏下级
   * @param row
   * @param {number} index
   */
  public showHideChildren (row: any, index: number): void {
    if (!row[TableUtil.ROW_TREE_CLASS] || row[TableUtil.ROW_TREE_CLASS] === 'close') {
      row[TableUtil.ROW_TREE_CLASS] = 'open'
      // 展开节点
      this.openTree(row, index)
    } else {
      row[TableUtil.ROW_TREE_CLASS] = 'close'
      // 关闭节点
      this.closeTree(row, index)
    }
  }

  /**
   * 打开树形节点
   * @param row
   * @param {number} index
   */
  private openTree(row: any, index: number): void {
    let $this = this
    if (!row[TableUtil.ROW_CHILDREN_DATA]) {
      // 从后台获取
      let parameters: {[index: string]: any} = {}
      parameters[this.parentCode] = row[this.code]
      // 加载数据
      this.loadTableData(parameters, success)
    } else {
      addData()
    }
    // 成功回调
    function success(result) {
      // 为数据添加级别
      row[TableUtil.ROW_CHILDREN_DATA] = $this.formatTreeLevel(result[TableUtil.TABLE_DATA_KEY], row[TableUtil.ROW_TREE_LEVEL])
      addData()
    }
    // 将数据添加到页面
    function addData() {
      // 如果页面
      if ($this.pageModel) {
        if ($this.pageModel['appendChildren']) {
          $this.pageModel['appendChildren'](row, index)
        } else if ($this.pageModel['tableData']) {
          let data: any[] = row[TableUtil.ROW_CHILDREN_DATA]
          for (let i = 0; i < data.length; i++) {
            // 在指定位置添加数据
            $this.pageModel['tableData'].splice(index + i + 1, 0, data[i])
          }
        }
      }
    }
  }

  /**
   * 关闭树形节点
   * @param row
   * @param {number} index
   */
  public closeTree(row: any, index: number): void {
    // 获取节点中的下级数据，遍历数据并删除
    // 1、从row中获取下级节点数据，并将key放入数组中
    if (row[TableUtil.ROW_CHILDREN_DATA]) {
      let keys: Array<any> = []
      // 获取keys
      this.getOpenRowCode(row, keys)
      // 2、遍历所有数据，如果该元素在keys中，删除该元素
      if (this.pageModel) {
        if (this.pageModel['removeChildren']) {
          this.pageModel['removeChildren'](row, keys)
        } else if (this.pageModel['tableData']) {
          let i = this.pageModel.tableData.length
          while (i--) {
            let data = this.pageModel.tableData[i]
            if ($.inArray(data[this.code], keys) > -1) {
              // 移除该元素
              this.pageModel.tableData.splice(i, 1)
            }
          }
        }
      }
    }
  }
    /**
     * 获取row所有展开的下级的key
     * @param row
     * @param {Array<string>} keys
     */
  private getOpenRowCode (row: any, keys: Array<string>): void {
    if (row[TableUtil.ROW_CHILDREN_DATA]) {
      for (let child of row[TableUtil.ROW_CHILDREN_DATA]) {
        keys.push(child[this.code])
        // 判断当前节点是否展开，如果站点递归获取下级key
        if (child[TableUtil.ROW_TREE_CLASS] === 'open') {
          this.getOpenRowCode(child, keys)
        }
      }
    }
  }
}
