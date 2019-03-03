const handleProfileGet = (req, res, db) =>{
    const { id } = req.params;

    db.select('userid','name', 'email', 'entries', 'joined')
        .from('users')
        .where('userid', id)
        .then( user => {
            if(user.length){
                res.json(user[0])
            }
            else {
                res.status(400).json("Not found")
            }
            
        }
    )
    .catch( err => res.status(400).json("Error getting user"));
}

module.exports = {
    handleProfileGet: handleProfileGet
};