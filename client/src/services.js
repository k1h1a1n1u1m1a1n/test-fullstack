import axios from 'axios';

class NodeService {
    api_url = 'https://orlov-test.000webhostapp.com/api/';
    error_message = 'Something went wrong. Try again letter';

    async getNodes() {
        const res = await axios.get(this.api_url)
        return res.data;
    }

    async insertNode(title, parent_id, trees) {
        let res;
        try {
            res = await axios.post(this.api_url, {
                parent_id: parent_id, title, method: 'POST'
            });
        } catch (er) {
            window.alert(this.error_message);
            return trees;
        }

        const sort = (acc, el) => {
            if (el.id === parent_id) {
                if (!Array.isArray(el['children'])) {
                    el['children'] = [];
                }
                el['children'].push({
                    id: res.data.id,
                    title: this.validateString(title),
                    parent_id
                })
            }
            if (el.children) return el.children.reduce(sort, acc);
            return acc;
        }

        if (!parent_id) {
            trees.push({id: res.data.id, title, parent_id})
        } else {
            trees.reduce(sort, null);
        }

        return trees;
    }

    async updateNode(id, title, trees) {
        try {
            await axios.post(this.api_url, {id, title, method: 'PUT'});
        } catch (er) {
            window.alert(this.error_message);
            return trees;
        }

        const sort = (acc, el) => {
            if (el.id === id) el.title = this.validateString(title);
            if (el.children) return el.children.reduce(sort, acc);
            return acc;
        }

        trees.reduce(sort, null);
        return trees;
    }

    async deleteNode(id, trees) {
        try {
            await axios.post(this.api_url, {id, method: 'DELETE'});
        } catch (er) {
            window.alert(this.error_message);
            return trees;
        }

        const flat_arr = [];
        const sort = (e) => {
            if (parseInt(e.id) === parseInt(id)) return;
            flat_arr.push({
                id: e.id,
                title: e.title,
                parent_id: e.parent_id,
            });
            e.children && e.children.forEach(sort);
        }
        trees.forEach(sort);

        const buildTree = (nodes, parentId = null) => {
            const branch = [];
            nodes.forEach(node => {
                if (node.parent_id === parentId) {
                    const children = buildTree(nodes, node.id)
                    if (children && children.length) node.children = children;
                    branch.push(node);
                }
            })
            return branch;
        }
        return buildTree(flat_arr);
    }

    validateString(text) {
        let map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    }
}

const nodeService = new NodeService();
export default nodeService;
