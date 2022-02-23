<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <a-button type="primary" @click="queryMsg">获取数据</a-button>
  </div>
</template>

<script>
  import {querySandbox} from "../api/urls";

  export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      params: {
        moduleCode: 'ywjk_fxsx'
      }
    }
  },
  methods:{
    queryMsg(){
      querySandbox(this.params).then(({code, data}) => {
        if(code === 200){
          console.log('data', data);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
