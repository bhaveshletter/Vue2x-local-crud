new Vue({

  el: '#movie-app',
  data: {
    message: 'Add Create Update Delete operations in local!',
    list: [
      {
        id: 1,
        name: 'Braveheart',
        type: 'Non fiction'
      }
    ]
  },
  methods: {
    addButton: function() {
      let id = this.list.length + 1
      let name = 'Movie - ' + id.toString()
      let type = ['Fiction', 'Non fiction'][Math.floor(Math.random() * id)]
      this.list.unshift({ id: id, name: name, type: type })
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