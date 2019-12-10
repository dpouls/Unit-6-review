const bcrypt = require('bcryptjs')

module.exports = {
    login: async(req,res) => {
        const {email, password} = req.body;
        const {session} = req
        const db = req.app.get('db');

        //function needs to be async so it waits for the response from this query. do this with async/ await
        
        let user = await db.check_user(email);
        user = user[0] // gets that object out of the array (just makes it easier when typing later on)
        if(!user){
            return res.status(400).send('Email aint here in thah daterbase')
        }
        // in login function we use bcyrpt to compare hash to password in db
        const authenticated = bcrypt.compareSync(password,user.user_password) //returns boolean value
        if(authenticated){
            delete user.user_password; //cause we dont want to send the hash to the client side
            session.user = user
            res.status(202).send(session.user)
        } else {
            res.status(401).send('Incorrecto passwordo compañero')
        }
    },
    register: async(req,res) => {
        console.log('hit',req.body)
        const {email, password} = req.body;
        const {session} = req
        const db = req.app.get('db');

        let user = await db.check_user(email)
        user = user[0];
        if(user){
            return res.status(400).send('user in thuh daterbase already brother')
        }
        console.log('got past user')
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt)
        let newUser = await db.register_user({email, hash}) //make sure names match db.register user and order. (same as {email: email, hash: hash})
        newUser = newUser[0]
        session.user = newUser //learn more about this line
        res.status(201).send(session.user)    
    },
    logout: (req,res) => {
        req.session.destroy() // gets rid of session object
        res.sendStatus(200)
    },
    getUser: (req,res) => {
        if(req.session.user){ //user is what WE named it, could have been anything
            res.status(200).send(req.session.user) //this is all used for if they leave and come back
        } else {
            res.status(200).send('')
        }
    },
}