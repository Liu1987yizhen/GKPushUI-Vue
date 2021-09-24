window.UIConfig = {
    bg_tpe: 'gk',
    // bg_tpe: 'ue',
    gk: {
        /**用户名，一个推流项不能重复 */
        userName: 'gk',
        /**推流交互地址，当使用集群时，不必填写该地址 */
        chatUrl: "",
        /**容器id，一般为一个div的id */
        containerID: "gkviewport",
        /**令牌获取地址，不需要验证令牌则留空 */
        tokenUrl: "",
        /**推流窗口初始大小，为0则默认大小 */
        wndWidth: 0,
        /**推流窗口初始大小，为0则默认大小 */
        wndHeight: 0,
        /**推流集群启动器地址，当使用GKPLauncher时，必填 */
        launcherArray: ['http://139.9.50.156:9080/'],
        /**使用推流集群时启动时给定的gke项目地址，
         * 可留空，
         * 也可为gke地址：D:/Data/[xlhpq]兴龙湖片区.GKF
         * 也可以为参数： [{url:"http://172.16.8.64:12308/api/honeycomb/gk3doptile/zhongxian135sj_op", name:"忠县", ctype:"gk3doptile"}]
         */
        launchProUrl: '[]',
        /**推流集群启动过程回调，比如：function launch_progress(pos, info){}，错误发生时pos为-1，成功时为100 */
        // launchProgress: launch_progress
    },
    ue: {
        url: 'http://139.159.160.62:10006/',
    }
};
