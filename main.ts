import http, {IncomingMessage, ServerResponse} from 'http';
import {parse} from 'url';
import {userHandler} from './handlers/user';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url || '', true);
    const path = parsedUrl.pathname;
    userHandler(path, req, res);
});

const PORT = process.env.PORT || 6014;
server.listen(PORT, () => {});