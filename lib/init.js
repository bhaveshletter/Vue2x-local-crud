Vue.component('counter-button', {
  data: function(){
    return {
      count: 0
    }
  },
  methods: {
    counter: function(){
      this.count++
    }
  },
  template: '<button @click="counter"> Clicked {{count}} times! </button>'
})

Vue.component('movie-info', {
  methods: {
    hello: function(){
      alert(this.movie.name)
    }
  },
  props: ['movie'],
  template: '<li @click="hello">\
              <b> Sr. No:</b> {{movie.id}},\
              <b> Namne:</b> {{movie.name}},\
              <b> Type:</b> {{movie.type}}\
            </li>'
})

Vue.component('search-input', {
  props: ['value'],
  template: `<input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" placeholder='Custom component'>`
})

Vue.component('alert-box', {
  template: '<div class="demo-alert-box">\
              <strong>Error!</strong>\
              <slot></slot>\
            </div>'
})


Vue.component('user', {
  data: function(){
    return {
      result: [],
      message: 'API is working ...'
    }
  },
  template: '<div>\
   Total {{ message || result.length }} users.\
   <ul>\
    <li v-for="item in result" v-bind:key="item">\
      {{item.username}},\
      {{item.email}}\
    </li>\
   </ul>\
   </div>',
  created: function(){
    this.getData()
  },
  methods: {
    getData: function(){
      var _this = this
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(function(res){
          _this.message = null
          _this.result = res.data
        })
        .catch(function(error){
          alert('Error: ' + error)
        })
    }
  }
})

Vue.component('album', {
  data: function(){
    return {
      result: [],
      message: 'API is working ...'
    }
  },
  template: '<div>\
   Total {{ message || result.length }} albums.\
   <ul>\
    <li v-for="item in result" v-bind:key="item">\
      {{item.title}}\
    </li>\
   </ul>\
   </div>',
  created: function(){
    this.getData()
  },
  methods: {
    getData: function(){
    var _this = this
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(function(res){
        _this.message = null
        _this.result = res.data
      })
      .catch(function(error){
        alert('Error: ' + error)
      })
    }
  }
})

Vue.component('post', {
  data: function(){
    return {
      result: [],
      message: 'API is working ...'
    }
  },
  template: '<div>\
    Total {{ message || result.length }} posts.\
    <ul>\
      <li v-for="item in result" v-bind:key="item.id">\
        {{ item.title }}\
      </li>\
    </ul>\
    </div>',
  created: function(){
    this.getData()
  },
  methods: {
    getData: function(){
      var _this = this
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(function(res){
          _this.message = null
          _this.result = res.data
        })
        .catch(function(error){
          alert('Error: ' + error)
        })
    }
  }
})

var dynamicComponent = new Vue({
  el: '#dynamic-component',
  data: {
    currentTab: 'User',
    tabs: ['User', 'Post', 'Album']
  }
  , computed: {
    currentTabComponent: function(){
      return this.currentTab.toLowerCase()
    }
  }
})

var dynamicTitle = new Vue({
  el: '#dynamic-title',
  data: {
    message: 'Add Create Update Delete operations in local!',
    title: 'Anything can be changed but dedication should be same. Current DateTime: ' + new Date().toLocaleString(),
    rawHtmlStr: '<h4 style="color:green;"> this is html rendering </h4>',
    firstname: 'First Name',
    lastname: 'Last Name',
    isActive: true,
    error: null,
    searchQ: ''
  },
  computed: {
    classObject: function(){
      return {
        active: this.isActive && !this.error,
        'text-danger': !this.error
      }
    },
    computedProp: function(){
      return this.message.split(' ').reverse().join(' ')
    }
    ,fullname: {
      // getter
      get: function(){
        return this.firstname + ' ' + this.lastname
      },
      // setter
      set: function(newValue){
        var names = newValue.split(' ')
        this.firstname = names[0]
        this.lastname = names[names.length - 1]
      }
    }
  },
  methods: {
    vue260plus: function(){
      alert('Shorthand of v-on:click= to @click=')
    }
  }
})

var app = new Vue({

  el: '#movie-app',
  data: {
    object: {
      name: 'This is name',
      detail: 'object iteration'
    },
    arrList: [1,2,3,4,5,6,7,8,9,10],
    class1: 'class-1',
    class2: 'class-2',
    name: '',
    type: '',
    list: [
      {
        id: 1,
        name: 'Braveheart',
        type: 'Non fiction'
      }
    ],
    totalMovies: 1
  },
  methods: {
    even: function(list){
      return list.filter(function(ele){
        return ele % 2 === 0
      })
    },
    addNewMovie: function(){
      let name = this.name
      let type = this.type

      if(name && type){
        this.totalMovies++
        this.list.unshift({ id: this.totalMovies, name: name, type: type })
      }else{
        alert('Movie Name and Type are mandatory.')
      }
      this.name = ''
      this.type = ''
    },
    addButton: function() {
      this.totalMovies++
      let name = 'Movie - ' + this.totalMovies.toString()
      let type = ['Fiction', 'Non fiction'][Math.random().toFixed()]

      this.list.unshift({ id: this.totalMovies, name: name, type: type })
    },
    updateButton: function() {
      if(this.list.length > 0){
        let movie = this.list[0]
        movie.name = 'Updated - ' + movie.id.toString()
        this.list[0] = movie
      }else{
        alert('Sorry, No movie available update!')
      }
    },
    deleteButton: function() {
      if(this.list.length > 0){
        return this.list.pop(0)
      }else{
        alert('Sorry, No movie available for delete!')
      }
    }
  }
})

var queAnsWatch = new Vue({
  el: '#que-ans-watch',
  data: {
    question: '',
    answer: 'Waiting for your inputs...',
    photos: []
  },
  watch: {
    question: function(newQue, oldQue){
      this.answer = 'Waiting for you to stop typing ...'
      this.debouncedGetAnswer()
    }
  },
  created: function(){
    // https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function(){
      if (this.question.indexOf('?') === -1){
        this.answer = 'Question should has ?, are you missing ?'
        return
      }
      this.answer = 'Thinking ...'

      var vm = this
      axios.get('https://jsonplaceholder.typicode.com/photos')  // get('https://yesno.wtf/api')
        .then(function(res){
          let result = res.data // {"albumId":1,"id":1,"title":"accusamus beatae ad facilis cum similique qui sunt","url":"https://via.placeholder.com/600/92c952","thumbnailUrl":"https://via.placeholder.com/150/92c952"}
          vm.answer = 'Result is being rendered' // _.capitalize(res.data.answer)
          vm.photos = result.slice(0, 10)
        })
        .catch(function(error){
          vm.answer = 'Could not reach API, Error: ' + error
        })
    }
  },
  getThrottle: function(){
    alert('API throttled !!!')
  }
})