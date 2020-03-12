const db = require('../config/db');

const processedResults = (tableName) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const searchTerm = req.query.search;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // console.log(page,limit,searchTerm);

    const query = `SELECT * from ${tableName} ORDER BY Application_ID ASC limit ${limit} OFFSET ${startIndex}`;

  	const countQuery = `SELECT count(*) as totalCount from ${tableName}`;

    const searchQuery = `SELECT * from ${tableName} WHERE Application_Name LIKE '%${searchTerm}%' OR
			Application_Short_Name LIKE '%${searchTerm}%' OR Application_Desc LIKE '%${searchTerm}%' 
			ORDER BY Application_ID ASC limit ${limit} OFFSET ${startIndex}`;

  	const searchCountQuery = `SELECT count(*) as totalCount from ${tableName} WHERE Application_Name LIKE '%${searchTerm}%' OR
			Application_Short_Name LIKE '%${searchTerm}%' OR Application_Desc LIKE '%${searchTerm}%'`;	

		const results = {};	

    if(searchTerm !== ''){
    	// console.log('in search')
  	 	db.query(searchCountQuery,(err,rows) => {
				if(err) throw err;
				console.log(rows[0].totalCount);
				const numberOfRows = rows[0].totalCount;	
 	
				results["totalPages"] = Math.ceil(numberOfRows/limit);

				if (endIndex < numberOfRows) {
		      results.next = {
		        page: page + 1,
		        limit: limit
		      }
		    }
		    
		    if (startIndex > 0) {
		      results.previous = {
		        page: page - 1,
		        limit: limit
		      }
		    }

		    db.query(searchQuery,(err,rows) => {
		    	if(err) throw err;	
		    	// console.log('rows',rows)

		    	results['results'] = rows;
		    	res.processedResults = results;
		    	next();
		    })
			})

    } else {
    	// console.log('in empty search')
  		db.query(countQuery,(err,rows) => {
				if(err) throw err;
				// console.log(rows[0].totalCount);
				const numberOfRows = rows[0].totalCount;	

				results["totalPages"] = Math.ceil(numberOfRows/limit);
				
				if (endIndex <  numberOfRows) {
		      results.next = {
		        page: page + 1,
		        limit: limit
		      }
		    }
		    
		    if (startIndex > 0) {
		      results.previous = {
		        page: page - 1,
		        limit: limit
		      }
		    }

		    db.query(query,(err,rows) => {
		    	if(err) throw err;

		    	results['results'] = rows;
		    	res.processedResults = results;
		    	next();
		    })
			})
    }

  }
}


module.exports = {
	processedResults
}