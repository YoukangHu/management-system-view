// 文件内引用 vue对象
import _this from "../main.js";

// 1、清除激活路径
function clearActivePath() {
  _this.$store.commit("clearActivePath");
}

// 2、定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}

// 3、利用js递归将最后一级空数组变成undefined
function getTreeData(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children.length < 1) {
      // 最后一级没有数据将children变成undefined
      data[i].children = undefined;
    } else {
      // children不为空时继续调用该方法
      getTreeData(data[i].children);
    }
  }
  return data;
}

// 进行暴露
export { clearActivePath, deepClone, getTreeData };
