
export default function runServer(app: any, port: string, log: Function) {
    app.listen(port);
    log(`App listening on port ${port}`);
}
