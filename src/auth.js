import ajax from './utils.js'

export default {

    async login(formData) {
        return ajax.ajax({
            type: "POST",
            url: "/api/login",
            data: JSON.stringify(formData),
            success: function (data) {
                let arr = data.token.split(".")
                let decoded = atob(arr[1])
                let json = JSON.parse(decoded);
                json['token'] = data.token
                localStorage.setItem("user-profile", JSON.stringify(json));
            },
            dataType: "json",
            contentType: "application/json"
        });
    },

    roles() {
        return [{label: 'USER', value: 'USER'}, {label: 'ADMIN', value: 'ADMIN'}]
    },

    userName() {
        let jsonStr = localStorage.getItem('user-profile')
        if(!jsonStr) {
            return null
        }
        //http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript
        //we get utf, but javascript cannot handle it: ü is Ã¼
        return decodeURIComponent(escape(JSON.parse(jsonStr).userName))
    },
    userId() {
        let jsonStr = localStorage.getItem('user-profile')
        if(!jsonStr) {
            return null
        }
        return JSON.parse(jsonStr).userId
    },
    companyId() {
        let jsonStr = localStorage.getItem('user-profile')
        if(!jsonStr) {
            return null
        }
        return JSON.parse(jsonStr).companyId
    },
    companyName() {
        let jsonStr = localStorage.getItem('user-profile')
        if(!jsonStr) {
            return null
        }
        //http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript
        //we get utf, but javascript cannot handle it: ü is Ã¼
        return decodeURIComponent(escape(JSON.parse(jsonStr).companyName))
    },
    role() {
        let jsonStr = localStorage.getItem('user-profile')
        if(!jsonStr) {
            return null
        }
        return JSON.parse(jsonStr).role
    },
    token() {
        let jsonStr = localStorage.getItem('user-profile')
        if(!jsonStr) {
            return null
        }
        return JSON.parse(jsonStr).token
    },

    authHeader() {
        let jsonStr = localStorage.getItem('user-profile')
        if(!jsonStr) {
            return null
        }
        return { 'Authorization': 'Bearer ' + JSON.parse(jsonStr).token }
    },
    logout() {
        localStorage.removeItem('user-profile');
    },

    async loadCompanies() {
        var that = this;
        return ajax({
            type: "GET",
            url: "/api/v1/company/companies",
            dataType: "json",
            contentType: "application/json",
            headers: that.authHeader()
        });
    }
}