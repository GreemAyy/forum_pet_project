export const uploadMedia=
({id,name,type}:{id:string,name:string,type:string})=>
{
return `INSERT INTO media (ID, creator_id, name, type, status) VALUES (null,${id},'${name}','${type}','200')`
}