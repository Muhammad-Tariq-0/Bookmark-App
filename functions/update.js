const faunadb = require('faunadb'),
q = faunadb.query;
var dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {
try {
  var client =new faunadb.Client({secret: process.env.FAUNADB_SECRET_KEY});
  var incomingData = JSON.parse(event.body);
var result =await client.query(
    q.Update(q.Ref(q.Collection("bookmarks"),incomingData.id),
    { data: { roll_n0:  incomingData.roll_n0, name: incomingData.name, CNIC: incomingData.CNIC, gender: incomingData.gender} },
    )
)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "sucessfully deleted" }),
  }
} catch (err) {
  return { statusCode: 500, body: err.toString() }
}
}
