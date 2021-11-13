<template>
  <div id="app">
    <div class="search-wrapper">
    <input type="text" 
    class="search-bar"
    @input="searchByTitle"
    placeholder="Search in the titles"/>
  </div>
    <paginate ref="paginator" class="flex-container" name="items" :list="items">
      <li v-for="(item, index) in paginated('items')" :key="index" class="flex-item">
        <div id="image"><img :src="item.image && item.image.file" /></div>
        <div id="date">{{ formatDate(item.pub_date) }}</div>
        <div id="title"> {{ item.title }}</div>
        <div id="article"  v-html="item.details_en" target="blank">Explore More</div>
      </li>
    </paginate>
    <paginate-links
      for="items"
      :limit="2"
      :show-step-links="true">
    </paginate-links>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      items: [],
      paginate: ["items"],
      search:'',
      params: '',
      debounce: ''
    };
  },
  created() {
    this.loadPressRelease();
  },
  methods: {
    loadPressRelease() {
      axios.get(`https://zbeta2.mykuwaitnet.net/backend/en/api/v2/media-center/press-release/?page_size=61&type=5&${this.params}`)
      .then((response) => {
        this.items = response.data.results;
      });
    },
    formatDate(date) {
      return moment(date).format("ll");
    },
    searchByTitle(event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.params = `q=${event.target.value}`
        this.loadPressRelease()
      }, 600)
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #502c4b;
  margin-top: 60px;
}
ul.flex-container {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-direction: row wrap;
  flex-wrap: wrap;
  justify-content: space-around;
}
li img {
  display: initial;
  height: 250px;
} 
.flex-item {
  background:RGB(167,210,203);
  width: calc(100% / 3.5);
  padding: 5px;
  height: auto;
  margin-top: 10px;
  color: black;
  font-weight: bold;
  text-align: center;
  box-shadow: thistle;
}

#title {
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
}

#date {
  font-size: 30px;
}

.search-wrapper{
  width: 120%;
  margin-bottom: 20px;
  margin-left: 25px;

}

#article {
  font-size: 10px;
}
.search-bar {
  border: 1px solid #ccc;
  outline: 0;
  border-radius: 10px;
  width: 50%;
  margin-left: 10px;
  padding: 0.5rem;
}
.search-bar:focus {
  box-shadow: 0 0 15px 5px #b0e0ee;
  border: 2px solid #bebede;
}
.search-box:not(:valid) ~ .close-icon {
  display: none;
}

ul.paginate-links.items li {
  display: inline-block;
  margin: 5px;
}
ul.paginate-links.items a {
  cursor: pointer;
}
ul.paginate-links.items li.active a {
  font-weight: bold;
}
ul.paginate-links.items li.next:before {
  content: " | ";
  margin-right: 13px;
  color: #ddd;
}
ul.paginate-links.items li.disabled a {
  color: #ccc;
  cursor: no-drop;
}
</style>
