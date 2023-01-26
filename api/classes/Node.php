<?php
require_once "./DB.php";

class Node
{
    private $db;
    private $table = 'nodes';

    public function __construct()
    {
        $this->db = new DB();
    }

    public function getNodes()
    {
        $nodes = $this->db->selectAll($this->table);
        return $this->buildTree($nodes);
    }

    public function updateNode($id, $new_title)
    {
        $this->db->update($this->table, $id, 'title', $new_title);
    }

    public function deleteNode($id)
    {
        $this->db->delete($this->table, $id);
    }

    public function insertNode($title, $parent_id)
    {
        $id = $this->db->insert($this->table, ['title' => $title, 'parent_id' => $parent_id]);
        return ['id' => $id];
    }

    private function buildTree($nodes, $parentId = 0)
    {
        $branch = [];
        foreach ($nodes as $node) {
            if ($node['parent_id'] == $parentId) {
                $children = $this->buildTree($nodes, $node['id']);
                if ($children) {
                    $node['children'] = $children;
                }
                $branch[] = $node;
            }
        }
        return $branch;
    }
}