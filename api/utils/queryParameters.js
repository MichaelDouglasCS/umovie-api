
// GET QUERY PARAMETERS
const getParametersBy = (req) => {
    let page = req.query.page != null ? `&page=${req.query.page}` : ``;
    return `${page}&language=${req.query.language ?? "pt-BR"}`
};

module.exports = {
    getParametersBy: getParametersBy
};