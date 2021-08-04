
// GET QUERY PARAMETERS
const getByRequest = (req) => {
    return `&page=${req.query.page ?? 1}&language=${req.query.language ?? "pt-BR"}`
};

module.exports = {
    getByRequest: getByRequest
};