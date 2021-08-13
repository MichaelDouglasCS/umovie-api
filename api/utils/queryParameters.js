
// GET QUERY PARAMETERS
const getParametersBy = (req) => {
    let page = req.query.page != null ? `&page=${req.query.page}` : ``;
    let query = req.query.query != null ? `&query=${req.query.query}` : ``;
    let region = req.query.region != null ? `&region=${req.query.region}` : ``;
    return `${page}${query}${region}&language=${req.query.language ?? "pt-BR"}`
};

module.exports = {
    getParametersBy: getParametersBy
};