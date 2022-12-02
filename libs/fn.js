export const routerEnclose = (fn, formatExchange) => (req, res) => {
    fn(formatExchange ? formatExchange(req) : req).then(
        ({ statusCode, data, error }) => {
            if (statusCode >= 200 && statusCode < 300) {
                res.status(statusCode).json(data);
            } else {
                res.status(statusCode).json(error?.message);
            }
        },
    );
};
