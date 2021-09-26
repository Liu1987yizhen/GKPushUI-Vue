<template>
    <button @click="switchEngine(1)">CC</button>
    <button @click="switchEngine(2)">UE</button>
    <button @click="switchEngine(3)">GK</button>
    <div class="content">
        <cesium-viewer ref="cesiumViewer"
                       v-if="enginetype === 1"/>
        <iframe v-if="enginetype === 2"
                key="ue"
                ref="ueiframe"
                src="./UE/ue.html"
                frameborder="0"></iframe>
        <iframe v-if="enginetype === 3"
                key="gk"
                ref="gkiframe"
                src="./UE/ue.html"
                frameborder="0"></iframe>
    </div>
</template>

<script>
    import CesiumViewer from "@/components/Cesium/CesiumViewer.vue"

    export default {
        name: "Index",
        components: {CesiumViewer},
        data() {
            return {
                // enginetype: "",
                enginetype: 3,
            }
        },
        watch: {
            enginetype: {
                immediate: false,
                handler(val) {
                    this.$nextTick(() => {
                        this.initIframeEngine()
                    })
                }
            }
        },
        methods: {
            switchEngine(enginetype){
                this.enginetype = enginetype;
            },

            initIframeEngine() {
                this.$refs.ueiframe &&
                (this.$refs.ueiframe.onload = () => {
                    // // iframe加载完成后你需要进行的操作
                    // this.loadNum++
                    this.initUe()
                    console.log("iframe loaded")
                })
                this.$refs.gkiframe &&
                (this.$refs.gkiframe.onload = () => {
                    // iframe加载完成后你需要进行的操作
                    // this.loadNum++
                    this.initGk()
                    console.log("iframe loaded")
                })
            },
            initUe() {
                const iframeWindow = this.$refs.ueiframe.contentWindow
                const ueConfig = {engineurl:'http://139.159.160.62:10006/'}
                iframeWindow.UIConfig.bg_tpe = "ue"
                iframeWindow.UIConfig.ue.url = ueConfig && ueConfig.engineurl
                iframeWindow.WebAPIInstance = new iframeWindow.WebAPI()
                iframeWindow.WebAPIInstance.Initialize()
                this.UEWebAPI = iframeWindow.WebAPIInstance
            },
            initGk() {
                const iframeWindow = this.$refs.gkiframe.contentWindow
                // const gkConfig = this.engines.find(
                //     (v) => v.enginetype === "GeoKing"
                // )
                iframeWindow.UIConfig.bg_tpe = "gk"
                iframeWindow.UIConfig.gk.launcherArray = [
                    // gkConfig && gkConfig.engineurl
                    'http://139.9.50.156:9080/'
                ]
                iframeWindow.WebAPIInstance = new iframeWindow.WebAPI()
                iframeWindow.WebAPIInstance.Initialize()
                this.GKWebAPI = iframeWindow.WebAPIInstance
            },
        }
    }

</script>

<style scoped>

</style>
