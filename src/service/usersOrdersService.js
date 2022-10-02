import httpService from "./httpService";
const tableName = "usersorders";
const arr = ["clientname" , "clienttel" ,"userprofileid" ,"startdate","enddate","status","latitude" ,"longitude"] ;

async function _get() {
  return await httpService._get(tableName);  
}
async function _delete(id) {
  return  await httpService._delete(id,tableName);
}
async function _save(item) {
  return await httpService._save(item,arr,tableName)
 }
export default{
  _get,
  _save,
  _delete
}