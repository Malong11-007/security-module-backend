const JWTStrategy = require("passport-jwt").Strategy;
const { jwt_secret } = require('./config');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor();
opts.secretOrKey = jwt_secret;  


module.exports = passport => {
  /* strategy for client */
  passport.use('client',
    new JWTStrategy(opts, async (jwt_payload, done) => {
      console.log('client',jwt_payload);
      try{
        let user = await client.findOne({
          where : {
            client_id : jwt_payload.id
          }
        })
        if (!user) {
          return done(null, false);
        } else {
          return done(null,user);
        }
      } catch(err) {
        done(err,false)
      }
    })
  );
 };
