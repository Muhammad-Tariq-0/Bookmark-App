

const faunadb = require('faunadb'),
  q = faunadb.query;
  var dotenv = require('dotenv');
  dotenv.config();
  
exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
    var result = await client.query(
        // q.Get(q.Ref(q.Collection('semester-7'), '287586996343276045'))
        q.Map(
          q.Paginate(q.Documents(q.Collection("bookmarks"))),
          q.Lambda(x => q.Get(x))
        )
        // q.Map(
        //     q.Paginate(q.Match(q.Index('student'))),
        //     q.Lambda(x => q.Get(x))
        //   )

    );
    
    return {
      statusCode: 200,
      // body: JSON.stringify({ message: `${result.data}` }),
      body: JSON.stringify(result.data),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
