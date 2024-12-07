import http, { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { userHandler } from './handlers/user';

const notFound = (res: ServerResponse): void => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'Not Found', code: 404 }));
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url || '', true);
    const path = parsedUrl.pathname;

    const userRoute = /^\/users(?:\/([a-zA-Z0-9_-]+))?$/;
    if (path && path.match(userRoute)) {
        userHandler(req, res);
    } else {
        notFound(res);
    }
});

const PORT = 6014;
server.listen(PORT, () => {});
