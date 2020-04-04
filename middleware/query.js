/* Returns set of Queries based on tableName for search and pagination */
const getQueryFromTable = (tableName,searchTerm,limit,startIndex) => {
	let query,searchCountQuery,searchQuery;
	let countQuery = `SELECT count(*) as totalCount from ${tableName}`;

switch (tableName) {
  case "application": 
    query = `SELECT * from ${tableName} ORDER BY Application_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchQuery = `SELECT * from ${tableName} WHERE Application_Name LIKE '%${searchTerm}%' OR
      Application_Short_Name LIKE '%${searchTerm}%' OR Application_Desc LIKE '%${searchTerm}%' 
      ORDER BY Application_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchCountQuery = `SELECT count(*) as totalCount from ${tableName} WHERE Application_Name LIKE '%${searchTerm}%' OR
      Application_Short_Name LIKE '%${searchTerm}%' OR Application_Desc LIKE '%${searchTerm}%'`;
    break;

  case "roles": 
    query = `SELECT * from ${tableName} ORDER BY Role_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchQuery = `SELECT * from ${tableName} WHERE Role_Name LIKE '%${searchTerm}%' OR
      Role_Desc LIKE '%${searchTerm}%' 
      ORDER BY Role_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchCountQuery = `SELECT count(*) as totalCount from ${tableName} WHERE Role_Name LIKE '%${searchTerm}%' OR
      Role_Desc LIKE '%${searchTerm}%'`;
    break;

  case "roles_forms": 
    query = `SELECT * from ${tableName} ORDER BY Role_Form_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchQuery = `SELECT * from ${tableName} WHERE Role_ID LIKE '%${searchTerm}%' OR
      Form_ID LIKE '%${searchTerm}%' OR Role_Form_ID LIKE '%${searchTerm}%'
      ORDER BY Role_Form_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchCountQuery = `SELECT count(*) as totalCount from ${tableName} WHERE Role_ID LIKE '%${searchTerm}%' OR
      Form_ID LIKE '%${searchTerm}%' OR Role_Form_ID LIKE '%${searchTerm}%'
      ORDER BY Role_Form_ID ASC limit ${limit} OFFSET ${startIndex}`;
    break;

  case "roles_modules": 
    query = `SELECT * from ${tableName} ORDER BY Role_Module_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchQuery = `SELECT * from ${tableName} WHERE Role_ID LIKE '%${searchTerm}%' OR
      Module_ID LIKE '%${searchTerm}%' OR Role_Module_ID LIKE '%${searchTerm}%'
      ORDER BY Role_Module_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchCountQuery = `SELECT count(*) as totalCount from ${tableName} WHERE Role_ID LIKE '%${searchTerm}%' OR
      Module_ID LIKE '%${searchTerm}%' OR Role_Module_ID LIKE '%${searchTerm}%'
      ORDER BY Role_Module_ID ASC limit ${limit} OFFSET ${startIndex}`;
    break;

  case "users_roles": 
    query = `SELECT * from ${tableName} ORDER BY User_Role_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchQuery = `SELECT * from ${tableName} WHERE Role_ID LIKE '%${searchTerm}%' OR
      User_ID LIKE '%${searchTerm}%' OR User_Role_ID LIKE '%${searchTerm}%'
      ORDER BY User_Role_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchCountQuery = `SELECT count(*) as totalCount from ${tableName} WHERE Role_ID LIKE '%${searchTerm}%' OR
      User_ID LIKE '%${searchTerm}%' OR User_Role_ID LIKE '%${searchTerm}%'
      ORDER BY User_Role_ID ASC limit ${limit} OFFSET ${startIndex}`;
    break;

  case "users": 
    query = `SELECT * from ${tableName} ORDER BY User_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchQuery = `SELECT * from ${tableName} WHERE User_Name LIKE '%${searchTerm}%' OR
      User_Status LIKE '%${searchTerm}%' OR User_Email LIKE '%${searchTerm}%' OR
      User_Mobile LIKE '%${searchTerm}%' OR Employee_ID LIKE '%${searchTerm}%' OR
      Host_ID_Restric LIKE '%${searchTerm}%' OR Account_Looked_Flag LIKE '%${searchTerm}%' OR
      User_ID LIKE '%${searchTerm}%' OR HostID_at_Time_Locked LIKE '%${searchTerm}%'
      ORDER BY User_ID ASC limit ${limit} OFFSET ${startIndex}`;
    searchCountQuery = `SELECT count(*) as totalCount from ${tableName} WHERE User_Name LIKE '%${searchTerm}%' OR
      User_Status LIKE '%${searchTerm}%' OR User_Email LIKE '%${searchTerm}%' OR
      User_Mobile LIKE '%${searchTerm}%' OR Employee_ID LIKE '%${searchTerm}%' OR
      Host_ID_Restric LIKE '%${searchTerm}%' OR Account_Looked_Flag LIKE '%${searchTerm}%' OR
      User_ID LIKE '%${searchTerm}%' OR HostID_at_Time_Locked LIKE '%${searchTerm}%'
      ORDER BY User_ID ASC limit ${limit} OFFSET ${startIndex}`;
    break;

  default:
    break;
}

  return {
    query,
    countQuery,
    searchQuery,
    searchCountQuery
  };
}

module.exports = {
	getQueryFromTable,
}