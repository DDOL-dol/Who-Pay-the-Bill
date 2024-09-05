const { createApp, ref, reactive, watch, computed } = Vue;

const DEFAULT_STATE = {
    title: "Who pay the bill",
    state: true,
    inputName: '',
    names: [],
    error: '',
    showError: false,
    result: '',
}

createApp({
    setup() {
        const data = reactive(DEFAULT_STATE);

        function onAddName() {
            if (data.inputName === '') {
                data.error = 'You don\'t input the name!'
                console.log(data.error);
            } else if (data.names.includes(data.inputName)) {
                data.error = 'You entered a duplicate name!'
                console.log(data.error);
            } else {
                data.error = '';
                data.names.push(data.inputName);
                data.inputName = '';
            }
        }

        function onRemoveName(name) {
            console.log(`remove ${name}`);
            const index = data.names.indexOf(name);
            if (index !== -1) {
                data.names.splice(index, 1);
            }
        }

        function onFindLoser() {
            const idx = Math.floor(Math.random() * data.names.length);
            data.result = data.names[idx];
            data.state = false;
        }

        function onFindAnotherLoser(){
            const idx = Math.floor(Math.random() * data.names.length);
            data.result = data.names[idx];
        }

        function onRestart() {
            data.state = true;
            data.inputName = '';
            data.names = [];
            data.error = '';
            data.showError = false;
            data.result = '';
        }

        // if user enter new inputs, just don't display the error
        watch(() => data.inputName, (newInput, oldInput) => {
            if (newInput !== oldInput) {
                data.error = '';
            }
        })

        const canRoll = computed(() => {
            return data.names.length > 1;
        })

        return {
            data,
            canRoll,
            onAddName,
            onRemoveName,
            onFindLoser,
            onRestart,
            onFindAnotherLoser,
        }
    }
}).mount('#app')