// 发布中心
class Release {
    constructor(){
        // 订阅者信息存储库
        this._releaseInfos = {};
        /*
            {
                type1: [listener1, listener2],
                type2: [listener1, listener2]
            }
        */
    }
    on(type, listener){

        // 必须是function
        if(typeof listener !== 'function'){
            throw TypeError('"listener" Not a function');
        }

        let releaseInfos= this._releaseInfos[type];

        // 没有订阅类型记录先创建一个数组
        if(!releaseInfos){
            this._releaseInfos[type] = [];
        }

        // 把订阅者信息存储起来
        this._releaseInfos[type].push(listener);
    }
    // 发送订阅信息给订阅者
    emit(type, ...args){
        let releaseInfos = this._releaseInfos[type];

        // 判断订阅type上又没订阅者信息，有就发送订阅信息
        if(releaseInfos && Array.isArray(releaseInfos)){
            releaseInfos.forEach((releaseInfo) => {
                releaseInfo.apply(this, args);
            });
        }

        
    }
    //取消订阅
    off(type, listener){
        let releaseInfos = this._releaseInfos[type];
        let len = releaseInfos.length;
        for(let i=0; i<len; i++){
            if(releaseInfos[i] === listener){
                releaseInfos.splice(i, 1);
                break;
            }
        }
    }
}