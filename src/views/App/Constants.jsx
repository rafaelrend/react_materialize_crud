export default {

    PAGESIZE: 8, //Pagination size.
    
    URL_API:  (process.env.NODE_ENV == "production" ? '/react/apilaravel/public' : 'http://localhost:8080/estudos_laravelapi5/public'),
	
	URL_BASE_PATH:  (process.env.NODE_ENV == "production" ? '/react/dashboard/' : '/'),
}


