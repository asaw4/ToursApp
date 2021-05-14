# ToursApp

ENDPOINTS :

    1. CREATE TOUR
        POST api/v1/tours
        Body :
            {
            "name" : "Test Tour 1",
        	"duration" : 3,
            "diffilculty" : "easy"
            }
    2. GET ALL TOURS
        GET api/v1/tours
    3. UPDATE TOUR
        PATCH api/v1/tours/:tourID
        Body :
            {
            duration : '4'
            }
    4. GET TOUR
        GET api/v1/tours/:tourID
    5. DELETE TOUR
        DELETE api/v1/tours/:tourID
