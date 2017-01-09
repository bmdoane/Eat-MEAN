// Used to create review._id in Mongo shell for imported data not created by Mongoose methods.  Easier to create here and cut and paste into shell.

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