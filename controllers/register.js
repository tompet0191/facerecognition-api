const handleRegister = (req, res, db, bcrypt) =>{
    const { email, name, password } = req.body;

    if( !email || !name || !password ){
        return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    
    const newUser = {
        name: name,
        email: email,
        joined: new Date()
    };

    
    db.transaction(trx => {
        trx.insert({
            hash: hash
        })
        .into('login')
        .returning('loginid')
        .then(loginid => {
            newUser.loginid = loginid[0];
            return trx('users')
                .returning('*')
                .insert(newUser)
                .then(user => {
                    res.json(user[0]); 
                })
            })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'));
}

module.exports = {
    handleRegister: handleRegister
};