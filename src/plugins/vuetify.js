import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconFont: 'md' || 'fa'
    },
    theme: {
        primary: '#4285F4',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#ff4444',
        info: '#33b5e5',
        success: '#00C851',
        warning: '#ffbb33',
        chupala: '#00C851',
    }
    
});
