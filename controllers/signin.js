const handleSignin = (req, res, db, bcrypt) =>{
    const {email, password } = req.body;

    if( !email || !password ){
        return res.status(400).json('Incorrect form submission');
    }

    db.select('users.email', 'login.hash')
        .from('users')
        .innerJoin('login', 'users.loginid', 'login.loginid')
        .where('users.email', email)
        .then(loginData => {
            const isValid = bcrypt.compareSync(password, loginData[0].hash);
            
            if(isValid){
                return db.select('*').from('users')
                    .where('email', email)
                    .then(user =>{
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json("Unable to get user"))
            } else{
                res.status(400).json("Wrong credentials")
            }
        })
        .catch(err => res.status(400).json("Wrong credentials"));
}

module.exports = {
    handleSignin: handleSignin
};