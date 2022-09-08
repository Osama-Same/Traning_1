import axios from "axios";
import _ from "lodash";
import {toast} from 'react-toastify'
import {getToken} from './userService'
const url = "http://147.182.183.104/api/sql";
axios.defaults.headers.common['x-auth-token']=getToken();
async function _get(tableName) {
  const sql = `select * from ${tableName}`;
  try {
    const res = await axios.post(url, { operation: 1, sql: sql });
    return res.data;  
  } catch (error) {
    toast.error(error.message);  
  }
}

async function _delete(id,tableName) {
  const sql = `delete  from ${tableName} where id = '${id}'`;
  console.log("sql", sql);
  const res = await axios.post(url, { operation: 1, sql: sql });
  if(res.status!==200) toast.error(res.data);
  return res.data;
}

async function _save(item,arr,tableName) {
  console.log('item',item);
  const obj = _.pick(item, arr);
  let fieldsStr = "(";
  const objKeys =Object.keys(obj); 
  const numKeys =objKeys.length; 

  for(let i=0;i<numKeys;i++){  
    fieldsStr += objKeys[i];
    fieldsStr += (i<(numKeys-1))?',':')'    
  }  

  let valuesStr = "(";
  for(let i=0;i<numKeys;i++){  
    valuesStr += `'${obj[objKeys[i]]}'`;
    valuesStr += (i<(numKeys-1))?',':')'    
  }
  let updatestr = '';
  for(let i=0;i<numKeys;i++){  
    updatestr += `${objKeys[i]} = '${obj[objKeys[i]]}'`;
    updatestr += (i<(numKeys-1))?',':' '    
  }
  const sql = (item.id ==0)?`insert into ${tableName} ${fieldsStr} values ${valuesStr}`:`update ${tableName} set ${updatestr} where id = ${item.id}`
  console.log('sql',sql);
  const res = await axios.post(url, { operation: 1, sql: sql });
  return res.data;
 }
export default{
  _get,
  _save,
  _delete
}