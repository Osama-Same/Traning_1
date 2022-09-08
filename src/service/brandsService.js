import httpService from "./httpService";
const tableName = "brands";
const arr = ["nameen", "namear", "descriptionen", "descriptionar","logo"];

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