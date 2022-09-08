import httpService from "./httpService";
const tableName = "units";
const arr = ["nameen", "namear"];

async function _get() {
    return await httpService._get(tableName);  
}
async function _delete(id) {
  await httpService._delete(id,tableName);
}
async function _save(item) {
  await httpService._save(item,arr,tableName)
 }
export default{
  _get,
  _save,
  _delete
}