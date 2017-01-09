// Used to create review._id in Mongo shell for imported data not created by Mongoose methods.  Easier to create here and cut and paste into shell to execute.

// To create _id for the first review of each restaurant
// db.restaurants.update(
// 	{},
// 	{
// 		$set: {
// 			"reviews.0._id" : ObjectId()
// 		}
// 	},
// 	{
// 		multi: true
// 	}
// )

// Create _id for one restaurant with a second review
db.restaurants.update(
	{
		name: "Loveless Cafe"
	},
	{
		$set: {
			"reviews.1._id" : ObjectId()
		}
	}
)