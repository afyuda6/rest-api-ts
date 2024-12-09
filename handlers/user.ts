import { IncomingMessage, ServerResponse } from 'http';
import db from '../database/sqlite';

export const userHandler = (req: IncomingMessage, res: ServerResponse): void => {
    const method = req.method;

    if (method === 'GET') {
        handleReadUsers(req, res);
    } else if (method === 'POST') {
        handleCreateUser(req, res);
    } else if (method === 'PUT') {
        handleUpdateUser(req, res);
    } else if (method === 'DELETE') {
        handleDeleteUser(req, res);
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'Method Not Allowed', code: 405 }));
    }
};

const handleReadUsers = (req: IncomingMessage, res: ServerResponse): void => {
    db.all('SELECT * FROM users', [], (err, users) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK', code: 200, data: users }));
    });
};

const handleCreateUser = (req: IncomingMessage, res: ServerResponse): void => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = new URLSearchParams(body);
        const name = parsedBody.get('name');

        if (name == null || name.trim() === '') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'Bad Request', code: 400, errors: "Missing 'name' parameter" }));
            return;
        }

        db.run('INSERT INTO users (name) VALUES (?)', [name], function (err) {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'Created', code: 201 }));
        });
    });
};

const handleUpdateUser = (req: IncomingMessage, res: ServerResponse): void => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = new URLSearchParams(body);
        const name = parsedBody.get('name');
        const id = parsedBody.get('id');

        if (name == null || id == null) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'Bad Request', code: 400, errors: "Missing 'id' or 'name' parameter" }));
            return;
        }

        if (name.trim() === '' || id.trim() === '') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'Bad Request', code: 400, errors: "Missing 'id' or 'name' parameter" }));
            return;
        }

        db.run('UPDATE users SET name = ? WHERE id = ?', [name, id], function (err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'OK', code: 200 }));
        });
    });
};

const handleDeleteUser = (req: IncomingMessage, res: ServerResponse): void => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = new URLSearchParams(body);
        const id = parsedBody.get('id');

        if (id == null || id.trim() === '') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'Bad Request', code: 400, errors: "Missing 'id' parameter" }));
            return;
        }

        db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'OK', code: 200 }));
        });
    });
};
