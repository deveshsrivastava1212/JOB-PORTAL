const errorMiddelware = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({
        status: false,
        message: "Something went wrong..",
        err
    })
}

export default errorMiddelware;