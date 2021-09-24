<template>
    <div class="shadow-box"></div>
    <div class="blur-bg" v-show="headerActive.length > 0"></div>
    <Login v-if="headerActive.includes(10)" @close="layerClose(10)"/>
    <Header @active="headerActiveHandle"/>
    <Setting v-if="headerActive.includes(9)" @close="layerClose(9)"/>
    <Compass v-if="headerActive.includes(0)"/>
    <TimePicker v-if="headerActive.includes(1)"/>
    <Weather v-if="headerActive.includes(2)" @close="layerClose(2)"/>
    <Attribute v-if="headerActive.includes(3)"/>
    <Mesure v-if="headerActive.includes(4)"/>
    <Layer v-if="headerActive.includes(5)"/>
    <Animate v-if="headerActive.includes(6)"/>
    <Viewpoint v-if="headerActive.includes(7)"/>
    <POI v-if="headerActive.includes(8)"/>
    <Statistics v-if="headerActive.includes(11)"/>
</template>

<script>
    import Header from "../components/Header";
    import Login from "../components/Login";
    import Setting from "../components/Setting";
    import Compass from "../components/Compass";
    import TimePicker from "../components/TimePicker";
    import Weather from "../components/Weather";
    import Mesure from "../components/Mesure";
    import Attribute from "../components/Attribute";
    import Layer from "../components/Layer";
    import Animate from "../components/Animate";
    import Viewpoint from "../components/Viewpoint";
    import POI from "../components/POI";
    import Statistics from "../components/Statistics";

    import {ref} from "vue";

    export default {
        components: {
            Header,
            Setting,
            Login,
            Compass,
            TimePicker,
            Weather,
            Mesure,
            Attribute,
            Layer,
            Animate,
            Viewpoint,
            POI,
            Statistics,
        },
        setup() {
            let headerActive = ref([]);
            const headerActiveHandle = (e) => {
                headerActive.value = e;
            };
            const layerClose = (e) => {
                let index = headerActive.value.findIndex((item) => item == e);
                if (index > -1) {
                    headerActive.value.splice(index, 1);
                }
            };
            return {
                headerActiveHandle,
                headerActive,
                layerClose,
            };
        },
    };
</script>

<style>
</style>
