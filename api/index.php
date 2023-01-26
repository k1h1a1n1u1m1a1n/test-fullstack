<?php
require_once "./classes/Node.php";

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json; charset=utf-8');

$node = new Node();
$data = json_decode(file_get_contents('php://input'));

// In free hosting methods PUT, DELETE is not allowed
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    $method = $data->method;
}

switch ($method) {
    case 'GET':
        send($node->getNodes(), 200);
        break;

    case 'POST':
        $res = $node->insertNode($data->title, $data->parent_id);
        send($res, 200);
        break;

    case 'PUT':
        $node->updateNode($data->id, $data->title);
        send([], 204);
        break;

    case 'DELETE':
        $node->deleteNode($data->id);
        send([], 204);
        break;

    default:
        send([], 404);
}

function send($data, $code)
{
    http_response_code($code);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    die();
}
