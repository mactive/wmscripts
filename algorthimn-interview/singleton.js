// 实现一个全局的 storage 单例
// setItem 方法和 getItem method

class Storage {
    static instance;

    static getInstance() {
        if (!Storage.instance) {
            Storage.instance = new Storage()
        }
        return Storage.instance
    }

    getItem(key) {
        localStorage.getItem(key);
    }

    setItem(key, value) {
        localStorage.setItem(key, value)
    }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name', '李雷')
// 李雷
storage1.getItem('name')