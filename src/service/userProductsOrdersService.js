import httpService from "./httpService";
const tableName = "userProductsorders";
const arr = ["orderid","userproductid" , "quantity" ,"unitprice"] ;

async function _get() {
  return await httpService._get(tableName);  
}
async function _delete(id) {
  return await httpService._delete(id,tableName);
}
async function _save(item) {
  return await httpService._save(item,arr,tableName)
 }
//  async function deleteOrders(arr){
//   if(arr.length ==1) return _delete(arr[0].id)
//  }

export default{
  _get,
  _save,
  _delete,
  // deleteOrders,
}