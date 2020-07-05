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

var dynamicTitle = new Vue({
  el: '#dynamic-title',
  data: {
    message: 'Add Create Update Delete operations in local!',
    title: 'Anything can be changed but dedication should be same. Current DateTime: ' + new Date().toLocaleString(),
    rawHtmlStr: '<h4 style="color:green;"> this is html rendering </h4>',
    firstname: 'First Name',
    lastname: 'Last Name',
    isActive: true,
    error: null
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
    answer: 'Please ask question ...',
    img_cdn: ''
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
      this.img_cdn = ''

      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function(res){
          vm.img_cdn = res.data.image
          vm.answer = res.data.answer // _.capitalize(res.data.answer)
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