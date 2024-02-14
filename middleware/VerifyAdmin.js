const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await userCollections.findOne(query);
    const isAdmin = user?.role === 'admin' ? true : false;
    next();
}

module.exports = {
    verifyAdmin
};