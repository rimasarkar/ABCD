Please find the steps below to run the performance test for getAllItemIds..
	
1) set env variable as SQLITE_TEST
	in windows : SET NODE_ENV=SQLITE_TEST
	
2) run mocha to test just this single test case
	mocha --timeout 12000000 test/getAllItemIdsTest.js


Note: Number of records can be modified in the test case, by setting the variable "recordCount" in test/getAllItemIds.js file.